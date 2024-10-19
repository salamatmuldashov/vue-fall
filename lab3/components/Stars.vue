<script setup>
const props = defineProps({
  id: Number,
  rating: Number,
});

const getStarType = (index) => {
  const wholePart = Math.floor(props.rating);
  const decimalPart = props.rating % 1;
  if (index <= wholePart) {
    return "full";
  } else if (index === wholePart + 1 && decimalPart < 1 && decimalPart > 0) {
    return "hybrid";
  } else {
    return "empty";
  }
};

const hybridStar = computed(() => {
  const x = props.rating % 1;
  return x * 17;
});
</script>

<template>
  <div v-for="n in 5" :key="n">
    <svg
      v-if="getStarType(n) === 'full'"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
        fill="gold"
      />
    </svg>

    <svg
      v-else-if="getStarType(n) === 'hybrid'"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="gold"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath :id="`half-${id}-${n}`">
          <rect x="0" y="0" :width="hybridStar" height="16" />
        </clipPath>
      </defs>
      <path
        d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
        fill="gold"
        :clip-path="`url(#half-${id}-${n})`"
      />
    </svg>

    <svg
      v-else
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
        fill="lightgray"
      />
    </svg>
  </div>
</template>


<style scoped>

</style>