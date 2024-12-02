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
          <Stars :id="props.id" :rating="props.rating" />
        </div>
      </div>
      <div class="person-card-avatar">
        <NuxtLink v-if="currentUser.id !== id" :to="`/user/${id}`">
          <NuxtImg :src="avatar" />
        </NuxtLink>
        <NuxtLink v-else to="/profile">
          <NuxtImg :src="avatar" />
        </NuxtLink>
      </div>
    </div>
    <div class="person-card-comment">
      {{ comment }}
    </div>
    <button @click="likeClicked" class="person-card-like" v-if="!isDelete">
      LIKE
    </button>
    <button class="person-card-delete" v-else>DELETE</button>
  </div>
</template>

<script setup>
import { format, differenceInCalendarDays } from "date-fns";

const currentUser = useState("currentUser");

const props = defineProps({
  id: Number,
  name: String,
  rating: Number,
  date: String,
  comment: String,
  avatar: String,
  isDelete: Boolean,
});

const emit = defineEmits(["update-rating"]);

const displayFormattedDate = (dateString) => {
  const date = dateString.split("T")[0];
  const time = format(dateString, "HH:mm");

  if (date == "2024-11-30") {
    return `Today, ${time}`;
  } else if (date == "2024-11-29") {
    return `Yesterday, ${time}`;
  } else {
    return `${differenceInCalendarDays(
      "2024-11-30T00:00:00",
      dateString
    )} days ago, ${time}`;
  }
};

onMounted(() => {});

const likeClicked = () => {
  emit("update-rating");
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
.person-card-delete {
  background: #ef2757;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-family: "Jersey 15";
  position: absolute;
  right: 10px;
  bottom: 5px;

  font-size: 20px;
}

.person-card-like:hover {
  opacity: 0.6;
}
</style>
