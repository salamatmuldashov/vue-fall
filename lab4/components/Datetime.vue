<!-- eslint-disable no-undef -->
<script setup>
defineProps({
  date: String,
});
</script>

<template>
  <div class="date">
    {{ date }}
  </div>
</template>

<style scoped>
.date {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5bb9cd;
  color: #fff;
  opacity: 0.9;
  width: 250px;
  height: 40px;
  border-radius: 7px;
  font-size: 36px;
  font-family: "Inknut Antiqua";
  font-style: normal;
  font-weight: 400;
  line-height: 93px;
  margin-bottom: 2.5rem;
}
</style>
