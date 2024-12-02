<script setup>
import { onClickOutside } from "@vueuse/core";
const currentUser = useState("currentUser");
const menuOpen = ref(false);
const profileOpen = ref(false);
const dropdownRef = ref(null);
const topics = ref([
  "ADVENTURE BLOG",
  "NATURE BLOG",
  "FASHION BLOG",
  "MODERN BLOG",
]);

const logout = () => {
  currentUser.value = null;
  localStorage.clear();
  profileOpen.value = 0;
  navigateTo("/login");
};

onBeforeMount(() => {
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
});
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleProfile = () => {
  profileOpen.value = !profileOpen.value;
};

const emit = defineEmits(["chooseTopic"]);

const selectTopic = (topic) => {
  console.log(topic);
  navigateTo("/");
  emit("chooseTopic", topic);
  toggleMenu();
};

onClickOutside(dropdownRef, () => {
  menuOpen.value = 0;
  profileOpen.value = 0;
});
</script>

<template>
  <div class="header">
    <button @click="toggleMenu" style="background: none; border: none">
      <div class="dropbox">
        <img src="/public/burger.png" alt="burger" />
      </div>
    </button>

    <div class="header-msg">
      <h2 class="header-msg-content">
        New trips on Fall season! Full details on out Instagram accounts.
      </h2>
    </div>

    <button class="header-profile" @click="toggleProfile" style="border: none">
      <NuxtImg
        v-if="currentUser"
        :src="currentUser.avatar"
        class="profile-avatar"
        style="width: 55px; height: 55px; border-radius: inherit"
      />
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-user"
      >
        <path d="M12 14c4 0 7-3 7-7S16 0 12 0 5 3 5 7s3 7 7 7z"></path>
        <path d="M12 14c-4 0-7 3-7 7v1h14v-1c0-4-3-7-7-7z"></path>
      </svg>
    </button>
  </div>

  <div v-if="menuOpen" class="burger-menu" ref="dropdownRef">
    <div class="burger-menu-container">
      <div class="menu-title">MENU</div>
      <div class="burger-menu-content">
        <ul class="blog-list">
          <li
            v-for="(topic, index) in topics"
            :key="index"
            @click="selectTopic(topic)"
          >
            {{ topic }}
          </li>
        </ul>

        <div class="contact">
          <div class="contact-title">CONTACTS</div>
          <ul class="contact-list">
            <li>PHONE: +1(234)-23-45-22</li>
            <li>ADDRESS: Green st., Yalow Park</li>
            <li>EMAIL: Yallow@park.info</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div v-if="profileOpen && !currentUser" class="profile-menu">
    <div class="profile-menu-content">
      <NuxtLink to="/login">
        <div class="login">LOGIN</div>
      </NuxtLink>
      <NuxtLink to="/register"><div class="register">REGISTER</div></NuxtLink>
    </div>
  </div>

  <div
    class="profile-authenticated-menu"
    v-if="currentUser && profileOpen"
    ref="dropdownRef"
  >
    <div class="profile-authenticated-menu-content">
      <NuxtLink to="/profile">
        <div class="my-profile">MY PROFILE</div>
      </NuxtLink>
      <NuxtLink to="/favorites">
        <div class="favorites">FAVORITES</div>
      </NuxtLink>
      <div class="logout" @click="logout">LOG OUT</div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: gray;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropbox {
  width: 51px;
  height: 51px;
}

.dropbox:hover {
  opacity: 0.8;
}
.header-msg {
  background-color: yellowgreen;
  padding: 5px 22rem;
  margin: 10px;
  border-radius: 10px;
}

.header-msg-content {
  font-size: 20px;
  color: yellow;
}
.header-profile {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #7eefff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-profile:hover {
  cursor: pointer;
}

.profile-avatar {
  background: none;
}
img {
  width: 100%;
  height: 100%;
}

.burger-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 310px;
  background: #c1ebf1;
  height: 100%;
  z-index: 1;
}

.burger-menu-container {
  padding-top: 10px;
  padding-bottom: 17px;
  padding-left: 12px;
  padding-right: 12px;
}

.menu-title {
  height: 37px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  font-family: "Jersey 15";
  font-size: 36px;
  margin-bottom: 20px;
  color: #615c5c;
}

a {
  text-decoration: none;
}
ul {
  list-style: none;
}

.burger-menu-content {
  background: #fff;
  padding-top: 10px;
  border-radius: 12px;
  padding-bottom: 18px;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
  text-align: center;
  font-family: "Jersey 15";
}
.blog-list li {
  height: 51px;
  background: linear-gradient(90deg, #4cd87c 0%, #42d669 63.42%, #3dd55e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.blog-list li a {
  color: white;
  font-size: 25px;
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 10px;
  padding-right: 10px;
  background: linear-gradient(180deg, #aff090 0%, #45c330 100%);
  margin: 40px 20px 15px;
  height: 229px;
  border-radius: 10px;
}

.contact-title {
  height: 36px;
  margin-top: 10px;
  font-family: "Jersey 15";
  font-size: 36px;
  color: #ffffff;
  text-align: center;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
}

li {
  font-family: "Jersey 15";
  color: #ffffff;
}

.profile-menu,
.profile-authenticated-menu {
  position: fixed;
  right: 0;
  top: 4;
  width: 175px;
  z-index: 1000;
}

.login {
  background: #43e567;
  border: 1px solid #000000;
  font-family: "Inknut Antiqua";
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  text-align: center;
  color: #548eff;
}
.register {
  background: #f8f14d;
  border: 1px solid #000000;
  font-family: "Inknut Antiqua";
  text-align: center;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  color: #548eff;
}

.my-profile,
.favorites,
.logout {
  background: #7eefff;
  border: 1px solid #000000;
  text-align: center;

  font-family: "Inknut Antiqua";

  font-weight: 900;
  font-size: 17px;
  line-height: 3;

  color: #ffffff;
}
</style>
