import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Map<drinkId, { id, name, price, image, qty }>
  const items = ref(new Map())

  function add(drink, qty = 1) {
    if (!drink?.id) return
    const n = Math.max(1, Number(qty) || 1)

    const next = new Map(items.value)
    const existing = next.get(drink.id)

    if (existing) {
      next.set(drink.id, { ...existing, qty: existing.qty + n })
    } else {
      next.set(drink.id, {
        id: drink.id,
        name: drink.name,
        price: drink.price,
        image: drink.image,
        qty: n,
      })
    }

    items.value = next
  }

  function remove(id) {
    const next = new Map(items.value)
    next.delete(id)
    items.value = next
  }

  function decrement(id, qty = 1) {
    const n = Math.max(1, Number(qty) || 1)

    const next = new Map(items.value)
    const existing = next.get(id)
    if (!existing) return

    const newQty = existing.qty - n
    if (newQty <= 0) next.delete(id)
    else next.set(id, { ...existing, qty: newQty })

    items.value = next
  }

  function setQty(id, qty) {
    const n = Math.max(0, Number(qty) || 0)

    const next = new Map(items.value)
    const existing = next.get(id)
    if (!existing) return

    if (n === 0) next.delete(id)
    else next.set(id, { ...existing, qty: n })

    items.value = next
  }

  function clear() {
    items.value = new Map()
  }

  // convenient array for v-for
  const list = computed(() => Array.from(items.value.values()))

  const itemCount = computed(() =>
    Array.from(items.value.values()).reduce((sum, it) => sum + it.qty, 0)
  )

  const subtotal = computed(() =>
    Array.from(items.value.values()).reduce((sum, it) => sum + it.qty * (Number(it.price) || 0), 0)
  )

  return {
    items,      // Map (internal)
    list,       // Array (UI-friendly)
    itemCount,  // total quantity
    subtotal,   // total price
    add,
    remove,
    decrement,
    setQty,
    clear,
  }
})