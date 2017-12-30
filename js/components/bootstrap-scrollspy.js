/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/

/**
 * @param {jQuery} $
 *
 * @typedef {object} define.amd
 *
 * @author François Pluchino <francois.pluchino@gmail.com>
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery-pjax', 'fxp-theme-gluon-pjax', 'bootstrap/js/scrollspy'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTER DEFINITION
    // ======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-spy="scroll"]:not([id])', $container).each(function () {
            var $this = $(this);
            $.fn.scrollspy.call($this, $this.data());
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-spy="scroll"]:not([id])', $container).each(function () {
            var $this = $(this),
                scrollspy = $this.data('bs.scrollspy');

            scrollspy.$scrollElement.off('scroll.bs.scrollspy', $.proxy(scrollspy.process, scrollspy));
        });
    });

    // SCROLL SPY DATA-API
    // ===================

    $(window).on('load', function () {
        $('[data-toggle="scroll"]:not([id])').each(function () {
            var $this = $(this);
            $.fn.scrollspy.call($this, $this.data());
        });
    });
}));
