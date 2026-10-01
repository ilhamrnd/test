/* ============ EDIT THIS: all personal content lives here ============ */
const card = {
  name: "Alia Salsabilla",
  from: "Ilham Randi",
  gate: { message: "To the most beautiful girl who just turned 28" },

  hero: { image: "images/photo-01.JPG", intro: "For you, the woman who radiates like the sun" },

  story: {
    title: "A look back on our relationship for the past year",
    items: [
      { image: "images/photo-02.JPG", caption: "PLACEHOLDER: first memory" },
      { image: "images/photo-03.JPG", caption: "PLACEHOLDER: early days" },
      { image: "images/photo-04.JPG", caption: "PLACEHOLDER: when I knew" }
    ]
  },

  memories: {
    title: "Places we've been",
    items: [
      { image: "images/photo-05.JPG", caption: "Our first trip together" },
      { image: "images/photo-06.JPG", caption: "Our first overseas trip together" },
      { image: "images/photo-07.JPG", caption: "PLACEHOLDER MEMORY" },
      { image: "images/photo-08.JPG", caption: "PLACEHOLDER MEMORY" }
    ]
  },

  little: {
    title: "The random little things",
    intro: "PLACEHOLDER: a line about ordinary moments.",
    items: [
      { image: "images/photo-09.JPG", caption: "PLACEHOLDER: little thing" },
      { image: "images/photo-10.JPG", caption: "PLACEHOLDER: little thing" },
      { image: "images/photo-11.JPG", caption: "PLACEHOLDER: little thing" }
    ]
  },

  letter: {
    images: [
      { image: "images/photo-12.JPG", caption: "" },
      { image: "images/photo-13.JPG", caption: "" }
    ],
    text: `
      PLACEHOLDER BIRTHDAY LETTER. First paragraph.

      Leave a blank line between paragraphs to start a new one.
    `
  },

  ending: {
    image: "images/photo-14.JPG",
    message: "I know i havent been the best of partner, ",
    tagline: "Here’s to all the memories we haven’t made yet. And to forever of spending your birthdays together.",
    signature: "Love, Ilham Randi"
  }
};
/* ==================================================================== */

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const polaroid = p => `
  <figure class="polaroid">
    <img src="${esc(p.image)}" alt="${esc(p.caption)}" loading="lazy">
    ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}
  </figure>`;

const paragraphs = t => t.trim().split(/\n\s*\n/).map(p => `<p>${esc(p.replace(/\s+/g, " ").trim())}</p>`).join("");

function render(c) {
  document.title = `Happy Birthday, ${c.name}`;
  document.getElementById("gate-name").textContent = c.gate.message;
  document.getElementById("app").innerHTML = `
    <section class="hero">
      <h1>Happy Birthday, ${esc(c.name)}</h1>
      <p class="intro">${esc(c.hero.intro)}</p>
      ${polaroid({ image: c.hero.image, caption: "" })}
    </section>

    <section>
      <h2>${esc(c.story.title)}</h2>
      <div class="stack">${c.story.items.map(polaroid).join("")}</div>
    </section>

    <section>
      <h2>${esc(c.memories.title)}</h2>
      <div class="stack">${c.memories.items.map(polaroid).join("")}</div>
    </section>

    <section>
      <h2>${esc(c.little.title)}</h2>
      <p class="intro">${esc(c.little.intro)}</p>
      <div class="stack small">${c.little.items.map(polaroid).join("")}</div>
    </section>

    <section>
      ${c.letter.title ? `<h2>${esc(c.letter.title)}</h2>` : ""}
      <div class="letter-photos">${c.letter.images.map(polaroid).join("")}</div>
      <div class="letter-paper">${paragraphs(c.letter.text)}</div>
    </section>

    <section class="ending">
      ${polaroid({ image: c.ending.image, caption: "" })}
      <p class="message">${esc(c.ending.message)}</p>
      <p class="tagline">${esc(c.ending.tagline)}</p>
      <p class="sig">${esc(c.ending.signature)}</p>
    </section>`;
}

function reveal() {
  const els = document.querySelectorAll(".polaroid");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  els.forEach(e => io.observe(e));
}

function balloons() {
  const wrap = document.getElementById("balloons");
  if (!wrap) return;
  const colors = ["#fb9db1", "#ec6a9c", "#ffc2d1", "#fff0f3", "#f783a1", "#ffe3ec"];
  for (let i = 0; i < 9; i++) {
    const b = document.createElement("span");
    b.className = "balloon";
    b.style.left = 4 + Math.random() * 88 + "%";
    b.style.background = colors[i % colors.length];
    b.style.animationDelay = -Math.random() * 20 + "s";
    b.style.setProperty("--d", 11 + Math.random() * 9 + "s");
    const s = 0.7 + Math.random() * 0.8;
    b.style.width = 54 * s + "px";
    b.style.height = 68 * s + "px";
    wrap.appendChild(b);
  }
}

function gate() {
  const g = document.getElementById("gate");
  document.getElementById("open").addEventListener("click", () => {
    g.classList.add("opening");
    setTimeout(() => { g.classList.add("done"); document.body.classList.remove("locked"); }, 700);
  }, { once: true });
}

document.documentElement.classList.add("js");
render(card);
reveal();
balloons();
gate();
