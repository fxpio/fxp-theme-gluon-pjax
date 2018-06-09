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
import 'bootstrap/js/affix';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('[data-spy="affix"]', $container).each(function () {
        let $spy = $(this),
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

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.apiUnregisters.push(function ($container) {
    $('[data-spy="affix"]', $container).each(function () {
        let $this = $(this),
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
