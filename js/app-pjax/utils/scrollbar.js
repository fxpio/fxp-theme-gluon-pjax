/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {triggerEvent} from "./events";

/**
 * Lock the scroll of body.
 *
 * @param {AppPjax} self The app pjax instance
 */
export function lockBodyScroll(self) {
    let bodyPad = parseInt((self.$body.css('padding-right') || 0), 10),
        hasScrollbar = (self.$body.get(0).scrollHeight > document.documentElement.clientHeight
            && 'hidden' !== self.$body.css('overflow-y'))
            || ('hidden' === self.$body.css('overflow-y')
                && '0px' !== self.$body.css('padding-right'));

    if (hasScrollbar) {
        self.originalBodyPad = document.body.style.paddingRight || '';
        self.originalBodyOverflowY = document.body.style.overflowY || '';

        self.$body.css({
            'padding-right': (bodyPad + self.nativeScrollWidth) + 'px',
            'overflow-y': 'hidden'
        });

        triggerEvent('lock-body-scroll', self, self.nativeScrollWidth);
    }
}

/**
 * Unlock the scroll of body.
 *
 * @param {AppPjax} self The app pjax instance
 */
export function unlockBodyScroll(self) {
    if (null !== self.originalBodyPad || null !== self.originalBodyOverflowY) {
        self.$body.css({
            'padding-right': self.originalBodyPad,
            'overflow-y': self.originalBodyOverflowY
        });

        self.originalBodyPad = null;
        self.originalBodyOverflowY = null;
        triggerEvent('unlock-body-scroll', self, self.nativeScrollWidth);
    }
}
