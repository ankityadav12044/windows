var swiper = new Swiper(".testimonial", {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 3000, // Time between slides (3 seconds)
                disableOnInteraction: false, // Continue autoplay after user interaction
            },
            spaceBetween: 40, // Space between cards
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // BREAKPOINTS: Control layout for Desktop & Mobile
            breakpoints: {
                // Mobile device width (0px to 767px) -> Shows 2 slides
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // Tablet width (768px to 1023px) -> Shows 2 slides
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                // Laptop/Desktop width (1024px and above) -> Shows 3 slides
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            },
        });