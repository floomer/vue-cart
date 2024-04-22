<template>
  <div class="product">
    <div class="product__header">
      <span class="product__header-header">{{ product[0] }}</span>
    </div>
    <div class="product__body">
      <div class="product__body-product" v-for="item in product[1]" :key="item">
        <span class="product__name" @click="handleAddToCart(item)">
          {{ item.name }}
          <span>({{ item.amount }})</span>
        </span>
        <span>{{ (item.cost * store.exchangeRate).toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '../store/Store';
import type { Product } from '../types/Product';

const { product } = defineProps<{ product: Product }>();

const store = useCartStore()

function handleAddToCart(product: Product) {
  const item = store.cart.find((item) => item.id === product.id);
  if (!item) {
    store.addToCart(product)
  }
}
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.product__header {
  background-color: #08376b;
  font-weight: 600;
  padding: 5px;
}

.product__body {
  display: flex;
  background-color: white;
  color: black;
  border: 1px solid gray;

  flex-wrap: wrap;
}

.product__body-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid gray;
  width: -webkit-fill-available;
}

.product__body-product:hover {
  background-color: lightgray;
}

.product__name {
  width: 300px;
  cursor: pointer;
}
</style>
