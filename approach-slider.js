/* Homepage project-photo carousel, separate from the hero slider. */
(() => {
  'use strict';
  const gallery = document.querySelector('[data-approach-slider]');
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll('.approach-slide')];
  const caption = gallery.querySelector('[data-approach-caption]');
  const controls = gallery.querySelector('[data-approach-controls]');
  const counter = gallery.querySelector('[data-approach-count]');
  const back = gallery.querySelector('[data-approach-back]');
  const next = gallery.querySelector('[data-approach-next]');
  const pause = gallery.querySelector('[data-approach-pause]');
  if (slides.length < 2 || ![caption, controls, counter, back, next, pause].every(Boolean)) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const delay = 3200;
  let index = 0;
  let paused = motion.matches;
  let inView = !('IntersectionObserver' in window);
  let timer;

  const show = (step) => {
    index = (index + step + slides.length) % slides.length;
    slides.forEach((image, i) => {
      image.classList.toggle('is-current', i === index);
      if (i === index) image.removeAttribute('aria-hidden');
      else image.setAttribute('aria-hidden', 'true');
    });
    caption.textContent = slides[index].dataset.caption;
    counter.textContent = `${index + 1} / ${slides.length}`;
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (paused || !inView || document.hidden) return;
    timer = window.setTimeout(() => {
      show(1);
      schedule();
    }, delay);
  };

  const updatePause = () => {
    pause.textContent = paused ? '>' : 'II';
    const label = paused ? 'Play project photos' : 'Pause project photos';
    pause.setAttribute('aria-label', label);
    pause.title = label;
  };

  back.addEventListener('click', () => { show(-1); schedule(); });
  next.addEventListener('click', () => { show(1); schedule(); });
  pause.addEventListener('click', () => { paused = !paused; updatePause(); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener?.('change', event => {
    if (event.matches) {
      paused = true;
      updatePause();
      schedule();
    }
  });

  if (!inView) {
    new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.25);
      schedule();
    }, { threshold: 0.25 }).observe(gallery);
  }
  updatePause();
  controls.hidden = false;
  schedule();
})();
