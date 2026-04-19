/**
 * Ocho Coffee House — i18n (EN / AR)
 * Architecture:
 *   - All UI strings live in the `translations` object below.
 *   - HTML elements carry a `data-i18n` attribute whose value is a translation key.
 *   - `applyLang(lang)` iterates every [data-i18n] element (including gallery clones),
 *     updates text content, sets lang/dir on <html>, and persists the choice.
 *   - The hero typing effect is restarted via window.ochoRestartTyping (exposed by ocho-effects.js).
 *   - Language is persisted via localStorage when available; silently falls back otherwise.
 */
(function () {
  "use strict";

  var translations = {
    en: {
      /* page */
      "page.title": "Ocho Coffee House",

      /* header-top */
      "header.daily": "Daily: 8AM\u201312AM",
      "header.fri": "Fri: 2:30PM\u201312AM",

      /* nav */
      "nav.home": "Home",
      "nav.about": "About",
      "nav.menu": "Menu",
      "nav.gallery": "Gallery",
      "nav.visit": "Visit Us",

      /* lang toggle aria */
      "toggle.aria": "Switch to Arabic",

      /* hero */
      "hero.location": "Rabieh \u2022 Amman",
      "hero.typed": "OCHO Coffee House",

      /* about */
      "about.label": "ABOUT US",
      "about.title": "A Corner Where You Belong",
      "about.tagline": "Specialty coffee, warm light, and slow moments in the heart of Amman.",
      "about.desc": "Ocho Coffee House in Rabieh is a cozy caf\u00e9 made for morning rituals, afternoon catchups, and late-night conversations that linger.",

      /* menu section */
      "menu.title": "Our Ocho Favorites",
      "menu.subtitle": "Crafted for slow mornings and meaningful catchups.",

      /* menu items */
      "menu.cappuccino.name": "Cappuccino",
      "menu.cappuccino.desc": "Velvety espresso with equal parts steamed milk and silky foam \u2014 a timeless classic.",
      "menu.americano.name": "Americano",
      "menu.americano.desc": "Rich espresso shots diluted with hot water for a smooth, bold cup.",
      "menu.espresso.name": "Espresso",
      "menu.espresso.desc": "A concentrated shot of pure coffee, intense and full of character.",
      "menu.macchiato.name": "Macchiato",
      "menu.macchiato.desc": "Espresso marked with a touch of foamed milk \u2014 bold and beautifully balanced.",
      "menu.mocha.name": "Mocha",
      "menu.mocha.desc": "Espresso blended with chocolate and steamed milk \u2014 sweet and indulgent.",
      "menu.latte.name": "Coffee Latte",
      "menu.latte.desc": "Smooth espresso with generous steamed milk and a light cloud of foam.",
      "menu.piccolo.name": "Piccolo Latte",
      "menu.piccolo.desc": "A small but intense latte \u2014 full espresso character with a hint of milk.",
      "menu.ristretto.name": "Ristretto",
      "menu.ristretto.desc": "A shorter, sweeter espresso pull with layered depth and complexity.",
      "menu.affogato.name": "Affogato",
      "menu.affogato.desc": "A scoop of vanilla ice cream drowned in a hot shot of espresso.",

      /* gallery */
      "gallery.title": "A Glimpse of Ocho",
      "gallery.subtitle": "Warm corners, calm moments, and specialty brews.",
      "gallery.cap1": "Freshly Brewed",
      "gallery.cap2": "Cozy Gatherings",
      "gallery.cap3": "Signature Moments",
      "gallery.cap4": "Sweet Breaks",
      "gallery.cap5": "Rabieh Vibes",

      /* reviews */
      "reviews.title": "Loved by Our Guests",
      "reviews.subtitle": "A neighborhood caf\u00e9 where moments stay.",
      "reviews.r1.author": "Samar Bitar",
      "reviews.r1.text": "Cozy atmosphere, friendly staff, and affordable prices. I love this space, its drinks, and its sense of community. If you want to socialise or work in a calm place that feels welcoming and warm, OCHO is perfect.",
      "reviews.r2.author": "Sakha\u2019 AlZaatreh",
      "reviews.r2.text": "Perfect for small events, casual gatherings, working, or just enjoying a good cup of coffee.",

      /* stats */
      "stats.guests": "Guests",
      "stats.cups": "Cups",
      "stats.sweets": "Baked Sweets",
      "stats.smiles": "Smiles",

      /* footer */
      "footer.tagline": "where moments stay",
      "footer.location": "Rabieh, Amman, Jordan",
      "footer.hours.title": "Opening Hours",
      "footer.hours.text": "Daily 8AM\u201312AM\u00a0|\u00a0Fri 2:30PM\u201312AM",
      "footer.social.title": "Instagram"
    },

    ar: {
      /* page */
      "page.title": "\u0628\u064a\u062a \u0623\u0648\u0634\u0648 \u0644\u0644\u0642\u0647\u0648\u0629",

      /* header-top */
      "header.daily": "\u064a\u0648\u0645\u064a\u0627\u064b: \u0668\u0635 \u2013 \u0661\u0662\u0645",
      "header.fri": "\u0627\u0644\u062c\u0645\u0639\u0629: \u0662:\u0663\u0660\u0645 \u2013 \u0661\u0662\u0645",

      /* nav */
      "nav.home": "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
      "nav.about": "\u062d\u0648\u0644\u0646\u0627",
      "nav.menu": "\u0627\u0644\u0642\u0627\u0626\u0645\u0629",
      "nav.gallery": "\u0627\u0644\u0645\u0639\u0631\u0636",
      "nav.visit": "\u0632\u0648\u0631\u0648\u0646\u0627",

      /* lang toggle aria */
      "toggle.aria": "Switch to English",

      /* hero */
      "hero.location": "\u0627\u0644\u0631\u0627\u0628\u064a\u0629 \u2022 \u0639\u0645\u0651\u0627\u0646",
      "hero.typed": "\u0628\u064a\u062a \u0623\u0648\u0634\u0648 \u0644\u0644\u0642\u0647\u0648\u0629",

      /* about */
      "about.label": "\u0645\u0646 \u0646\u062d\u0646",
      "about.title": "\u0632\u0627\u0648\u064a\u0629 \u062a\u0646\u062a\u0645\u064a \u0625\u0644\u064a\u0647\u0627",
      "about.tagline": "\u0642\u0647\u0648\u0629 \u0645\u062e\u062a\u0635\u0629\u060c \u0625\u0636\u0627\u0621\u0629 \u062f\u0627\u0641\u0626\u0629\u060c \u0648\u0644\u062d\u0638\u0627\u062a \u0647\u0627\u062f\u0626\u0629 \u0641\u064a \u0642\u0644\u0628 \u0639\u0645\u0651\u0627\u0646.",
      "about.desc": "\u0628\u064a\u062a \u0623\u0648\u0634\u0648 \u0644\u0644\u0642\u0647\u0648\u0629 \u0641\u064a \u0627\u0644\u0631\u0627\u0628\u064a\u0629 \u2014 \u0645\u0642\u0647\u0649 \u0645\u0631\u064a\u062d \u0635\u064f\u0646\u0639 \u0644\u0637\u0642\u0648\u0633 \u0627\u0644\u0635\u0628\u0627\u062d\u060c \u0644\u0642\u0627\u0621\u0627\u062a \u0627\u0644\u0645\u0633\u0627\u0621\u060c \u0648\u0623\u062d\u0627\u062f\u064a\u062b \u0627\u0644\u0644\u064a\u0644 \u0627\u0644\u062a\u064a \u0644\u0627 \u062a\u0646\u062a\u0647\u064a.",

      /* menu section */
      "menu.title": "\u0645\u0641\u0636\u0644\u062a\u0646\u0627 \u0641\u064a \u0623\u0648\u0634\u0648",
      "menu.subtitle": "\u0645\u064f\u0639\u062f\u0651\u064e\u0629 \u0644\u0644\u0635\u0628\u0627\u062d\u0627\u062a \u0627\u0644\u0647\u0627\u062f\u0626\u0629 \u0648\u0627\u0644\u0644\u0642\u0627\u0621\u0627\u062a \u0627\u0644\u0645\u0645\u064a\u0632\u0629.",

      /* menu items */
      "menu.cappuccino.name": "\u0643\u0627\u0628\u062a\u0634\u064a\u0646\u0648",
      "menu.cappuccino.desc": "\u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0646\u0627\u0639\u0645 \u0645\u0639 \u062d\u0644\u064a\u0628 \u0645\u0628\u062e\u0651\u0631 \u0648\u0631\u063a\u0648\u0629 \u062d\u0631\u064a\u0631\u064a\u0629 \u2014 \u0643\u0644\u0627\u0633\u064a\u0643\u064a \u062e\u0627\u0644\u062f.",
      "menu.americano.name": "\u0623\u0645\u064a\u0631\u064a\u0643\u0627\u0646\u0648",
      "menu.americano.desc": "\u062c\u0631\u0639\u0627\u062a \u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u063a\u0646\u064a\u0629 \u0645\u062e\u0641\u0641\u0629 \u0628\u0627\u0644\u0645\u0627\u0621 \u0627\u0644\u0633\u0627\u062e\u0646 \u2014 \u0633\u0644\u0633 \u0648\u062c\u0631\u064a\u0621.",
      "menu.espresso.name": "\u0625\u0633\u0628\u0631\u064a\u0633\u0648",
      "menu.espresso.desc": "\u062c\u0631\u0639\u0629 \u0642\u0647\u0648\u0629 \u062e\u0627\u0644\u0635\u0629 \u0645\u0631\u0643\u0651\u0632\u0629\u060c \u0645\u0643\u062b\u0641\u0629 \u0648\u0645\u0645\u062a\u0644\u0626\u0629 \u0628\u0627\u0644\u0634\u062e\u0635\u064a\u0629.",
      "menu.macchiato.name": "\u0645\u0627\u0643\u064a\u0627\u062a\u0648",
      "menu.macchiato.desc": "\u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0628\u0644\u0645\u0633\u0629 \u062e\u0641\u064a\u0641\u0629 \u0645\u0646 \u0631\u063a\u0648\u0629 \u0627\u0644\u062d\u0644\u064a\u0628 \u2014 \u062c\u0631\u064a\u0621 \u0648\u0645\u062a\u0648\u0627\u0632\u0646.",
      "menu.mocha.name": "\u0645\u0648\u0643\u0627",
      "menu.mocha.desc": "\u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0645\u0639 \u0627\u0644\u0634\u0648\u0643\u0648\u0644\u0627\u062a\u0629 \u0648\u0627\u0644\u062d\u0644\u064a\u0628 \u0627\u0644\u0645\u0628\u062e\u0651\u0631 \u2014 \u062d\u0644\u0648 \u0648\u0645\u062f\u0644\u0651\u0644.",
      "menu.latte.name": "\u0644\u0627\u062a\u064a\u0647 \u0628\u0627\u0644\u0642\u0647\u0648\u0629",
      "menu.latte.desc": "\u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0646\u0627\u0639\u0645 \u0645\u0639 \u062d\u0644\u064a\u0628 \u0645\u0628\u062e\u0651\u0631 \u0648\u0627\u0641\u0631 \u0648\u0631\u063a\u0648\u0629 \u062e\u0641\u064a\u0641\u0629 \u0641\u064a \u0627\u0644\u0623\u0639\u0644\u0649.",
      "menu.piccolo.name": "\u0628\u064a\u0643\u0648\u0644\u0648 \u0644\u0627\u062a\u064a\u0647",
      "menu.piccolo.desc": "\u0644\u0627\u062a\u064a\u0647 \u0635\u063a\u064a\u0631 \u0644\u0643\u0646\u0647 \u062c\u0631\u064a\u0621 \u2014 \u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0642\u0648\u064a \u0628\u0644\u0645\u0633\u0629 \u062d\u0644\u064a\u0628 \u062e\u0641\u064a\u0641\u0629.",
      "menu.ristretto.name": "\u0631\u064a\u0633\u062a\u0631\u064a\u062a\u0648",
      "menu.ristretto.desc": "\u062c\u0631\u0639\u0629 \u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0623\u0642\u0635\u0631 \u0648\u0623\u062d\u0644\u0649\u060c \u0639\u0645\u064a\u0642\u0629 \u0627\u0644\u0646\u0643\u0647\u0627\u062a \u0648\u0645\u0639\u0642\u062f\u0629.",
      "menu.affogato.name": "\u0623\u0641\u0648\u063a\u0627\u062a\u0648",
      "menu.affogato.desc": "\u0643\u0631\u0629 \u0622\u064a\u0633 \u0643\u0631\u064a\u0645 \u0641\u0627\u0646\u064a\u0644\u064a\u0627 \u062a\u063a\u0631\u0642 \u0641\u064a \u062c\u0631\u0639\u0629 \u0625\u0633\u0628\u0631\u064a\u0633\u0648 \u0633\u0627\u062e\u0646\u0629.",

      /* gallery */
      "gallery.title": "\u0644\u0645\u062d\u0629 \u0645\u0646 \u0623\u0648\u0634\u0648",
      "gallery.subtitle": "\u0632\u0648\u0627\u064a\u0627 \u062f\u0627\u0641\u0626\u0629\u060c \u0644\u062d\u0638\u0627\u062a \u0647\u0627\u062f\u0626\u0629\u060c \u0648\u0642\u0647\u0648\u0629 \u0645\u062e\u062a\u0635\u0629.",
      "gallery.cap1": "\u0637\u0627\u0632\u062c \u0648\u0639\u0637\u0631",
      "gallery.cap2": "\u062a\u062c\u0645\u0639\u0627\u062a \u0645\u0631\u064a\u062d\u0629",
      "gallery.cap3": "\u0644\u062d\u0638\u0627\u062a \u0645\u0645\u064a\u0632\u0629",
      "gallery.cap4": "\u0627\u0633\u062a\u0631\u0627\u062d\u0627\u062a \u062d\u0644\u0648\u0629",
      "gallery.cap5": "\u0623\u062c\u0648\u0627\u0621 \u0627\u0644\u0631\u0627\u0628\u064a\u0629",

      /* reviews */
      "reviews.title": "\u064a\u064f\u062d\u0628\u0651\u0646\u0627 \u0636\u064a\u0648\u0641\u0646\u0627",
      "reviews.subtitle": "\u0645\u0642\u0647\u0649 \u062d\u064a\u0651 \u062a\u0639\u064a\u0634 \u0641\u064a\u0647 \u0627\u0644\u0644\u062d\u0638\u0627\u062a.",
      "reviews.r1.author": "\u0633\u0645\u0631 \u0628\u064a\u0637\u0627\u0631",
      "reviews.r1.text": "\u0623\u062c\u0648\u0627\u0621 \u0645\u0631\u064a\u062d\u0629\u060c \u0637\u0627\u0642\u0645 \u0648\u062f\u064a\u0651\u060c \u0648\u0623\u0633\u0639\u0627\u0631 \u0645\u0639\u0642\u0648\u0644\u0629. \u0623\u062d\u0628 \u0647\u0630\u0627 \u0627\u0644\u0645\u0643\u0627\u0646 \u0628\u0645\u0634\u0631\u0648\u0628\u0627\u062a\u0647 \u0648\u0631\u0648\u062d \u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0641\u064a\u0647. \u0625\u0646 \u0643\u0646\u062a\u064e \u062a\u0628\u062d\u062b \u0639\u0646 \u0645\u0643\u0627\u0646 \u0644\u0644\u062a\u0648\u0627\u0635\u0644 \u0623\u0648 \u0627\u0644\u0639\u0645\u0644 \u0641\u064a \u0647\u062f\u0648\u0621\u060c \u0623\u0648\u0634\u0648 \u0647\u0648 \u0627\u0644\u062e\u064a\u0627\u0631 \u0627\u0644\u0645\u062b\u0627\u0644\u064a.",
      "reviews.r2.author": "\u0635\u062e\u0627\u0621 \u0627\u0644\u0632\u0639\u062a\u0631\u0629",
      "reviews.r2.text": "\u0645\u062b\u0627\u0644\u064a \u0644\u0644\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0627\u0644\u0635\u063a\u064a\u0631\u0629\u060c \u0627\u0644\u062a\u062c\u0645\u0639\u0627\u062a \u063a\u064a\u0631 \u0627\u0644\u0631\u0633\u0645\u064a\u0629\u060c \u0627\u0644\u0639\u0645\u0644\u060c \u0623\u0648 \u0645\u062c\u0631\u062f \u0627\u0644\u0627\u0633\u062a\u0645\u062a\u0627\u0639 \u0628\u0643\u0648\u0628 \u0642\u0647\u0648\u0629 \u0644\u0627 \u064a\u064f\u0646\u0633\u0649.",

      /* stats */
      "stats.guests": "\u0636\u064a\u0641",
      "stats.cups": "\u0643\u0648\u0628 \u0642\u0647\u0648\u0629",
      "stats.sweets": "\u062d\u0644\u0648\u0649 \u0637\u0627\u0632\u062c\u0629",
      "stats.smiles": "\u0627\u0628\u062a\u0633\u0627\u0645\u0629",

      /* footer */
      "footer.tagline": "\u062d\u064a\u062b \u062a\u0628\u0642\u0649 \u0627\u0644\u0644\u062d\u0638\u0627\u062a",
      "footer.location": "\u0627\u0644\u0631\u0627\u0628\u064a\u0629\u060c \u0639\u0645\u0651\u0627\u0646\u060c \u0627\u0644\u0623\u0631\u062f\u0646",
      "footer.hours.title": "\u0623\u0648\u0642\u0627\u062a \u0627\u0644\u0639\u0645\u0644",
      "footer.hours.text": "\u064a\u0648\u0645\u064a\u0627\u064b \u0668\u0635\u2013\u0661\u0662\u0645\u00a0|\u00a0\u0627\u0644\u062c\u0645\u0639\u0629 \u0662:\u0663\u0660\u0645\u2013\u0661\u0662\u0645",
      "footer.social.title": "Instagram"
    }
  };

  /* ─── helpers ─────────────────────────────────────────── */
  function safeStorage(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* sandboxed – silently ignore */ }
  }
  function safeGetStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ─── core apply ──────────────────────────────────────── */
  function applyLang(lang) {
    if (!translations[lang]) return;
    var t = translations[lang];
    var isRTL = (lang === "ar");

    /* 1. document root attributes */
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");

    /* 2. translate every [data-i18n] element (includes gallery clones) */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    /* 3. update hero typed text attribute + restart animation */
    var typedEl = document.getElementById("ocho-hero-typed");
    if (typedEl && t["hero.typed"]) {
      typedEl.setAttribute("data-text", t["hero.typed"]);
      if (typeof window.ochoRestartTyping === "function") {
        window.ochoRestartTyping();
      }
    }

    /* 4. update <title> */
    document.title = t["page.title"] || "Ocho Coffee House";

    /* 5. update toggle button state */
    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.setAttribute("aria-label", t["toggle.aria"]);
      var enSpan = btn.querySelector(".lang-en");
      var arSpan = btn.querySelector(".lang-ar");
      if (enSpan) enSpan.classList.toggle("lang-active", lang === "en");
      if (arSpan) arSpan.classList.toggle("lang-active", lang === "ar");
    }

    /* 6. persist */
    safeStorage("ocho-lang", lang);
  }

  /* ─── toggle handler ──────────────────────────────────── */
  function attachToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("lang") === "ar" ? "en" : "ar";
      applyLang(next);
    });

    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  }

  /* ─── init ────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    attachToggle();
    var saved = safeGetStorage("ocho-lang") || "en";
    applyLang(saved);
  });

  /* expose for external use (e.g. testing) */
  window.ochoI18n = { apply: applyLang };
})();
