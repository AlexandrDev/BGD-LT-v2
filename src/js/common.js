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
    $('.main-menu, .search').show();


    /*
     * Main menu
     */
    const MainMenu = function () {
        $('[data-main-menu-open]').on(click_event, function() {
            toggleModal('main-menu')
        })

        $('.main-menu__close-btn, .main-menu__overlay').each(function () {
          $(this).on(click_event, function() {
              closeModals()
          })
        })

        $('.main-menu-item_parent').each(function () {
            const $item = $(this),
                $arrow = $item.find('> .main-menu-item__link > .main-menu-item__arrow'),
                $submenu = $item.find('> .main-menu-item__submenu');

            $arrow.on(click_event, function () {
                $item.toggleClass('main-menu-item_opened')
                $submenu.slideToggle(200)
            })
        })
    }

    new MainMenu()


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


})