/* =========================
   LOAD DATA + RENDER CARDS
========================= */

const coverflow = document.getElementById("coverflow");

let CARD_DATA = [];

async function initApp() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    CARD_DATA = data.cards;

    renderCards(CARD_DATA);

  } catch (error) {
    console.error("Error loading data.json:", error);
  }
}

/* =========================
   RENDER 3D COVERFLOW CARDS
========================= */

function renderCards(cards) {

  cards.forEach((card, index) => {

    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
      <img src="${card.image}" alt="${card.title}" />

      <div class="card-content">

        <h3>${card.title}</h3>

        <p>${card.context}</p>

        <div class="explore">
          ${card.cta} ↓
        </div>

      </div>
    `;

    /* CLICK EVENT → OPEN MODAL */
    cardEl.addEventListener("click", () => openModal(card));

    coverflow.appendChild(cardEl);
  });

}

/* =========================
   MODAL SYSTEM (NETFLIX STYLE)
========================= */

function openModal(card) {

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-box">

      <img src="${card.image}" alt="${card.title}" />

      <h2>${card.title}</h2>

      <p>${card.context}</p>

      <div style="margin-top:15px; color:#5f7f7a;">
        ${card.details || "More insights coming soon..."}
      </div>

      <button id="closeModalBtn">Close</button>

    </div>
  `;

  document.body.appendChild(modal);

  /* CLOSE BUTTON */
  document.getElementById("closeModalBtn").addEventListener("click", () => {
    modal.remove();
  });

  /* CLOSE ON BACKDROP CLICK */
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

}

/* =========================
   MOBILE SWIPE ENHANCEMENT
========================= */

let isDown = false;
let startX;
let scrollLeft;

coverflow.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - coverflow.offsetLeft;
  scrollLeft = coverflow.scrollLeft;
});

coverflow.addEventListener("mouseleave", () => {
  isDown = false;
});

coverflow.addEventListener("mouseup", () => {
  isDown = false;
});

coverflow.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - coverflow.offsetLeft;
  const walk = (x - startX) * 2;

  coverflow.scrollLeft = scrollLeft - walk;
});

/* =========================
   TOUCH SUPPORT (MOBILE)
========================= */

coverflow.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = coverflow.scrollLeft;
});

coverflow.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  coverflow.scrollLeft = scrollLeft - walk;
});

/* =========================
   INIT APP
========================= */

initApp();
