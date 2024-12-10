<script setup>
// eslint-disable-next-line no-undef
defineProps({
  name: String,
});
</script>

<template>
  <div class="topic">
    <p class="topic-name">{{ name }}</p>
  </div>
</template>

<style scoped>
.topic {
  background-color: #5bb9cd;
  width: 350px;
  height: 50px;
  border-radius: 10px;
  padding-left: 1rem;
  display: flex;
  align-items: center;
}
.topic-name {
  color: #fff;
  font-family: "Jersey 15";
  font-size: 48px;
}

@media (max-width: 480px) {
  .topic{
    width: 250px;
    padding: 0;
    text-align: center;
  }
  .topic-name{
    font-size: 36px;
    margin: 0 auto;
  }

}


</style>
