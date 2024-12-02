<script setup>


const username = ref("");
const password = ref("");

const people = useState("people");

const error = ref({
  isActive: null,
  msg: "",
});

const login = () => {
  error.value.isActive = false;
  error.value.msg = "";

  if (!username.value) {
    error.value.isActive = true;
    error.value.msg = "Username is empty.";
    return;
  }
  if (!password.value) {
    error.value.isActive = true;
    error.value.msg = "Password is empty.";
    return;
  }
  const user = people.value.find((user) => user.name === username.value);
  if (user) {
    if (user.password === password.value) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigateTo("/");
    } else {
      error.value.isActive = true;
      error.value.msg = "Password is not correct! Please try again!";
    }
  } else {
    error.value.isActive = true;
    error.value.msg = "User does not exist!";
  }
};
</script>

<template>
  <Header />
  <div class="login-page">
    <div class="login-page-title">LOGIN</div>
    <form action="/login" class="login-form">
      <input
        type="text"
        name="username"
        required
        placeholder="ENTER USERNAME"
        v-model="username"
      />

      <input
        type="password"
        name="password"
        required
        placeholder="ENTER PASSWORD"
        v-model="password"
      />

      <span v-if="error.isActive">{{ error.msg }}</span>

      <NuxtLink to="/forget_password" class="forgot-password"
        >FORGOT PASSWORD?</NuxtLink
      >
      <button type="button" class="form-button" @click="login">
        AUTHORIZE
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  position: fixed;
  top: 18%;
  left: 50%;
  transform: translate(-50%, 0);
  background: linear-gradient(180deg, #fffefe 0%, #c1bdbd 100%);
  border-radius: 20px;
  z-index: 1000;

  width: 431px;
}

.login-page-title {
  background: #75c2fa;
  border-radius: 10px 10px 0px 0px;

  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: 0.58em;
  text-align: center;

  color: #ffffff;
}

.login-form {
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  gap: 35px;
}

input {
  margin: 0 auto;
  width: 335px;
  background: white;
  font-family: "Inknut Antiqua";

  font-weight: 800;
  font-size: 17px;
  line-height: 44px;
  color: #000000;
}

.forgot-password {
  width: 201px;
  background: #ffffff;

  font-family: "Jersey 15";
  font-size: 20px;
  line-height: 20px;

  color: #000000;
  text-decoration: none;
  margin: 0 auto;
}

.form-button {
  width: 204px;
  margin: 0 auto;

  background: #6bff67;
  border-radius: 11px;

  font-family: "Jersey 15";
  font-size: 20px;
  letter-spacing: 0.5em;
  line-height: 50px;

  color: #ffffff;
  border: none;
  margin-bottom: 5rem;
}
</style>
