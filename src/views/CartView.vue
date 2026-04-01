<template>
  <v-container class="py-6">
    <div class="section-title">
      <span class="title-text">Cart</span>
    </div>

    <!-- Empty cart -->
    <v-card
      v-if="cart.list.length === 0"
      class="empty-card mx-auto mt-6"
      max-width="720"
      rounded="xl"
      elevation="2"
    >
      <v-card-title class="empty-title">
        Your cart is empty
      </v-card-title>

      <v-card-text class="empty-text">
        Looks like you have not added any drinks yet. Browse the menu to find your next favorite boba.
      </v-card-text>

      <v-card-actions class="empty-actions">
        <v-btn
          color="#C96B8A"
          variant="flat"
          rounded="lg"
          prepend-icon="mdi-cup"
          class="browse-btn"
          @click="go('/drinks')"
        >
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
            class="cart-item mb-4"
            rounded="xl"
            elevation="3"
          >
            <div class="cart-row">
              <v-img
                :src="item.image"
                class="cart-img"
                height="116"
                width="116"
                contain
              />

              <div class="cart-info">
                <div class="cart-title-row">
                  <div class="cart-name-block">
                    <div class="cart-name">{{ item.name }}</div>
                    <div class="cart-unit-price">
                      ${{ item.price.toFixed(2) }} each
                    </div>
                  </div>

                  <div class="cart-price-block">
                    <div class="cart-line-total">
                      ${{ (item.price * item.qty).toFixed(2) }}
                    </div>
                    <div class="cart-line-label">Item total</div>
                  </div>
                </div>

                <div class="cart-actions">
                  <div class="qty-section">
                    <span class="qty-label">Quantity</span>

                    <div class="qty-controls">
                      <v-btn
                        icon
                        size="small"
                        variant="outlined"
                        class="qty-btn"
                        :aria-label="`Decrease quantity for ${item.name}`"
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
                        variant="outlined"
                        class="qty-btn"
                        :aria-label="`Increase quantity for ${item.name}`"
                        @click="cart.add(item, 1)"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>

                  <v-btn
                    variant="text"
                    rounded="lg"
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
            <v-card-title class="summary-title">
              Order Summary
            </v-card-title>

            <v-card-text class="summary-body">
              <div class="summary-row">
                <span>Items</span>
                <strong>{{ cart.itemCount }}</strong>
              </div>

              <div class="summary-row">
                <span>Subtotal</span>
                <strong>${{ cart.subtotal.toFixed(2) }}</strong>
              </div>

              <v-divider class="my-4" />

              <div class="summary-total-row">
                <span>Estimated total</span>
                <strong>${{ cart.subtotal.toFixed(2) }}</strong>
              </div>

              <div class="summary-note">
                Taxes and fees are calculated at checkout.
              </div>
            </v-card-text>

            <v-card-actions class="summary-actions">
              <v-btn
                color="#C96B8A"
                variant="flat"
                rounded="lg"
                size="large"
                block
                prepend-icon="mdi-credit-card-outline"
                class="checkout-btn"
                @click="checkout"
              >
                Proceed to Checkout
              </v-btn>

              <v-btn
                variant="tonal"
                rounded="lg"
                block
                class="continue-btn"
                prepend-icon="mdi-arrow-left"
                @click="go('/drinks')"
              >
                Continue Shopping
              </v-btn>

              <v-btn
                variant="text"
                rounded="lg"
                block
                class="clear-btn"
                prepend-icon="mdi-broom"
                @click="confirmClearOpen = true"
              >
                Clear Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Clear cart confirmation -->
    <v-dialog v-model="confirmClearOpen" max-width="420">
      <v-card rounded="xl">
        <v-card-title class="text-h6 font-weight-bold">
          Clear your cart?
        </v-card-title>

        <v-card-text>
          This will remove all drinks from your cart.
        </v-card-text>

        <v-card-actions class="justify-end pa-4">
          <v-btn
            variant="text"
            rounded="lg"
            @click="confirmClearOpen = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="#C96B8A"
            variant="flat"
            rounded="lg"
            @click="clearCartConfirmed"
          >
            Clear Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cart = useCartStore()

const confirmClearOpen = ref(false)

function go(path) {
  router.push(path)
}

function checkout() {
  // placeholder for now
  console.log('Checkout clicked:', cart.list)
}

function clearCartConfirmed() {
  cart.clear()
  confirmClearOpen.value = false
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

/* empty state */
.empty-card {
  padding: 8px;
}

.empty-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
}

.empty-text {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.65);
  padding-top: 8px;
}

.empty-actions {
  justify-content: flex-end;
  padding: 0 16px 16px;
}

.browse-btn {
  letter-spacing: 0.2px;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(201, 107, 138, 0.22);
}

/* cart items */
.cart-item {
  padding: 14px;
}

.cart-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cart-img {
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
}

.cart-info {
  flex: 1;
  min-width: 0;
}

.cart-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.cart-name-block {
  min-width: 0;
}

.cart-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.2;
}

.cart-unit-price {
  margin-top: 4px;
  font-size: 0.92rem;
  color: rgba(0, 0, 0, 0.55);
}

.cart-price-block {
  text-align: right;
  white-space: nowrap;
}

.cart-line-total {
  font-size: 1.12rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.82);
}

.cart-line-label {
  margin-top: 2px;
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.5);
}

.cart-actions {
  margin-top: 14px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.qty-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qty-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.58);
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  border-color: rgba(201, 107, 138, 0.35);
}

.qty-btn :deep(.v-icon) {
  color: #C96B8A;
}

.qty-pill {
  min-width: 42px;
  text-align: center;
  font-weight: 800;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(201, 107, 138, 0.12);
  color: rgba(0, 0, 0, 0.78);
}

.remove-btn {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
}

/* summary */
.summary-card {
  position: sticky;
  top: 90px;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.88);
}

.summary-body {
  padding-top: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.75);
}

.summary-total-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.02rem;
  color: rgba(0, 0, 0, 0.82);
}

.summary-note {
  margin-top: 12px;
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

.continue-btn {
  font-weight: 700;
}

.clear-btn {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
}

/* responsive */
@media (max-width: 700px) {
  .cart-row {
    align-items: flex-start;
  }

  .cart-title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-price-block {
    text-align: left;
  }

  .cart-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>