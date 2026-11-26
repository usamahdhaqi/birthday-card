/* ==========================================================================
   1. KONFIGURASI UTAMA (DISESUAIKAN UNTUK CEYRA - LAHIR 26 NOVEMBER 2013)
   ========================================================================== */
const BIRTHDAY_CONFIG = {
  recipientName: "Ceyra",
  senderName: "Ayah 7b wkwk",

  // Format: YYYY-MM-DD (26 November 2013)
  birthDate: "2013-11-26",

  // Kosongkan (null) agar usia dihitung otomatis dari birthDate (2026 - 2013 = 13 tahun)
  customAge: null,

  // Ucapan Utama di Hero Section (Mix Bahasa Indonesia & Bahasa Inggris)
  greetingMessage: `Happy Birthday, Ceyra! 🎉

Today is your special day. Selamat ulang tahun ya, Ceyra! Semoga di usia yang baru ini kamu selalu diberi kesehatan, kebahagiaan, keberkahan yang melimpah, dan makin semangat belajar serta meraih cita-citamu.

Never stop smiling, never stop dreaming, and always remember how special you are. Teruslah tumbuh jadi pribadi yang baik, kreatif, dan percaya diri.

You deserve all the beautiful things in this world. ✨`,

  // Isi Surat Digital di Dalam Amplop (Mix Bahasa Indonesia & Bahasa Inggris)
  letterMessage: `Dear Ceyra,

On your special day, Bapak/Ibu ingin mengingatkan betapa bangganya kami melihat perkembanganmu. Happy birthday, semoga tahun ini membawa banyak cerita seru dan prestasi yang membanggakan!

I hope this new chapter brings you countless reasons to smile, new adventures, beautiful opportunities, and everything your heart has been wishing for. Jangan pernah takut mencoba hal baru dan teruslah bertanya kalau ada yang belum kamu pahami.

Thank you for being someone special in our class. Kehadiranmu selalu membawa warna positif di kelas.

Keep shining, keep growing, and keep being yourself. Tetap rendah hati, rajin berdoa, dan jaga semangat belajarmu ya.

Once again, Happy Birthday! Selamat ulang tahun, Ceyra!

With love & best wishes,
Pak Usamah`,

  // Daftar Foto Galeri (Pastikan nama file sesuai dengan folder assets/images/)
  photos: [
    {
      src: "assets/images/photo1.jpg",
      caption: "Momen seru penuh tawa bersama ✨"
    },
    {
      src: "assets/images/photo2.jpg",
      caption: "Keep smiling, great things are coming 🌸"
    },
    {
      src: "assets/images/photo3.jpg",
      caption: "Kenangan berharga di perjalanan belajar 💗"
    },
    {
      src: "assets/images/photo4.jpg",
      caption: "Here’s to a brighter year ahead! 🌟"
    }
  ],

  // Judul Lagu di Pemutar Musik
  songTitle: "Happy Birthday — Special Mix",

  // Pesan Kejutan Acak (Mix Bahasa Indonesia & Bahasa Inggris)
  surpriseMessages: [
    "You are one of a kind! Semangat terus ya, Ceyra! 💗",
    "Keep smiling, beautiful soul! Senyummu itu bikin hari lebih cerah ✨",
    "May all your dreams come true! Semoga semua cita-citamu tercapai 🌟",
    "You deserve the happiest life! Selamat bertambah usia ya! 🌸",
    "Sending you endless hugs! Tetap jadi anak yang hebat dan baik hati 🤗",
    "Terus berkarya dan jangan berhenti belajar ya, Ceyra! 🚀"
  ],

  // Palet Warna Tema Utama
  themeColors: {
    pink: "#f8b4c8",
    pinkDeep: "#e87a9f",
    lavender: "#d8c8f8",
    cream: "#fff9f5",
    gold: "#d4af37"
  },

  // Variasi Background Gradient untuk Tombol "Click for a Surprise!"
  surpriseGradients: [
    "linear-gradient(135deg, #fff9f5 0%, #fce4ec 45%, #ede7f6 100%)",
    "linear-gradient(135deg, #fdfbfb 0%, #f6d5f7 50%, #fbe9d7 100%)",
    "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
    "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 50%, #f9d1d1 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  ]
};

/* ==========================================================================
   2. INISIALISASI DOM & VARIABEL GLOBAL
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  applyThemeColors();
  populatePersonalContent();
  initAmbientParticles();
  initWelcomeScreen();
  initMusicPlayer();
  initCakeInteraction();
  initEnvelopeLetter();
  initPhotoGallery();
  initSurpriseFeature();
  initCountdownAndAge();
  initScrollReveal();

  document.getElementById("current-year").textContent = new Date().getFullYear();
});

/* ==========================================================================
   3. TERAPKAN WARNA & DATA PERSONAL DARI CONFIG
   ========================================================================== */
function applyThemeColors() {
  const root = document.documentElement;
  const { pink, pinkDeep, lavender, cream, gold } = BIRTHDAY_CONFIG.themeColors;
  root.style.setProperty("--color-pink", pink);
  root.style.setProperty("--color-pink-deep", pinkDeep);
  root.style.setProperty("--color-lavender", lavender);
  root.style.setProperty("--color-cream", cream);
  root.style.setProperty("--color-gold", gold);
}

function populatePersonalContent() {
  document.title = `Happy Birthday, ${BIRTHDAY_CONFIG.recipientName}! ✨`;
  document.getElementById("recipient-name-display").textContent = BIRTHDAY_CONFIG.recipientName;
  document.getElementById("song-title").textContent = BIRTHDAY_CONFIG.songTitle;

  const birthObj = parseLocalDate(BIRTHDAY_CONFIG.birthDate);
  const formattedMonthDay = birthObj.toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric"
  });
  document.getElementById("birthday-date-display").textContent = formattedMonthDay;
}

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/* ==========================================================================
   4. EFEK ANIMASI TEXT REVEAL (KATA DEMI KATA)
   ========================================================================== */
function revealTextGradually(element, text, delayStep = 45) {
  element.innerHTML = "";
  const lines = text.split("\n");
  let wordIndex = 0;

  lines.forEach((line, lineIdx) => {
    if (line.trim() === "") {
      element.appendChild(document.createElement("br"));
      element.appendChild(document.createElement("br"));
      return;
    }

    const words = line.split(" ");
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "reveal-word";
      span.style.animationDelay = `${wordIndex * delayStep}ms`;
      element.appendChild(span);
      wordIndex++;
    });

    if (lineIdx < lines.length - 1 && lines[lineIdx + 1].trim() !== "") {
      element.appendChild(document.createElement("br"));
    }
  });
}

/* ==========================================================================
   5. AMBIENT PARTICLES (HEARTS, STARS, SPARKLES) & BALLOONS
   ========================================================================== */
function initAmbientParticles() {
  const container = document.getElementById("ambient-particles");
  const symbols = ["♡", "✦", "✨", "⋆", "❀"];
  const colors = ["#e87a9f", "#d4af37", "#b388eb", "#f48fb1"];

  for (let i = 0; i < 24; i++) {
    const el = document.createElement("span");
    el.className = "particle-item";
    el.textContent = symbols[i % symbols.length];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${12 + Math.random() * 14}px`;
    el.style.color = colors[i % colors.length];
    el.style.animationDuration = `${9 + Math.random() * 11}s`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(el);
  }
}

function spawnBalloons() {
  const container = document.getElementById("balloons-container");
  const balloonColors = [
    "rgba(248, 180, 200, 0.75)",
    "rgba(216, 200, 248, 0.75)",
    "rgba(243, 229, 171, 0.8)",
    "rgba(255, 209, 220, 0.75)"
  ];

  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = `${5 + Math.random() * 90}%`;
    balloon.style.background = balloonColors[i % balloonColors.length];
    balloon.style.animationDuration = `${14 + Math.random() * 10}s`;
    balloon.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(balloon);
  }
}

/* ==========================================================================
   6. CONFETTI ENGINE (CANVAS RINGAN & PERFORMA TINGGI)
   ========================================================================== */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let animationFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(count = 110) {
  const colors = ["#f8b4c8", "#e87a9f", "#d8c8f8", "#d4af37", "#fff0f5", "#b388eb"];

  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 260,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.28,
      opacity: 1
    });
  }

  if (!animationFrameId) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.006;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();

    if (p.opacity <= 0 || p.y > canvas.height + 30) {
      confettiPieces.splice(index, 1);
    }
  });

  if (confettiPieces.length > 0) {
    animationFrameId = requestAnimationFrame(animateConfetti);
  } else {
    animationFrameId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ==========================================================================
   7. WELCOME SCREEN & TRANSISI KE HALAMAN UTAMA
   ========================================================================== */
function initWelcomeScreen() {
  const openBtn = document.getElementById("open-gift-btn");
  const giftBox = document.getElementById("gift-box");
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");
  const greetingEl = document.getElementById("greeting-text");

  let isOpened = false;

  const triggerOpen = () => {
    if (isOpened) return;
    isOpened = true;

    giftBox.classList.add("opened");
    launchConfetti(140);
    startMusicAfterInteraction();

    setTimeout(() => {
      welcomeScreen.classList.add("fade-out");
      mainContent.classList.remove("hidden");
      spawnBalloons();
      revealTextGradually(greetingEl, BIRTHDAY_CONFIG.greetingMessage, 40);

      setTimeout(() => {
        welcomeScreen.classList.add("hidden");
      }, 900);
    }, 650);
  };

  openBtn.addEventListener("click", triggerOpen);
  giftBox.addEventListener("click", triggerOpen);
  giftBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerOpen();
    }
  });
}

/* ==========================================================================
   8. MUSIC PLAYER (PATUH KEBIJAKAN AUTOPLAY BROWSER)
   ========================================================================== */
let audioEl, musicIcon, equalizerEl;

function initMusicPlayer() {
  audioEl = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const volumeSlider = document.getElementById("volume-slider");
  musicIcon = document.getElementById("music-icon");
  equalizerEl = document.getElementById("equalizer");

  audioEl.volume = parseFloat(volumeSlider.value);

  toggleBtn.addEventListener("click", () => {
    if (audioEl.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  volumeSlider.addEventListener("input", (e) => {
    audioEl.volume = parseFloat(e.target.value);
  });
}

function startMusicAfterInteraction() {
  if (audioEl && audioEl.paused) {
    playMusic();
  }
}

function playMusic() {
  audioEl
    .play()
    .then(() => {
      musicIcon.className = "fa-solid fa-pause";
      equalizerEl.classList.add("playing");
    })
    .catch(() => {
      musicIcon.className = "fa-solid fa-play";
      equalizerEl.classList.remove("playing");
    });
}

function pauseMusic() {
  audioEl.pause();
  musicIcon.className = "fa-solid fa-play";
  equalizerEl.classList.remove("playing");
}

/* ==========================================================================
   9. INTERAKSI KUE ULANG TAHUN & LILIN
   ========================================================================== */
function initCakeInteraction() {
  const blowBtn = document.getElementById("blow-candles-btn");
  const relightBtn = document.getElementById("relight-candles-btn");
  const flames = document.querySelectorAll(".flame");
  const smokes = document.querySelectorAll(".smoke");
  const wishMessage = document.getElementById("wish-message");

  blowBtn.addEventListener("click", () => {
    flames.forEach((flame) => flame.classList.add("extinguished"));
    smokes.forEach((smoke) => {
      smoke.classList.remove("rising");
      void smoke.offsetWidth;
      smoke.classList.add("rising");
    });

    launchConfetti(120);
    wishMessage.classList.remove("hidden");
    blowBtn.classList.add("hidden");
    relightBtn.classList.remove("hidden");
  });

  relightBtn.addEventListener("click", () => {
    flames.forEach((flame) => flame.classList.remove("extinguished"));
    wishMessage.classList.add("hidden");
    relightBtn.classList.add("hidden");
    blowBtn.classList.remove("hidden");
  });
}

/* ==========================================================================
   10. SURAT DIGITAL & ANIMASI AMPLOP
   ========================================================================== */
function initEnvelopeLetter() {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const openLetterBtn = document.getElementById("open-letter-btn");
  const letterContent = document.getElementById("letter-content");

  let isLetterOpened = false;

  openLetterBtn.addEventListener("click", () => {
    isLetterOpened = !isLetterOpened;

    if (isLetterOpened) {
      envelopeWrapper.classList.add("open");
      openLetterBtn.innerHTML = '<i class="fa-solid fa-envelope"></i> Close Letter';
      revealTextGradually(letterContent, BIRTHDAY_CONFIG.letterMessage, 32);
    } else {
      envelopeWrapper.classList.remove("open");
      openLetterBtn.innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> Open Letter';
    }
  });
}

/* ==========================================================================
   11. GALERI FOTO & LIGHTBOX
   ========================================================================== */
function initPhotoGallery() {
  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  BIRTHDAY_CONFIG.photos.forEach((photo, idx) => {
    const card = document.createElement("article");
    card.className = "polaroid-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View photo ${idx + 1}`);

    const imgWrap = document.createElement("div");
    imgWrap.className = "polaroid-img-wrap";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";

    img.onerror = () => {
      img.src = createFallbackPhotoDataURI(idx + 1);
    };

    const caption = document.createElement("p");
    caption.className = "polaroid-caption";
    caption.textContent = photo.caption;

    imgWrap.appendChild(img);
    card.appendChild(imgWrap);
    card.appendChild(caption);

    const openModal = () => {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = photo.caption;
      lightbox.classList.remove("hidden");
    };

    card.addEventListener("click", openModal);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });

    grid.appendChild(card);
  });

  const closeModal = () => lightbox.classList.add("hidden");
  closeBtn.addEventListener("click", closeModal);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function createFallbackPhotoDataURI(index) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fce4ec"/>
        <stop offset="100%" stop-color="#ede7f6"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#g)"/>
    <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#e87a9f">Memory #${index}</text>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#7d6b78">Replace assets/images/photo${index}.jpg</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* ==========================================================================
   12. INTERACTIVE SURPRISE BUTTON
   ========================================================================== */
function initSurpriseFeature() {
  const surpriseBtn = document.getElementById("surprise-btn");
  const surpriseText = document.getElementById("surprise-text");
  let lastMsgIdx = -1;
  let gradientIdx = 0;

  surpriseBtn.addEventListener("click", () => {
    let randomIdx;
    do {
      randomIdx = Math.floor(Math.random() * BIRTHDAY_CONFIG.surpriseMessages.length);
    } while (randomIdx === lastMsgIdx && BIRTHDAY_CONFIG.surpriseMessages.length > 1);
    lastMsgIdx = randomIdx;

    gradientIdx = (gradientIdx + 1) % BIRTHDAY_CONFIG.surpriseGradients.length;
    document.body.style.background = BIRTHDAY_CONFIG.surpriseGradients[gradientIdx];

    surpriseText.style.opacity = "0";
    surpriseText.style.transform = "translateY(8px)";

    setTimeout(() => {
      surpriseText.textContent = BIRTHDAY_CONFIG.surpriseMessages[randomIdx];
      surpriseText.style.opacity = "1";
      surpriseText.style.transform = "translateY(0)";
    }, 220);

    launchConfetti(85);
  });
}

/* ==========================================================================
   13. COUNTDOWN & PERHITUNGAN USIA OTOMATIS
   ========================================================================== */
function initCountdownAndAge() {
  const birthDate = parseLocalDate(BIRTHDAY_CONFIG.birthDate);
  const fullBirthStr = birthDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  document.getElementById("birth-date-full").textContent = fullBirthStr;

  function updateClock() {
    const now = new Date();
    const currentYear = now.getFullYear();

    const isBirthdayToday =
      now.getMonth() === birthDate.getMonth() &&
      now.getDate() === birthDate.getDate();

    let calculatedAge = currentYear - birthDate.getFullYear();
    const displayAge = BIRTHDAY_CONFIG.customAge !== null ? BIRTHDAY_CONFIG.customAge : calculatedAge;
    document.getElementById("celebrating-age").textContent = `${displayAge} Tahun`;

    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate(), 0, 0, 0);
    if (now > nextBirthday && !isBirthdayToday) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    const todayBanner = document.getElementById("birthday-today-banner");
    const countdownBoxes = document.getElementById("countdown-boxes");
    const countdownHeading = document.getElementById("countdown-heading");

    if (isBirthdayToday) {
      todayBanner.classList.remove("hidden");
      countdownBoxes.classList.add("hidden");
      countdownHeading.textContent = "Happy Birthday Celebration!";
      return;
    } else {
      todayBanner.classList.add("hidden");
      countdownBoxes.classList.remove("hidden");
      countdownHeading.textContent = `Countdown to ${nextBirthday.getFullYear()} Birthday`;
    }

    const diff = nextBirthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   14. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
}
