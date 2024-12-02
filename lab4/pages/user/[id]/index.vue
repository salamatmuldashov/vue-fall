<script setup>
import { useFollow } from "@/composables/useFollow"; 
const { chooseTopic } = useTopic();
const route = useRoute();
const initialPeople = useState("people");
const people = ref(null)
const user = ref(null);
const currentUser = useState("currentUser");

const { isFollowed, followClicked, initializeFollowStatus } = useFollow();

const fetchUser = () => {
  if (!JSON.parse(localStorage.getItem('people'))) {
    people.value = initialPeople.value
    console.log(people);
  } else {
    people.value = JSON.parse(localStorage.getItem("people"));
  }
  user.value = people.value.find(
    (person) => person.id === Number(route.params.id)
  );
};

onMounted(() => {
  fetchUser();
  initializeFollowStatus(currentUser.value, user.value);  
});

</script>

<template>
  <Header @chooseTopic="chooseTopic"/>
  <div class="user-profile-page" v-if="user">
    <div class="profile">Profile</div>

    <div class="profile-header">
      <div class="profile-header-img">
        <img :src="user.avatar" alt="avatar" />
      </div>

      <div class="profile-header-info">
        <div class="profile-name">{{ user.name }}</div>
        <div class="profile-age">
          <span>Age:</span>
          <span>{{ user.age }}</span>
        </div>
        <div class="profile-city">Kentucky, USA</div>
        <div class="profile-activity">
          Activity: <span>was 5 minute ago</span>
        </div>
        <div class="current-rating">
          <span>Current Rating:</span>
          <div class="stars">
            <Stars :id="user.id" :rating="user.rating" />
          </div>
          <span>{{ user.rating }}</span>
        </div>
      </div>

      <div class="buttons">
        <button
          type="button"
          class="follow-button"
          @click="followClicked('follow', currentUser, user)"
          v-if="!isFollowed(user.id)"
        >
          FOLLOW
        </button>
        <button
          type="button"
          class="unfollow-button"
          @click="followClicked('unfollow', currentUser, user)"
          v-else
        >
          UNFOLLOW
        </button>
        <NuxtLink :to="`/chat/${encodeId(currentUser.id, user.id)}`">
          <button type="button" class="chat-button" @click="chatButtonClicked">
            CHAT NOW
          </button>
        </NuxtLink>
        <NuxtLink :to="`/user/${user.id}/friends`">
          <button type="button" class="friends-button">FRIENDS</button>
        </NuxtLink>
      </div>
    </div>
    <div class="latest-posts-title">Latest Posts</div>
    <div class="profile-body">
      <PersonCard
        :isDelete="true"
        :id="user.id"
        :name="user.name"
        :rating="user.rating"
        :date="user.date"
        :comment="user.comment"
        :avatar="user.avatar"
        style="width: 520px; padding: 1rem; margin-top: 2rem"
      />
      <PersonCard
        :isDelete="true"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :rating="user.rating"
        :date="user.date"
        :comment="user.comment"
        :avatar="user.avatar"
        style="width: 520px; padding: 1rem; margin-top: 2rem"
      />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.user-profile-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding: 100px 70px 0px;
}

.profile {
  position: absolute;
  top: 15%;
  right: 7%;
  font-family: "Inknut Antiqua";
  font-size: 64px;
  color: #ffffff;
}
.profile-header {
  display: flex;
  margin-top: 2rem;
}

button {
  border: none;
}
.profile-header-img {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  background: #5eeef7;
  border-radius: 118px;
  align-items: center;
  margin-right: 6rem;
}
.profile-header-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-right: 25rem;
}

.profile-name {
  font-family: "Inknut Antiqua";
  font-size: 32px;

  color: #de13ff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-age {
  display: flex;
  gap: 0.5rem;

  font-family: "Inknut Antiqua";
  font-size: 16px;
  line-height: 41px;

  color: #fcff62;
}

.profile-age-number {
  width: 41px;
  text-align: center;
}
.profile-age-number span {
  font-weight: 900;
  font-size: 16px;
  line-height: 41px;
  color: #ffffff;
  font-family: "Inknut Antiqua";
}
.profile-age {
  font-size: 18px;

  color: #fcff62;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-city {
  width: 133px;
  font-family: "Inknut Antiqua";

  font-size: 20px;
  line-height: 41px;

  color: #f6fc6b;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-activity {
  width: 241px;

  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 16px;
  line-height: 41px;

  color: #ff0000;
}

.follow-button,
.unfollow-button {
  width: 193px;
  height: 44px;
  text-align: center;
  font-family: "Inknut Antiqua";
  font-size: 32px;
  color: #ffffff;
}

.follow-button {
  background: #77fc6b;
}

.unfollow-button {
  background: red;
}


.follow-button:hover,
.unfollow-button:hover,
.friends-button:hover,
.chat-button:hover {
  opacity: 0.7;
  cursor: pointer;
}

.current-rating {
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.current-rating span {
  font-family: "Inknut Antiqua";
  font-size: 19px;
  width: 120px;
  color: #ffffff;
}

.stars {
  background-color: #5eeef7;
  display: flex;
  gap: 1rem;
}

.profile-body {
  display: flex;
  padding: 3rem;
  justify-content: space-between;
}

.latest-posts-title {
  max-width: 113px;

  background: #fffbfb;

  font-family: "Inknut Antiqua";
  font-size: 14px;
  font-weight: 700;
  line-height: 36px;

  color: #000000;
  text-align: center;
  margin-top: 4rem;
  margin-left: 2rem;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.chat-button {
  width: 192px;
  height: 52px;

  background: #fffefe;

  font-family: "Inknut Antiqua";
  font-size: 24px;

  color: #000000;
}
.friends-button {
  width: 192px;
  height: 52px;

  background: #9ce4fe;

  font-family: "Inknut Antiqua";
  font-size: 24px;

  color: white;
}
</style>
