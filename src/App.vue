<template>
  <div>
    <div class="header">
      <div class="header__logo">
        <h2>zzz</h2>
        <h2 class="header__logo-products">Products</h2>
      </div>
      <div>
        <label for="exchange">Exchange Rate</label>
        <input
          type="number"
          id="exchange"
          placeholder="USD to RUB "
          :value="exchangeRate"
          @blur="(e) => (exchangeRate = e.target.value)"
        />
      </div>
      <button class="header__button" @click="isShown = !isShown">
        <img src="./assets/cart.svg" alt="cart" class="header__cart-icon" />
      </button>
      <div class="header__cart" v-if="isShown">
        <Cart
          :cart="cart"
          @delete-from-cart="handleDeleteProduct"
          :exchange="exchangeRate"
          v-model="resultCost"
        />
        <span class="header__cart-result"
          >Итоговая стоимость: {{ Math.round(resultCost * exchangeRate) }}
        </span>
      </div>
    </div>
    <div class="container">
      <div
        class="container__product"
        v-for="product in products"
        :key="product[1].id"
      >
        <ProductCard
          :product="product"
          @add-to-cart="handleAddToCart"
          :exchange="exchangeRate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import data from "./data.json";
import names from "./names.json";
import ProductCard from "./components/ProductCard.vue";
import Cart from "./components/Cart.vue";

const exchangeRate = ref(100);
const products = new Map();
const dataRef = ref(data);
const isShown = ref(false);
const cart = ref([]);
const resultCost = defineModel({ default: 0 });

dataRef.value.Value.Goods.map((product) => {
  if (!product.T in names[product.G].B) {
    return null;
  }

  if (!products.has(names[product.G].G)) {
    products.set(names[product.G].G, []);
  }

  products.get(names[product.G].G).push({
    id: product.T,
    name: names[product.G].B[product.T].N,
    cost: product.C,
    amount: product.P,
  });
});

const handleAddToCart = (product) => {
  const item = cart.value.find((item) => item.product.id === product.id);
  if (!item) {
    cart.value.push({ product, amount: 1 });
    resultCost.value = resultCost.value + product.cost;
  }
};

const handleDeleteProduct = (product) => {
  resultCost.value = Math.round(resultCost.value - product.cost);
  cart.value = cart.value.filter((prod) => prod.product.id !== product.id);
};
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

.container {
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
  max-width: min-content;
  max-height: 100vh;
}
.container__product {
  padding: 10px;
}
@media screen and (max-width: 1070px) {
  .container {
    max-width: min-content;
    margin: 0 auto;
  }
}
</style>
