<template>
<v-app-bar color="#C96B8A" elevation="2">
  <!-- Hamburger + Menu label (clear mapping) -->
  <v-tooltip text="Menu" location="bottom">
    <template #activator="{ props }">
      <div class="menu-wrap" v-bind="props">
        <v-app-bar-nav-icon class="text-white" @click="drawer = !drawer" />
      </div>
    </template>
  </v-tooltip>

  <v-app-bar-title class="app-title" style="color: #ffffff">
    B O B A
  </v-app-bar-title>

  <!-- Visible tabs (clear mapping to screens) -->
  <v-tabs
    v-model="tab"
    class="header-tabs"
    align-tabs="end"
    color="white"
    density="compact"
  >
    <v-tab value="cart" @click="go('/')" prepend-icon="mdi-home">
      Home
    </v-tab>

    <v-tab value="drinks" @click="go('/drinks')" prepend-icon="mdi-cup">
      All Drinks
    </v-tab>

    <v-tab value="favorites" @click="go('/favorites')" prepend-icon="mdi-heart">
      Favorites
    </v-tab>
  </v-tabs>
  <v-spacer></v-spacer>
  <!-- Cart icon (far right) -->
  <v-tooltip text="Cart" location="bottom">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="cart-btn"
        icon
        variant="text"
        @click="go('/cart')"
        aria-label="Go to cart"
      >
        <v-badge
          :content="cart.itemCount"
          :model-value="cart.itemCount > 0"
          color="white"
          text-color="#C96B8A"
          offset-x="-3"
          offset-y="-4"
        >
          <v-icon class="text-white" icon="mdi-cart-outline" />
        </v-badge>
      </v-btn>
    </template>
  </v-tooltip>
</v-app-bar>

  <!--Nav drawer-->
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    color="#C96B8A"
    :width="180"
  >
    <v-list nav density="compact">
      <v-list-item
        title="Home"
        prepend-icon="mdi-home"
        class="drawer-item text-white"
        @click="goHome"
      />      
      <v-list-item
        title="All Drinks"
        prepend-icon="mdi-cup"
        class="drawer-item text-white"
        @click="go('/drinks')"
      />
      <v-list-item
        title="Favorites"
        prepend-icon="mdi-heart"
        class="drawer-item text-white"
        @click="go('/favorites')"
      />
      <v-list-item
        title="Cart"
        prepend-icon="mdi-cart"
        class="drawer-item text-white"
        @click="go('/cart')"
      />

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
const cart = useCartStore()

const drawer = ref(false)
const tab = ref('home')

const router = useRouter()
const route = useRoute()

function go(path) {
  drawer.value = false
  router.push(path)
}

function goHome() {
  go('/')
}

/* keep the selected tab in sync with the current route */
watch(
  () => route.path,
  (p) => {
    if (p.startsWith('/drinks')) tab.value = 'drinks'
    else if (p.startsWith('/favorites')) tab.value = 'favorites'
    else tab.value = 'home'
  },
  { immediate: true }
)
</script>

<style scoped>

.drawer-item:hover {
  background-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.20);
}

.drawer-item:hover :deep(.v-icon),
.drawer-item:hover :deep(.v-list-item-title) {
  opacity: 1;
  font-weight: 700;
}

.app-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  font-size: 30px;
}
</style>