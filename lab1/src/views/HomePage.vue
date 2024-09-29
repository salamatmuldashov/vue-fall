<script setup>
import BlogCard from "../components/BlogCard.vue";
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="blog-cards">
        <div class="left-column">
          <BlogCard
            image="https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <BlogCard
            image="https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        <BlogCard
          image="https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          third="true"
        />

        <div class="right-column">
          <BlogCard
            image="https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <BlogCard
            image="https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home {
  background-color: rgba(248, 249, 250, 1);
  padding: 4rem 0;
}
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 600px;
}
.blog-cards {
  display: flex;
  gap: 20px;
  height: 100%;
}

.left-column {
  display: grid;
  gap: 20px;
}

.right-column {
  display: grid;
  gap: 20px;
}
</style>
