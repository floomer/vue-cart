<template>
    <div class="desk">
        <div class="desk__product" v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import data from "../data.json"
import names from "../names.json";
import { onMounted, ref, watch } from "vue";

import ProductCard from "./ProductCard.vue";

import { Product } from "../types/Product";
import { Goods, Data, ReadableGoods } from "../types/Data";

const products = ref<Map<string, Product[]>>(new Map());

// async function getData():Promise<Data> {
//     const response =  await fetch ('./src/data.json')
//     return (await response.json() as Data)

// }

async function getParsedData() {
    data.Value.Goods.map((product: Goods) => {
        if (!(product.T in names[product.G].B)) {
            return null;
        }

        if (!products.value.has(names[product.G].G)) {
            products.value.set(names[product.G].G, []);
        }
        products.value.get(names[product.G].G)?.push({
            id: product.T,
            name: names[product.G].B[product.T].N,
            cost: product.C,
            amount: product.P,
        })
    });
}

watch(products, () => {
    getParsedData()
    // console.log(products)
}, { immediate: true })


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