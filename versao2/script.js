/* ======================
   CONFIGURAÇÃO RÁPIDA
   Substituir pelo número real com DDI (apenas dígitos): ex: 5511999999999
   ====================== */
const WHATSAPP_NUMBER = "5511999999999"; // <<< substitui aqui
const DEFAULT_MESSAGE = "Olá Maristela, gostaria de agendar uma consulta. Pode me ajudar?";

/* monta URL do WhatsApp */
function whatsappUrlFor(text, phone = WHATSAPP_NUMBER){
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

/* atualiza links e floating button */
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

  // floating wa
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

/* parallax images (suave) */
const parallaxEls = document.querySelectorAll(".parallax");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed || "0.06");
    // calcular um deslocamento limitado
    const rect = el.getBoundingClientRect();
    const y = (scrolled - rect.top) * speed;
    el.style.transform = `translateY(${y}px)`;
  });
}, { passive: true });
