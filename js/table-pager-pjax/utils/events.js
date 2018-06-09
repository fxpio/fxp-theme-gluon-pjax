/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AppPjax from "../../app-pjax";

/**
 * Action on pre success event of table pager.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {TablePagerPjax} Event.data The table pager pjax instance
 */
export function onPreSuccess(event) {
    AppPjax.unregisterPlugins(event.data.$table);
}

/**
 * Action on post success event of table pager.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {TablePagerPjax} Event.data The table pager pjax instance
 */
export function onPostSuccess(event) {
    AppPjax.registerPlugins(event.data.$table);
}
