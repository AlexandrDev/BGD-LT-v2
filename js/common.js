$(function($) {
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
        click_event = isTouch ? 'touchend' : 'click';

    const $body = $('body');


    /*
     * Modals
     */
    let openedModals = [];

    function toggleModal(modal) {
        if (!openedModals.includes(modal)) {
            openedModals.push(modal)

            $body.addClass(modal + '-opened')
        } else {
            closeModals()
        }
    }

    function closeModals() {
        openedModals.forEach(function (modal) {
            $body.removeClass(modal + '-opened')
        })

        openedModals = [];
    }


    /*
     * fix transition
     */
    $('.mobile-menu, .search').show();


    /*
     * Mobile menu
     */
    const MobileMenu = function () {
        $('[data-mobile-menu-open]').on(click_event, function() {
            toggleModal('mobile-menu')
        })

        $('.mobile-menu__close-btn, .mobile-menu__overlay').each(function () {
          $(this).on(click_event, function() {
              closeModals()
          })
        })

        $('.mobile-menu-item_parent').each(function () {
            const $item = $(this),
                $arrow = $item.find('> .mobile-menu-item__link > .mobile-menu-item__arrow'),
                $submenu = $item.find('> .mobile-menu-item__submenu');

            $arrow.on(click_event, function () {
                $item.toggleClass('mobile-menu-item_opened')
                $submenu.slideToggle(200)
            })
        })
    }

    new MobileMenu()


    /*
     * Search
     */
    const Search = function () {
        $('[data-search-open]').on(click_event, function() {
            toggleModal('search')

            $('.search-row__input').trigger('focus')
        })

        $('.search-row__clear, .search__overlay').each(function () {
            $(this).on(click_event, function() {
                closeModals()
            })
        })
    }

    new Search()


    /*
     * Footer menu
     */
    const FooterMenu = function () {
        let isMobile = function () {
            return window.innerWidth < 1200;
        }

        let initSliding = function ($title, $content) {
            if (isMobile()) {
                $title.on(click_event, function () {
                    $content.slideToggle(200)
                })
            } else {
                $title.unbind(click_event)
                $content.slideDown(200)
            }
        }

        $('.footer-menu').each(function () {
            const $title = $(this).find('> .footer-menu__title'),
              $content = $(this).find('> .footer-menu__items');

            initSliding($title, $content)

            // $(window).resize(function () {
            //     initSliding($title, $content)
            // })
        })
    }

    new FooterMenu()


    /*
     * Slider
     */
    $.fn.initSlider = function (options) {
        let config = {
            slidesPerView: 'auto',
            navigation: {
                nextEl: this.find('.swiper-button-next')[0],
                prevEl: this.find('.swiper-button-prev')[0],
            },
            pagination: {
                el: this.find('.swiper-pagination')[0],
                clickable: true
            },
            ...options
        };

        new Swiper(this[0], config)
    }

    $('.main-slider').each(function () {
        $(this).initSlider({
            loop: true,
            effect: "fade",
            fadeEffect: {
                //crossFade: true
            },
        })
    })

    $('.cards-slider').each(function () {
        $(this).initSlider()
    })

})