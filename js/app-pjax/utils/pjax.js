/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';
import {unregisterPlugins} from "./plugins";
import AppPjax from "../index";

/**
 * Inject the pjax options form target attributes.
 *
 * @param {jQuery}  $target The target
 * @param {Object}  options The pjax options
 */
export function injectAttrPjaxOptions($target, options) {
    if (undefined !== $target.attr('data-pjax-replace')) {
        options.replace = true;
    }

    if (undefined !== $target.attr('data-pjax-push')) {
        options.push = 'false' !== $target.attr('data-pjax-push');
    }

    if (undefined !== $target.attr('data-pjax-container')) {
        options.container = $target.attr('data-pjax-container');
    }
}

/**
 * Action on click to link.
 *
 * @param {jQuery.Event|Event} event   The jquery event
 * @param {Object}             options The pjax options
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onClickAction(event, options) {
    let $target = $(event.target);

    injectAttrPjaxOptions($target, options);
}

/**
 * Action on pjax popstate event.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onPopStateAction(event) {
    let self = event.data,
        $container = $(event.target);

    unregisterPlugins(self, $container);
}

/**
 * Action on pjax before send event.
 *
 * @param {jQuery.Event|Event} event
 * @param {XMLHttpRequest}     xhr
 * @param {Object}             options
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onBeforeSendAction(event, xhr, options) {
    let self = event.data;

    if (null !== self.delayOptions) {
        self.delayRequest = false;
        self.delayOptions = null;
    }

    self.showLoading();

    if (self.delayRequest) {
        self.delayOptions = options;
        xhr.abort();

        return;
    }

    unregisterPlugins(self, $(event.target));
}

/**
 * Action on pjax start event.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onStartAction(event) {
    event.data.currentContainerId = $(event.target).attr('id');
}

/**
 * Action on pjax before replace event.
 */
export function onBeforeReplaceAction() {
    delete window.pjaxMainScripts;
}

/**
 * Action on pjax complete event.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onCompleteAction(event) {
    event.data.hideLoading();
}

/**
 * Action on pjax error event.
 *
 * @param {jQuery.Event|Event} event
 * @param {Object}             xhr
 * @param {String}             textStatus
 * @param {Object}             errorThrown
 * @param {Object}             options
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 *
 * @return {Boolean}
 *
 * @private
 */
export function onErrorAction(event, xhr, textStatus, errorThrown, options) {
    let self = event.data,
        message = xhr.responseText,
        lang;

    if ('abort' === errorThrown) {
        return false;
    }

    if (xhr.status === 0) {
        lang = self.locale();
        message = self.options.errorTemplate;
        message = message.replace('%icon%', 'cloud');
        message = message.replace('%message%', lang.error_message);
        message = message.replace('%reload%', lang.reload);
    }

    options.success(message, textStatus, xhr);

    return false;
}

/**
 * Action on pjax end event.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {AppPjax} Event.data The app pjax instance
 */
export function onEndAction(event) {
    let self = event.data,
        $container = $(event.target);

    AppPjax.registerPlugins($container);
    AppPjax.executeMainScripts();
    self.currentContainerId = null;
}
