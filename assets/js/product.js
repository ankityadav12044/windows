import { db } from "../js/firebase_config.js";
import {
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


function openReviewPopup(){
    document.getElementById("reviewPopup").style.display="flex";
}

function closeReviewPopup(){
    document.getElementById("reviewPopup").style.display="none";
}

document
.getElementById("reviewForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const review =
    document.getElementById("review").value;

    const rating =
    document.querySelector(
        'input[name="rating"]:checked'
    )?.value;

    if (!rating) {

        Swal.fire({
            icon: "warning",
            title: "Rating Required",
            text: "Please select a rating first.",
            confirmButtonColor: "#ff7a1a"
        });

        return;
    }

    await push(ref(db, "reviews"), {

        name,
        review,
        rating: Number(rating),
        createdAt: new Date().toISOString()

    });

    Swal.fire({

        imageUrl: "https://shyamacompany.vercel.app/assets/img/logo.png",

        imageWidth: 150,

        title: "Thank You!",

        html: `
            <p style="font-size:16px;color:#666;">
                Your review has been submitted successfully.
            </p>

            <div style="
                background:#fff7f0;
                padding:15px;
                border-radius:12px;
                margin-top:75px;
                color:#0a1128;
                font-weight:600;
            ">
                ⭐ ${rating}/5 Rating Received <br>
                We appreciate your valuable feedback.
            </div>
        `,

        confirmButtonText: "Awesome!",

        confirmButtonColor: "#ff7a1a",

        background: "#fff",

        backdrop: `
            rgba(10,17,40,0.7)
        `

    });

    e.target.reset();

    closeReviewPopup();

});