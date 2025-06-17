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

function toggleChat() {
  const chat = document.getElementById("chatbox");
  chat.classList.toggle("hidden");
}

function sendMessage(msg = null) {
  const input = document.getElementById("chat-input");
  const content = document.getElementById("chat-content");

  const userMsg = msg || input.value.trim();
  if (!userMsg) return;

  // Tampilkan pesan user
  content.innerHTML += `<div><span class="font-semibold">Kamu:</span> ${userMsg}</div>`;

  // Logika respons bot
  let botResponse = "Maaf, saya belum mengerti.";
  const msgLower = userMsg.toLowerCase();

  if (msgLower.includes("halo")) botResponse = "Halo juga! Ada yang bisa saya bantu?";
  else if (msgLower.includes("siapa kamu")) botResponse = "Saya chatbot buatan Satya.";
  else if (msgLower.includes("harga")) botResponse = "Silakan cek harga di halaman produk.";
  else if (msgLower.includes("booking")) botResponse = "Silakan isi formulir booking.";
  else if (msgLower.includes("terima kasih")) botResponse = "Sama-sama!";

  setTimeout(() => {
    content.innerHTML += `<div><span class="font-semibold">Bot:</span> ${botResponse}</div>`;
    content.scrollTop = content.scrollHeight;
  }, 500);

  input.value = "";
}

function quickReply(text) {
  document.getElementById("chat-input").value = text;
  sendMessage(text);
}
 