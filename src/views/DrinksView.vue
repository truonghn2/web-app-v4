<template>
  <v-container class="py-6">
    <div class="section-title">
      <span class="title-text">All Drinks</span>
    </div>

    <v-row class="mt-4" dense>
      <v-col
        v-for="drink in drinks"
        :key="drink.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="drink-card"
          rounded="xl"
          elevation="4"
          role="button"
          tabindex="0"
          @click="openDrink(drink)"
          @keyup.enter="openDrink(drink)"
        >
            <!-- favorite heart (top-right) -->
            <v-btn
              class="fav-btn"
              icon
              size="small"
              variant="flat"
              @click.stop="toggleFavorite(drink.id)"
              @mousedown.stop
              :aria-label="isFavorite(drink.id) ? 'Unfavorite' : 'Favorite'"
            >
              <v-icon
                :icon="isFavorite(drink.id) ? 'mdi-heart' : 'mdi-heart-outline'" 
                size="26"
              />
            </v-btn>

          <v-img :src="drink.image" height="220" contain class="drink-img">
            <!-- <v-chip class="ma-3" color="#C96B8A" variant="flat">
              {{ drink.tag }}
            </v-chip> -->
          </v-img>

          <!-- title row: name + price -->
          <v-card-title class="drink-title-row">
            <span class="drink-name">{{ drink.name }}</span>
            <span class="drink-price">${{ drink.price.toFixed(2) }}</span>
          </v-card-title>

          <v-card-subtitle class="drink-desc">
            {{ drink.description }}
          </v-card-subtitle>

          <v-card-text class="drink-details">
            <div class="detail-line">
              <span class="detail-label">Base:</span>
              <strong class="detail-value">{{ drink.base }}</strong>
            </div>
            <div class="detail-line">
              <span class="detail-label">Topping:</span>
              <strong class="detail-value">{{ drink.topping }}</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Details Dialog -->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card rounded="xl" class="dialog-card">
        <!-- top-right X close -->
        <v-btn
          class="dialog-x"
          icon
          variant="flat"
          size="medium"
          aria-label="Close dialog"
          @click="dialogOpen = false"
        >
          <v-icon icon="mdi-close" />
        </v-btn>

        <v-img :src="selected?.image" height="260" contain class="dialog-img" />

        <v-card-title class="text-h6 font-weight-bold">
          {{ selected?.name }}
        </v-card-title>

        <v-card-text>
          <div class="mb-2">{{ selected?.description }}</div>

          <v-list density="compact">
            <v-list-item>
              <template #prepend><v-icon>mdi-cup</v-icon></template>
              <v-list-item-title>Base</v-list-item-title>
              <v-list-item-subtitle>{{ selected?.base }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend><v-icon>mdi-circle</v-icon></template>
              <v-list-item-title>Topping</v-list-item-title>
              <v-list-item-subtitle>{{ selected?.topping }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend><v-icon>mdi-cash</v-icon></template>
              <v-list-item-title>Price</v-list-item-title>
              <v-list-item-subtitle>
                ${{ selected?.price?.toFixed(2) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-end">
        <v-btn
            class="dialog-add-btn"
            color="#C96B8A"
            variant="flat"
            size="large"
            prepend-icon="mdi-cart-plus"
            rounded="lg"
            @click="addToCart(selected)"
        >
            Add to Cart
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useDrinksStore } from '../stores/drinksStore'
import { useCartStore } from '../stores/cartStore'
const favoritesStore = useFavoritesStore()
const drinksStore = useDrinksStore()
const cartStore = useCartStore()

const img = (file) => new URL(`../assets/boba/${file}`, import.meta.url).href

const dialogOpen = ref(false)
const selected = ref(null)

const isFavorite = favoritesStore.isFavorite
const toggleFavorite = favoritesStore.toggleFavorite
const drinks = drinksStore.drinks

function openDrink(drink) {
  selected.value = drink
  dialogOpen.value = true
}

function addToCart(drink) {
  cartStore.add(drink, 1)
  dialogOpen.value = false
}
</script>

<style scoped>
.section-title {
  display: inline-block;
  margin-bottom: 12px;
}

.title-text {
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 6px;
  border-bottom: 3px solid #C96B8A; /* underline */
}

.drink-card{
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.drink-card:hover{
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgba(0,0,0,0.14);
}

.drink-img :deep(.v-img__img) {
  padding-top: 16px;
}

.fav-btn{
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
}

.fav-btn :deep(.v-icon){
  color: #C96B8A;
}

/* match HomeView hierarchy sizes */
.drink-title-row{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 2px;
}

.drink-name{
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.15;
  color: rgba(0,0,0,0.88);
}

.drink-price{
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(0,0,0,0.78);
  white-space: nowrap;
}

.drink-desc{
  margin-top: 2px;
  font-size: 0.98rem;
  color: rgba(0,0,0,0.62);
}

.drink-details{
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(0,0,0,0.08);
}

.detail-line{
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 0.95rem;
  color: rgba(0,0,0,0.70);
  line-height: 1.4;
}

.detail-label{
  color: rgba(0,0,0,0.55);
}

.detail-value{
  color: rgba(0,0,0,0.78);
}

/* dialog */
.dialog-card {
  position: relative;
}

.dialog-img :deep(.v-img__img) {
  padding-top: 16px;
}

.dialog-x{
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  color: #C96B8A;
}

</style>