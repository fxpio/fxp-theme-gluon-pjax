/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';
import {injectAttrPjaxOptions} from "./pjax";

/**
 * Trigger the event.
 *
 * @param {String}  type   The event type
 * @param {AppPjax} self   The app pjax instance
 * @param {*}       [data] The data
 */
export function triggerEvent(type, self, data) {
    $.event.trigger({
        type: 'apppjax:' + type + '.fxp.apppjax',
        sidebar: self,
        eventData: data,
        time: new Date()
    });
}

/**
 * Action on click to reload page.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onRefreshAction(event) {
    event.data.refresh();
}

/**
 * Action on submit form.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onSubmitAction(event) {
    let options = {},
        $target = $(event.target),
        id = undefined  !== $target.attr('id')
            ? '#' + $target.attr('id')
            : event.data.options.containerSelector;

    injectAttrPjaxOptions($target, options);

    if (undefined !== options.container) {
        id = options.container;
    }

    $.pjax.submit(event, id, options);
}
