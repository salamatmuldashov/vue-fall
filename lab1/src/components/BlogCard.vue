<!-- eslint-disable no-undef -->
<!-- eslint-disable no-unused-vars -->
<script setup>
const props = defineProps({
  image: String,
  third: Boolean,
});
</script>

<template>
  <a href="#">
    <div class="blog-card" :style="{ backgroundImage: `url(${image})` }">
      <div v-if="third" class="middle">
        <div class="travel">Travel</div>
        <div class="food">Food</div>
      </div>
      <h3 class="blog-card-title">
        The AI removes objects magically moving from video
      </h3>
      <p class="blog-card-date">July 19, 2019</p>
    </div>
  </a>
</template>

<style>
.blog-card {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.blog-card-title {
  color: #fff;
  font-size: large;
  position: relative;
  padding: 10px;
  padding-left: 15px;
}

.blog-card-date {
  color: #fff;
  opacity: 0.5;
  padding-left: 15px;
  padding-bottom: 10px;
}

.middle {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  padding-left: 15px;
  padding-bottom: 20px;
  font-size: small;
  letter-spacing: 2px;
}
.travel {
  background-color: red;
  padding: 5px 20px;
}
.food {
  background-color: cadetblue;
  padding: 5px 20px;
}
a {
  text-decoration: none;
}
</style>
