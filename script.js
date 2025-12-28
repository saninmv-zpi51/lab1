document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-track img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track || slides.length === 0) return;

  let index = 0;
  const slideWidth = 1200;
  const slideCount = slides.length;
  const intervalTime = 7000; // 7 seconds

  function updateCarousel() {
    track.style.transform = `translateX(-${index * slideWidth}px)`;
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

  /* autoplay */
  let autoPlay = setInterval(nextSlide, intervalTime);

  /* reset timer when user interacts */
  [prevBtn, nextBtn].forEach(btn => {
    btn?.addEventListener("click", () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(nextSlide, intervalTime);
    });
  });
});
