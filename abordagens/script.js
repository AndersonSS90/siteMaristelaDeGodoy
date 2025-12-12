/* mini-pages.js
const total = slides.length;
const AUTOPLAY = carousel.dataset.autoplay === 'true';
const DELAY = 4500;
let autoplayTimer = null;


// create dots
slides.forEach((_, i) => {
const b = document.createElement('button');
b.type = 'button';
b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
b.setAttribute('aria-label', `Imagem ${i+1}`);
b.addEventListener('click', () => goTo(i));
dotsContainer.appendChild(b);
});
const dots = Array.from(dotsContainer.children);


function update(){
const w = carousel.offsetWidth;
track.style.transform = `translateX(-${idx * w}px)`;
dots.forEach((d,i)=> d.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
}


function goTo(i){ idx = (i + total) % total; update(); restartAutoplay(); }
function prevSlide(){ goTo(idx - 1); }
function nextSlide(){ goTo(idx + 1); }


if (prev) prev.addEventListener('click', prevSlide);
if (next) next.addEventListener('click', nextSlide);


// touch support
let startX = null;
carousel.addEventListener('touchstart', (e)=> startX = e.touches[0].clientX, {passive:true});
carousel.addEventListener('touchend', (e)=>{
if (startX === null) return;
const dx = startX - e.changedTouches[0].clientX;
if (Math.abs(dx) > 40) dx > 0 ? nextSlide() : prevSlide();
startX = null;
});


// keyboard
carousel.addEventListener('keydown', (ev)=>{ if (ev.key === 'ArrowLeft') prevSlide(); if (ev.key === 'ArrowRight') nextSlide(); });
carousel.setAttribute('tabindex','0');


function startAutoplay(){ if (!AUTOPLAY) return; clearInterval(autoplayTimer); autoplayTimer = setInterval(()=>{ idx = (idx+1)%total; update(); }, DELAY); }
function restartAutoplay(){ clearInterval(autoplayTimer); startAutoplay(); }


// init
window.addEventListener('resize', ()=>{ clearTimeout(window._miniCarouselResize); window._miniCarouselResize = setTimeout(update, 100); });
update(); startAutoplay();
});
})();
