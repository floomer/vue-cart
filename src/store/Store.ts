import { defineStore } from 'pinia';
import {computed, ref, unref} from 'vue';
import { Cart } from '../types/Cart';
import { Product } from '../types/Product';

export const useCartStore = () => {

    const cart = ref<Cart>([]);
    const exchangeRate = ref<number>(100);
    const resultCost = computed(() => cart.value.reduce((sum, product) => sum + product.cost * product.amount * exchangeRate.value, 0).toFixed(1));
    const cartTotalItemsValue = computed(()=>{
        return unref(cart).length
    });


    function addToCart(product: Product) {

        const item = cart.value.find((item) => item.id === product.id);
        if (!item) {
            cart.value.push({ ...product, amount: 1 });
        } else {
            item.amount++
        }
    }
    function deleteFromCart(product: Product) {
        const productIndex = cart.value.findIndex((item) => item.id === product.id);
        cart.value.splice(productIndex, 1);
    }
    function updateItemAmount(product: Product, value: string) {
        if (value.match('^[0-9]+$')) {
            const index = cart.value.findIndex((item) => item.id === product.id);
            cart.value[index] = { ...product, amount: +value };
        }
    }
    function updateExchangeRate(value: string) {
        if (value.match('^[0-9]+$')) {
            exchangeRate.value = +value;
        }
    }

    return { cart, resultCost, exchangeRate, addToCart, deleteFromCart, updateItemAmount, updateExchangeRate,cartTotalItemsValue };
};
