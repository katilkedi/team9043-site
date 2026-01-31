(
    function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Courses carousel
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
    });


    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    // Language toggle (TR / EN)
    $(document).ready(function () {
        // Keep current language in a variable so we can reuse it
        var currentLang = 'tr';

        function applyLanguage(lang) {
            currentLang = lang;

            // Update html lang attribute
            $("html").attr("lang", lang);

            // Swap all elements that have both data-en and data-tr
            $('[data-en][data-tr]').each(function () {
                var $el = $(this);
                var text = lang === 'en' ? $el.attr('data-en') : $el.attr('data-tr');

                if (typeof text !== 'undefined') {

                    // input & textarea ise placeholder
                    if ($el.is('input, textarea')) {
                        $el.attr('placeholder', text);
                    }
                    // diğerleri (button, span vs)
                    else {
                        $el.text(text);
                    }

                }
            });

        }

        // Read saved language from localStorage (if any)
        var storedLang = null;
        try {
            storedLang = window.localStorage ? localStorage.getItem('siteLanguage') : null;
        } catch (e) {
            storedLang = null;
        }

        if (storedLang === 'en' || storedLang === 'tr') {
            currentLang = storedLang;
        } else {
            currentLang = 'tr';
        }

        // Apply initial language
        applyLanguage(currentLang);

        // Dil butonları için event delegation
        $(document).on('click', '.lang-toggle button', function () {
            var $btn = $(this);
            var lang = $btn.data('lang');

            // Active state on buttons
            $btn.addClass('active').siblings('button').removeClass('active');

            // Apply and persist language
            applyLanguage(lang);
            try {
                if (window.localStorage) {
                    localStorage.setItem('siteLanguage', lang);
                }
            } catch (e) {
                // ignore storage errors
            }
        });

        // Header yüklendikten sonra aktif menü linkini ve dil butonlarını belirle
        document.addEventListener('headerLoaded', function () {
            var path = window.location.pathname.split('/').pop() || 'index.html';

            $('.navbar-nav .nav-link').each(function () {
                var href = $(this).attr('href');
                if (href === path) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });

            // Sync language buttons with current language
            $('.lang-toggle button').each(function () {
                var $btn = $(this);
                if ($btn.data('lang') === currentLang) {
                    $btn.addClass('active');
                } else {
                    $btn.removeClass('active');
                }
            });

            // Re-apply language so that dynamically loaded header/footer also use the correct language
            applyLanguage(currentLang);
        });

    });
    
})(jQuery);
