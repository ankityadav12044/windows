var swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 1000,
    effect: "fade", // Fade tabhi dikhega jab slidesPerView 1 ho
    fadeEffect: {
        crossFade: true 
    },
    // autoplay: {
    //     delay: 4000,
    //     disableOnInteraction: false,
    // },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 1, // Fade ke liye isse 1 hi rakhna padega
            spaceBetween: 30
        }
    }
});

const slider = new Swiper(".myCarousel", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: false, // Takki slides khatam na ho
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    // Navigation arrows enable karein
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1300: { slidesPerView: 4 }
    }
});

// our category hover js 

const showcaseGrid = document.querySelector(".window-showcase-grid");

if (showcaseGrid) {
    const cards = showcaseGrid.querySelectorAll(".window-showcase-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            showcaseGrid.classList.add("is-interacting");

            cards.forEach(c => c.classList.remove("is-active"));
            card.classList.add("is-active");
        });
    });

    showcaseGrid.addEventListener("mouseleave", () => {
        showcaseGrid.classList.remove("is-interacting");
        cards.forEach(c => c.classList.remove("is-active"));
    });
}

// gallery preview

const galleryLightbox = document.querySelector(".project-gallery-lightbox");

if (galleryLightbox) {
    const galleryTriggers = Array.from(document.querySelectorAll(".project-gallery-trigger"));
    const galleryImage = galleryLightbox.querySelector(".project-gallery-lightbox-image");
    const galleryTitle = galleryLightbox.querySelector(".project-gallery-lightbox-title");
    const galleryCount = galleryLightbox.querySelector(".project-gallery-lightbox-count");
    const closeButton = galleryLightbox.querySelector(".project-gallery-lightbox-close");
    const prevButton = galleryLightbox.querySelector(".project-gallery-lightbox-prev");
    const nextButton = galleryLightbox.querySelector(".project-gallery-lightbox-next");
    let activeIndex = 0;

    const renderGalleryImage = (index) => {
        const trigger = galleryTriggers[index];
        if (!trigger) return;

        activeIndex = index;
        galleryImage.src = trigger.dataset.image || "";
        galleryImage.alt = trigger.dataset.title || "Gallery preview";
        galleryTitle.textContent = trigger.dataset.title || "Gallery image";
        galleryCount.textContent = `${index + 1} of ${galleryTriggers.length}`;
    };

    const openGallery = (index) => {
        renderGalleryImage(index);
        galleryLightbox.classList.add("is-open");
        galleryLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        galleryLightbox.classList.remove("is-open");
        galleryLightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const showNext = () => {
        renderGalleryImage((activeIndex + 1) % galleryTriggers.length);
    };

    const showPrev = () => {
        renderGalleryImage((activeIndex - 1 + galleryTriggers.length) % galleryTriggers.length);
    };

    galleryTriggers.forEach((trigger, index) => {
        trigger.addEventListener("click", () => openGallery(index));
    });

    closeButton.addEventListener("click", closeGallery);
    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrev);

    galleryLightbox.addEventListener("click", (event) => {
        if (event.target === galleryLightbox) {
            closeGallery();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!galleryLightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") closeGallery();
        if (event.key === "ArrowRight") showNext();
        if (event.key === "ArrowLeft") showPrev();
    });
}


