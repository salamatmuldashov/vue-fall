<template>
  <Datetime :date="'29.09.2024'" />
  <div class="table-header">
    <Topic :name="selectedTopic" />
    <Sort :switch="ratingOrder" @sortRating="sortRating" @sortDate="sortDate" />
    <Arrow
      :current-page="currentPage"
      :total-pages="findTotalPages"
      @next-page="updatePage"
    />
  </div>

  <div class="grid">
    <PersonCard
      v-for="person in paginatedPeople"
      :key="person.id"
      :id="person.id"
      :name="person.name"
      :rating="person.rating"
      :date="person.date"
      :comment="person.comment"
      :avatar="person.avatar"
      @update-rating="updateRating(person.id)"
      
    />
  </div>
</template>

<script setup>
import _ from "lodash";

const currentPage = ref(1);
const ratingOrder = ref(null);
const dateOrder = ref(null);

const props = defineProps({
  selectedTopic: String,
});

const people = useState("people");

const filteredPeople = computed(() => {
  return people.value.filter((person) => person.topic === props.selectedTopic);
});

const sortedByRating = computed(() => {
  return _.orderBy(
    filteredPeople.value,
    ["rating"],
    [ratingOrder.value ? "asc" : "desc"]
  );
});

const sortedByDate = computed(() => {
  return _.orderBy(filteredPeople.value, (person) => new Date(person.date), [
    dateOrder.value ? "asc" : "desc",
  ]);
});

const paginatedPeople = computed(() => {
  const start = (currentPage.value - 1) * 4;
  if (ratingOrder.value !== null) {
    return sortedByRating.value.slice(start, start + 4);
  } else if (dateOrder.value != null) {
    return sortedByDate.value.slice(start, start + 4);
  }
  return filteredPeople.value.slice(start, start + 4);
});

const updatePage = (newPage) => {
  currentPage.value = newPage;
};

const sortRating = () => {
  ratingOrder.value = !ratingOrder.value;
  dateOrder.value = null;
  currentPage.value = 1;
};

const sortDate = () => {
  dateOrder.value = !dateOrder.value;
  ratingOrder.value = null;
  currentPage.value = 1;
};

const findTotalPages = computed(() => {
  return Math.ceil(filteredPeople.value.length / 4);
});

const updateRating = (id) => {
  const person = people.value.find((person) => person.id === id);
  if (person) {
    person.rating = Math.min(5, Math.round((person.rating + 0.1) * 10) / 10);
  }
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 5rem;
}
</style>
