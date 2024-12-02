<template>
  <Header @chooseTopic="chooseTopic"/>
  <div class="chat-page" v-if="!isLoading && messages">
    <div class="welcome-message" v-if="!messages.length">
      Please, start the chat with {{ user.name }}
    </div>
    <div class="chat-content">
      <Message
        v-for="message in messages"
        :key="message.id"
        :id="message.id"
        :senderId="message.senderId"
        :message="message.body"
        :date="message.date"
        :avatar="getAvatar(message.senderId)"
        :name="getName(message.senderId)"
      />
    </div>

    <div v-if="currentUser && user" class="chat-input-container">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message"
        class="chat-input"
        @keyup.enter="sendMessage(currentUser)"
      />
      <button
        @click="sendMessage(currentUser)"
        :disabled="!newMessage.trim()"
        class="chat-send-button"
      >
        Send
      </button>

      <div class="chat-info">
        <div class="chat-avatar">
          <NuxtImg :src="currentUser.avatar" class="chat-avatar" />
        </div>

        <div class="chat-name">You</div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <p>Loading chat...</p>
  </div>
</template>

<script setup>
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  addDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
} from "firebase/firestore";
import { encodeId, decodeId } from "@/utils/generator";

const { chooseTopic } = useTopic();
const currentUser = useState("currentUser");
const initialPeople = useState("people");
const people = useState("people");
const user = ref(null);
const route = useRoute();
const { $db } = useNuxtApp();
const messages = ref(undefined);
const chatId = ref(null);
const newMessage = ref("");
const isLoading = ref(null);

const fetchUser = () => {
  const { userId1, userId2 } = decodeId(route.params.id);
  const otherUserId = userId1 === currentUser.value.id ? userId2 : userId1;
  user.value = people.value.find((person) => person.id === otherUserId);
  chatId.value = route.params.id;
};

const getAvatar = (senderId) => {
  return senderId === currentUser.value.id
    ? currentUser.value.avatar
    : user.value.avatar;
};

const getName = (senderId) => {
  return senderId === currentUser.value.id ? "You" : user.value.name;
};

const fetchMessages = async () => {
  try {
    const cachedMessages = localStorage.getItem(chatId.value);
    if (cachedMessages) {
      messages.value = JSON.parse(cachedMessages);
    }
    const messagesQuery = query(
      collection($db, "messages"),
      where("chatId", "==", chatId.value),
      orderBy("timestamp")
    );

    onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      messages.value = newMessages;

      localStorage.setItem(chatId.value, JSON.stringify(newMessages));
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = async (currentUser) => {
  try {
    const message = {
      chatId: chatId.value,
      body: newMessage.value,
      senderId: currentUser.id,
      date: new Date().toISOString(),
      timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    };
    newMessage.value = "";

    const { chatExists, chatRef } = await retrieveChat();

    if (!chatExists) {
      await createChatAndSaveToDatabase();
    }

    const messageRef = await addDoc(collection($db, "messages"), message);
    await updateDoc(chatRef, {
      messages: arrayUnion(messageRef),
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

const createChatAndSaveToDatabase = async () => {
  try {
    const chatRef = doc($db, "chats", chatId.value.toString());
    await setDoc(chatRef, {
      id: chatId.value,
      messages: [],
    });
  } catch (error) {
    console.log("Error creating chat:", error);
  }
};

const retrieveChat = async () => {
  try {
    const docRef = doc($db, "chats", chatId.value.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { chatExists: true, chatRef: docRef };
    } else {
      return { chatExists: false, chatRef: docRef };
    }
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;
  }
};

onMounted(async () => {
  isLoading.value = true;
  if (!JSON.parse(localStorage.getItem('people'))) {
    people.value = initialPeople.value
  } else {
    people.value = JSON.parse(localStorage.getItem("people"));
  }
  fetchUser();

  await fetchMessages();
  //   isLoading.value = false;
});
onBeforeMount(() => {
  if (!localStorage.getItem("currentUser")) {
    navigateTo("/");
    return;
  }
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
});
</script>

<style scoped>
.welcome-message {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 2rem;
  color: black;
  font-weight: 900;
}

.chat-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  min-height: 1200px;
  padding: 5rem 7rem 0 7rem;
}

.chat-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-input-container {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.chat-input {
  min-width: 250px;
  min-height: 39px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-radius: 15px;
  border: none;

  font-family: "Inknut Antiqua", serif;
  font-weight: 700;
  font-size: 1rem;

  color: #000000;
  word-break: break-word;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chat-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.chat-name {
  color: #2713ff;
  font-family: "Inknut Antiqua";
  font-size: 20px;
  font-weight: 800;
}
.chat-avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.chat-send-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
}

.chat-send-button:hover {
  opacity: 0.6;
}

.chat-send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);
  height: 100vh;
  padding: 5rem 7rem 0 7rem;
}
</style>
