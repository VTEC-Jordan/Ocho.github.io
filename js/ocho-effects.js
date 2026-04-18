(function () {
  function initOchoGallery() {
    var track = document.querySelector('.ocho-gallery-track');
    if (!track) return;

    if (!track.dataset.ready) {
      track.innerHTML += track.innerHTML;
      track.dataset.ready = 'true';
    }

    var position = 0;
    var speed = 0.35;
    var paused = false;
    var dragging = false;
    var startX = 0;
    var dragStart = 0;

    function maxLoop() {
      return track.scrollWidth / 2;
    }

    function render() {
      track.style.transform = 'translate3d(' + (-position) + 'px, 0, 0)';
    }

    function animate() {
      if (!paused && !dragging) {
        position += speed;
        if (position >= maxLoop()) {
          position = 0;
        }
        render();
      }
      window.requestAnimationFrame(animate);
    }

    track.addEventListener('mouseenter', function () {
      paused = true;
    });

    track.addEventListener('mouseleave', function () {
      paused = false;
    });

    track.addEventListener('mousedown', function (event) {
      dragging = true;
      paused = true;
      startX = event.clientX;
      dragStart = position;
      track.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', function (event) {
      if (!dragging) return;
      var delta = event.clientX - startX;
      position = dragStart - delta;
      if (position < 0) {
        position += maxLoop();
      }
      if (position >= maxLoop()) {
        position -= maxLoop();
      }
      render();
    });

    window.addEventListener('mouseup', function () {
      dragging = false;
      paused = false;
      track.classList.remove('is-dragging');
    });

    track.addEventListener('touchstart', function (event) {
      dragging = true;
      paused = true;
      startX = event.touches[0].clientX;
      dragStart = position;
    }, { passive: true });

    window.addEventListener('touchmove', function (event) {
      if (!dragging) return;
      var delta = event.touches[0].clientX - startX;
      position = dragStart - delta;
      if (position < 0) {
        position += maxLoop();
      }
      if (position >= maxLoop()) {
        position -= maxLoop();
      }
      render();
    }, { passive: true });

    window.addEventListener('touchend', function () {
      dragging = false;
      paused = false;
    });

    animate();
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var display = el.getAttribute('data-display') || target.toLocaleString();
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(target * eased);
      el.textContent = progress < 1 ? value.toLocaleString() : display;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function initOchoCounters() {
    var counters = document.querySelectorAll('.ocho-stat-number');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initHeroTyping() {
    var typedEl = document.getElementById('ocho-hero-typed');
    if (!typedEl) return;

    var text = typedEl.getAttribute('data-text') || 'OCHO Coffee House';
    var index = 0;
    var isDeleting = false;

    function tick() {
      if (!isDeleting) {
        index += 1;
        typedEl.textContent = text.slice(0, index);

        if (index >= text.length) {
          isDeleting = true;
          window.setTimeout(tick, 1800);
          return;
        }

        window.setTimeout(tick, 70);
      } else {
        index -= 1;
        typedEl.textContent = text.slice(0, index);

        if (index <= 0) {
          isDeleting = false;
          window.setTimeout(tick, 400);
          return;
        }

        window.setTimeout(tick, 35);
      }
    }

    tick();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initOchoGallery();
    initOchoCounters();
    initHeroTyping();
  });
})();
