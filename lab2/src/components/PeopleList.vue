<template>
  <DateTime :date="'29.09.2024'" />
  <div class="table-header">
    <TopicName :name="selectedTopic" />
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
import TopicName from "../components/TopicName.vue";
import DateTime from "../components/DateTime.vue";
import Sort from "@/components/Sort.vue";
import Arrow from "@/components/Arrow.vue";
import { ref, defineProps, computed } from "vue";
import PersonCard from "./PersonCard.vue";
import _ from "lodash";

const currentPage = ref(1);
const ratingOrder = ref(null);
const dateOrder = ref(null);

const props = defineProps({
  selectedTopic: String,
});

const people = ref([
  {
    id: 1,
    name: "Alice Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2024-09-29T14:20:00",
    rating: 0.7,
    comment: "This is awesome adventure that I had! Thanks!",
    topic: "Adventure",
  },
  {
    id: 2,
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-09-25T13:20:00",
    rating: 1.3,
    comment: "The place is very big. I lost the exit",
    topic: "Adventure",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2023-09-23T15:20:00",
    rating: 2,
    comment: "Something new for me. Drive and emotions only",
    topic: "Adventure",
  },
  {
    id: 4,
    name: "Diana Prince",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2024-09-17T16:20:00",
    rating: 2.5,
    comment: "Very helpful information.",
    topic: "Adventure",
  },
  {
    id: 5,
    name: "Edward Norton",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2024-09-06T18:20:00",
    rating: 3.0,
    comment: "I found it useful.",
    topic: "Adventure",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2024-09-06T15:10:00",
    rating: 0,
    comment: "Incredible!",
    topic: "Adventure",
  },
  {
    id: 7,
    name: "George Martin",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2024-09-07T09:00:00",
    rating: 4.1,
    comment: "Well explained.",
    topic: "Nature",
  },
  {
    id: 8,
    name: "Hannah Arendt",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2024-09-08T17:45:00",
    rating: 3.9,
    comment: "Thought-provoking.",
    topic: "Nature",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "2024-09-09T16:30:00",
    rating: 2.5,
    comment: "Could be better.",
    topic: "Nature",
  },
  {
    id: 10,
    name: "Jessica Jones",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2024-09-10T18:15:00",
    rating: 4.5,
    comment: "Highly recommended!",
    topic: "Adventure",
  },
  {
    id: 11,
    name: "Kevin Hart",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    date: "2024-09-11T20:00:00",
    rating: 4.6,
    comment: "Great humor!",
    topic: "Nature",
  },
  {
    id: 12,
    name: "Laura Croft",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    date: "2024-09-12T19:30:00",
    rating: 5,
    comment: "Interesting take.",
    topic: "Adventure",
  },
  {
    id: 13,
    name: "Michael Scott",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2024-09-13T21:00:00",
    rating: 3.8,
    comment: "Funny and insightful.",
    topic: "Nature",
  },
  {
    id: 14,
    name: "Natalie Portman",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    date: "2024-09-14T22:00:00",
    rating: 4.9,
    comment: "A must-read!",
    topic: "Fashion",
  },
  {
    id: 15,
    name: "Oscar Wilde",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    date: "2024-09-15T08:00:00",
    rating: 4.2,
    comment: "Remarkably written.",
    topic: "Fashion",
  },
  {
    id: 16,
    name: "Penny Lane",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "2024-09-16T09:30:00",
    rating: 3.7,
    comment: "Good points.",
    topic: "Fashion",
  },
  {
    id: 17,
    name: "Quentin Tarantino",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    date: "2024-09-17T10:15:00",
    rating: 4.4,
    comment: "Brilliant director.",
    topic: "Fashion",
  },
  {
    id: 18,
    name: "Rachel Green",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    date: "2024-09-18T11:00:00",
    rating: 4.1,
    comment: "Loved the character!",
    topic: "Modern",
  },
  {
    id: 19,
    name: "Steve Jobs",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2024-09-19T12:45:00",
    rating: 4.8,
    comment: "Innovative thinker.",
    topic: "Modern",
  },
  {
    id: 20,
    name: "Tina Fey",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    date: "2024-09-20T13:30:00",
    rating: 4.0,
    comment: "Clever and witty.",
    topic: "Modern",
  },
]);

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
  people.value.find((person) => person.id === id).rating += 0.5;
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
