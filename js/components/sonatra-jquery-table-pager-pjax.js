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
        define(['jquery', 'jquery-pjax', 'app-pjax', 'sonatra-jquery-table-pager', 'sonatra-jquery-table-pager-pjax'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTER DEFINITION
    // ======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('[data-table-pager="true"]', $container).each(function () {
            var $this = $(this);
            $.fn.tablePagerPjax.call($this, $this.data());
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('[data-table-pager="true"]', $container).each(function () {
            var $this = $(this);
            $.fn.tablePagerPjax.call($this, 'destroy');
        });
    });
}));
