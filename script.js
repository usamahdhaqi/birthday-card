/* =========================================================
   BIRTHDAY CARD CONFIGURATION — ubah data di bagian ini saja
   ========================================================= */
const CONFIG = {
  recipientName: "CEYRAAA",
  senderName: "AYAH 7B WKWK",
  birthDate: "2013-11-26", // format YYYY-MM-DD
  celebratedAge: 13,       // usia yang sedang dirayakan
  birthdayMessage: "Today is your special day. May your life always be filled with happiness, endless blessings, beautiful memories, and wonderful surprises. Never stop smiling, never stop dreaming, and always remember how special you are. You deserve all the beautiful things in this world.",
  letter: [
    "On your special day, I just want to remind you how wonderful you are.",
    "I hope this new chapter brings you countless reasons to smile, new adventures, beautiful opportunities, and everything your heart has been wishing for.",
    "Thank you for being someone special. Keep shining, keep growing, and keep being yourself.",
    "Once again, Happy Birthday!"
  ],
  photos: [
    { src: "assets/images/photo1.jpg", caption: "A moment to remember" },
    { src: "assets/images/photo2.jpg", caption: "The little things" },
    { src: "assets/images/photo3.jpg", caption: "A happy memory" },
    { src: "assets/images/photo4.jpg", caption: "Forever in our hearts" }
  ],
  songName: "A Little Birthday Melody",
  audioFile: "assets/audio/birthday-music.mp3",
  theme: { pink: "#e99caf", lavender: "#e8e1f4", cream: "#fffaf5", gold: "#c9a66b" }
};

const $ = (selector) => document.querySelector(selector);
const birthdayAudio = $("#birthdayAudio");
let activePhoto = 0;
let musicStarted = false;
let countdownTimer;

/* Apply user-configured details */
document.documentElement.style.setProperty("--pink", CONFIG.theme.pink);
document.documentElement.style.setProperty("--lavender", CONFIG.theme.lavender);
document.documentElement.style.setProperty("--cream", CONFIG.theme.cream);
document.documentElement.style.setProperty("--gold", CONFIG.theme.gold);
birthdayAudio.src = CONFIG.audioFile;
birthdayAudio.volume = 0.65;
$("#volumeControl").value = String(birthdayAudio.volume);
$("#volumeControl").addEventListener("input", (event) => { birthdayAudio.volume = Number(event.target.value); });
$("#recipientName").textContent = CONFIG.recipientName;
$("#heroMessage").textContent = CONFIG.birthdayMessage;
$("#birthdayDateLabel").textContent = formatDate(parseBirthDate(CONFIG.birthDate));
$("#ageLabel").textContent = `Celebrating ${CONFIG.celebratedAge} beautiful years of ${CONFIG.recipientName}.`;
$("#year").textContent = new Date().getFullYear();

/* Small floating decorations */
function createDecorations() {
  const container = $("#floatingDecor");
  const symbols = ["♡", "✦", "✧", "·"];
  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");
    item.className = `decor ${i % 3 === 0 ? "heart-decor" : "star-decor"}`;
    item.textContent = symbols[i % symbols.length];
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.fontSize = `${10 + Math.random() * 16}px`;
    item.style.animationDelay = `${Math.random() * -8}s`;
    container.appendChild(item);
  }
}
createDecorations();

function confettiBurst(amount = 75) {
  const colors = ["#e99caf", "#c9b7e4", "#e8c98f", "#fff", "#d78aa5"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.setProperty("--duration", `${2.2 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

$("#openGift").addEventListener("click", () => {
  $("#gift").classList.add("open");
  confettiBurst(95);
  $("#openGift").disabled = true;
  window.setTimeout(() => {
    $("#welcome").classList.add("leaving");
    $("#welcome").style.transition = "opacity .7s ease, transform .7s ease";
    $("#welcome").style.opacity = "0";
    $("#welcome").style.transform = "scale(.97)";
    window.setTimeout(() => {
      $("#welcome").hidden = true;
      $("#birthdaySite").hidden = false;
      observeReveals();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 650);
  }, 650);
});

/* Cake wish interaction */
let candlesBlown = false;
$("#blowCandles").addEventListener("click", () => {
  if (candlesBlown) {
    $("#wishResult").textContent = "Your wish is already on its way! ✨";
    return;
  }
  candlesBlown = true;
  $("#flame").classList.add("off");
  const smoke = document.createElement("span");
  smoke.className = "smoke";
  $("#cakeIllustration").appendChild(smoke);
  confettiBurst(65);
  $("#wishHint").textContent = "A little wish, sent to the universe…";
  $("#wishResult").textContent = "Your wish is on its way! ✨";
  $("#blowCandles").textContent = "Wish sent ♡";
  $("#blowCandles").disabled = true;
});

/* Personal letter */
function renderLetter() {
  const content = $("#letterContent");
  content.replaceChildren();
  const greeting = document.createElement("p");
  greeting.textContent = `Dear ${CONFIG.recipientName},`;
  content.appendChild(greeting);
  CONFIG.letter.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    content.appendChild(p);
  });
  const signoff = document.createElement("p");
  signoff.innerHTML = "With love,<br>";
  const sender = document.createElement("strong");
  sender.textContent = CONFIG.senderName;
  signoff.appendChild(sender);
  content.appendChild(signoff);
}
renderLetter();
$("#openLetter").addEventListener("click", () => {
  $("#openLetter").classList.add("open");
  $("#letterInstruction").hidden = true;
  window.setTimeout(() => {
    $("#openLetter").hidden = true;
    $("#letterPaper").hidden = false;
  }, 420);
});
$("#closeLetter").addEventListener("click", () => {
  $("#letterPaper").hidden = true;
  $("#openLetter").hidden = false;
  $("#openLetter").classList.remove("open");
  $("#letterInstruction").hidden = false;
});

/* Gallery and accessible lightbox */
function renderGallery() {
  const grid = $("#photoGrid");
  CONFIG.photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "photo-card reveal";
    figure.style.setProperty("--tilt", `${index % 2 ? 2 : -2}deg`);
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";
    img.onerror = () => {
      img.src = makePlaceholder(index + 1);
      img.alt = `${photo.caption} — placeholder, ganti dengan foto lokal`;
    };
    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;
    figure.append(img, caption);
    figure.addEventListener("click", () => openLightbox(index));
    grid.appendChild(figure);
  });
}
function makePlaceholder(number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3d6df"/><stop offset="1" stop-color="#ddd4ef"/></linearGradient></defs><rect width="600" height="750" fill="url(#g)"/><circle cx="300" cy="300" r="100" fill="#fff" opacity=".35"/><text x="300" y="470" text-anchor="middle" font-family="Georgia" font-size="34" fill="#876b7c">Your photo ${number}</text><text x="300" y="520" text-anchor="middle" font-family="Arial" font-size="18" fill="#9a7e90">Replace photo${number}.jpg</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function openLightbox(index) {
  activePhoto = index;
  updateLightbox();
  $("#lightbox").hidden = false;
  document.body.style.overflow = "hidden";
  $("#lightboxClose").focus();
}
function updateLightbox() {
  const photo = CONFIG.photos[activePhoto];
  $("#lightboxImage").src = photo.src;
  $("#lightboxImage").onerror = () => { $("#lightboxImage").src = makePlaceholder(activePhoto + 1); };
  $("#lightboxCaption").textContent = photo.caption;
}
function closeLightbox() {
  $("#lightbox").hidden = true;
  document.body.style.overflow = "";
}
function movePhoto(direction) {
  activePhoto = (activePhoto + direction + CONFIG.photos.length) % CONFIG.photos.length;
  updateLightbox();
}
renderGallery();
$("#lightboxClose").addEventListener("click", closeLightbox);
$("#lightboxPrev").addEventListener("click", () => movePhoto(-1));
$("#lightboxNext").addEventListener("click", () => movePhoto(1));
$("#lightbox").addEventListener("click", (event) => { if (event.target === $("#lightbox")) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if ($("#lightbox").hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") movePhoto(-1);
  if (event.key === "ArrowRight") movePhoto(1);
});

/* Music: playback starts only after explicit user action */
async function toggleMusic() {
  try {
    if (birthdayAudio.paused) {
      await birthdayAudio.play();
      musicStarted = true;
      $("#musicToggle").classList.add("playing");
      $("#musicButtonText").textContent = "Pause music";
    } else {
      birthdayAudio.pause();
      $("#musicToggle").classList.remove("playing");
      $("#musicButtonText").textContent = "Play music";
    }
  } catch (error) {
    $("#musicButtonText").textContent = `Audio unavailable`;
    console.warn("Audio belum dapat diputar. Pastikan file audio tersedia.", error);
  }
}
$("#musicToggle").addEventListener("click", toggleMusic);
birthdayAudio.addEventListener("ended", () => {
  $("#musicToggle").classList.remove("playing");
  $("#musicButtonText").textContent = "Play music";
});

/* Surprise message */
const surpriseMessages = [
  "You are one of a kind! 💗",
  "Keep smiling, beautiful soul!",
  "May all your dreams come true!",
  "You deserve the happiest life!",
  "Sending you endless hugs! 🤗"
];
let lastSurprise = -1;
$("#surpriseButton").addEventListener("click", () => {
  let next;
  do { next = Math.floor(Math.random() * surpriseMessages.length); } while (next === lastSurprise);
  lastSurprise = next;
  $("#surpriseMessage").textContent = surpriseMessages[next];
  document.body.classList.toggle("magical-mode");
  confettiBurst(48);
});

/* Date parsing, birthday countdown and age display */
function parseBirthDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
function updateCountdown() {
  const now = new Date();
  const birth = parseBirthDate(CONFIG.birthDate);
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  const isBirthday = now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();
  if (nextBirthday < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  if (isBirthday) {
    $("#todayMessage").textContent = "Today Is Your Special Day! ♡";
  } else {
    $("#todayMessage").textContent = `Counting down to ${CONFIG.recipientName}'s next birthday ✨`;
  }
  const diff = Math.max(0, nextBirthday.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}
countdownTimer = window.setInterval(updateCountdown, 1000);
updateCountdown();

/* Scroll reveal */
let revealObserver;
function observeReveals() {
  const items = document.querySelectorAll("#birthdaySite .reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  items.forEach((item) => revealObserver.observe(item));
}
