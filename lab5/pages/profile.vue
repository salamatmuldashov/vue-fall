<script setup>
import { useWindowSize } from "@vueuse/core";
const currentUser = useState("currentUser");

const isEditing = ref(false);
const currentPage = ref(1);
const newAge = ref(null);
const posts = ref([]);
const { width } = useWindowSize();
const { chooseTopic } = useTopic();

const switchEdit = () => {
  isEditing.value = !isEditing.value;
};
const cardStyle = computed(() => {
  if (width.value >= 480) {
    return {
      width: "520px",
      padding: "1rem",
      marginTop: "2rem",
    };
  }
});

onBeforeMount(() => {
  if (!localStorage.getItem("currentUser")) {
    navigateTo("/login");
    return;
  }
});

onMounted(() => {
  posts.value = currentUser.value.posts;
});

const saveButtonClicked = () => {
  window.alert("Age saved successfully!");
  currentUser.value.age = newAge.value;
  localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
};

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * 2;
  return posts.value.slice(start, start + 2);
});

const findTotalPages = computed(() => {
  return posts.value.length === 0 ? 0 : Math.ceil(posts.value.length / 2);
});

const updatePage = (newPage) => {
  currentPage.value = newPage;
};
</script>

<template>
  <Header @chooseTopic="chooseTopic" />
  <div class="profile-page" v-if="currentUser">
    <div class="my-profile">My Profile</div>

    <div class="profile-header">
      <div class="profile-header-img">
        <img
          :src="currentUser.avatar"
          alt="avatar"
          class="profile-header-img-src"
        />
      </div>

      <div class="profile-header-info">
        <div class="profile-name">{{ currentUser.name }}</div>
        <div class="profile-age">
          <span>Age:</span>
          <div class="profile-age-number">
            <input
              v-if="isEditing"
              v-model="newAge"
              type="text"
              class="editable-input"
            />
            <span v-else @click="switchEdit">{{ currentUser.age }}</span>
          </div>
        </div>
        <div class="profile-city">Colorado, Texas</div>
        <div class="profile-activity">Activity: <span>for now</span></div>
        <div class="current-rating">
          <p>Current Rating:</p>
          <div class="stars">
            <Stars :id="currentUser.id" :rating="currentUser.rating" />
          </div>
          <span>{{ currentUser.rating }}</span>
        </div>
      </div>

      <div class="profile-header-actions">
        <NuxtLink to="/statistics">
          <button type="button" class="statistics-button">Statistics</button>
        </NuxtLink>
        <button type="button" @click="saveButtonClicked" class="save-button">
          SAVE
        </button>
        <NuxtLink to="/friends">
          <button type="button" class="friends-button">FRIENDS</button>
        </NuxtLink>
      </div>
    </div>

    <div class="latest-posts-title">Latest Posts</div>

    <div class="profile-body">
      <PersonCard
        v-for="post in paginatedPosts"
        :isDelete="true"
        :id="post.id"
        :name="currentUser.name"
        :rating="currentUser.rating"
        :date="post.date"
        :comment="post.comment"
        :avatar="currentUser.avatar"
        :style="cardStyle"
        class="mobile-card"
      />
    </div>

    <PostPages
      v-if="findTotalPages > 1 && findTotalPages !== 0"
      :current-page="currentPage"
      :total-pages="findTotalPages"
      @next-page="updatePage"
      @previous-page="updatePage"
      class="posts-arrow"
    />
  </div>
</template>

<style scoped>
.profile-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding: 100px 70px 0px;
}

.my-profile {
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
  padding: 1rem;
  height: 140px;
  background: #5eeef7;
  border-radius: 118px;
  align-items: center;
  margin-right: 6rem;
}
.profile-header-img-src {
  border-radius: 50%;
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
  color: #294bff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-age {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 18px;

  color: #fcff62;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.profile-age-number {
  width: 41px;
  text-align: center;
  background: #45d2ff;
}
.profile-age-number span {
  font-weight: 900;
  font-size: 16px;
  line-height: 41px;
  color: #ffffff;
  font-family: "Inknut Antiqua";
}

.editable-input {
  width: 41px;
  text-align: center;
  background: #45d2ff;
  font-weight: 900;
  font-size: 16px;
  line-height: 41px;
  color: #ffffff;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-family: "Inknut Antiqua";
}

.profile-city {
  width: 218px;

  background: #45d2ff;

  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 16px;
  line-height: 41px;

  text-align: center;
  color: #ffffff;
}

.profile-activity {
  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 16px;
  line-height: 41px;

  margin-top: -1rem;
  color: #00ffa3;
}

.profile-header-actions {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.statistics-button,
.save-button {
  width: 193px;

  background: #6bebfc;

  font-family: "Inknut Antiqua";
  font-size: 32px;

  color: #ffffff;
  border: none;
}

.statistics-button:hover,
.save-button:hover,
.friends-button:hover {
  opacity: 0.7;
  cursor: pointer;
}

.current-rating {
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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

.friends-button {
  width: 192px;
  height: 52px;

  background: #9ce4fe;

  font-family: "Inknut Antiqua";
  font-size: 24px;

  border: none;
  color: white;
}

@media (max-width: 768px) {
  .profile-page {
    background: linear-gradient(89.91deg, #dfe267 0.08%, #cbee83 99.92%);
    height: 100%;
    padding: 1rem 1rem 4rem;
  }

  .my-profile {
    display: none;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .profile-header-img {
    height: 120px;
    margin-right: 0;
    background: transparent;
  }

  .profile-header-info {
    margin-right: 0;
    gap: 0.8rem;
    align-items: center;
  }

  .profile-name {
    font-size: 24px;
  }

  .profile-age {
    font-size: 14px;
  }

  .profile-city {
    width: 100%;
    font-size: 14px;
    line-height: 36px;
  }
  .profile-header-actions {
    flex-direction: row;
    margin-top: 1.5rem;
  }

  .statistics-button,
  .save-button,
  .friends-button {
    width: auto;
    height: 50px;
    font-size: 24px;
    padding: 0 10px;
  }
  .latest-posts-title {
    margin-left: 1rem;
    margin-top: 2rem;
  }

  .profile-body {
    padding: 2rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-header {
    margin-top: 1rem;
  }

  .profile-header-info {
    align-items: center;
    gap: 0.8rem;
  }

  .profile-name {
    font-size: 24px;
    font-weight: 700;
  }

  .profile-age span {
    color: #294bff;
    font-weight: 700;
    font-size: 18px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .profile-age-number span {
    font-weight: 900;
    font-size: 16px;
    line-height: 41px;
    color: #ffffff;
    font-family: "Inknut Antiqua";
  }

  .editable-input {
    width: 41px;
    text-align: center;
  }

  .profile-city {
    width: 200px;
    font-size: 16px;
    color: #ffffff;
  }

  .profile-activity {
    color: #078b4e;
  }
  .current-rating {
    color: #000000;
  }
  .current-rating span {
    display: none;
  }
  .profile-header-actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .latest-posts-title {
    font-size: 1rem;
    margin-top: 2rem;
    margin-left: 0;
  }

  .profile-body {
    gap: 1rem;
    margin-top: 1rem;
    padding: 0;
  }
  .mobile-card {
    width: 390px;
  }
  .posts-arrow {
    width: 180px;
    margin-top: 2rem;
  }
}
</style>
