// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJQ2ZIRS_zUWCQTxLedaxHnHjtF1OTl8M",
    authDomain: "shyamacompany-a1bcc.firebaseapp.com",
    databaseURL: "https://shyamacompany-a1bcc-default-rtdb.firebaseio.com",
    projectId: "shyamacompany-a1bcc",
    storageBucket: "shyamacompany-a1bcc.firebasestorage.app",
    messagingSenderId: "757205841705",
    appId: "1:757205841705:web:3bd40e921f5ef4ee74e938"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };