/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/
/*global window*/

/**
 * @param {jQuery} $
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'sonatra-theme-gluon-pjax'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Action on scoll of body is locked or unlocked.
     *
     * @param {jQuery.Event|Event} event The event
     *
     * @typedef {Number} jQuery.Event.eventData
     *
     * @private
     */
    function onLockBodyScroll (event) {
        var $navbars = $('.navbar-fixed-top, .navbar-fixed-bottom'),
            nativeScrollWidth = event.eventData,
            margin = 'apppjax:lock-body-scroll' === event.type ? nativeScrollWidth + 'px' : '';

        if (nativeScrollWidth > 0) {
            $navbars.css('margin-right', margin);

            if ('' !== margin) {
                $navbars.attr('data-navbar-modal-skip', 'true');
            } else {
                $navbars.removeAttr('data-navbar-modal-skip');
            }
        }
    }

    // NAVBAR APP PJAX CLASS DEFINITION
    // ================================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this NavbarAppPjax
     */
    var NavbarAppPjax = function (element, options) {
        this.options  = options;
        this.$element = $(element);

        this.$element.on('apppjax:lock-body-scroll.st.apppjax.st.navbar-app-pjax apppjax:unlock-body-scroll.st.apppjax.st.navbar-app-pjax', null, this, onLockBodyScroll);
    },
        old;

    /**
     * Destroy instance.
     *
     * @this NavbarAppPjax
     */
    NavbarAppPjax.prototype.destroy = function () {
        this.$element
            .off('apppjax:lock-body-scroll.st.apppjax.st.navbar-app-pjax apppjax:unlock-body-scroll.st.apppjax.st.navbar-app-pjax', null, onLockBodyScroll)
            .removeData('st.navbar-app-pjax');

        delete this.options;
        delete this.$element;
    };


    // NAVBAR APP PJAX PLUGIN DEFINITION
    // =================================

    function Plugin(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.navbar-app-pjax'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new NavbarAppPjax(this, options);
                $this.data('st.navbar-app-pjax', data);
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    }

    old = $.fn.navbarAppPjax;

    $.fn.navbarAppPjax             = Plugin;
    $.fn.navbarAppPjax.Constructor = NavbarAppPjax;


    // NAVBAR APP PJAX NO CONFLICT
    // ===========================

    $.fn.navbarAppPjax.noConflict = function () {
        $.fn.navbarAppPjax = old;

        return this;
    };


    // NAVBAR APP PJAX DATA-API
    // ========================

    $(window).on('load', function () {
        $(document).each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });
}));
