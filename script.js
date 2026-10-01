/* ============ EDIT THIS: all personal content lives here ============ */
const card = {
  name: "Alia Salsabilla",
  from: "Ilham Randi",
  gate: { message: "To the most beautiful girl who just turned 28" },

  hero: { image: "images/photo-01.JPG", intro: "For you, the woman who radiates like the sun" },

  story: {
    title: "A look back on our relationship for the past year",
    items: [
      { image: "images/photo-02.JPG", caption: "Valentine's Day" },
      { image: "images/photo-03.JPG", caption: "Imagining we're in the 80s" },
      { image: "images/photo-04.JPG", caption: "Felt like a honeymoon" }
    ]
  },

  memories: {
    title: "Places we've been",
    items: [
      { image: "images/photo-05.JPG", caption: "Our first trip together" },
      { image: "images/photo-06.JPG", caption: "Our first overseas trip together" },
      { image: "images/photo-07.JPG", caption: "Memories I will remember forever" },
      { image: "images/photo-08.JPG" }
    ]
  },

  little: {
    title: "One of our many activities that I will remember forever",
    items: [
      { image: "images/photo-09.JPG" },
      { image: "images/photo-10.JPG" },
      { image: "images/photo-11.JPG" }
    ]
  },

  letter: {
    images: [
      { image: "images/photo-12.JPG", caption: "" },
      { image: "images/photo-13.JPG", caption: "" }
    ],
    text: `
      Happy 28th birthday, sayang.

      I honestly don’t know where to start because there’s so much I want to say, but I’m not very good at these kinds of things. Thank you for being the light that shines for me during these times. You’ve become such an important part of my life, and I’m grateful that I get to be a part of yours.

      I hope that this year, you’ll grow even more and achieve things you previously only dreamed of. I hope you find happiness, make lots of good memories, and get everything you’ve been wishing for and more. And most of all, I hope I’ll get to be a part of it all, forever.

      We’ve been through quite a lot this year. We’ve had our fights, disagreements, misunderstandings, and moments where things felt really difficult between us. But we’ve also had so many happy and unforgettable moments that I know I’ll remember forever. I know there have been times when we’ve both been frustrated, hurt, or unsure of each other. So many moments of blocking each other, pushing each other away, and moments where we felt like this might be the end. But somehow, through all of that, we’re still here.

      We chose to talk things through, understand each other, forgive each other, and most importantly, keep choosing each other. Because I believe that underneath all the arguments and differences, we both believe in our love for each other. I believe that’s what keeps bringing us back to each other, even when things get difficult.

      I hope we keep making more happy, stupid, and unforgettable memories together. And whenever things get difficult again, I hope we remember everything we’ve already been through, all the good moments we’ve shared, and why we chose each other in the first place.

      I don’t know what the future will look like, but I know I want you to be a part of it.
    `
  },

  ending: {
    image: "images/photo-14.JPG",
    message: "I know I haven’t been the best of partner, and I know there are still many things I need to learn and improve. But I want you to know that I’ll keep doing everything I can to become the partner you’ve always wished for. I hope that in the years to come, I can keep making you happy, loving you better, and growing together with you. And I hope this will be one of the last few birthdays we celebrate as boyfriend and girlfriend, because I hope someday soon, I’ll get to celebrate your birthday with a different status.",
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
