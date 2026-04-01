<template>
  <v-container class="py-6">
    <div class="section-title">
        <span class="title-text">Top Boba Drinks</span>
    </div>
    <div class="view-all-row">
      <span class="view-all-hint">Want more options?</span>

      <v-btn
        class="view-all-btn"
        color="#C96B8A"
        variant="flat"
        rounded="lg"
        prepend-icon="mdi-view-grid"
        @click="goToDrinks"
      >
        View all drinks
      </v-btn>
    </div>
    <div
      @mouseenter="isCycling = false"
      @mouseleave="isCycling = true"
    >
      <v-carousel
        v-model="active"
        height="520"
        show-arrows="hover"
        hide-delimiter-background
        hide-delimiters
        :cycle="isCycling"
      >
        <v-carousel-item
          v-for="drink in drinks"
          :key="drink.id"
        >
          <div class="slide-wrap">
          <v-card
            class="mx-auto drink-card"
            max-width="900"
            rounded="xl"
            elevation="4"
            role="button"
            tabindex="0"
            @mouseenter="isCycling = false"
            @mouseleave="isCycling = true"
            @focusin="isCycling = false"
            @focusout="isCycling = true"
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
            <v-img
              :src="drink.image"
              height="320"
              contain
              class="carousel-img"
            >
              <v-chip
                class="ma-3"
                color="#C96B8A"
                variant="flat"
              >
                {{ drink.tag }}
              </v-chip>
            </v-img>

            <!-- title row: name + price -->
            <v-card-title class="drink-title-row">
              <span class="drink-name">{{ drink.name }}</span>
              <span class="drink-price">${{ drink.price.toFixed(2) }}</span>
            </v-card-title>

            <!-- description -->
            <v-card-subtitle class="drink-desc">
              {{ drink.description }}
            </v-card-subtitle>

            <!-- grouped details -->
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
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>

    <!-- custom buttons below -->
    <div class="carousel-dots">
      <v-btn
        v-for="(_, i) in drinks"
        :key="i"
        size="x-small"
        icon
        variant="text"
        class="dot-btn"
        :class="{ active: active === i }"
        :aria-label="`Go to slide ${i + 1}`"
        @click="active = i"
      >
        <v-icon size="15">
          {{ active === i ? 'mdi-circle' : 'mdi-circle-outline' }}
        </v-icon>
      </v-btn>
    </div>

    <!-- slide position label -->
    <div class="carousel-position" aria-live="polite">
      {{ active + 1 }} of {{ drinks.length }}
    </div>

    <!-- Details Dialog-->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card rounded="xl">
        <!-- top-right X close -->
        <v-btn
          class="dialog-x"
          icon
          variant="flat"
          size="medium"
          :aria-label="'Close dialog'"
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
              <template #prepend>
                <v-icon>mdi-cup</v-icon>    
              </template>
              <v-list-item-title>Base</v-list-item-title>
              <v-list-item-subtitle>{{ selected?.base }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon>mdi-circle</v-icon>
              </template>
              <v-list-item-title>Topping</v-list-item-title>
              <v-list-item-subtitle>{{ selected?.topping }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon>mdi-cash</v-icon>
              </template>
              <v-list-item-title>Price</v-list-item-title>
              <v-list-item-subtitle>${{ selected?.price?.toFixed(2) }}</v-list-item-subtitle>
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
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useDrinksStore } from '../stores/drinksStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const drinksStore = useDrinksStore()
const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

const active = ref(0)
const img = (file) => new URL(`../assets/boba/${file}`, import.meta.url).href
const isCycling = ref(true)

const isFavorite = favoritesStore.isFavorite
const toggleFavorite = favoritesStore.toggleFavorite
const drinks = drinksStore.topDrinks


const dialogOpen = ref(false)
const selected = ref(null)

function goToDrinks() {
  router.push('/drinks')
}

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
:deep(.v-carousel .v-btn .v-icon) {
  color: #C96B8A;
}

.slide-wrap {
  padding-top: 16px;       
}

.carousel-img :deep(.v-img__img) {
  padding-top: 16px;      
}

.dialog-img :deep(.v-img__img) {
  padding-top: 16px;      
}

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

.carousel-dots{
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot-btn :deep(.v-icon){
  color: rgba(201, 107, 138, 0.45);
}

.dot-btn.active :deep(.v-icon){
  color: #C96B8A;
}

.drink-card{
  position: relative;
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

.carousel-position {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
}

/* --- hierarchy improvements --- */

.drink-title-row{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 2px;
}

/* make name the strongest */
.drink-name{
  font-size: 1.35rem;      /* bigger than before */
  font-weight: 800;
  line-height: 1.15;
  color: rgba(0,0,0,0.88);
}

/* price now sits beside name and stands out */
.drink-price{
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(0,0,0,0.78);
  white-space: nowrap;
}

/* description is clearly secondary */
.drink-desc{
  margin-top: 2px;
  font-size: 0.98rem;
  color: rgba(0,0,0,0.62);
}

/* details grouped visually */
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

.dialog-x{
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  color: #C96B8A;
}

.view-all-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 300px;
}

.view-all-hint{
  color: rgba(0,0,0,0.62);
  font-weight: 600;
}

.view-all-btn{
  letter-spacing: 0.2px;
  box-shadow: 0 8px 18px rgba(201, 107, 138, 0.25);
}
</style>