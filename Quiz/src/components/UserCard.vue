<template>
  <div class="user-card">
    {{ name }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  id:Number,
  name: String
});

</script>

<style scoped>
.user-card {
  background-color: #5bb9cd;
  color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  flex: 0 1 calc(50% - 20px); /* Two cards per row */
}
</style>
