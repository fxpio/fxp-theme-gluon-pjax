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
        define(['jquery', 'jquery-pjax', 'fxp-theme-gluon-pjax', 'bootstrap/js/popover'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTERS DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-toggle="popover"]:not([id])', $container).each(function () {
            var $this = $(this);
            $.fn.popover.call($this, $this.data());
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-toggle="popover"]:not([id])', $container).each(function () {
            var $this = $(this);
            $.fn.popover.call($this, 'destroy');
        });
    });

    // POPOVER DATA-API
    // ================

    $(window).on('load', function () {
        $('[data-toggle="popover"]:not([id])').each(function () {
            var $this = $(this);
            $.fn.popover.call($this, $this.data());
        });
    });
}));
