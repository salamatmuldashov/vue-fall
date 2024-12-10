<template>
  <Header @chooseTopic="chooseTopic"/>
  <div class="friends-page">
    <div class="friends-page-title">FRIENDS OF {{ user.name }}</div>

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

        <!-- <div class="actions">
          <button type="button" class="unfollow">UNFOLLOW</button>
          <button type="button" class="rename">RENAME</button>
          <button type="button" class="chat">CHAT</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const currentUser = useState("currentUser");
const people = useState("people");
const favUsers = ref([]);
const user = ref(null);
const { chooseTopic } = useTopic();

const fetchFavoriteUsers = () => {
  user.value = people.value.find(person => person.id === Number(route.params.id));
  favUsers.value = people.value.filter(person => user.value.favorites.includes(person.id));
};

onBeforeMount(() => {  
  if (!localStorage.getItem("currentUser")) {
    navigateTo("/");
    return;
  }
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
  fetchFavoriteUsers(); 
});
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
.unfollow:hover,
.rename:hover,
.chat:hover {
  opacity: 0.7;
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
@media (max-width: 768px) {
  .friends-page {
    padding: 2rem 1rem;
  }
  .friends-page-title {
    font-size: 48px;
    text-align: center;
    position: static;
    margin-bottom: 2rem;
  }
  .friends-page-body {
    gap: 2rem;
  }
  .friend {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .friend-info {
    flex-direction: column;
    align-items: center;
    width: auto;
  }
  .friend-name-group {
    margin-left: 0;
    text-align: center;
  }
  .friend-avatar {
    width: 90px;
    height: 90px;
  }
  .friend-avatar-src {
    width: 70px;
  }
  .actions {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .friends-page {
    padding: 1rem;
    background: transparent;
    height: 100%;
    padding-bottom: 4rem;
  }
  .friends-page-title {
    font-size: 32px;
    color: #000;
  }
  .friends-page-body {
    margin-top: 5rem;
    gap: 1rem;
  }
  .friend {
    margin-top: 1rem;
    flex-direction: column;
    gap: 1.5rem;
  }
  .friend-name-group {
    margin-left: 0;
  }
  .activity{
    color: #078b4e;
  }
  .friend-avatar {
    background: transparent;
  }
  .friend-avatar-src {
    width: 80px;
  }

 
}
</style>
