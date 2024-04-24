<template>
    <div class="desk">
        <div class="desk__product" v-for="product in products" :key="product.id">
            <ProductCard :product="product" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';
import { Product } from '../types/Product';
import { Data, GoodsPropertyMap, MappedGoods } from '../types/Data';
import { Names } from '../types/Names';

const products = ref<Map<string, Product[]>>(new Map());

async function getData(): Promise<Data> {
    return await fetch('./src/data.json').then((res) => res.json());
}

async function getNames(): Promise<Names> {
    return await fetch('./src/names.json').then((res) => res.json());
}

function parseData(data: Data): MappedGoods[] {
    return data.Value.Goods.map((goodsItem) => ({
        id: goodsItem[GoodsPropertyMap.id],
        group: goodsItem[GoodsPropertyMap.group],
        cost: goodsItem[GoodsPropertyMap.cost],
        amount: goodsItem[GoodsPropertyMap.amount],
    }));
}

function setProducts(mappedData: MappedGoods[], names: Names): void {


    products.value = new Map();
    mappedData.forEach((product) => {
        if (!(product.id in names[product.group].B)) {
            return null;
        }
        if (!products.value.has(names[product.group].G)) {
            products.value.set(names[product.group].G, []);
        }
        products.value.get(names[product.group].G)?.push({
            id: product.id,
            name: names[product.group].B[product.id].N,
            cost: product.cost,
            amount: product.amount,
        });
    });
}
async function getProducts(): Promise<void> {
  // все это сделай в папке типо api
  //  parseData  вынеси в отдельную папку типо utils
    const names = await getNames();
    const data = await getData();
    const mappedData = parseData(data);
    return setProducts(mappedData, names);
}
getProducts();

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