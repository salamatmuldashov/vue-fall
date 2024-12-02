<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["rename"]);

const renamedName = ref(props.user.name); 

const renameName = () => {
  if (!renamedName.value.trim()) return;
  emits("rename", renamedName.value.trim()); 
};


</script>

<template>
  <div class="popup">
    <div class="popup-title">Enter new name for this user</div>
    <div class="popup-body">
      <input type="text" v-model="renamedName" />
      <button type="button" @click="renameName" class="popup-button">OK</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 18%;
  left: 50%;
  transform: translate(-50%, 0);
  background: linear-gradient(180deg, #62f0e8 0%, #50beb7 60%, #2f8781 100%);
  width: 650px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-title {
  margin: 36px auto 1rem;
  width: 558px;
  text-align: center;
  background: #ffffff;
  border-radius: 18px;
  font-family: "Inknut Antiqua";
  font-weight: 700;
  line-height: 44px;
  color: #1c1c1c;
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  border-radius: 1rem;
}

.popup-button {
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
</style>
