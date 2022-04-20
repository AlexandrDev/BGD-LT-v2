$(function($) {
    let isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
        click_event = isTouch ? 'touchend' : 'click';

    let $body = $('body');

})