<template>
  <div class="product">
    <div class="product__header">
      <span class="product__header-header">{{ product[0] }}</span>
    </div>
    <div class="product__body">
      <div class="product__body-product" v-for="item in product[1]" :key="item">
        <span class="product__name" @click="$emit('add-to-cart', item)"
          >{{ item.name }}({{ item.amount }})</span
        >
        <h5>{{ Math.round(item.cost * exchange) }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
  exchange: String | Number,
});

const emit = defineEmits(["add-to-cart"]);
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.product__header {
  background-color: #08376b;
  font-weight: 600;
  padding: 5px;
}
.product__body {
  display: flex;
  background-color: white;
  color: black;
  border: 1px solid gray;

  flex-wrap: wrap;
}
.product__body-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid gray;
  width: -webkit-fill-available;
}
.product__name {
  width: 300px;
  cursor: pointer;
}
</style>
