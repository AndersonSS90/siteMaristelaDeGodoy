/* ==============
   CONFIGURAÇÕES
   ============== */
/* Substitua pelo número real (apenas dígitos, com DDI). Ex: 5511999999999 */
const WHATSAPP_NUMBER = "5511999999999";

/* Mensagem padrão curta (encodeURIComponent será aplicado) */
const DEFAULT_MESSAGE = "Olá Maristela, quero agendar uma consulta. Pode me ajudar?";

/* ==============
   UTILIDADES
   ============== */
function whatsappUrlFor(text, phone = WHATSAPP_NUMBER) {
  const base = "https://api.whatsapp.com/send";
  const encoded = encodeURIComponent(text);
  return `${base}?phone=${phone}&text=${encoded}`;
}

/* Ano no rodapé */
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Atualiza links de WhatsApp (botões)
  const btns = [
    document.getElementById("btn-whatsapp-hero"),
    document.getElementById("btn-whatsapp-about"),
    document.getElementById("btn-whatsapp-approach"),
    document.getElementById("btn-whatsapp-schedule"),
    document.getElementById("footer-whatsapp")
  ];
  btns.forEach(b => {
    if (b) b.setAttribute("href", whatsappUrlFor(DEFAULT_MESSAGE));
  });

  // Floating whatsapp already set in HTML, but ensure uses number variable
  const float = document.getElementById("whatsapp-floating");
  if (float) {
    float.setAttribute("href", whatsappUrlFor(DEFAULT_MESSAGE));
  }

  // Links dentro dos cards de serviço
  document.querySelectorAll(".svc-card .link").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const service = a.dataset.service || "Serviço";
      const text = `Olá Maristela, tenho interesse em: ${service}. Pode me chamar para agendar?`;
      window.open(whatsappUrlFor(text), "_blank");
    });
  });
});

/* ==============
   FORMULÁRIO: cria mensagem e abre WhatsApp
   ============== */
const leadForm = document.getElementById("lead-form");
if (leadForm) {
  leadForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    const name = document.getElementById("lead-name").value.trim();
    const phone = document.getElementById("lead-phone").value.trim();
    const service = document.getElementById("lead-service").value.trim();
    const message = document.getElementById("lead-message").value.trim();

    // Mensagem pré-formatada
    let text = `Olá Maristela, sou ${name || "um interessado"}. Tenho interesse em *${service}*.`;
    if (phone) text += ` Meu WhatsApp é ${phone}.`;
    if (message) text += `\n\nMensagem: ${message}`;

    // abre WhatsApp
    window.open(whatsappUrlFor(text), "_blank");
  });
}

/* ==============
   SCROLL REVEAL + INTERSECTION OBSERVER
   ============== */
const panels = document.querySelectorAll(".panel-animated");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add("in-view");
    }
  });
}, { threshold: 0.12 });

panels.forEach(p => observer.observe(p));

/* ==============
   PARALLAX IMAGES (suave)
   ============== */
const parallaxEls = document.querySelectorAll(".parallax");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed || "0.08");
    const y = (scrolled - el.getBoundingClientRect().top) * speed;
    el.style.transform = `translateY(${y}px)`;
  });
}, { passive: true });

/* ==============
   ESCOLHA RÁPIDA: botões que abrem WA com serviço
   ============== */
document.querySelectorAll('[id^="btn-whatsapp"], [id^="footer-whatsapp"]').forEach(btn => {
  btn && btn.addEventListener("click", (e) => {
    // leave default href behavior handled earlier
  });
});

/* ==============
   Acessibilidade: fechar menus / teclas
   ============== */
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    // placeholder: se futuramente houver modal, esc fecha
  }
});
