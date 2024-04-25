<template>
  <table class="cart__table">
    <tr>
      <th>Наименование товара</th>
      <th>Количество</th>
      <th>Стоимость</th>
    </tr>
    <tr v-for="product in cart" :key="product.id">
      <CartItem :product="product" />
    </tr>
  </table>
</template>
<script lang="ts" setup>
import { useCartStore } from '../store/Store';
import CartItem from './CartItem.vue';
const {cart} = useCartStore()

</script>
<style scoped>
.cart__table {
  padding: 5px;
}
</style>
