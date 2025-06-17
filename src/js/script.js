// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

function carousel() {
  return {
    current: 0,
    total: 3,
    start() {
      setInterval(() => {
        this.current = (this.current + 1) % this.total;
      }, 5000); // Ganti slide setiap 3 detik
    },
  };
}

let valueDisplays = document.querySelectorAll(".num");
let interval = 5000; // 5 seconds

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);

  let counter = setInterval(() => {
    startValue += 100;
    valueDisplay.textContent = startValue;

    if (startValue === endValue) {
      clearInterval(counter);
    }
    valueDisplay.textContent = formatRupiah(startValue);
  }, duration);
});

function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const scrollcarousel = document.getElementById("scrollcarousel");
let isDragging = false;
let startX, scrollStart;
let autoplayInterval;
let pauseAutoplayTimeout;

// Manual Drag
scrollcarousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - scrollcarousel.offsetLeft;
  scrollStart = scrollcarousel.scrollLeft;
  scrollcarousel.classList.add("cursor-grabbing");
  pauseAutoplay(); // jeda autoplay saat drag
});

scrollcarousel.addEventListener("mouseleave", () => {
  isDragging = false;
  scrollcarousel.classList.remove("cursor-grabbing");
  resumeAutoplay(); // lanjut autoplay lagi
});

scrollcarousel.addEventListener("mouseup", () => {
  isDragging = false;
  scrollcarousel.classList.remove("cursor-grabbing");
  resumeAutoplay();
});

scrollcarousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollcarousel.offsetLeft;
  const walk = (x - startX) * 2;
  scrollcarousel.scrollLeft = scrollStart - walk;
});

// Touch Support (Mobile)
scrollcarousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - scrollcarousel.offsetLeft;
  scrollStart = scrollcarousel.scrollLeft;
  pauseAutoplay();
});

scrollcarousel.addEventListener("touchend", () => {
  isDragging = false;
  resumeAutoplay();
});

scrollcarousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - scrollcarousel.offsetLeft;
  const walk = (x - startX) * 2;
  scrollcarousel.scrollLeft = scrollStart - walk;
});

const kerjasamacarousel = document.getElementById("infinite-carousel");

let scrollAmount = 0;
let scrollSpeed = 1; // pixel per frame

function autoScrollCarousel() {
  scrollAmount += scrollSpeed;
  kerjasamacarousel.scrollLeft = scrollAmount;

  if (scrollAmount >= kerjasamacarousel.scrollWidth / 2) {
    scrollAmount = 0;
    kerjasamacarousel.scrollLeft = 0;
  }

  requestAnimationFrame(autoScrollCarousel);
}

autoScrollCarousel();

// // Toggle chatbox visibility
// function toggleChat() {
//   const chat = document.getElementById("chatbox");
//   chat.classList.toggle("hidden");
// }

// // Fungsi kirim pesan ke Gemini API
// async function sendMessage() {
//   const input = document.getElementById("chat-input");
//   const content = document.getElementById("chat-content");

//   const userMsg = input.value.trim();
//   if (!userMsg) return;

//   // Tampilkan pesan dari user
//   content.innerHTML += `<div><span class="font-semibold">Kamu:</span> ${userMsg}</div>`;

//   // Tampilkan indikator mengetik
//   content.innerHTML += `<div id="loading-response"><span class="font-semibold">Bot:</span> Mengetik...</div>`;
//   content.scrollTop = content.scrollHeight;

//   // Reset input
//   input.value = "";

//   try {
//     const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAvKwnPr5nqtI9zyDTuDYvD35srg8KPKWQ", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: userMsg }] }],
//       }),
//     });

//     const result = await response.json();

//     let botReply = "Maaf, saya belum bisa menjawab.";
//     if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
//       botReply = result.candidates[0].content.parts[0].text;
//     }

//     document.getElementById("loading-response").remove();
//     content.innerHTML += `<div><span class="font-semibold">Bot:</span> ${botReply}</div>`;
//     content.scrollTop = content.scrollHeight;
//   } catch (error) {
//     console.error("Error:", error);
//     document.getElementById("loading-response").remove();
//     content.innerHTML += `<div><span class="font-semibold">Bot:</span> Terjadi kesalahan saat menghubungi AI.</div>`;
//   }
// }
