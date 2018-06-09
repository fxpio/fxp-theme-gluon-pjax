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
import 'bootstrap/js/tooltip';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('[data-toggle="tooltip"]:not([id])', $container).each(function () {
        let $this = $(this);
        $.fn.tooltip.call($this, $this.data());
    });
});

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.apiUnregisters.push(function ($container) {
    $('[data-toggle="tooltip"]:not([id])', $container).each(function () {
        let $this = $(this);
        $.fn.tooltip.call($this, 'destroy');
    });
});

/**
 * Data API.
 */
$(window).on('load', function () {
    $('[data-toggle="tooltip"]:not([id])').each(function () {
        let $this = $(this);
        $.fn.tooltip.call($this, $this.data());
    });
});
