/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';

/**
 * Create the spinner element.
 *
 * @param {AppPjax} self The app pjax instance
 *
 * @return {jQuery}
 */
export function getSpinner(self) {
    return $(
        '<div class="preloader-container">' +
        '<div class="' + self.$container.attr('class') + '">' +
        '<div class="container-fluid">' +
        self.options.spinnerTemplate +
        '</div>' +
        '</div>' +
        '</div>'
    );
}
