(function () {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxClose = document.getElementById('lightbox-close');

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImage) {
      lightboxImage.src = '';
    }
    document.body.style.overflow = '';
  }

  function openLightbox(src, altText) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = altText || 'Expanded community photo';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.media-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var full = thumb.getAttribute('data-full');
      var img = thumb.querySelector('img');
      if (!full) return;
      openLightbox(full, img ? img.alt : 'Expanded community photo');
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initMenuTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.menu-tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.menu-panel'));
    if (!tabs.length || !panels.length) return;

    function activateTab(tab) {
      var targetId = tab.getAttribute('data-menu-target');

      tabs.forEach(function (item) {
        var isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        item.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        var show = panel.id === targetId;
        panel.classList.toggle('is-active', show);
        panel.hidden = !show;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });

      tab.addEventListener('keydown', function (event) {
        var currentIndex = tabs.indexOf(tab);
        var nextIndex = currentIndex;

        if (event.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else {
          return;
        }

        event.preventDefault();
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });
  }

  initMenuTabs();

  function initDrinksTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.drinks-tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.drinks-panel'));
    var nextButton = document.querySelector('.drinks-next');
    if (!tabs.length || !panels.length || !nextButton) return;

    function activeIndex() {
      return tabs.findIndex(function (tab) {
        return tab.classList.contains('is-active');
      });
    }

    function nextLabel(index) {
      var next = (index + 1) % tabs.length;
      return tabs[next].textContent.trim();
    }

    function updateNextButton(index) {
      nextButton.textContent = 'Next: ' + nextLabel(index);
    }

    function activateDrinksTab(tab) {
      var targetId = tab.getAttribute('data-drinks-target');

      tabs.forEach(function (item) {
        var isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        item.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach(function (panel) {
        var show = panel.id === targetId;
        panel.classList.toggle('is-active', show);
        panel.hidden = !show;
      });

      var idx = activeIndex();
      if (idx >= 0) {
        updateNextButton(idx);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateDrinksTab(tab);
      });

      tab.addEventListener('keydown', function (event) {
        var currentIndex = tabs.indexOf(tab);
        var nextIndex = currentIndex;

        if (event.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else {
          return;
        }

        event.preventDefault();
        tabs[nextIndex].focus();
        activateDrinksTab(tabs[nextIndex]);
      });
    });

    nextButton.addEventListener('click', function () {
      var idx = activeIndex();
      var nextIndex = idx < 0 ? 0 : (idx + 1) % tabs.length;
      activateDrinksTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });

    updateNextButton(Math.max(activeIndex(), 0));
  }

  initDrinksTabs();

  function initHeroFallbackSlider() {
    var hero = document.querySelector('.hero');
    var wrap = document.querySelector('.hero-gallery-wrap');
    if (!hero || !wrap) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // If WebGL gallery is ready, keep it as the primary experience.
    if (hero.classList.contains('is-gallery-ready')) return;

    var existing = wrap.querySelector('.hero-fallback-slider');
    if (existing) return;

    var slideImages = [
      'img/IMG_7578.jpg',
      'img/IMG_7581.jpg',
      'img/IMG_7582.jpg',
      'img/IMG_7598.JPG.jpg',
      'img/IMG_7600.JPG.jpeg',
      'img/IMG_7603.JPG.jpeg',
      'img/IMG_7604.JPG.jpeg',
      'img/IMG_7781.jpg'
    ];

    var slider = document.createElement('div');
    slider.className = 'hero-fallback-slider';

    slideImages.forEach(function (src, index) {
      var slide = document.createElement('div');
      slide.className = 'hero-fallback-slide' + (index === 0 ? ' is-active' : '');
      slide.style.backgroundImage = 'url("' + src + '")';
      slider.appendChild(slide);
    });

    wrap.appendChild(slider);

    var slides = slider.querySelectorAll('.hero-fallback-slide');
    var current = 0;

    window.setInterval(function () {
      if (hero.classList.contains('is-gallery-ready')) return;
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 3600);
  }

  // Delay allows the module gallery a chance to initialize first.
  window.setTimeout(initHeroFallbackSlider, 1200);

  var form = document.getElementById('booking-form');
  var status = document.getElementById('form-status');

  if (!form || !status) return;
  var isSubmitting = false;

  function labelForField(field) {
    if (!field || !field.id) return 'a required field';
    var label = form.querySelector('label[for="' + field.id + '"]');
    return label ? label.textContent.trim() : 'a required field';
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var eventDate = document.getElementById('event-date');
    var guestCount = document.getElementById('guests');

    if (!form.checkValidity()) {
      var firstInvalid = form.querySelector(':invalid');
      var fieldLabel = labelForField(firstInvalid);
      status.textContent = 'Please check ' + fieldLabel + ' and try again.';
      if (firstInvalid && typeof firstInvalid.reportValidity === 'function') {
        firstInvalid.reportValidity();
        firstInvalid.focus();
      }
      return;
    }

    var selectedDate = eventDate.value ? new Date(eventDate.value + 'T00:00:00') : null;
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!selectedDate || isNaN(selectedDate.getTime()) || selectedDate < today) {
      status.textContent = 'Please select a valid future date for your event.';
      eventDate.focus();
      return;
    }

    var guests = parseInt(guestCount.value, 10);
    if (isNaN(guests) || guests < 2) {
      status.textContent = 'Guest count must be at least 2.';
      guestCount.focus();
      return;
    }

    if (isSubmitting) return;

    var emailInput = document.getElementById('email');
    var submittedEmail = emailInput && emailInput.value ? emailInput.value.trim() : 'your email';

    status.textContent = 'Sending your request...';
    isSubmitting = true;

    try {
      await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      });

      status.textContent = 'We received your request and will contact you within 24 hours at ' + submittedEmail + '.';
      form.reset();
    } catch (error) {
      status.textContent = 'Something went wrong while sending. Please try again in a moment.';
    } finally {
      isSubmitting = false;
    }
  });
})();
