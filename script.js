document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HERO CAROUSEL
  // =========================
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-track img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (carousel && track && slides.length > 0) {
    let index = 0;
    const slideCount = slides.length;
    const intervalTime = 7000;

    const getSlideWidth = () => carousel.getBoundingClientRect().width;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    }

    function nextSlide() {
      index = (index + 1) % slideCount;
      updateCarousel();
    }

    function prevSlide() {
      index = (index - 1 + slideCount) % slideCount;
      updateCarousel();
    }

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);

    // autoplay
    let autoPlay = setInterval(nextSlide, intervalTime);

    // reset timer on click
    [prevBtn, nextBtn].forEach((btn) => {
      btn?.addEventListener("click", () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, intervalTime);
      });
    });

    // keep correct after resize/zoom
    window.addEventListener("resize", updateCarousel);

    // initial
    updateCarousel();
  }

  // =========================
  // MUSEUM STRIP
  // =========================
  const strip = document.querySelector("#museumStrip");
  if (!strip) return;

  const logos = Array.from(strip.querySelectorAll(".museum-strip__logo"));
  if (logos.length === 0) return;

  const visible = 5; // show 5 logos
  let index = 0;
  let dir = 1;
  let timer = null;

  function getStep() {
    // Most reliable: measure distance between first two logos
    const first = logos[0];
    const second = logos[1];

    if (first && second) {
      const r1 = first.getBoundingClientRect();
      const r2 = second.getBoundingClientRect();
      const step = r2.left - r1.left; // includes gap
      return Math.max(1, step);
    }

    // fallback: just width
    if (first) {
      return Math.max(1, first.getBoundingClientRect().width);
    }

    return 1;
  }

  function updateMuseum() {
    const step = getStep();
    strip.style.transform = `translateX(-${index * step}px)`;
  }

  function tickMuseum() {
    const maxIndex = Math.max(0, logos.length - visible);

    if (index >= maxIndex) dir = -1;
    if (index <= 0) dir = 1;

    index += dir;
    updateMuseum();
  }

  function startMuseum() {
    updateMuseum();
    if (timer) clearInterval(timer);
    timer = setInterval(tickMuseum, 1500);
  }

  // Wait for images to layout (GitHub Pages sometimes needs this)
  const decodePromises = logos
    .map((img) => (img.decode ? img.decode().catch(() => null) : Promise.resolve(null)));

  Promise.all(decodePromises).finally(() => {
    setTimeout(startMuseum, 200);
  });

  // keep correct after resize/zoom
  window.addEventListener("resize", updateMuseum);
});
