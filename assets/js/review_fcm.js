

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJQ2ZIRS_zUWCQTxLedaxHnHjtF1OTl8M",
  authDomain: "shyamacompany-a1bcc.firebaseapp.com",
  databaseURL: "https://shyamacompany-a1bcc-default-rtdb.firebaseio.com",
  projectId: "shyamacompany-a1bcc",
};




const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("reviewForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const rating =
    document.getElementById("rating").value;

    const review =
    document.getElementById("review").value;

    await push(ref(db, "reviews"), {
        name,
        rating: Number(rating),
        review,
        createdAt: Date.now()
    });

    alert("Review Added");

});



import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const reviewBox =
document.getElementById("reviewList");

onValue(ref(db, "reviews"), (snapshot) => {

    reviewBox.innerHTML = "";

    const data = snapshot.val();

    if(!data) return;

    Object.values(data).reverse().forEach(item => {

       const stars = "★".repeat(item.rating) +
              "☆".repeat(5 - item.rating);

reviewList.innerHTML += `
<div class="review-card">
    <h4>${item.name}</h4>
    <div>${stars}</div>
    <p>${item.review}</p>
</div>
`;
    });

});