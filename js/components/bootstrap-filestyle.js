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
        define(['jquery', 'jquery-pjax', 'sonatra-theme-gluon-pjax', 'bootstrap-filestyle'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX COMPONENT REGISTER DEFINITION
    // ======================================

    $.fn.appPjax.Constructor.API_REGISTERS.push(function ($container) {
        $('.filestyle', $container).each(function () {
            var $this = $(this),
                options = {
                    'input' : $this.attr('data-input') !== 'false',
                    'icon' : $this.attr('data-icon') !== 'false',
                    'buttonBefore' : $this.attr('data-buttonBefore') === 'true',
                    'disabled' : $this.attr('data-disabled') === 'true',
                    'size' : $this.attr('data-size'),
                    'buttonText' : $this.attr('data-buttonText'),
                    'buttonName' : $this.attr('data-buttonName'),
                    'iconName' : $this.attr('data-iconName'),
                    'badge' : $this.attr('data-badge') !== 'false',
                    'placeholder': $this.attr('data-placeholder')
                };

            $this.filestyle(options);
        });
    });

    // APP PJAX COMPONENT DESTROYER DEFINITION
    // =======================================

    $.fn.appPjax.Constructor.API_DESTROYERS.push(function ($container) {
        $('.filestyle', $container).each(function () {
            var $this = $(this);
            $this.filestyle('destroy');
        });
    });
}));
