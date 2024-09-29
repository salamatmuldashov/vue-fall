<template>
  <input v-model="newItem" type="text" placeholder="Add a new item" />
  <button @click="addItem">Add Item</button>

  <button @click="toggleVisibility">
    {{ showList ? "Hide List" : "Show List" }}
  </button>

  <p v-if="!items.length">No items in the list.</p>

  <ul v-show="showList">
    <li v-for="(item, index) in items" :key="index">
      {{index + 1 }}: {{item }}
      <button @click="removeItem(index)">Remove</button>
    </li>
  </ul>
</template>


<script setup>
import { ref, onMounted } from "vue";

const newItem = ref("");
const showList = ref(true);
const items = ref([]);

onMounted(() => {
  items.value.push("Default item");
});

const addItem = () => {
  if (newItem.value) {
    items.value.push(newItem.value);
    newItem.value = "";
  }
};

const toggleVisibility = () => {
  showList.value = !showList.value;
};
const removeItem = (index) => {
  items.value.splice(index.value, 1);
};
</script>
