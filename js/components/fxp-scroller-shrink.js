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
        define(['jquery', '@fxp/jquery-pjax', '../app-pjax', '@fxp/theme-gluon/js/scroller-shrink'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTER DEFINITION
    // ======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        if (typeof window.scrollerShrinkComponents === 'function') {
            window.scrollerShrinkComponents($container);
        }
    });
}));
