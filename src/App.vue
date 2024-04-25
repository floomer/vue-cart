<template>

  <Header />
  <Suspense>
    <Desk />
  </Suspense>

</template>

<script setup>
import Desk from './components/Desk.vue';
import Header from './components/Header.vue';
</script>

<style scoped></style>
