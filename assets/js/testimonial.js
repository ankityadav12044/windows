
        var swiper = new Swiper(".testimonial", {
            slidesPerView: 1, // Shows 1 slide on mobile
            spaceBetween: 30, // Space between cards
            loop: true, // Infinite looping
            grabCursor: true, // Shows hand cursor on hover
            pagination: {
                el: ".swiper-pagination",
                clickable: true, // Allows clicking the lines to change slides
            },
            autoplay: {
                delay: 4000, // Auto scrolls every 4 seconds
                disableOnInteraction: false, // Keeps auto-playing after user clicks
            },
            breakpoints: {
                // When screen width is >= 1024px (Desktops)
                1024: {
                    slidesPerView: 2, // Shows 2 slides side-by-side
                    spaceBetween: 40,
                }
            }
        });
    