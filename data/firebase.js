// data/firebase.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Configuración de Firebase copiada de la consola
const firebaseConfig = {
    apiKey: "AIzaSyCg0dftt8_wcFpe6-Ze1L0pvjluwwBqPkQ",
    authDomain: "adoption-f26a1.firebaseapp.com",
    projectId: "adoption-f26a1",
    storageBucket: "adoption-f26a1.appspot.com",
    messagingSenderId: "277892513661",
    appId: "1:277892513661:web:0573c32667dbc5cff59614",
    measurementId: "G-QJJB3NGHJ6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
