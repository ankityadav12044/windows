import { db } from "./firebase_config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const reviewContainer = document.getElementById("reviewSlider");

let swiper;

onValue(ref(db, "reviews"), (snapshot) => {

    const data = snapshot.val();

    console.log("Firebase Data:", data);

    if (!reviewContainer) {
        console.error("reviewSlider element not found");
        return;
    }

    reviewContainer.innerHTML = "";

    if (!data) {
        reviewContainer.innerHTML = `
            <div class="swiper-slide">
                <p>No Reviews Found</p>
            </div>
        `;
        return;
    }

    Object.values(data)
        .reverse()
        .forEach(item => {

            const stars =
                '<i class="fa-solid fa-star"></i>'.repeat(item.rating);

            reviewContainer.innerHTML += `
                <div class="swiper-slide">
                    <div class="card">
                        <div class="card-content">

                            <div class="stars">
                                <div class="rating_star">
                                    ${stars}
                                </div>

                                <div class="qutes">
                                    <i class="fa-solid fa-quote-left"></i>
                                </div>
                            </div>

                            <p>${item.review || ""}</p>

                            <div class="author">
                                <i class="fa fa-user"></i>

                                <div class="author-info">
                                    <h4>${item.name || "Anonymous"}</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        });

    if (swiper) {
        swiper.destroy(true, true);
    }

    swiper = new Swiper(".testimonial", {
        loop: true,
        grabCursor: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        }
    });

});