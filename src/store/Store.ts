import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Cart } from '../types/Cart';
import { Product } from '../types/Product';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>([]);
  const resultCost = ref<number>(0);
  const exchangeRate = ref<number>(100);

  function updateResultCost() {
    resultCost.value = cart.value.reduce((sum, product) => sum + product.cost * product.amount * exchangeRate.value, 0);
  }

  watch(
    [cart, exchangeRate],
    () => {
      updateResultCost();
    },
    { deep: true },
  );

  function addToCart(product: Product) {
    cart.value.push({ ...product, amount: 1 });
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

  return { cart, resultCost, exchangeRate, addToCart, deleteFromCart, updateItemAmount, updateExchangeRate };
});
