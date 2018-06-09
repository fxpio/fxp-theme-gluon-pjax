/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Action on scoll of body is locked or unlocked.
 *
 * @param {jQuery.Event|Event} event The event
 *
 * @typedef {Number} jQuery.Event.eventData
 */
export function onLockBodyScroll (event) {
    let $navbars = $('.navbar-fixed-top, .navbar-fixed-bottom'),
        nativeScrollWidth = event.eventData,
        margin = 'apppjax:lock-body-scroll' === event.type ? nativeScrollWidth + 'px' : '';

    if (nativeScrollWidth > 0) {
        $navbars.css('margin-right', margin);

        if ('' !== margin) {
            $navbars.attr('data-navbar-modal-skip', 'true');
        } else {
            $navbars.removeAttr('data-navbar-modal-skip');
        }
    }
}
