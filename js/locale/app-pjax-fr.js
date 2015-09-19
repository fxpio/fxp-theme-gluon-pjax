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
        define(['app-pjax'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // APP PJAX CLASS DEFINITION
    // =========================

    $.fn.appPjax.Constructor.LANGUAGES = $.extend(true, {}, $.fn.appPjax.Constructor.LANGUAGES, {
        fr: {
            reload: 'Recharger',
            error_message: 'Impossible d\'établir la connexion au serveur'
        }
    });

}));