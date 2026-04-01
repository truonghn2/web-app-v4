import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(new Set())

  function isFavorite(id) {
    return favorites.value.has(id)
  }

  function toggleFavorite(id) {
    const next = new Set(favorites.value)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    favorites.value = next
  }

  function clearFavorites() {
    favorites.value = new Set()
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
})