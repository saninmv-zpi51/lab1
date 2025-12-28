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
    [prevBtn, nextBtn].forEach(btn => {
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

  const logos = strip.querySelectorAll(".museum-strip__logo");
  if (logos.length === 0) return;

  const visible = 5; // show 5 logos
  let index = 0;
  let dir = 1;

  function getStep() {
    const first = strip.querySelector(".museum-strip__logo");
    if (!first) return 0;

    const w = first.getBoundingClientRect().width;

    // read gap from CSS
    const style = getComputedStyle(strip);
    const gap = parseFloat(style.gap) || 0;

    return w + gap;
  }

  function update() {
    const step = getStep();
    strip.style.transform = `translateX(-${index * step}px)`;
  }

  function tick() {
    const maxIndex = Math.max(0, logos.length - visible);

    if (index >= maxIndex) dir = -1;
    if (index <= 0) dir = 1;

    index += dir;
    update();
  }

  // initial
  update();

  // run
  setInterval(tick, 1500);

  // keep correct after resize/zoom
  window.addEventListener("resize", update);
});
