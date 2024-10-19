<script setup>
import Header from "../components/Header.vue";
import PeopleList from "@/components/PeopleList.vue";
import { ref } from "vue";

const selectedTopic = ref("Adventure");
const chooseTopic = (topic) => {
  selectedTopic.value = topic.charAt(0) + topic.split(" ")[0].slice(1).toLowerCase()    
};


</script>

<template>
  <Header @chooseTopic="chooseTopic"/>
  <div class="container">
    <PeopleList :selectedTopic="selectedTopic" />
  </div>
</template>

<style>
.container {
  max-width: 850px;
  background-color: rgb(220, 233, 233);

  margin: 1rem auto 3rem;
  padding: 2rem 1rem;
}
</style>
