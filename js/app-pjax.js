/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global navigator*/
/*global jQuery*/

/**
 * @param {jQuery} $
 *
 * @typedef {object} define.amd
 *
 * @author François Pluchino <francois.pluchino@sonatra.com>
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery-pjax'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Action on click to reload page.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {AppPjax} Event.data The app pjax instance
     *
     * @private
     */
    function onRefreshAction(event) {
        $.pjax.reload(event.data.options.containerSelector, event.data.options.pjaxOptions);
    }

    /**
     * Action on pjax send event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {AppPjax} Event.data The app pjax instance
     *
     * @private
     */
    function onSendAction(event) {
        var self = event.data;

        self.$spinner.removeClass('spinner-container-open');
        self.$container.addClass('content-before-show');
        self.$container.before(self.$spinner);

        window.setTimeout(function () {
            self.$spinner.addClass('spinner-container-open');
        }, 1);
    }

    /**
     * Action on pjax complete event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {AppPjax} Event.data The app pjax instance
     *
     * @private
     */
    function onCompleteAction(event) {
        var self = event.data;

        self.$spinner.remove();
        self.$container.removeClass('content-before-show');
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
    function onErrorAction(event, xhr, textStatus, errorThrown, options) {
        var self = event.data,
            message = xhr.responseText,
            lang;

        if ('abort' === errorThrown) {
            return false;
        }

        if (xhr.status === 0) {
            lang = self.langData();
            message = self.options.errorTemplate;
            message = message.replace('%icon%', 'cloud');
            message = message.replace('%message%', lang.error_message);
            message = message.replace('%reload%', lang.reload);
        }

        options.success(message, textStatus, xhr);

        return false;
    }

    /**
     * Action on pjax before replace event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {AppPjax} Event.data The app pjax instance
     *
     * @private
     */
    function onBeforeReplaceAction(event) {
        var self = event.data,
            destroyers = $.fn.appPjax.Constructor.API_DESTROYERS,
            size = destroyers.length,
            i;

        for (i = 0; i < size; ++i) {
            destroyers[i](self);
        }
    }

    /**
     * Action on pjax end event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {AppPjax} Event.data The app pjax instance
     *
     * @private
     */
    function onEndAction(event) {
        var self = event.data,
            registers = $.fn.appPjax.Constructor.API_REGISTERS,
            size = registers.length,
            i;

        for (i = 0; i < size; ++i) {
            registers[i](self);
        }
    }

    // APP PJAX CLASS DEFINITION
    // =========================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this AppPjax
     */
    var AppPjax = function (element, options) {
        this.guid       = $.guid;
        this.options    = $.extend(true, {}, AppPjax.DEFAULTS, options);
        this.$element   = $(element);
        this.$container = $(this.options.containerSelector);
        this.$spinner   = $(
            '<div class="spinner-container">' +
                '<div class="' + this.$container.attr('class') + '">' +
                    '<div class="container-fluid">' +
                        this.options.spinnerTemplate +
                    '</div>' +
                '</div>' +
            '</div>'
        );

        this.$element.pjax(this.options.linkSelector, this.options.containerSelector, this.options.pjaxOptions);
        this.$element
            .on('click.kp.apppjax' + this.guid, '#btn-error-reload', this, onRefreshAction)
            .on('pjax:send.kp.apppjax' + this.guid, null, this, onSendAction)
            .on('pjax:complete.kp.apppjax' + this.guid, null, this, onCompleteAction)
            .on('pjax:error.kp.apppjax' + this.guid, null, this, onErrorAction)
            .on('pjax:beforeReplace.kp.apppjax' + this.guid, null, this, onBeforeReplaceAction)
            .on('pjax:end.kp.apppjax' + this.guid, null, this, onEndAction);

        var $metaLanguage = $('head > meta[http-equiv="Content-Language"]');

        if (this.options.locale === null && $metaLanguage.length === 1) {
            this.options.locale = $metaLanguage.attr('content');
        }
    },
        old;

    /**
     * Defaults options.
     *
     * @type {Object}
     */
    AppPjax.DEFAULTS = {
        locale: null,
        linkSelector: 'a:not(.force-load)',
        containerSelector: '#pjax-container',
        pjaxOptions: {
            timeout: 60000
        },
        spinnerTemplate: '<div class="spinner-wrapper"><svg class="spinner spinner-accent"><circle class="spinner-path" cx="22" cy="22" r="20" /></svg></div>',
        errorTemplate: '<div class="container-fluid"><div class="row"><div class="col-md-6 col-md-offset-3"><div class="error-wrapper"><h1><span class="material-icons">%icon%</span></h1><h2>%message%</h2><button class="btn btn-accent btn-ripple" id="btn-error-reload">%reload%</button></div></div></div></div>'
    };

    /**
     * Defaults languages.
     *
     * @type {Object}
     */
    AppPjax.LANGUAGES = {
        en: {
            reload: 'Reload',
            error_message: 'Cannot establish connection to the server'
        }
    };

    /**
     * List of function to register plugins initialized by the data attribute API.
     *
     * @type {Array}
     */
    AppPjax.API_REGISTERS = [];

    /**
     * List of function to destroy the plugins initialized by the data attribute API.
     *
     * @type {Array}
     */
    AppPjax.API_DESTROYERS = [];

    /**
     * Get the language configuration.
     *
     * @param {string} [locale] The ISO code of language
     *
     * @returns {object} The language configuration
     *
     * @this AppPjax
     */
    AppPjax.prototype.langData = function (locale) {
        if (undefined === locale) {
            locale = this.options.locale;
        }

        locale = locale.toLowerCase().replace('-', '_');

        if (locale.indexOf('_') >= 0 && undefined === AppPjax.LANGUAGES[locale]) {
            locale = locale.substr(0, locale.indexOf('_'));
        }

        if (undefined === AppPjax.LANGUAGES[locale]) {
            locale = 'en';
        }

        return AppPjax.LANGUAGES[locale];
    };

    /**
     * Destroy instance.
     *
     * @this AppPjax
     */
    AppPjax.prototype.destroy = function () {
        this.$element
            .off('click.kp.apppjax' + this.guid, '#btn-error-reload', onRefreshAction)
            .off('pjax:send.kp.apppjax' + this.guid, onSendAction)
            .off('pjax:complete.kp.apppjax' + this.guid, onCompleteAction)
            .off('pjax:error.kp.apppjax' + this.guid, onErrorAction)
            .off('pjax:beforeReplace.kp.apppjax' + this.guid, onBeforeReplaceAction)
            .off('pjax:end.kp.apppjax' + this.guid, onEndAction)
            .removeData('kp.apppjax');

        delete this.$element;
        delete this.$container;
        delete this.$spinner;
        delete this.options;
        delete this.guid;
    };


    // APP PJAX PLUGIN DEFINITION
    // ==========================

    function Plugin(option, value) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('kp.apppjax'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new AppPjax(this, options);
                $this.data('kp.apppjax', data);
            }

            if (typeof option === 'string') {
                data[option](value);
            }
        });
    }

    old = $.fn.appPjax;

    $.fn.appPjax             = Plugin;
    $.fn.appPjax.Constructor = AppPjax;


    // APP PJAX NO CONFLICT
    // ====================

    $.fn.appPjax.noConflict = function () {
        $.fn.appPjax = old;

        return this;
    };

    // APP PJAX DATA-API
    // =================

    $(window).on('load', function () {
        var $this = $(document);
        Plugin.call($this, $this.data());
    });
}));
