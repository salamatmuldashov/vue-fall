<script setup>
const people = useState('people', () => ([
{
    id: 1,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "alice2024",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2024-09-29T14:20:00",
    rating: 0.7,
    comment: "This is awesome adventure that I had! Thanks!",
    topic: "Adventure",
    favorites: [3],    
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password: "bob2024",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-09-25T13:20:00",
    rating: 1.3,
    comment: "The place is very big. I lost the exit",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    password: "charlie2024",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2023-09-23T15:20:00",
    rating: 2,
    comment: "Something new for me. Drive and emotions only",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    password: "diana2024",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2024-09-17T16:20:00",
    rating: 2.5,
    comment: "Very helpful information.",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward.norton@example.com",
    password: "edward2024",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2024-09-06T18:20:00",
    rating: 3.0,
    comment: "I found it useful.",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    password: "fiona2024",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2024-09-06T15:10:00",
    rating: 0,
    comment: "Incredible!",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 7,
    name: "George Martin",
    email: "george.martin@example.com",
    password: "george2024",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2024-09-07T09:00:00",
    rating: 4.2,
    comment: "Well explained.",
    topic: "Nature",
    favorites: []
  },
  {
    id: 8,
    name: "Hannah Arendt",
    email: "hannah.arendt@example.com",
    password: "hannah2024",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2024-09-08T17:45:00",
    rating: 3.4,
    comment: "Thought-provoking.",
    topic: "Nature",
    favorites: []
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    password: "ian2024",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "2024-09-09T16:30:00",
    rating: 2.5,
    comment: "Could be better.",
    topic: "Nature",
    favorites: []
  },
  {
    id: 10,
    name: "Jessica Jones",
    email: "jessica.jones@example.com",
    password: "jessica2024",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2024-09-10T18:15:00",
    rating: 4.5,
    comment: "Highly recommended!",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 11,
    name: "Kevin Hart",
    email: "kevin.hart@example.com",
    password: "kevin2024",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    date: "2024-09-11T20:00:00",
    rating: 1,
    comment: "Great humor!",
    topic: "Nature",
    favorites: []
  },
  {
    id: 12,
    name: "Laura Croft",
    email: "laura.croft@example.com",
    password: "laura2024",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    date: "2024-09-12T19:30:00",
    rating: 5,
    comment: "Interesting take.",
    topic: "Adventure",
    favorites: []
  },
  {
    id: 13,
    name: "Michael Scott",
    email: "michael.scott@example.com",
    password: "michael2024",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2024-09-13T21:00:00",
    rating: 5,
    comment: "Funny and insightful.",
    topic: "Nature",
    favorites: []
  },
  {
    id: 14,
    name: "Natalie Portman",
    email: "natalie.portman@example.com",
    password: "natalie2024",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    date: "2024-09-14T22:00:00",
    rating: 4.9,
    comment: "A must-read!",
    topic: "Fashion",
    favorites: []
  },
  {
    id: 15,
    name: "Oscar Wilde",
    email: "oscar.wilde@example.com",
    password: "oscar2024",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    date: "2024-09-15T08:00:00",
    rating: 4.2,
    comment: "Remarkably written.",
    topic: "Fashion",
    favorites: []
  },
  {
    id: 16,
    name: "Penny Lane",
    email: "penny.lane@example.com",
    password: "penny2024",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "2024-09-16T09:30:00",
    rating: 3.7,
    comment: "Good points.",
    topic: "Fashion",
    favorites: []
  },
  {
    id: 17,
    name: "Quentin Tarantino",
    email: "quentin.tarantino@example.com",
    password: "quentin2024",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    date: "2024-09-17T10:15:00",
    rating: 4.4,
    comment: "Brilliant director.",
    topic: "Fashion",
    favorites: []
  },
  {
    id: 18,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    password: "rachel2024",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    date: "2024-09-18T11:00:00",
    rating: 4.1,
    comment: "Loved the character!",
    topic: "Modern",
    favorites: []
  },
  {
    id: 19,
    name: "Steve Jobs",
    email: "steve.jobs@example.com",
    password: "steve2024",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2024-09-19T12:45:00",
    rating: 4.8,
    comment: "Innovative thinker.",
    topic: "Modern",
    favorites: []
  },
  {
    id: 20,
    name: "Tina Fey",
    email: "tina.fey@example.com",
    password: "tina2024",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    date: "2024-09-20T13:30:00",
    rating: 4.0,
    comment: "Clever and witty.",
    topic: "Modern",
    favorites: []
  },
  {
    id: 21,
    name: "test",
    email: "1",
    password: "1",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    date: "2024-09-20T13:30:00",
    rating: 4.0,
    comment: "Clever and witty.",
    topic: "Adventure",
    favorites: []
  },
]))
</script>

<template>
  <NuxtPage />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
