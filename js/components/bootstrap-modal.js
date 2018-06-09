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
import 'bootstrap/js/modal';

/**
 * Get the target of the modal toggle.
 *
 * @param {jQuery} $this The toggle of modal
 *
 * @return {jQuery}
 *
 * @private
 */
function getTarget($this) {
    return $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));// strip for ie7
}

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('[data-toggle="modal"]', $container).each(function () {
        getTarget($(this)).css('display', '');
    });
});

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.apiUnregisters.push(function ($container) {
    $('[data-toggle="modal"]', $container).each(function () {
        getTarget($(this)).modal('hide');
    });
});
