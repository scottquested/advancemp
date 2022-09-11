(function ($, root) {
	$(function () {
		"use strict";

		function sliderOptions() {
			const $slider = $(".testimonials");

			$slider.slick({
				infinite: true,
				centerMode: true,
				centerPadding: "60px",
				cssEase: "ease-in-out",
				slidesToShow: 1,
				variableWidth: true,
				autoplay: true,
				autoplaySpeed: 6000,
				speed: 800,
			});
		}

		sliderOptions();

		function updateHash() {
			const $nav_items = $(".js-header-nav-item");

			$nav_items.each(function () {
				const $this = $(this);

				$this.on("click", function (e) {
					e.preventDefault();

					$(".js-nav").removeClass("s-nav-open").addClass("s-nav-close");
					$(".js-nav-control").removeClass("is-active");
				});
			});
		}

		updateHash();

		function navControl() {
			console.log("runs nav");
			const $target = $(".js-nav-control");

			$target.each(function () {
				const $button_object = $(this),
					$nav = $(".js-nav"),
					// State classes
					state = {
						active: "is-active",
						nav_open: "s-nav-open",
						nav_close: "s-nav-close",
					};

				// Toggle the nav
				function toggleTags() {
					$button_object.toggleClass(state.active);

					if ($nav.hasClass(state.nav_open)) {
						$nav.removeClass(state.nav_open);
						$nav.toggleClass(state.nav_close);
					} else {
						$nav.removeClass(state.nav_close);
						$nav.toggleClass(state.nav_open);
					}
				}

				// Bind the events
				function bindEvents() {
					// Bind click to button
					$button_object.on("click", function () {
						toggleTags();
					});
				}

				bindEvents();
			});
		}

		navControl();
	});
})(jQuery, this);
