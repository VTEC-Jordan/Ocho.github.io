(function () {
  var STORAGE_KEY = 'ocho:lang';
  var DEFAULT_LANG = 'en';

  function getCatalog(lang) {
    if (!window.OCHO_I18N) return null;
    return window.OCHO_I18N[lang] || null;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function setList(selector, values) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
    nodes.forEach(function (node, idx) {
      if (idx < values.length) {
        node.textContent = values[idx];
      }
    });
  }

  function setAttrs(selector, attrs) {
    document.querySelectorAll(selector).forEach(function (el) {
      Object.keys(attrs).forEach(function (name) {
        el.setAttribute(name, attrs[name]);
      });
    });
  }

  function updateLangButtons(lang) {
    var buttons = document.querySelectorAll('.lang-btn[data-lang]');
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('is-active', isActive);
    });
  }

  function applyLanguage(lang) {
    var catalog = getCatalog(lang);
    if (!catalog) return false;

    if (catalog.meta) {
      if (catalog.meta.title) document.title = catalog.meta.title;
      if (catalog.meta.description) {
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', catalog.meta.description);
      }
    }

    var text = catalog.text || {};
    Object.keys(text).forEach(function (selector) {
      setText(selector, text[selector]);
    });

    var lists = catalog.lists || {};
    Object.keys(lists).forEach(function (selector) {
      setList(selector, lists[selector]);
    });

    var attrs = catalog.attrs || {};
    Object.keys(attrs).forEach(function (selector) {
      setAttrs(selector, attrs[selector]);
    });

    var isRtl = !!catalog.rtl;
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    updateLangButtons(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // Ignore storage errors in restrictive environments.
    }

    window.OchoI18n.currentLanguage = lang;
    window.dispatchEvent(new CustomEvent('ocho:lang', { detail: { lang: lang, rtl: isRtl } }));
    return true;
  }

  function t(key, vars) {
    var lang = window.OchoI18n.currentLanguage || DEFAULT_LANG;
    var catalog = getCatalog(lang) || {};
    var strings = catalog.strings || {};
    var template = strings[key] || key;
    var values = vars || {};
    return String(template).replace(/\{([^}]+)\}/g, function (match, token) {
      return Object.prototype.hasOwnProperty.call(values, token) ? values[token] : match;
    });
  }

  function switchLanguage(lang) {
    return applyLanguage(lang);
  }

  function initSwitch() {
    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-lang');
        switchLanguage(target);
      });
    });
  }

  window.OchoI18n = window.OchoI18n || {};
  window.OchoI18n.t = t;
  window.OchoI18n.switchLanguage = switchLanguage;
  window.OchoI18n.currentLanguage = DEFAULT_LANG;

  initSwitch();

  var initial = DEFAULT_LANG;
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && getCatalog(stored)) initial = stored;
  } catch (err) {
    // Ignore storage errors.
  }

  applyLanguage(initial);
})();
