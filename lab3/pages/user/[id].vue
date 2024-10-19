<script setup></script>
<template>
  <Header />
  <div class="user-profile-page">
    <div class="profile">Profile</div>

    <div class="profile-header" >
      <div class="profile-header-img">
        <img :src="currentUser.avatar" alt="avatar" />
      </div>

      <div class="profile-header-info">
        <div class="profile-name">{{ currentUser.name }}</div>
        <div class="profile-age">
          <span>Age:</span>
          <div class="profile-age-number">
            <input
              v-if="isEditing"
              v-model="age"
              type="text"
              class="editable-input"
            />
            <span v-else @click="switchEdit">{{ age }}</span>
          </div>
        </div>
        <div class="profile-city">Colorado, Texas</div>
        <div class="profile-activity">Activity: <span>for now</span></div>
        <div class="current-rating">
          <span>Current Rating:</span>
          <div class="stars">
            <Stars :id="currentUser.id" :rating="currentUser.rating" />
          </div>
          <span>{{ currentUser.rating }}</span>
        </div>
      </div>
      <div class="profile-header-actions">
        <button type="button" class="statistics-button">Statistics</button>
        <button type="button" class="save-button">SAVE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding: 100px 70px 0px;
}
</style>
