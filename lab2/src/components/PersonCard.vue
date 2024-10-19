<template>
  <div class="person-card">
    <div class="person-card-top">
      <div class="person-card-header">
        <div>{{ name }}</div>
        <div>{{ displayFormattedDate(date) }}</div>
      </div>
      <div class="person-card-rating">
        <p>Rating</p>
        <div class="stars">
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
            <img
              src="../assets/rating.png"
              alt=""
              v-else-if="getStarType(n) === 'half'"
              style="width: 17px; height: 16px"
            />
            <svg
              v-else-if="getStarType(n) === 'hybrid'"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="gold"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="half">
                  <rect x="0" y="0" :width="hybridStar()" height="16" />
                </clipPath>
              </defs>
              <path
                d="M8.5 0L10.4084 5.87336L16.584 5.87336L11.5878 9.50329L13.4962 15.3766L8.5 11.7467L3.50383 15.3766L5.41219 9.50329L0.416019 5.87336L6.59163 5.87336L8.5 0Z"
                fill="gold"
                clip-path="url(#half)"
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
        </div>
      </div>
      <div class="person-card-avatar">
        <img :src="avatar" alt="Avatar" />
      </div>
    </div>
    <div class="person-card-comment">
      {{ comment }}
    </div>
    <button @click="likeClicked" class="person-card-like">LIKE</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { format, differenceInCalendarDays } from "date-fns";

const props = defineProps({
  name: String,
  rating: Number,
  date: String,
  comment: String,
  avatar: String,
});

const emit = defineEmits(["update-rating"]);

const getStarType = (index) => {
  const wholePart = Math.floor(props.rating);
  const decimalPart = props.rating % 1;
  if (index <= wholePart) {
    return "full";
  } else if (index == wholePart + 1 && decimalPart == 0.5) {
    return "half";
  } else if (index === wholePart + 1 && decimalPart < 1 && decimalPart > 0) {
    return "hybrid";
  } else {
    return "empty";
  }
};

const hybridStar = () => {
  const x = props.rating % 1;

  return x * 17;
};

const displayFormattedDate = (dateString) => {
  const date = dateString.split("T")[0];
  const time = format(dateString, "HH:mm");

  if (date == "2024-09-29") {
    return `Today, ${time}`;
  } else if (date == "2024-09-28") {
    return `Yesterday, ${time}`;
  } else {
    return `${differenceInCalendarDays(
      "2024-09-29T00:00:00",
      dateString
    )} days ago, ${time}`;
  }
};

const likeClicked = () => {
  emit("update-rating", props.rating + 0.5);
};
</script>

<style scoped>
.person-card {
  background: #5bb9cd;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 30px;
  position: relative;
}

.person-card-top {
  display: flex;
  justify-content: space-between;
}

.person-card-header {
  background: rgba(255, 255, 245, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 6px;
  /* width: 164px; */
  height: 72px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  color: #fff;
}
.person-card-rating {
  font-family: "Jersey 15";
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stars {
  display: flex;
  gap: 1rem;
}

.person-card-avatar {
  display: flex;
  width: 70;
  height: 90px;
}

.person-card-comment {
  color: #fff;
  height: 20px;
  font-family: "Jersey 15";
  font-size: 20px;
  margin-top: 10px;
}
.person-card-like {
  width: 60px;
  height: 20px;
  background: #43ef27;
  border-radius: 8px;
  border-color: transparent;
  color: #fff;
  font-family: "Jersey 15";
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.person-card-like:hover {
  opacity: 0.6;
}
</style>
