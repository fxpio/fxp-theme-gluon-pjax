/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BasePlugin from '@fxp/jquery-pluginify/js/plugin';
import {onPostSuccess, onPreSuccess} from "./utils/events";
import 'jquery';
import '@fxp/jquery-pjax';
import '@fxp/jquery-table-pager';

/**
 * TablePagerPjax class.
 */
export default class TablePagerPjax extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$table = $('#' + this.$element.attr('data-table-id'));
        this.$table
            .on('table-pager-pre-success.fxp.tablepagerpjax', null, this, onPreSuccess)
            .on('table-pager-post-success.fxp.tablepagerpjax', null, this, onPostSuccess);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        this.$table
            .off('table-pager-pre-success.fxp.tablepagerpjax', null, onPreSuccess)
            .off('table-pager-post-success.fxp.tablepagerpjax', null, onPostSuccess);

        super.destroy();
    }
}

pluginify('tablePagerPjax', 'fxp.table-pager-pjax', TablePagerPjax, true, '[data-table-pager="true"]');
