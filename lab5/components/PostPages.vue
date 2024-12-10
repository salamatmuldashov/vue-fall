<script setup>
const props = defineProps({
  totalPages: Number,
  currentPage: Number
});

const emit = defineEmits(["next-page", "previous-page"]);


const goToPreviosPage = () => {
  if (props.currentPage > 1) {
    emit("previous-page", props.currentPage - 1);
  }
};

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("next-page", props.currentPage + 1);
  }
};
</script>

<template>
  <div class="pages">
    <button
      type="button"
      @click="goToPreviosPage"
      style="background: none; border: none"
    >
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0694016 11.9997L24.1292 0.869653L24.009 23.386L0.0694016 11.9997Z"
          fill="white"
        />
      </svg>
    </button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button
      type="button"
      @click="goToNextPage"
      style="background: none; border: none"
    >
      <svg
        width="25"
        height="23"
        viewBox="0 0 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2147 10.9982L0.407927 22.6596L0.0282637 0.146097L24.2147 10.9982Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 33px;

  background: #5bb9cd;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 61px;
  height: 32px;

  font-family: "Jersey 15";

  font-size: 32px;

  color: #ffffff;
}
</style>
