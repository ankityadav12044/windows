import { db } from "./firebase-config.js";

import {
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

document.getElementById("reviewForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const review = document.getElementById("review").value;

    await push(ref(db, "reviews"), {
        name,
        rating: Number(rating),
        review,
        createdAt: Date.now()
    });

    alert("Review Added");
});