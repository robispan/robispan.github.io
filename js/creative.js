(function ($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 57)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 57
	});

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

	// Scroll reveal calls
	window.sr = ScrollReveal();
	sr.reveal('.sr-icons', {
		duration: 600,
		scale: 0.3,
		distance: '0px'
	}, 200);
	sr.reveal('.sr-button', {
		duration: 1000,
		delay: 200
	});
	sr.reveal('.sr-contact', {
		duration: 600,
		scale: 0.3,
		distance: '0px'
	}, 300);

	// Magnific popup calls
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

	$('.popup-gallery').on('mfpOpen', function (e /*, params */) {
	});
	$('.popup-gallery').on('mfpChange', function () {
		setTimeout(function () {

			const currItem = $.magnificPopup.instance.currItem.el[0];

			const demoLink = document.querySelector('.mfp-figure .project-demo-link');
			if (demoLink) {
				demoLink.href = currItem.dataset.link;
			} else {
				const demoLink = document.createElement('a');
				demoLink.href = currItem.dataset.link;
				demoLink.target = "_blank";
				demoLink.innerHTML = "Visit demo";
				demoLink.classList.add("project-demo-link");
				document.querySelector('.mfp-figure').append(demoLink);
			}
		}, 0);
	});

})(jQuery); // End of use strict
