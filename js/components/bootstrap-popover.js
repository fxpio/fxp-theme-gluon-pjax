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
        define(['jquery', 'jquery-pjax', 'app-pjax', 'bootstrap/js/popover'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTERS DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-toggle="popover"]', $container).each(function () {
            $(this).popover();
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-toggle="popover"]', $container).each(function () {
            $(this).popover('destroy');
        });
    });
}));
