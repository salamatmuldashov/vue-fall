
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDwwcBtN0dgs1pdIYYot-y4P4CwkpO9D4Y",
  authDomain: "vue-lab4-4ea29.firebaseapp.com",
  projectId: "vue-lab4-4ea29",
  storageBucket: "vue-lab4-4ea29.firebasestorage.app",
  messagingSenderId: "727504375810",
  appId: "1:727504375810:web:219bd2acdfb58c24d3971b",
  measurementId: "G-D6KJW8SNVP",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('db', db);
});
