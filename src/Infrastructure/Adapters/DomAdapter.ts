import {IDomAdapter} from "./interfaces/IDomAdapter";
const $ = require('jquery');

export class DomAdapter implements IDomAdapter {
    getLoginUserName(): string | null {
        const userName = $('meta[name="user-login"]').attr('content');

        if (!userName) {
            return null;
        }

        return userName;
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
