class Carousel {
  constructor(root, interval = 10000) {
    this.root = root;
    this.slides = root.querySelectorAll(".carousel-slide");
    this.btnPrev = root.querySelector(".carousel-prev");
    this.btnNext = root.querySelector(".carousel-next");
    this.index = 0;
    this.interval = interval;

    this.show(this.index);
    this.startAuto();

    this.btnPrev.addEventListener("click", () => {
      this.prev();
      this.restartAuto();
    });

    this.btnNext.addEventListener("click", () => {
      this.next();
      this.restartAuto();
    });
  }

  show(i) {
    this.slides.forEach((s, idx) => {
      s.style.opacity = idx === i ? "1" : "0";
      s.style.zIndex = idx === i ? "2" : "1";
    });
  }

  next() {
    this.index = (this.index + 1) % this.slides.length;
    this.show(this.index);
  }

  prev() {
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.show(this.index);
  }

  startAuto() {
    this.timer = setInterval(() => this.next(), this.interval);
  }

  restartAuto() {
    clearInterval(this.timer);
    this.startAuto();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach(c => {
    new Carousel(c, 10000);
  });
});
