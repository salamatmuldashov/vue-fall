<template>
  <div
    class="message-body"
    :class="['message-body', isMine ? 'mine' : 'other']"
  >
    <NuxtLink :to="`/user/${senderId}`">
      <NuxtImg :src="avatar" class="avatar" />
    </NuxtLink>
    <div :class="['message-info', isMine ? 'mine' : 'other']">
      <div :class="['message-name', isMine ? 'mine' : 'other']">
        {{ name }}
      </div>
      <div class="message-date">{{ displayFormattedDate(date) }}</div>
    </div>
    <div class="message-content">{{ message }}</div>
  </div>
</template>

<script setup>
import { format, differenceInCalendarDays } from "date-fns";

const currentUser = useState("currentUser");

const props = defineProps({
  id: Number | String,
  senderId: Number,
  date: String,
  message: String,
  avatar: String,
  name: String,
});

const isMine = computed(() => props.senderId === currentUser.value.id);


const displayFormattedDate = (dateString) => {
  const currentDate = new Date(); 
  const messageDate = new Date(dateString);
  const time = format(messageDate, "HH:mm");   

  // Если сообщение отправлено сегодня
  if (differenceInCalendarDays(currentDate, messageDate) === 0) {
    return `Today, ${time}`;
  } 
  // Если сообщение отправлено вчера
  else if (differenceInCalendarDays(currentDate, messageDate) === 1) {
    return `Yesterday, ${time}`;
  } 
  // Если сообщение старше, показываем разницу в днях
  else {
    return `${differenceInCalendarDays(currentDate, messageDate)} days ago, ${time}`;
  }
};
</script>

<style scoped>
.message-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.message-body.mine {
  flex-direction: row-reverse;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.message-info.other,
.message-info.mine {
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: 200px;
  gap: 0.5rem;
}

.message-info.mine {
  align-items: flex-end;
}

.message-name.mine,
.message-name.other {
  font-family: "Inknut Antiqua";
  font-size: 20px;
  font-weight: 800;
}
.message-name.mine {
  color: #2713ff;
}
.message-name.other {
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
  color: #de13ff;
}

.message-date {
  font-family: "Inknut Antiqua";
  font-size: 18px;
  color: #23ff13;
}
.message-content {
  min-width: 250px;
  min-height: 39px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-radius: 15px;

  font-family: "Inknut Antiqua", serif;
  font-weight: 700;
  font-size: 1rem;

  color: #000000;
  word-break: break-word;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.message-content:hover {
  transform: translateX(2px);
}
</style>
