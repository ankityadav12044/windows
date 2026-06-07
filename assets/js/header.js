document.querySelectorAll('.loader-wrapper').forEach(loader => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 2000);
});


const scrollTracker = document.querySelector(".scroll-tracker");

if (scrollTracker) {
    const updateScrollTracker = () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 360 : 0;

        scrollTracker.style.setProperty("--scroll-progress", `${progress}deg`);
        scrollTracker.classList.toggle("is-visible", scrollTop > 120);
    };

    scrollTracker.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", updateScrollTracker, { passive: true });
    updateScrollTracker();
}

let count = 0;

const percent = document.getElementById("percent");
const progress = document.getElementById("progress");
const loader = document.getElementById("loader");

const interval = setInterval(() => {

    count++;

    percent.innerHTML = count + "%";
    progress.style.width = count + "%";

    if(count >= 100){

        clearInterval(interval);

        setTimeout(() => {

            loader.style.transition = "all .8s ease";
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        },300);

    }

},20);


const leadBox =
document.getElementById("leadBox");

document
.getElementById("openLead")
.onclick = () => {

    leadBox.classList.add("active");

};

document
.getElementById("closeLead")
.onclick = () => {

    leadBox.classList.remove("active");

};





const form =
document.getElementById("quoteForm");

const btn =
document.getElementById("submit");


form.addEventListener("submit", function(e) {
    e.preventDefault();

    btn.innerHTML = "Sending...";
    btn.disabled = true;

   const formData = new FormData(this);

formData.append("mailid", "ankityadav12044@gmail.com");

fetch("https://dbifashion.dbidemo.online/backend/dashboard/frontendapi/send_mail.php", {
    method: "POST",
    body: formData
})
    .then(response => response.text())
    .then(() => {
Swal.fire({

    imageUrl:"https://shyamacompany.vercel.app/assets/img/logo.png",

    imageWidth:150,

    title:"Thank You!",

    html:`
        <p style="font-size:16px;color:#666;">
            Your quotation request has been submitted.
        </p>

        <div style="
            background:#fff7f0;
            padding:15px;
            border-radius:12px;
            margin-top:15px;
            color:#0a1128;
            font-weight:600;
        ">
            Our team will contact you within 24 hours.
        </div>
    `,

    confirmButtonText:"Great!",

    confirmButtonColor:"#ff7a1a",

    background:"#fff",

    backdrop:`
        rgba(10,17,40,0.7)
    `

});

        form.reset();
        document.getElementById("leadBox").classList.remove("active");
   
    })
    .catch(error => {
        console.log(error);

        Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Try again later."
        });
    })
    .finally(() => {
        btn.innerHTML = "Request Quote";
        btn.disabled = false;
    });
});

// form.addEventListener("submit", function(e){

//     e.preventDefault();

//     // 🔵 Button loading start
//     btn.innerHTML = "Sending...";
//     btn.disabled = true;

//     emailjs.sendForm(
//         "service_v5rqyta",
//         "template_wznxlu9",
//         this
//     )
//     .then(() => {
// Swal.fire({

//     imageUrl:"https://shyamacompany.vercel.app/assets/img/logo.png",

//     imageWidth:150,

//     title:"Thank You!",

//     html:`
//         <p style="font-size:16px;color:#666;">
//             Your quotation request has been submitted.
//         </p>

//         <div style="
//             background:#fff7f0;
//             padding:15px;
//             border-radius:12px;
//             margin-top:15px;
//             color:#0a1128;
//             font-weight:600;
//         ">
//             Our team will contact you within 24 hours.
//         </div>
//     `,

//     confirmButtonText:"Great!",

//     confirmButtonColor:"#ff7a1a",

//     background:"#fff",

//     backdrop:`
//         rgba(10,17,40,0.7)
//     `

// });

//         form.reset();
//         // leadBox.classList.remove("active");
//         document.getElementById("leadBox").style.display = "none";

//     })
//     .catch((error) => {

//         Swal.fire({
//             icon: "error",
//             title: "Failed",
//             text: "Try again later."
//         });

//         console.log(error);

//     })
//     .finally(() => {

//         // 🔵 Button reset
//         btn.innerHTML = "Request Quote";
//         btn.disabled = false;

//     });

// });
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

window.addEventListener("scroll", function () {
  let email = document.querySelector(".lead-toggle");

  if (window.scrollY > 150) {
    email.style.bottom = "86px";
    email.style.transition = "all .8s ease";
  } else {
    email.style.bottom = "5px";
    email.style.transition = "all .8s ease";
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



const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-left a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});