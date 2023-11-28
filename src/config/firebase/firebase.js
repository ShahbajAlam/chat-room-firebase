import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmlOzuT8kg6mYZ3UGGNmp0FmNXiqJ_v4k",
    authDomain: "chat-room-1351a.firebaseapp.com",
    projectId: "chat-room-1351a",
    storageBucket: "chat-room-1351a.appspot.com",
    messagingSenderId: "613121906985",
    appId: "1:613121906985:web:916c4178c34c19b032ff38",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
