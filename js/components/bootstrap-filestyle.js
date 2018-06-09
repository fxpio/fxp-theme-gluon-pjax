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
import 'bootstrap-filestyle';

/**
 * Add the App Pjax Component Register.
 */
AppPjax.apiRegisters.push(function ($container) {
    $('.filestyle', $container).each(function () {
        let $this = $(this),
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

/**
 * Add the App Pjax Component Unregister.
 */
AppPjax.apiUnregisters.push(function ($container) {
    $('.filestyle', $container).each(function () {
        let $this = $(this);
        $this.filestyle('destroy');
    });
});
