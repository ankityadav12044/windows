document.querySelectorAll('.loader-wrapper').forEach(loader => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 2000);
});


window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbar");

  if (window.scrollY > 150) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


window.addEventListener("scroll", function () {
  let navbar = document.getElementById("openMenu");

  if (window.scrollY > 150) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// mobile view menu bar

const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const menu = document.getElementById('mobileMenu');

// Open Menu
openBtn.addEventListener('click', () => {
    menu.classList.add('active');
    
});

// Close Menu
closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
});

// Close when clicking outside the sidebar
window.addEventListener('click', (e) => {
    if (e.target === menu) {
        menu.classList.remove('active');
    }
});



