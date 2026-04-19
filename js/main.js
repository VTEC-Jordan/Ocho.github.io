$(document).ready(function () {
  "use strict";

  var window_height = window.innerHeight,
    header_height   = $(".default-header").height(),
    fitscreen       = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  // Gallery lightbox
  $(".img-pop-up").magnificPopup({
    type: "image",
    gallery: { enabled: true }
  });

  $(".img-pop-home").magnificPopup({
    type: "image",
    gallery: { enabled: true }
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({ id: "mobile-nav" });
    $mobile_nav.find("> ul").attr({ "class": "", "id": "" });
    $("body").append($mobile_nav);
    $("body").prepend("<button type=\"button\" id=\"mobile-nav-toggle\"><i class=\"lnr lnr-menu\"></i></button>");
    $("body").append("<div id=\"mobile-body-overly\"></div>");
    $("#mobile-nav").find(".menu-has-children").prepend("<i class=\"lnr lnr-chevron-down\"></i>");

    $(document).on("click", ".menu-has-children i", function () {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function () {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  }

  // Smooth scroll for nav links
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = $("#header").length ? $("#header").outerHeight() : 0;

        $("html, body").animate({
          scrollTop: target.offset().top - top_space
        }, 1500, "easeInOutExpo");

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Hash-based scroll on page load
  $("html, body").hide();
  if (window.location.hash) {
    setTimeout(function () {
      $("html, body").scrollTop(0).show();
      $("html, body").animate({ scrollTop: $(window.location.hash).offset().top }, 1000);
    }, 0);
  } else {
    $("html, body").show();
  }

  // Sticky header class on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });
});
