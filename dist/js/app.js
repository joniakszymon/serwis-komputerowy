var Page = Page || {};
(function($) {

    /* ---------------------------------------------
        Global Variables
    --------------------------------------------- */
    var $window = $(window),
        $html = $('html'),
        $body = $('body');
    
    /* ---------------------------------------------
        APP document Ready
    --------------------------------------------- */
    Page.documentOnReady = {
        init: function() {
            Page.initialize.init();
        }
    };
    
    /* ---------------------------------------------
        Page document Load
    --------------------------------------------- */
    Page.documentOnLoad = {
        init: function() {
            Page.initialize.preloader();
        }
    };
    
    /* ---------------------------------------------
        APP document Resize
    --------------------------------------------- */
    Page.documentOnResize = {
        init: function() {
            var t = setTimeout(function() {
            }, 250);
        }
    };
    
    /* ---------------------------------------------
        Scripts initialization
    --------------------------------------------- */
    $(document).ready( Page.documentOnReady.init);
    $window.on('load', Page.documentOnLoad.init);
    $window.on('resize', Page.documentOnResize.init);
    
    /* ------------------------------------------------------------------------------------------------------------------
        #############################################################################################################
    ------------------------------------------------------------------------------------------------------------------ */

    Page.initialize = {
        init: function() {
            Page.initialize.aos();
            Page.initialize.header();
            Page.initialize.innerLinks();
        },
        superfish: function () {
            $('.header .header-menu ul ul').css('display', 'block');
            $('.header .header-menu ul ul').css('display', '');
            if (!$().superfish) {
                $body.addClass('no-superfish');
                console.log('superfish: Superfish not Defined.');
                return true;
            }
            $('.header .header-menu > ul').superfish({
                popUpSelector: 'ul',
                delay: 250,
                speed: 350,
                animation: {opacity: 'show'},
                animationOut: {opacity: 'hide'},
                cssArrows: false
            });

            $('.offcanvas-menu li:has(ul) > a').on('click touchend', function (e) {
                $(this).parents('.sub-menu').siblings().find('ul').removeClass('d-block');
                $(this).parent('li').children('ul').toggleClass('d-block');
                e.preventDefault();
            });
        },
        /* ---------------------------------------------
            Preloader
        --------------------------------------------- */
        preloader: function() {
            $body.removeClass("loading");
            $body.addClass("loaded");
        },
        
        /* ---------------------------------------------
            Aos
        --------------------------------------------- */
        aos: function() {
            AOS.init({
                // Global settings
                //disable: $(window).width() < 1199, // accepts following values: 'phone', 'tabvar', 'mobile', boolean, expression or function
                //startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
                initClassName: 'aos-init', // class applied after initialization
                animatedClassName: 'aos-animate', // class applied on animation
                useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
              
                // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
                offset: 150, // offset (in px) from the original trigger point
                delay: 400, // values from 0 to 3000, with step 50ms
                duration: 450, // values from 0 to 3000, with step 50ms
                easing: 'ease', // default easing for AOS animations
                once: true, // whether animation should happen only once - while scrolling down
                mirror: false, // whether elements should animate out while scrolling past them
                anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
            });

            window.addEventListener('load', AOS.refresh);
        },

        /* ---------------------------------------------
            Header, main menu
        --------------------------------------------- */
        header: function () {
            var $offcanvasMenu = $('#offcanvas');
            var $toggleMenu = $("#toggle-menu");
            var scroll_amount = 30;

            // offcanvas
            $toggleMenu.click(function(e){
                e.preventDefault();
                $(this).toggleClass("is-active");
                $offcanvasMenu.toggleClass('active');
                $body.toggleClass("menu-is-active");
            });

            $offcanvasMenu.delegate("#closeOffcanvas", 'click', function (e) {
                e.preventDefault();
                $toggleMenu.toggleClass("is-active");
                $offcanvasMenu.toggleClass('active');
                $body.toggleClass("menu-is-active");
            });

            /*$(document).mouseup(function (e) {
                var i = $("#offcanvas-cart.active");
                if (!(i.is(e.target) || 0 !== i.has(e.target).length)) {
                    i.removeClass('active');
                    $toggleCart.removeClass("active");
                    $body.removeClass("cart-is-active");
                }
            });*/

            // scroll event
            if ( $window.scrollTop() > scroll_amount ){
                $body.addClass("page-scroll");
            }
            $window.scroll(function() {
                if ( $(this).scrollTop() > scroll_amount ){
                    $body.addClass("page-scroll");
                } else{
                    $body.removeClass("page-scroll");
                }
            });
        },
    };

        /* ---------------------------------------------
            Slider main site
        --------------------------------------------- */

        $(document).ready(function () {
            var slideCount = $("#ns-slider ul.image_slider_ul li").length;
            var slideWidth = $("#ns-slider ul.image_slider_ul li").width();
            var slideHeight = $("#ns-slider ul.image_slider_ul li").height();
            var sliderUlWidth = slideCount * slideWidth;
          
            $("#ns-slider ul.image_slider_ul").css({ marginLeft: -slideWidth });
          
            $("#ns-slider ul.image_slider_ul li:last-child").prependTo(
              "#ns-slider ul.image_slider_ul"
            );
          
            function moveLeft() {
              $("#ns-slider ul.image_slider_ul").animate(
                {
                  left: +slideWidth
                },
                600,
                function () {
                  $("#ns-slider ul.image_slider_ul li:last-child").prependTo(
                    "#ns-slider ul.image_slider_ul"
                  );
                  $("#ns-slider ul.image_slider_ul").css("left", "");
                }
              );
            }
          
            function moveRight() {
              $("#ns-slider ul.image_slider_ul").animate(
                {
                  left: -slideWidth
                },
                600,
                function () {
                  $("#ns-slider ul.image_slider_ul li:first-child").appendTo(
                    "#ns-slider ul.image_slider_ul"
                  );
                  $("#ns-slider ul.image_slider_ul").css("left", "");
                }
              );
            }
          
            var navDots = [];
          
            for (var i = 0; i < slideCount; i++) {
              navDots[i] = '<li currentSlide="' + i + '"></li>';
              $(".ns-indicator").append(navDots[i]);
            }
          
            var count = 0;
            $("ul.ns-indicator li").eq(count).addClass("active");
          
            slideCountforindicators = slideCount - 1;
            $(".ns-slide-btn.control_prev").click(function () {
              moveLeft();
          
              $("ul.ns-indicator li").eq(count).removeClass("active");
              count--;
              if (count < 0) {
                count = slideCountforindicators;
              }
          
              $("ul.ns-indicator li").eq(count).addClass("active");
            });
          
            $(".ns-slide-btn.control_next").click(function () {
              moveRight();
          
              $("ul.ns-indicator li").eq(count).removeClass("active");
              count++;
              if (count > slideCountforindicators) {
                count = 0;
              }
          
              $("ul.ns-indicator li").eq(count).addClass("active");
            });
          
            //   Automatic Slider
          
            setInterval(function () {
              if ($("#ns-slider").is(":hover")) {
              } else {
                moveRight();
                $("ul.ns-indicator li").eq(count).removeClass("active");
                count++;
                if (count > slideCountforindicators) {
                  count = 0;
                }
          
                $("ul.ns-indicator li").eq(count).addClass("active");
              }
            }, 4000);
          });

})(jQuery);