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
        define(['jquery', 'jquery-pjax', 'app-pjax', 'bootstrap/js/affix'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTER DEFINITION
    // ======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-spy="affix"]', $container).each(function () {
            var $spy = $(this),
                data = $spy.data();

            data.offset = data.offset || {};

            if (data.offsetBottom !== null) {
                data.offset.bottom = data.offsetBottom;
            }

            if (data.offsetTop !== null) {
                data.offset.top = data.offsetTop;
            }

            $.fn.affix.call($spy, data);
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-spy="affix"]', $container).each(function () {
            var $this = $(this),
                affix = $this.data('bs.affix');

            if (undefined === affix) {
                return;
            }

            affix.$target
                .off('scroll.bs.affix.data-api', $.proxy(affix.checkPosition, affix))
                .off('click.bs.affix.data-api',  $.proxy(affix.checkPositionWithEventLoop, affix));

            $this.removeData('bs.affix');
        });
    });
}));
