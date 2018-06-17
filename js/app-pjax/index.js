/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BaseI18nPlugin from '@fxp/jquery-pluginify/js/i18n-plugin';
import $ from 'jquery';
import {getNativeScrollWidth} from '@fxp/theme-gluon/js/utils/window';
import {lockBodyScroll, unlockBodyScroll} from "./utils/scrollbar";
import {unregisterPlugins} from "./utils/plugins";
import {getSpinner} from "./utils/loaders";
import {onRefreshAction, onSubmitAction} from "./utils/events";
import {
    onBeforeReplaceAction,
    onBeforeSendAction,
    onClickAction,
    onCompleteAction,
    onEndAction,
    onErrorAction,
    onPopStateAction,
    onStartAction
} from "./utils/pjax";
import '@fxp/jquery-pjax';

/**
 * List of function to register plugins.
 *
 * @type {Array}
 */
const API_REGISTERS = [];

/**
 * List of function to unregister plugins.
 *
 * @type {Array}
 */
const API_UNREGISTERS = [];

/**
 * AppPjax class.
 */
export default class AppPjax extends BaseI18nPlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$body                 = $('body');
        this.$container            = $(this.options.containerSelector);
        this.$spinner              = null;
        this.delayRequest          = false;
        this.delayOptions          = null;
        this.unregisters           = {};
        this.nativeScrollWidth     = getNativeScrollWidth();
        this.originalBodyPad       = null;
        this.originalBodyOverflowY = null;
        this.currentContainerId    = null;

        if (0 === $(this.options.containerSelector).length) {
            return;
        }

        this.$element.pjax(this.options.linkSelector, this.options.containerSelector, this.options.pjaxOptions);
        this.$element
            .on('click.fxp.apppjax' + this.guid, '#btn-error-reload', this, onRefreshAction)
            .on('submit.fxp.apppjax' + this.guid, 'form[data-pjax]', this, onSubmitAction)
            .on('pjax:click.fxp.apppjax' + this.guid, null, this, onClickAction)
            .on('pjax:popstate.fxp.apppjax' + this.guid, null, this, onPopStateAction)
            .on('pjax:beforeSend.fxp.apppjax' + this.guid, null, this, onBeforeSendAction)
            .on('pjax:start.fxp.apppjax' + this.guid, null, this, onStartAction)
            .on('pjax:complete.fxp.apppjax' + this.guid, null, this, onCompleteAction)
            .on('pjax:error.fxp.apppjax' + this.guid, null, this, onErrorAction)
            .on('pjax:beforeReplace.fxp.apppjax' + this.guid, null, this, onBeforeReplaceAction)
            .on('pjax:end.fxp.apppjax' + this.guid, null, this, onEndAction);
    }

    /**
     * Add unregister function.
     *
     * A unregister function is an destroyer function but it's executed only one time
     * on the before replace content event of pjax.
     *
     * @param {function}                      unregister  The function for unregister pjax component
     * @param {string|elements|object|jQuery} [container] The container
     */
    addUnregister(unregister, container) {
        let $container = this.$container,
            containerId;

        if (undefined !== container) {
            $container = $(container);
        } else if (null !== this.currentContainerId) {
            $container = $('#' + this.currentContainerId);
        }

        containerId = $container.attr('id');

        if (undefined === this.unregisters[containerId]) {
            this.unregisters[containerId] = [];
        }

        this.unregisters[containerId].push(unregister);
    }

    /**
     * Delay the request.
     *
     * @param {boolean} delay Check if the request must be delayed
     */
    setDelayRequest(delay) {
        this.delayRequest = typeof(delay) === "boolean" ? delay : false;
    }

    /**
     * Send the delayed request.
     */
    sendDelayedRequest() {
        let options;

        if (null !== this.delayOptions) {
            options = this.delayOptions;
            this.delayRequest = false;
            this.delayOptions = null;
            $.pjax(options);
        }
    }

    /**
     * Show the spinner loading and hide the content.
     */
    showLoading() {
        let self = this,
            $spinner;

        if (!this.$container.hasClass('content-before-show')) {
            $spinner = getSpinner(this);
            this.$container.addClass('content-before-show');
            this.$container.before($spinner);
            this.$spinner = $spinner;

            window.setTimeout(function () {
                lockBodyScroll(self);
                $spinner.addClass('preloader-container-open');
            }, 1);
        }
    }

    /**
     * Hide the spinner loading and show the content.
     */
    hideLoading() {
        this.$container.scrollTop(0);

        if (this.$spinner) {
            this.$spinner.remove();
            this.$spinner = null;
        }

        this.$container.removeClass('content-before-show');
        unlockBodyScroll(this);
    }

    /**
     * Refresh the content.
     *
     * @param {String} [containerSelector] The container id selector
     */
    refresh(containerSelector) {
        if (undefined === containerSelector) {
            containerSelector = this.options.containerSelector;
        }

        $.pjax.reload(containerSelector, this.options.pjaxOptions);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        unregisterPlugins(this, this.$container);

        this.$element
            .off('click.fxp.apppjax' + this.guid, '#btn-error-reload', onRefreshAction)
            .off('submit.fxp.apppjax' + this.guid, 'form[data-pjax]', onSubmitAction)
            .off('pjax:click.fxp.apppjax' + this.guid, onClickAction)
            .off('pjax:popstate.fxp.apppjax' + this.guid, onPopStateAction)
            .off('pjax:beforeSend.fxp.apppjax' + this.guid, onBeforeSendAction)
            .off('pjax:start.fxp.apppjax' + this.guid, onStartAction)
            .off('pjax:complete.fxp.apppjax' + this.guid, onCompleteAction)
            .off('pjax:error.fxp.apppjax' + this.guid, onErrorAction)
            .off('pjax:beforeReplace.fxp.apppjax' + this.guid, onBeforeReplaceAction)
            .off('pjax:end.fxp.apppjax' + this.guid, onEndAction);

        super.destroy();
    }

    /**
     * Get the array of api registers.
     *
     * @returns {Array}
     */
    static get apiRegisters() {
        return API_REGISTERS;
    }

    /**
     * Get the array of api unregisters.
     *
     * @returns {Array}
     */
    static get apiUnregisters() {
        return API_UNREGISTERS;
    }

    /**
     * Register the jquery api widgets.
     */
    static registerPlugins(container) {
        let registers = AppPjax.apiRegisters,
            size = registers.length,
            $container = $(container),
            i;

        for (i = 0; i < size; ++i) {
            registers[i]($container);
        }
    }

    /**
     * Unregister the jquery api widgets.
     *
     * @param {string|elements|object|jQuery} container
     */
    static unregisterPlugins(container) {
        let destroyers = AppPjax.apiUnregisters,
            size = destroyers.length,
            $container = $(container),
            i;

        for (i = 0; i < size; ++i) {
            destroyers[i]($container);
        }
    }

    /**
     * Register the global unregisters defined before the init of this plugin.
     */
    static executeMainScripts() {
        let u;

        if (typeof window.pjaxMainScripts === 'object') {
            for (u = 0; u < window.pjaxMainScripts.length; ++u) {
                window.pjaxMainScripts[u]();
            }
        }
    }

    /**
     * Create the default callback to register the plugin.
     *
     * @param {String} jQueryPlugin The jquery selector of data api plugin
     * @param {String} selector     The jquery selector of data api plugin
     *
     * @return {Function}
     */
    static createDefaultRegister(jQueryPlugin, selector) {
        return function ($container) {
            $(selector, $container).each(function () {
                let $this = $(this);
                $.fn[jQueryPlugin].call($this, $this.data());
            });
        };
    }

    /**
     * Create the default callback to unregister the plugin.
     *
     * @param {String} jQueryPlugin The jquery selector of data api plugin
     * @param {String} selector     The jquery selector of data api plugin
     *
     * @return {Function}
     */
    static createDefaultUnregister(jQueryPlugin, selector) {
        return function ($container) {
            $(selector, $container).each(function () {
                let $this = $(this);
                $.fn[jQueryPlugin].call($this, 'destroy');
            });
        }
    }

    /**
     * Add the default callback to register the plugin.
     *
     * @param {String} jQueryPlugin The jquery selector of data api plugin
     * @param {String} selector     The jquery selector of data api plugin
     */
    static addDefaultRegister(jQueryPlugin, selector) {
        API_REGISTERS.push(AppPjax.createDefaultRegister(jQueryPlugin, selector));
    }

    /**
     * Add the default callback to unregister the plugin.
     *
     * @param {String} jQueryPlugin The jquery selector of data api plugin
     * @param {String} selector     The jquery selector of data api plugin
     */
    static addDefaultUnregister(jQueryPlugin, selector) {
        API_UNREGISTERS.push(AppPjax.createDefaultUnregister(jQueryPlugin, selector));
    }

    /**
     * Add the default callback to register and unregister the plugin.
     *
     * @param {String} jQueryPlugin The jquery selector of data api plugin
     * @param {String} selector     The jquery selector of data api plugin
     */
    static addDefaultRegisters(jQueryPlugin, selector) {
        AppPjax.addDefaultRegister(jQueryPlugin, selector);
        AppPjax.addDefaultUnregister(jQueryPlugin, selector);
    }
}

/**
 * Defaults options.
 */
AppPjax.defaultOptions = {
    linkSelector: 'a:not([data-force-load])',
    containerSelector: '#pjax-container',
    pjaxOptions: {
        timeout: 60000
    },
    spinnerTemplate: '<div class="spinner-wrapper"><svg class="spinner spinner-accent"><circle class="spinner-path" cx="22" cy="22" r="20" /></svg></div>',
    errorTemplate: '<div class="container-fluid"><div class="row"><div class="col-md-6 col-md-offset-3"><div class="message-wrapper error-wrapper"><h1><span class="mdi mdi-%icon%"></span></h1><h2>%message%</h2><button class="btn btn-accent btn-ripple" id="btn-error-reload">%reload%</button></div></div></div></div>'
};

AppPjax.locales = {
    en: {
        reload: 'Reload',
        error: 'Error',
        error_message: 'Cannot establish connection to the server'
    }
};

pluginify('appPjax', 'fxp.app-pjax', AppPjax, true);
