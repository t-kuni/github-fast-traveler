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

    setFileNameInFileFindPage(fileName:string) : void {
        const input = $('input[name="query"]');
        input.val(fileName);

        setTimeout(() => {
            input.change().keyup().keydown();
            input.trigger('keydown');
        }, 4000);
    }
}
