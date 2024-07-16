// notifications/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAThM7v5kdLjnEYJPL57QnOJ9rxQlmPPBI",
  authDomain: "pushnotifications-1bd26.firebaseapp.com",
  projectId: "pushnotifications-1bd26",
  storageBucket: "pushnotifications-1bd26.appspot.com",
  messagingSenderId: "698001716226",
  appId: "1:698001716226:web:d43e6f70f73bc6f06e631b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BGCBjfxYc1PdlsU1NrUIY1Kp0gFN3xS8et18pJHNrVoPCYZTBcWb9VJAnKk5DUVufLKa7lWONOsKpr9ht5decws",
      });
      console.log(token);
      // Aquí puedes enviar el token a tu servidor si es necesario
    }
  } catch (error) {
    console.error('Error al generar el token de FCM', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
