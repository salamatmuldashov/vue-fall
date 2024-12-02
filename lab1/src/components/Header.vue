<!-- eslint-disable -->
<script setup></script>

<template>
  <div class="header">
    <div class="header-logo">
      <a href="#">
        <img class="header-logo-image" src="../assets/logo.png" alt="image" />
      </a>
    </div>
    <div class="header-nav">
      <a href="#">Home</a>
      <a href="#">Politics</a>
      <a href="#">Tech</a>
      <a href="#">Entertainment</a>
      <a href="#">Travel</a>
      <a href="#">Sports</a>

      <a href="#">
        <img
          class="header-nav-search"
          src="../assets/search.svg"
          alt="search"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: beige;
}

.header-logo {
  width: 50px;
  height: 50px;
}

.header-logo-image {
  width: 100%;
  height: 100%;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

a {
  text-decoration: none;
  color: black;
}

.header-nav-search {
  width: 15px;
  height: 15px;
  margin-right: 1rem;
}
</style>
