/* =========================================================
   EDIT THESE — personalize the site here
   ========================================================= */
const FRIEND_NAME = "Aaruuuu"; // e.g. "Riya"
const YOUR_NAME = "samieee";       // used nowhere visible yet, kept for your reference

const APOLOGY_TEXT =
`Areh I am sorry yaar plz na maaf karde 
phirse prank nahi karungi
kabhi bhi gussa nahi karungi yaar
plz na maaf karde yaar
sorry naa
aaaruuuuuuu`;

/* =========================================================
   Below this line: functionality — no need to edit
   ========================================================= */

document.getElementById("friend-name-el").textContent = FRIEND_NAME;

/* ---------- floating hearts ---------- */
function spawnHeart(){
  const layer = document.getElementById("hearts-layer");
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "&#10084;";
  const size = 12 + Math.random() * 20;
  heart.style.fontSize = size + "px";
  heart.style.left = Math.random() * 100 + "vw";
  const duration = 6 + Math.random() * 6;
  heart.style.animationDuration = duration + "s";
  layer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 700);
for(let i=0;i<6;i++) setTimeout(spawnHeart, i*300);

/* ---------- envelope open ---------- */
const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelope-screen");
const letter = document.getElementById("letter");
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let opened = false;
envelope.addEventListener("click", () => {
  if (opened) return;
  opened = true;
  envelope.classList.add("open");

  music.play().catch(() => {}); // ignore autoplay-block errors
  musicToggle.classList.add("playing");

  setTimeout(() => {
    envelope.classList.add("lift");
  }, 500);

  setTimeout(() => {
    envelopeScreen.classList.add("hide");
    letter.hidden = false;
    document.body.style.overflow = "auto";
    revealObserver.observe(document.querySelector(".greeting-page"));
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, 1500);
});

/* lock scroll until envelope opens */
document.body.style.overflow = "hidden";

/* ---------- continue button ---------- */
document.getElementById("continue-btn").addEventListener("click", () => {
  document.querySelector(".apology-page").scrollIntoView({ behavior: "smooth" });
});

/* ---------- reveal sections on scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("apology-page")) {
        startTypewriter();
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll(".page").forEach((p) => {
  if (!p.classList.contains("greeting-page")) revealObserver.observe(p);
});

/* ---------- typewriter ---------- */
let typed = false;
function startTypewriter() {
  if (typed) return;
  typed = true;
  const el = document.getElementById("typewriter");
  let i = 0;
  function type() {
    if (i <= APOLOGY_TEXT.length) {
      el.textContent = APOLOGY_TEXT.slice(0, i);
      i++;
      setTimeout(type, 28);
    }
  }
  type();
}

/* ---------- final question ---------- */
const reply = document.getElementById("reply");
document.getElementById("yes-btn").addEventListener("click", () => {
  reply.textContent = "Thank you. I promise I'll try to be better. ❤";
  reply.classList.add("show");
});
document.getElementById("wait-btn").addEventListener("click", () => {
  reply.textContent = "That's okay. I'll wait. Take all the time you need. ❤";
  reply.classList.add("show");
});

/* ---------- music toggle button ---------- */
musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    musicToggle.classList.add("playing");
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
  }
});
