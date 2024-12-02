<script setup>
const route = useRoute();
const people = useState("people");
const user = ref(null);
const age = ref(20);
const currentUser = useState("currentUser");
const fetchUser = () => {
  user.value = people.value.find(
    (person) => person.id === Number(route.params.id)
  );
};

onMounted(() => {
  fetchUser();

});

const checkIfFollowed = () => {
  console.log(currentUser.value.favorites.includes(Number(route.params.id)));
  
  if(currentUser.value.favorites.includes(Number(route.params.id))){
    return true;
  }

  return false;
}

const followClicked = () => {
  if (!currentUser.value.favorites.includes(user.value.id)) {
    currentUser.value.favorites.push(user.value.id);
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
  } else {
    window.alert("User is already in favorites.");
  }
    
};
</script>
<template>
  <Header />
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
          <span>{{ age }}</span>
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

      <button type="button" class="follow-button" @click="followClicked" v-if="checkIfFollowed">
        FOLLOW
      </button>
      <button type="button" class="unfollow-button" v-else>UNFOLLOW</button>
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

.follow-button {
  width: 193px;
  height: 44px;
  text-align: center;
  background: #77fc6b;

  font-family: "Inknut Antiqua";

  font-size: 32px;
  border: none;
  color: #ffffff;
}

.unfollow-button{
  width: 193px;
  height: 44px;
  text-align: center;
  background: red;

  font-family: "Inknut Antiqua";

  font-size: 32px;
  border: none;
  color: #ffffff;
}

.follow-button:hover {
  opacity: 0.7;
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
</style>
