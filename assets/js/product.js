// Product Gallery

const thumbs = document.querySelectorAll(".thumbs img");
const mainImage = document.querySelector(".main-image img");

thumbs.forEach((thumb) => {

    thumb.addEventListener("click", () => {

        thumbs.forEach(item =>
            item.classList.remove("active")
        );

        thumb.classList.add("active");

        mainImage.src = thumb.src;
    });

});


// FAQ Accordion

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const button = item.querySelector("button");

    button.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});

new Swiper(".optionsSwiper", {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    }
});