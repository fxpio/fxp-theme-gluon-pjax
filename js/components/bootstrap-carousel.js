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
import 'bootstrap/js/carousel';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('[data-ride="carousel"]', $container).each(function () {
        let $this = $(this);
        $.fn.carousel.call($this, $this.data());
    });
});
