// image paths
const images = ["./img/michi1.jpg", "./img/michi2.jpg", "./img/michi3.jpg", "./img/4_Image.jpg"];

// get all elements (buttons, container, overlay)
const container = document.getElementById("valentines-container");
const refreshButton = document.getElementById("refreshButton");
const letterButton = document.getElementById("letterButton");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");

// show random image with anime.js animation
function showRandomImage() {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  container.innerHTML = `<img src="${randomImage}" alt="Inspirational Image">`;

  const img = container.querySelector("img");
  // start hidden
  img.style.opacity = 0;
  img.style.transform = "scale(0.5) translateY(40px)";

  anime({
    targets: img,
    opacity: [0, 1],
    scale: [0.5, 1],
    translateY: [40, 0],
    duration: 800,
    easing: "easeOutElastic(1, 0.6)",
  });
}

// initial image
showRandomImage();

// refresh images (no reload)
refreshButton.addEventListener("click", showRandomImage);

// open letter overlay
letterButton.addEventListener("click", () => {
  letterOverlay.classList.remove("hidden");
});

// close letter overlay
closeLetter.addEventListener("click", () => {
  letterOverlay.classList.add("hidden");
});

// ❤ Valentine's Day floating hearts background (optimised)
const heartsBg = document.getElementById("hearts-bg");
const heartEmojis = ["❤️", "💕", "💖", "💗", "💘", "💝", "🩷", "✨", "🌸"];

const MAX_HEARTS = 30;
const SPAWN_INTERVAL = 500; // ms
const pool = [];           // reusable DOM nodes
let activeHearts = 0;
let spawnTimer = null;

function getHeart() {
  if (pool.length) return pool.pop();
  const el = document.createElement("span");
  el.classList.add("heart");
  return el;
}

function releaseHeart(el) {
  el.style.animation = "none";
  el.offsetHeight;           // force reflow to reset animation
  el.remove();
  activeHearts--;
  pool.push(el);
}

function spawnHeart() {
  if (activeHearts >= MAX_HEARTS) return;

  const el = getHeart();
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (16 + Math.random() * 24) + "px";

  const duration = 4 + Math.random() * 5; // seconds
  const fallDist = window.innerHeight + 80;
  const rotation = ((Math.random() - 0.5) * 90) + "deg";

  el.style.setProperty("--fall-dist", fallDist + "px");
  el.style.setProperty("--rotation", rotation);
  el.style.animation = "none";
  el.offsetHeight; // reflow
  el.style.animationDuration = duration + "s";
  el.style.animation = `heartFall ${duration}s linear forwards`;

  heartsBg.appendChild(el);
  activeHearts++;

  el.onanimationend = () => releaseHeart(el);
}

function startHearts() {
  if (spawnTimer) return;
  spawnTimer = setInterval(spawnHeart, SPAWN_INTERVAL);
}

function stopHearts() {
  clearInterval(spawnTimer);
  spawnTimer = null;
}

// pause when tab is hidden to save resources
document.addEventListener("visibilitychange", () => {
  document.hidden ? stopHearts() : startHearts();
});

startHearts();
// small initial burst
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 150);

// Draggables
