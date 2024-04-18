import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Cart } from '../types/Cart'

export const useCartStore = defineStore('cart', () => {
    const cart = ref<Cart[]>([])

    function addToCart(product) {
        console.log(product)
        cart.value.push(product)
    }

    return { cart, addToCart }
})