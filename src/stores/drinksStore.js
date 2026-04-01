import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useDrinksStore = defineStore('drinks', () => {
  const img = (file) => new URL(`../assets/boba/${file}`, import.meta.url).href

  // All drinks live here (first 5 = your current "Top" carousel list)
  const drinks = [
    // --- TOP 5 (Home carousel) ---
    {
      id: 1,
      name: 'Brown Sugar Milk Tea',
      tag: 'Best Seller',
      description: 'Caramel-like brown sugar with creamy milk tea',
      base: 'Milk Tea',
      topping: 'Brown Sugar Boba',
      price: 6.49,
      image: img('brown-sugar.jpg'),
    },
    {
      id: 2,
      name: 'Taro Milk Tea',
      tag: 'Fan Favorite',
      description: 'Sweet, nutty taro flavor with a smooth finish',
      base: 'Milk Tea',
      topping: 'Tapioca Pearls',
      price: 6.29,
      image: img('taro.jpg'),
    },
    {
      id: 3,
      name: 'Matcha Milk Tea',
      tag: 'Creamy',
      description: 'Earthy matcha blended into a milk tea',
      base: 'Matcha',
      topping: 'Tapioca Pearls',
      price: 6.59,
      image: img('matcha.jpg'),
    },
    {
      id: 4,
      name: 'Strawberry Fruit Tea',
      tag: 'Refreshing',
      description: 'Bright strawberry tea with a fruity punch',
      base: 'Fruit Tea',
      topping: 'Lychee Jelly',
      price: 5.99,
      image: img('strawberry.jpg'),
    },
    {
      id: 5,
      name: 'Thai Tea',
      tag: 'Classic',
      description: 'Bold Thai tea with sweet, creamy notes',
      base: 'Thai Tea',
      topping: 'Boba',
      price: 6.19,
      image: img('thai-tea.jpg'),
    },

    // --- MORE DRINKS (Gallery pages) ---
    {
      id: 6,
      name: 'Honeydew Milk Tea',
      tag: 'Sweet',
      description: 'Light honeydew flavor with creamy milk tea',
      base: 'Milk Tea',
      topping: 'Boba',
      price: 6.29,
      image: img('honeydew.jpg'),
    },
    {
      id: 7,
      name: 'Jasmine Green Milk Tea',
      tag: 'Floral',
      description: 'Fragrant jasmine tea with a smooth milk finish',
      base: 'Green Tea',
      topping: 'Grass Jelly',
      price: 6.19,
      image: img('jasmine.jpg'),
    },
    {
      id: 8,
      name: 'Mango Fruit Tea',
      tag: 'Tropical',
      description: 'Bright mango tea with a juicy punch',
      base: 'Fruit Tea',
      topping: 'Mango Popping Boba',
      price: 5.99,
      image: img('mango.jpg'),
    },
    {
      id: 9,
      name: 'Classic Black Milk Tea',
      tag: 'Simple',
      description: 'Strong black tea balanced with creamy sweetness',
      base: 'Black Tea',
      topping: 'Tapioca Pearls',
      price: 5.89,
      image: img('black-milk-tea.jpg'),
    },
    {
      id: 10,
      name: 'Okinawa Milk Tea',
      tag: 'Rich',
      description: 'Deep brown sugar flavor with a roasted finish',
      base: 'Milk Tea',
      topping: 'Boba',
      price: 6.69,
      image: img('okinawa.jpg'),
    },
    {
      id: 11,
      name: 'Lychee Green Tea',
      tag: 'Fruity',
      description: 'Crisp green tea with sweet lychee notes',
      base: 'Green Tea',
      topping: 'Lychee Jelly',
      price: 5.79,
      image: img('lychee.jpg'),
    },
    {
      id: 12,
      name: 'Coffee Milk Tea',
      tag: 'Energizing',
      description: 'Coffee-forward milk tea with a creamy finish',
      base: 'Coffee',
      topping: 'Coffee Jelly',
      price: 6.79,
      image: img('coffee-milk-tea.jpg'),
    },
  ]

  // Home carousel should show only top 5 (your original list)
  const topDrinks = computed(() => drinks.slice(0, 5))

  const count = computed(() => drinks.length)
  const getById = (id) => drinks.find(d => d.id === id) ?? null

  return { drinks, topDrinks, count, getById }
})