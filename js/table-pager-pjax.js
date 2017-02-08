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
/*global TablePagerPjax*/

/**
 * @param {jQuery} $
 *
 * @typedef {object}         define.amd
 * @typedef {TablePagerPjax} TablePagerPjax
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery-pjax', 'app-pjax', 'sonatra-jquery-table-pager'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Action on pre success event of table pager.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {TablePagerPjax} Event.data The table pager pjax instance
     *
     * @private
     */
    function onPreSuccess(event) {
        $(document).data('st.apppjax').apiUnregisters(event.data.$table);
    }

    /**
     * Action on post success event of table pager.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {TablePagerPjax} Event.data The table pager pjax instance
     *
     * @private
     */
    function onPostSuccess(event) {
        $(document).data('st.apppjax').apiRegisters(event.data.$table);
    }

    // TABLE PAGER PJAX CLASS DEFINITION
    // =================================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     *
     * @this TablePagerPjax
     */
    var TablePagerPjax = function (element) {
        this.$element = $(element);
        this.$table   = $('#' + this.$element.attr('data-table-id'));

        this.$table
            .on('table-pager-pre-success.st.tablepagerpjax', null, this, onPreSuccess)
            .on('table-pager-post-success.st.tablepagerpjax', null, this, onPostSuccess)
        ;
    },
        old;

    /**
     * Destroy instance.
     *
     * @this TablePagerPjax
     */
    TablePagerPjax.prototype.destroy = function () {
        this.$table
            .off('table-pager-pre-success.st.tablepagerpjax', null, onPreSuccess)
            .off('table-pager-post-success.st.tablepagerpjax', null, onPostSuccess)
        ;

        this.$element.removeData('st.tablepagerpjax');
        delete this.$element;
        delete this.$table;
    };


    // TABLE PAGER PJAX PLUGIN DEFINITION
    // ==================================

    function Plugin(option, value) {
        return this.each(function () {
            var $this = $(this),
                data  = $this.data('st.tablepagerpjax');

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new TablePagerPjax(this);
                $this.data('st.tablepagerpjax', data);
            }

            if (typeof option === 'string') {
                data[option](value);
            }
        });
    }

    old = $.fn.tablePagerPjax;

    $.fn.tablePagerPjax             = Plugin;
    $.fn.tablePagerPjax.Constructor = TablePagerPjax;


    // TABLE PAGER PJAX NO CONFLICT
    // ============================

    $.fn.tablePagerPjax.noConflict = function () {
        $.fn.tablePagerPjax = old;

        return this;
    };


    // TABLE PAGER PJAX DATA-API
    // =========================

    $(window).on('load', function () {
        $('[data-table-pager="true"]').each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
