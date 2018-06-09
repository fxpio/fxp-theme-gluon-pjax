/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';
import AppPjax from '../app-pjax';
import 'bootstrap/js/scrollspy';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('[data-spy="scroll"]:not([id])', $container).each(function () {
        let $this = $(this);
        $.fn.scrollspy.call($this, $this.data());
    });
});

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.apiUnregisters.push(function ($container) {
    $('[data-spy="scroll"]:not([id])', $container).each(function () {
        let $this = $(this),
            scrollspy = $this.data('bs.scrollspy');

        scrollspy.$scrollElement.off('scroll.bs.scrollspy', $.proxy(scrollspy.process, scrollspy));
    });
});

/**
 * Data API.
 */
$(window).on('load', function () {
    $('[data-toggle="scroll"]:not([id])').each(function () {
        let $this = $(this);
        $.fn.scrollspy.call($this, $this.data());
    });
});
