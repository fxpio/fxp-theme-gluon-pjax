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
import '@fxp/theme-gluon/js/navbar-sidebar';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    AppPjax.createDefaultRegister('navbarSidebar', '[data-navbar-sidebar="true"]')($container);

    // refresh position
    $('[data-navbar-sidebar="true"]', 'body').each(function () {
        $.fn.navbarSidebar.call($(this), 'refreshPosition');
    });
});

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.addDefaultUnregister('navbarSidebar', '[data-navbar-sidebar="true"]');
