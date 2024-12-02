<script setup>
const username = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
 
const error = ref({
  isActive: null,
  msg: "",
});

const popup = ref(null)

const openPopup = () =>{
    popup.value = !popup.value
}

const validation = () => {
  error.value.isActive = false;
  error.value.msg = "";

  if (!email.value) {
    error.value.isActive = true;
    error.value.msg = "Email is required.";
    return;
  }
  if (!username.value) {
    error.value.isActive = true;
    error.value.msg = "Username is required.";
    return;
  }
  if (!password1.value || !password2.value) {
    error.value.isActive = true;
    error.value.msg = "Both password fields are required.";
    return;
  }
  if (password1.value !== password2.value) {
    error.value.isActive = true;
    error.value.msg = "Passwords do not match.";
    return;
  }

  openPopup()
};


</script>

<template>
  <Header />

  <div class="register-page">
    <div class="register-page-title">PROFILE | REGISTRATION</div>

    <form class="register-form">
      <div class="form-email">
        <label for="email">Enter your email</label>
        <input
          type="email"
          name="email"
          placeholder="user@example.com"
          v-model="email"
          required
        />
      </div>
      <div class="form-username">
        <label for="username">Create username</label>
        <input type="text" name="username" v-model="username" required />
      </div>
      <div class="form-password1">
        <label for="password">Create password</label>
        <input type="password" name="password" v-model="password1" />
      </div>
      <div class="form-password2">
        <label for="password">Confirm password</label>
        <input type="password" name="password" v-model="password2" />
      </div>
      <div class="error-occurs" v-if="error.isActive">
        {{ error.msg }}
      </div>
      <button @click="validation" class="register-btn" type="button">
        CREATE USER
      </button>
    </form>
  </div>

  <RegisterPopup v-if="popup" :email="email" :username="username" :password1="password1" :password2="password2" />


</template>

<style>
.register-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
}

.register-page {
  padding-left: 84px;
  padding-top: 50px;
}

.register-page-title {
  width: 285px;
  background: #63e3eb;
  border-radius: 14px;
  color: #ffffff;

  font-family: "Inknut Antiqua";
  text-align: center;
  font-size: 17px;
  line-height: 44px;
}

.register-form {
  margin-top: 90px;
  max-width: 450px;
}

.form-email,
.form-username,
.form-password1,
.form-password2 {
  display: flex;
  flex-direction: column;
}

.form-email,
.form-username,
.form-password1,
.form-password2 label {
  font-family: "Inknut Antiqua";
  font-style: normal;
  font-size: 17px;
  line-height: 44px;
  color: #ffffff;
}
input {
  background: #74f0f0;
  border-radius: 16px;
  border: none;
  color: #000;
  padding-left: 20px;

  font-size: 17px;
  line-height: 44px;
}
.form-email input::placeholder {
  color: #fff;
  text-decoration-line: underline;
}

.form-username input {
  background: #74f0f0;
  border-radius: 16px;
}
.register-btn {
  background: #49f364;
  border-radius: 12px;
  width: 176px;
  font-family: "Inknut Antiqua";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  color: #ffffff;

  margin-left: 912px;
}
.register-btn:hover {
  opacity: 0.8;
}
</style>
