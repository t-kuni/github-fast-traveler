import {IDomAdapter} from "./interfaces/IDomAdapter";
const $ = require('jquery');

export class DomAdapter implements IDomAdapter {
    getLoginUserName(): string | null {
        const $user = $('.header-nav-current-user strong');

        if ($user.length === 0) {
            return null;
        }

        return $user.text();
    }

    getSelectingText(): string {
        return window.getSelection().toString();
    }
}
