<template>
  <v-container class="py-6">
    <div class="section-title">
      <span class="title-text">Cart</span>
    </div>

    <!-- Empty cart -->
    <v-card
      v-if="cart.list.length === 0"
      class="empty-card mx-auto mt-6"
      max-width="700"
      rounded="xl"
      elevation="2"
    >
      <v-card-title class="text-h6 font-weight-bold">
        Your cart is empty
      </v-card-title>
      <v-card-text class="text-body-2">
        Add a drink to your cart to see it here.
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="#C96B8A" variant="flat" rounded="lg" @click="go('/drinks')">
          Browse drinks
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Cart items -->
    <div v-else class="mt-5">
      <v-row dense>
        <v-col cols="12" md="8">
          <v-card
            v-for="item in cart.list"
            :key="item.id"
            class="cart-item mb-3"
            rounded="xl"
            elevation="3"
          >
            <div class="cart-row">
              <v-img
                :src="item.image"
                class="cart-img"
                height="110"
                width="110"
                contain
              />

              <div class="cart-info">
                <div class="cart-title-row">
                  <div class="cart-name">{{ item.name }}</div>
                  <div class="cart-price">${{ item.price.toFixed(2) }}</div>
                </div>

                <div class="cart-actions">
                  <div class="qty-controls">
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      class="qty-btn"
                      :aria-label="`Decrease ${item.name}`"
                      @click="cart.decrement(item.id, 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>

                    <div class="qty-pill" aria-label="Quantity">
                      {{ item.qty }}
                    </div>

                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      class="qty-btn"
                      :aria-label="`Increase ${item.name}`"
                      @click="cart.add(item, 1)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>

                  <v-btn
                    variant="text"
                    class="remove-btn"
                    prepend-icon="mdi-delete-outline"
                    @click="cart.remove(item.id)"
                  >
                    Remove
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Summary -->
        <v-col cols="12" md="4">
          <v-card class="summary-card" rounded="xl" elevation="3">
            <v-card-title class="text-h6 font-weight-bold">
              Order Summary
            </v-card-title>

            <v-card-text>
              <div class="summary-row">
                <span>Items</span>
                <strong>{{ cart.itemCount }}</strong>
              </div>

              <div class="summary-row">
                <span>Subtotal</span>
                <strong>${{ cart.subtotal.toFixed(2) }}</strong>
              </div>

              <div class="summary-note">
                Taxes and fees calculated at checkout.
              </div>
            </v-card-text>

            <v-card-actions class="summary-actions">
              <v-btn
                color="#C96B8A"
                variant="flat"
                rounded="lg"
                size="large"
                prepend-icon="mdi-credit-card-outline"
                class="checkout-btn"
                @click="checkout"
              >
                Checkout
              </v-btn>

              <v-btn
                variant="text"
                rounded="lg"
                class="clear-btn"
                prepend-icon="mdi-broom"
                @click="cart.clear()"
              >
                Clear cart
              </v-btn>

              <v-btn
                variant="text"
                rounded="lg"
                class="continue-btn"
                prepend-icon="mdi-arrow-left"
                @click="go('/drinks')"
              >
                Continue shopping
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cart = useCartStore()

function go(path) {
  router.push(path)
}

function checkout() {
  // placeholder for now
  console.log('Checkout clicked:', cart.list)
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
  border-bottom: 3px solid #C96B8A;
}

.cart-item {
  padding: 12px;
}

.cart-row {
  display: flex;
  gap: 14px;
  align-items: center;
}

.cart-img {
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.03);
}

.cart-info {
  flex: 1;
  min-width: 0;
}

.cart-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}

.cart-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.75);
  white-space: nowrap;
}

.cart-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn :deep(.v-icon) {
  color: #C96B8A;
}

.qty-pill {
  min-width: 40px;
  text-align: center;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(201, 107, 138, 0.12);
  color: rgba(0, 0, 0, 0.75);
}

.remove-btn {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
}

.summary-card {
  position: sticky;
  top: 90px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.75);
}

.summary-note {
  margin-top: 8px;
  font-size: 0.92rem;
  color: rgba(0, 0, 0, 0.55);
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  align-items: stretch;
}

.checkout-btn {
  letter-spacing: 0.2px;
  box-shadow: 0 8px 18px rgba(201, 107, 138, 0.25);
}

.clear-btn,
.continue-btn {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.65);
}

/* Empty state */
.empty-card :deep(.v-card-title) {
  padding-bottom: 0;
}
</style>