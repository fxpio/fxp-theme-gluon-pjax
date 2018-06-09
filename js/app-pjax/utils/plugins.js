/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';
import AppPjax from "../index";

/**
 * Unregister the plugins.
 *
 * @param {AppPjax} self       The app pjax instance
 * @param {jQuery}  $container The container
 */
export function unregisterPlugins(self, $container) {
    let unregisterFunctions = getUnregisterFunctions(self, $container),
        sizeUnregisterFunctions = unregisterFunctions.length,
        i;

    AppPjax.unregisterPlugins($container);

    for (i = 0; i < sizeUnregisterFunctions; ++i) {
        unregisterFunctions[i]($container);
    }

    delete self.unregisters[$container.attr('id')];
}

/**
 * Get the unregister functions of container.
 *
 * @param {AppPjax}                       self      The app pjax instance
 * @param {string|elements|object|jQuery} container The container

 * @returns {function[]}
 *
 * @private
 */
function getUnregisterFunctions(self, container) {
    let $container = $(container),
        containerId = $container.attr('id'),
        keyUnregisters = Object.keys(self.unregisters),
        sizeUnregisters = keyUnregisters.length,
        foundUnregisters = [],
        i;

    for (i = 0; i < sizeUnregisters; ++i) {
        if (containerId === keyUnregisters[i] || $container.find('#' + keyUnregisters[i]).length > 0) {
            foundUnregisters = foundUnregisters.concat(self.unregisters[keyUnregisters[i]]);
        }
    }

    return foundUnregisters;
}
