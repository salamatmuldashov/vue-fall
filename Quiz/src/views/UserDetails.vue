<template>
  <h1>User Details</h1>
  <div v-if="user">
    {{ user.name }}
    {{ user.email }}
    {{ user.phone }}
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const user = ref(null);
const route = useRoute();

onBeforeMount(() => {
  fetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((data) => {
      user.value = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
</script>

<style scoped>
/* Add styles specific to the UserDetails component */
</style>
