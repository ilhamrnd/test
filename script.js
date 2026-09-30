/* ============ EDIT THIS: all personal content lives here ============ */
const card = {
  name: "Alia Salsabilla",
  from: "Ilham Randi",

  hero: { image: "images/photo-01.JPG", intro: "For you, the woman who radiates like the sun" },

  story: {
    title: "A look back on our relationship for the past year",
    items: [
      { image: "images/photo-02.JPG", date: "DATE", caption: "PLACEHOLDER: first memory" },
      { image: "images/photo-03.JPG", date: "DATE", caption: "PLACEHOLDER: early days" },
      { image: "images/photo-04.JPG", date: "DATE", caption: "PLACEHOLDER: when I knew" }
    ]
  },

  memories: {
    title: "Places we've been",
    items: [
      { image: "images/photo-05.JPG", date: "DATE", caption: "Our first trip together" },
      { image: "images/photo-06.JPG", date: "DATE", caption: "Our first overseas trip together" },
      { image: "images/photo-07.JPG", date: "DATE", caption: "PLACEHOLDER MEMORY" },
      { image: "images/photo-08.svg", date: "DATE", caption: "PLACEHOLDER MEMORY" }
    ]
  },

  little: {
    title: "The random little things",
    intro: "PLACEHOLDER: a line about ordinary moments.",
    items: [
      { image: "images/photo-09.PNG", caption: "PLACEHOLDER: little thing" },
      { image: "images/photo-10.JPG", caption: "PLACEHOLDER: little thing" },
      { image: "images/photo-11.JPG", caption: "PLACEHOLDER: little thing" }
    ]
  },

  letter: {
    images: [
      { image: "images/photo-12.svg", caption: "" },
      { image: "images/photo-13.svg", caption: "" }
    ],
    text: `
      PLACEHOLDER BIRTHDAY LETTER. First paragraph.

      Leave a blank line between paragraphs to start a new one.
    `
  },

  ending: {
    image: "images/photo-14.svg",
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
    ${(p.date || p.caption) ? `<figcaption>${p.date ? `<time>${esc(p.date)}</time>` : ""}${esc(p.caption)}</figcaption>` : ""}
  </figure>`;

const paragraphs = t => t.trim().split(/\n\s*\n/).map(p => `<p>${esc(p.replace(/\s+/g, " ").trim())}</p>`).join("");

function render(c) {
  document.title = `Happy Birthday, ${c.name}`;
  document.getElementById("gate-name").textContent = c.name;
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
gate();
