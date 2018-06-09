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
import '@fxp/jquery-ripple';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    // clean old ripple actions
    $('.ripple-action', $container).each(function () {
        let $this = $(this);
        $this.removeClass('ripple-action');
        $('.ripple', $this).remove();
    });

    AppPjax.createDefaultRegister('ripple', '[data-ripple]')($container);
});

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.addDefaultUnregister('ripple', '[data-ripple]');
