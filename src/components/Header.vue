<template>
  <div class="header">
    <div class="header__logo">
      <h2>1x</h2>
      <h2 class="header__logo-products">Products</h2>
    </div>
    <div>
      <label for="exchange">Exchange Rate </label>
      <input type="number" id="exchange" placeholder="USD to RUB " @blur="updateExchangeRate($event.target.value)"
        :value="exchangeRate" />
      <!-- TODO  зачем onblur? exchangeRate поставь на watch и меняй c debounce -->
    </div>
    <button class="header__button" @click="isShown = !isShown">
    <!-- isShown   в отдельный метод-->
      <img src="../assets/cart.svg" alt="cart" class="header__cart-icon" />
    </button>
    <div class="header__cart" v-if="isShown">
      <Cart />
      <span class="header__cart-result">Итоговая стоимость: {{ resultCost }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" >

import { ref } from "vue";
import Cart from "./Cart.vue";
import { useCartStore } from "../store/Store";
export default  {
  components:{
    Cart,
  },
  setup() {
  // везде сделай таким setup

    const {
      resultCost,
      updateExchangeRate,
      exchangeRate,
    } = useCartStore()

    const count = ref(0)
    const isShown = ref(false);

    return {
      isShown,
      resultCost,
      updateExchangeRate,
      exchangeRate,
      count,
    }
  }
}

</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  background-color: #08376b;
  height: 60px;
  width: 100%;
  justify-content: space-between;
}

.header__logo {
  display: inline-flex;
  padding: 10px;
}

.header__button {
  cursor: pointer;
  margin-right: 30px;
  padding: 0;
  background-color: white;
  border-radius: 10px;
  outline: none;
  border: 1px solid transparent;
  padding: 1px;
  order: 3;
}

.header__cart {
  top: 90px;
  right: 40px;
  position: absolute;
  display: block;
  background-color: white;
  color: black;
}

.header__cart-result {
  padding: 5px;
  font-weight: 600;
}

.header__cart-icon {
  color: white;
  background-color: transparent;
}

.header__logo-products {
  color: #25a0ff;
}
</style>