(function () {
  var hero = document.querySelector('.hero');
  var container = document.getElementById('circular-gallery');
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var requested = false;

  if (!hero || !container) return;

  function markFallback(reason) {
    hero.setAttribute('data-hero-fallback', reason);
  }

  function shouldSkipGallery() {
    if (window.matchMedia('(max-width: 900px)').matches) {
      markFallback('small-screen');
      return true;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markFallback('reduced-motion');
      return true;
    }

    if (connection && connection.saveData) {
      markFallback('save-data');
      return true;
    }

    if (connection && /(^|slow-)2g$/i.test(connection.effectiveType || '')) {
      markFallback('slow-connection');
      return true;
    }

    return false;
  }

  function loadGallery() {
    if (requested) return;
    requested = true;

    import('./circular-gallery.js?v=20260429-1').catch(function () {
      markFallback('gallery-import-failed');
    });
  }

  function scheduleLoad() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadGallery, { timeout: 2500 });
      return;
    }

    window.setTimeout(loadGallery, 1200);
  }

  function waitForViewport() {
    if (!('IntersectionObserver' in window)) {
      scheduleLoad();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) {
        return;
      }

      observer.disconnect();
      scheduleLoad();
    }, {
      rootMargin: '200px 0px'
    });

    observer.observe(container);
  }

  if (shouldSkipGallery()) return;

  if (document.readyState === 'complete') {
    waitForViewport();
    return;
  }

  window.addEventListener('load', waitForViewport, { once: true });
})();