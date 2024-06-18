const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Tu configuración de Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyAYmN4AgZ7ErfKE_vih5yMuKkc9_8cVuR0",
  authDomain: "agrodronmatchapp.firebaseapp.com",
  projectId: "agrodronmatchapp",
  storageBucket: "agrodronmatchapp.appspot.com",
  messagingSenderId: "321379887089",
  appId: "1:321379887089:web:3c1ff1f586b358c2df0650"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Exportar los módulos de Firebase
module.exports = {
  auth: firebase.auth,
  firestore: firebase.firestore
};