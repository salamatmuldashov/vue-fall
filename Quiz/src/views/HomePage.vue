<template>
  <div>
    <h1>User List</h1>
    <div class="user-list">
      <RouterLink
        v-for="user in users"
        :key="user.id"
        :to="`/users/${user.id}`"
      >
        <UserCard :name = user.name :id="user.id"></UserCard>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserCard from "../components/UserCard.vue";

const users = ref();

onMounted(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await response.json();
});
</script>

<style scoped>
.user-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
