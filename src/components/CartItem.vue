<template>
    <td>{{ product.name }}</td>
    <td>
        <input type="number" class="cart__table-amount" :value="product.amount" @blur="onBlur(product, $event)" />
        <span>шт.</span>
    </td>
    <td>
        {{ productCost }}/шт.
    </td>
    <button class="cart__table-delete" @click="handleDeleteProduct(product)">
        x
    </button>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useCartStore } from '../store/Store';
import { Product } from '../types/Product';

const store = useCartStore()
const { product } = defineProps<{ product: Product }>();

const productCost = computed(() => (product.cost * store.exchangeRate).toFixed(1))

function onBlur(product: Product, event: Event) {
    store.updateItemAmount(product, (event.target as HTMLInputElement).value)
};

function handleDeleteProduct(product: Product) {
    store.deleteFromCart(product)
}

</script>

<style scoped>
.cart__table-delete {
    cursor: pointer;
    position: absolute;
    color: red;
    background-color: transparent;
    border: none;
    font-weight: 800;
    right: 1px;
    text-align: center;
}

.cart__table-amount {
    background-color: transparent;
    outline: none;
    border: 1px solid gray;
    max-width: 30px;
    padding: 2px;
    color: black;
}
</style>