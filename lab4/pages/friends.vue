<template>
  <Header @chooseTopic="chooseTopic" />
  <div class="friends-page">
    <div class="friends-page-title">MY FRIENDS</div>

    <div class="friends-page-body">
      <div class="friend" v-for="person in favUsers" :key="person.id">
        <div class="friend-info">
          <div class="friend-avatar">
            <NuxtLink :to="`/user/${person.id}`">
              <NuxtImg :src="person.avatar" class="friend-avatar-src" />
            </NuxtLink>
          </div>

          <div class="friend-name-group">
            <div class="friend-name">
              {{ person.name }}
            </div>

            <div class="activity">Activity: for now</div>
          </div>
        </div>

        <div class="actions">
          <button
            type="button"
            class="follow"
            @click="followClicked('follow', currentUser, person)"
            v-if="!isFollowed(person.id)"
          >
            FOLLOW
          </button>
          <button
            type="button"
            class="unfollow"
            @click="followClicked('unfollow', currentUser, person)"
            v-else
          >
            UNFOLLOW
          </button>
          <button type="button" class="rename" @click="openPopup(person)">
            RENAME
          </button>
          <NuxtLink :to="`/chat/${encodeId(currentUser.id, person.id)}`">
            <button type="button" class="chat">CHAT</button>
          </NuxtLink>

          <RenamePopup v-if="popup" :user="renamedUser" @rename="renameUser" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFollow } from "@/composables/useFollow";

const currentUser = useState("currentUser");
const initialPeople = useState("people");
const people = ref(null);
const favUsers = ref(null);
const { chooseTopic } = useTopic();
const popup = ref(null);
const renamedUser = ref(null);

const { isFollowed, followClicked, initializeFollowStatus } = useFollow();

const fetchFavoriteUsers = () => {
  favUsers.value = people.value.filter((person) =>
    currentUser.value?.favorites?.includes(person.id)
  );
  favUsers.value.forEach((user) => {
    initializeFollowStatus(currentUser.value, user);
  });
};

onMounted(() => {
  if (!JSON.parse(localStorage.getItem('people'))) {
    people.value = initialPeople.value
    console.log(people);
  } else {
    people.value = JSON.parse(localStorage.getItem("people"));
  }

  fetchFavoriteUsers();
});
onBeforeMount(() => {
  if (!localStorage.getItem("currentUser")) {
    navigateTo("/");
    return;
  }
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
});

const openPopup = (person) => {
  popup.value = true;
  renamedUser.value = person;
};

const renameUser = (newName) => {
  if (!renamedUser.value) return;

  const userIndex = people.value.findIndex(
    (person) => person.id === renamedUser.value.id
  );
  if (userIndex !== -1) {
    people.value[userIndex].name = newName;
    localStorage.setItem("people", JSON.stringify(people.value));
  }

  // const favIndex = favUsers.value.findIndex(
  //   (person) => person.id === renamedUser.value.id
  // );
  // if (favIndex !== -1) {
  //   favUsers.value[favIndex].name = newName;
  // }
  popup.value = false;
  renamedUser.value = null;
};
watch(
  () => currentUser.value?.favorites?.length,
  () => {
    fetchFavoriteUsers();
  }
);
</script>

<style scoped>
.friends-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding-top: 3.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.friends-page-title {
  position: absolute;
  top: 15%;
  right: 7%;
  font-family: "Inknut Antiqua";
  font-size: 64px;
  color: #ffffff;
}
.friends-page-body {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.friend {
  display: flex;
  gap: 8rem;
  align-items: center;
}
.friend-info {
  display: flex;
  align-items: center;
  width: 350px;
}

.friend-name-group {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.friend-name {
  font-family: "Inknut Antiqua";
  font-size: 32px;
  color: #294bff;
}
.activity {
  font-family: "Inknut Antiqua";
  font-weight: 800;
  font-size: 16px;
  color: #00ffa3;
}
.friend-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #5eeef7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.friend-avatar-src {
  width: 75px;
  border-radius: 50%;
}

.actions {
  display: flex;
  gap: 2rem;
}

.follow,
.unfollow,
.rename,
.chat {
  width: 123px;
  height: 33px;
  border-radius: 12px;

  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 14px;

  color: #ffffff;
  border: none;
  cursor: pointer;
}
.follow:hover,
.unfollow:hover,
.rename:hover,
.chat:hover {
  opacity: 0.7;
}
.follow {
  background: #77fc6b;
}
.unfollow {
  background: #ec1c1c;
}
.rename {
  background: #3ad1d9;
}
.chat {
  background: #92f2c2;
}
</style>
