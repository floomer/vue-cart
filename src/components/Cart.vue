<template>
  <table class="cart__table">
    <tr>
      <th>Наименование товара</th>
      <th>Количество</th>
      <th>Стоимость</th>
    </tr>
    <tr v-for="product in cart" :key="product.id">
      <td>{{ product.name }}</td>
      <td>
        <input type="number" class="cart__table-amount" value="1" @blur="onBlur(product, $event)" />
        <span>шт.</span>
      </td>
      <td>
        {{ Math.round(product.cost) }}/шт.
      </td>
      <button class="cart__table-delete" @click="$emit('delete-from-cart', product)">
        x
      </button>
    </tr>
  </table>
</template>
<script lang="ts" setup>
import { useCartStore } from '../store/Store';
const store = useCartStore()
const cart = store.cart
// console.log(store.cart)

const onBlur = (product, event) => {
  console.log(product)
};

</script>
<style scoped>
.cart__table {
  padding: 5px;
}

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
