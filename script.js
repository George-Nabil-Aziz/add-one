import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the counter
const counterRef = ref(database, "counter");

// Listen for real-time updates
onValue(counterRef, (snapshot) => {
  const data = snapshot.val();
  document.getElementById("counter").textContent = data || 0;
});

// Increment the counter
const button = document.getElementById("incrementButton");
button.addEventListener("click", async () => {
  const currentSnapshot = await ref(database, "counter").get();
  const currentCount = currentSnapshot.val() || 0;
  set(counterRef, currentCount + 1);
});
