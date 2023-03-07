importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

firebase.initializeApp({
  messagingSenderId: "1082025757793",
});

const messaging = firebase.messaging();

