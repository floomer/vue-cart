<template>
  <table class="cart__table">
    <tr>
      <th>Наименование товара</th>
      <th>Количество</th>
      <th>Стоимость</th>
    </tr>
    <tr v-for="product in cart" :key="product.id">
      <td>{{ product.product.name }}</td>
      <td>
        <input
          type="number"
          class="cart__table-amount"
          :value="product.amount"
          @blur="onBlur(product, $event)"
        />
        <span>шт.</span>
      </td>
      <td>
        {{ Math.round(product.product.cost * exchange * product.amount) }}/шт.
      </td>
      <button
        class="cart__table-delete"
        @click="$emit('delete-from-cart', product.product)"
      >
        x
      </button>
    </tr>
  </table>
</template>
<script setup>
const props = defineProps({
  cart: Array,
  exchange: String | Number,
  result: Number,
});
const emit = defineEmits(["delete-from-cart", "update:result"]);

const onBlur = (product, e) => {
  props.cart.forEach((item) => {
    if (item.product.id === product.product.id) {
      item.amount = e.target.value;
      emit("update:result", item.amount * item.product.cost);
    }
  });
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
