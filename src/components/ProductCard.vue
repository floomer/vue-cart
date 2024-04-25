<template>
  <div class="product">
    <div class="product__header">
      <span class="product__header-header">{{ productGroupName }}</span>
    </div>
    <div class="product__body">
      <div class="product__body-product" v-for="product in productGroupItems" :key="product.id">
        <span class="product__name" @click="handleAddToCart(product)">
          {{ product.name }}
          <span>({{ product.amount }})</span>
        </span>
        <span>{{ totalCost(product) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCartStore } from '../store/Store';
import type { Product } from '../types/Product';

const { productGroupItems, productGroupName } = defineProps<{ productGroupItems: Product[], productGroupName: String }>();
const store = useCartStore();
const totalCost = computed(() => (item: Product) => (item.cost * store.exchangeRate).toFixed(1));

function handleAddToCart(product: Product) {
  store.addToCart(product);
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
