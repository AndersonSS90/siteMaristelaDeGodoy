const WHATSAPP_NUMBER = "555174018079";
const DEFAULT_MESSAGE = "Olá Maristela, gostaria de agendar uma consulta. Pode me ajudar?";

function whatsappUrlFor(text, phone = WHATSAPP_NUMBER){
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // ano rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // atualiza botões
  const updateBtns = [
    "btn-whatsapp-hero",
    "btn-whatsapp-about",
    "btn-whatsapp-approach",
    "btn-whatsapp-schedule",
    "footer-whatsapp"
  ];
  updateBtns.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", whatsappUrlFor(DEFAULT_MESSAGE));
  });

  const float = document.getElementById("whatsapp-floating");
  if (float) float.setAttribute("href", whatsappUrlFor(DEFAULT_MESSAGE));

  // cards serviços
  document.querySelectorAll(".svc-card .link").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const service = a.dataset.service || "Serviço";
      const text = `Olá Maristela, tenho interesse em: ${service}. Pode me chamar para agendar?`;
      window.open(whatsappUrlFor(text), "_blank");
    });
  });
});

/* formulário de leads -> abre WhatsApp com mensagem preenchida */
const leadForm = document.getElementById("lead-form");
if (leadForm){
  leadForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = (document.getElementById("lead-name") || {}).value || "";
    const phone = (document.getElementById("lead-phone") || {}).value || "";
    const service = (document.getElementById("lead-service") || {}).value || "";
    const message = (document.getElementById("lead-message") || {}).value || "";

    let text = `Olá Maristela, sou ${name || "um interessado"}. Tenho interesse em *${service}*.`;
    if (phone) text += ` Meu WhatsApp é ${phone}.`;
    if (message) text += `\n\nMensagem: ${message}`;

    window.open(whatsappUrlFor(text), "_blank");
  });
}

/* scroll reveal com IntersectionObserver */
const panels = document.querySelectorAll(".panel-animated");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting){
      ent.target.classList.add("in-view");
    }
  });
}, { threshold: 0.12 });
panels.forEach(p => observer.observe(p));

// Depoimentos — carrossel simples, acessível e responsivo
(function(){
  const section = document.getElementById("depoimentos");
  if (!section) return;

  const track = section.querySelector(".testimonials-track");
  const cards = Array.from(section.querySelectorAll(".testi-card"));
  const prevBtn = section.querySelector(".testi-prev");
  const nextBtn = section.querySelector(".testi-next");
  const dotsContainer = section.querySelector(".testi-dots");

  let index = 0;
  const total = cards.length;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000;

  // create dots
  cards.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.setAttribute("aria-label", `Depoimento ${i+1}`);
    b.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(b);
  });
  const dots = Array.from(dotsContainer.children);

  function update(){
    const width = section.querySelector(".testimonials-wrap").offsetWidth;
    track.style.transform = `translateX(-${index * width}px)`;
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
  }

  function goTo(i){
    index = Math.max(0, Math.min(i, total - 1));
    update();
    restartAutoplay();
  }
  function prev(){ goTo(index - 1) }
  function next(){ goTo(index + 1) }

  // keyboard navigation
  section.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft") prev();
    if (ev.key === "ArrowRight") next();
  });

  // touch support (swipe)
  let startX = null;
  const wrap = section.querySelector(".testimonials-wrap");
  wrap.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
  wrap.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
    }
    startX = null;
  });

  // autoplay
  function startAutoplay(){
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      index = (index + 1) % total;
      update();
    }, AUTOPLAY_DELAY);
  }
  function restartAutoplay(){ startAutoplay(); }

  // buttons
  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  // ensure update on resize (recalculate width)
  window.addEventListener("resize", () => {
    // small debounce
    clearTimeout(window._testimonialResize);
    window._testimonialResize = setTimeout(update, 120);
  });

  // init
  update();
  startAutoplay();

  // reveal animation: if using the site's IntersectionObserver, we keep consistency
  // but ensure the section can be focused for keyboard controls
  wrap.setAttribute("tabindex","0");
})();
