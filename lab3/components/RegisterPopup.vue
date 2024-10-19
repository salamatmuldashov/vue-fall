<script setup>
const messageClicked = ref("CLICK TO CONFIRM");
const secretPhrase = ref("");

const clickedConfirm = () => {
  messageClicked.value = "CONFIRMED!!!";
  document.querySelector(".email-confirm-button").style.opacity = "0.5";
};

const props = defineProps({
  email: String,
  username: String,
  password1: String,
  password2: String,
});

const people = useState("people", () => []);

const finishRegistration = () => {

  const id = people.value.length + 1;
  const avatarUrl = `https://randomuser.me/api/portraits/men/${id}.jpg`;

  const newUser = {
    id: id,
    name: props.username,
    email: props.email,
    password: props.password1,
    avatar: avatarUrl,
    rating: 0,
    date: "2024-09-10T18:15:00",
    comment: "Great opportunity!!!",
    topic: "Adventure",
  };

  people.value.push(newUser);

  navigateTo("/");
};
</script>

<template>
  <div class="popup">
    <div class="popup-title">TO CREATE ACCOUNT DO NEXT STEPS</div>
    <div class="email-confirm">
      <div class="email-confirm-label">CONFIRM YOU EMAIL</div>
      <button
        class="email-confirm-button"
        type="button"
        @click="clickedConfirm"
      >
        {{ messageClicked }}
      </button>
    </div>
    <div class="secret-pass">
      <div class="secret-pass-label">ENTER THE SECRET PHRASE</div>

      <input
        class="secret-pass-field"
        type="password"
        name="password"
        v-model="secretPhrase"
      />
    </div>
    <button class="popup-button" @click="finishRegistration">
      CREATE {{ username }}
    </button>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 18%;
  left: 50%;
  transform: translate(-50%, 0);
  background: linear-gradient(180deg, #62f0e8 0%, #50beb7 60%, #2f8781 100%);
  width: 1350px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-title {
  margin: 36px auto 0;
  width: 558px;
  text-align: center;
  background: #ffffff;
  border-radius: 18px;
  font-family: "Inknut Antiqua";
  font-weight: 700;
  line-height: 44px;
  color: #1c1c1c;
}

.email-confirm,
.secret-pass {
  display: flex;
  gap: 350px;
  padding: 70px 200px 100px;
}

.email-confirm-label,
.secret-pass-label {
  font-family: "Inknut Antiqua";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #ffffff;
}

.email-confirm-button {
  width: 332px;
  background: #d6e343;
  border-radius: 12px;
  font-family: "Inknut Antiqua";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 62px;

  color: #000000;
}

.secret-pass-field {
  width: 332px;

  background: #44b3d6;
}

.popup-button {
  padding: 10px 90px;
  background: #44b3d6;
  border-radius: 40px;
  font-family: "Inknut Antiqua";
  font-weight: 800;
  font-size: 17px;
  line-height: 44px;
  color: #ffffff;
  margin-bottom: 40px;
}
</style>
