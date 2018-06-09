/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AppPjax from '../app-pjax';
import 'bootstrap/js/dropdown';
import '@fxp/theme-gluon/js/fab-dropdown-position';

/**
 * Add the App Pjax Component Register and Unregister.
 */
AppPjax.addDefaultRegisters('fabDropdownPosition', '.btn-group-fab-bottom-left, .btn-group-fab-bottom-right');
