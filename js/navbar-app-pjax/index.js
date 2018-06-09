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
import {onLockBodyScroll} from './utils/scrollbar';
import '../app-pjax';

/**
 * Navbar App Pjax class.
 */
export default class NavbarAppPjax extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$element
            .on('apppjax:lock-body-scroll.fxp.apppjax.fxp.navbar-app-pjax apppjax:unlock-body-scroll.fxp.apppjax.fxp.navbar-app-pjax', null, this, onLockBodyScroll);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        this.$element
            .off('apppjax:lock-body-scroll.fxp.apppjax.fxp.navbar-app-pjax apppjax:unlock-body-scroll.fxp.apppjax.fxp.navbar-app-pjax', null, onLockBodyScroll);

        super.destroy();
    }
}

pluginify('navbarAppPjax', 'fxp.navbar-app-pjax', NavbarAppPjax, true, document);
