/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
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
 * @author François Pluchino <francois.pluchino@sonatra.com>
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery-pjax', 'sonatra-theme-gluon-pjax', 'bootstrap/js/tooltip'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTERS DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-toggle="tooltip"]:not([id])', $container).each(function () {
            var $this = $(this);
            $.fn.tooltip.call($this, $this.data());
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-toggle="tooltip"]:not([id])', $container).each(function () {
            var $this = $(this);
            $.fn.tooltip.call($this, 'destroy');
        });
    });

    // TOOLTIP DATA-API
    // ================

    $(window).on('load', function () {
        $('[data-toggle="tooltip"]:not([id])').each(function () {
            var $this = $(this);
            $.fn.tooltip.call($this, $this.data());
        });
    });
}));
