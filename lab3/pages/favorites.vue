<template>
  <Header />
  <div class="fav-page">
    <div class="fav-page-title">Your Favorite Persons</div>
    <div class="fav-page-body">
      <PersonCard
        v-for="user in favUsers"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :rating="user.rating"
        :date="user.date"
        :comment="user.comment"
        :avatar="user.avatar"
        @update-rating="updateRating(user.id)"
      />
      
    </div>
  </div>
</template>

<script setup>
const currentUser = useState("currentUser");
const people = useState("people");
const favUsers = ref(null);

const fetchFavoriteUsers = () => {
  favUsers.value = people.value.filter((person) =>
    currentUser.value.favorites.includes(person.id)
  );
};

onMounted(() => {
  fetchFavoriteUsers();  
});

onBeforeMount(() => {
  if (!localStorage.getItem("currentUser")) {
    navigateTo("/");
    return;
  }
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
});

const updateRating = (id) => {
  const person = people.value.find((person) => person.id === id);
  if (person) {
    person.rating = Math.min(5, Math.round((person.rating + 0.1) * 10) / 10);
  }
};

</script>

<style scoped>
.fav-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding-top: 3.5rem;
}
.fav-page-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: 600;
  color: black;
}
.fav-page-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 5rem;
}
</style>
