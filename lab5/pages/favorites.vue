<template>
  <Header @chooseTopic="chooseTopic" />
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
const initialPeople = useState("people");
const people = ref(null);
const favUsers = ref(null);
const { chooseTopic } = useTopic();

const fetchFavoriteUsers = () => {
  favUsers.value = people.value.filter((person) =>
    currentUser.value.favorites.includes(person.id)
  );
};

onMounted(() => {
  if (!JSON.parse(localStorage.getItem("people"))) {
    people.value = initialPeople.value;
  } else {
    people.value = JSON.parse(localStorage.getItem("people"));
  }
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
  padding-left: 2rem;
  padding-right: 2rem;
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


@media (max-width: 768px) {
  .fav-page {
    padding: 1rem;
    background: linear-gradient(89.91deg, #dfe267 0.08%, #cbee83 99.92%);
  }
  .fav-page-title {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    opacity: 0.6;
  }
  .fav-page-body {

    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    margin-top: 3rem;
  }
}

@media (max-width: 480px) {
  .fav-page {
    height: 100%;
    padding-bottom: 4rem;
  }
}
</style>
