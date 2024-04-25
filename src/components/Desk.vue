<template>
    <div class="desk">
        <div class="desk__product" v-for="[productGroup, productGroupItems] in products" :key="productGroup">
            <ProductCard :productGroupItems="productGroupItems" :productGroupName="productGroup" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getProducts } from '../api/getProducts';
import ProductCard from './ProductCard.vue';

const products = await getProducts()

setInterval(() => {
    getProducts();
}, 15000);
</script>

<style scoped>
.desk {
    display: flex;
    flex-flow: column wrap;
    padding: 20px;
    max-width: min-content;
    max-height: 100vh;
    gap: 20px;
}
</style>