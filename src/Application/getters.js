import {STATE} from "./state";
import $ from 'jquery';

export const GETTERS = {
    LOGIN_USER    : 'login_user',
    CURRENT_USER  : 'current_user',
    CURRENT_REPO  : 'current_repo',
    SELECTION_TEXT: 'selection_text',
};

export default {
    [GETTERS.LOGIN_USER]    : (state) => {
        const $user = $('.header-nav-current-user strong');

        if ($user.length === 0) {
            return null;
        }

        return $user.text();
    }
    ,
    [GETTERS.CURRENT_USER]  : (state) => {
        const path  = location.pathname;
        const match = path.match(/^\/(?<user_name>[^/]+)/);

        if (match === null) {
            return null;
        }

        return match.groups.user_name;
    },
    [GETTERS.CURRENT_REPO]  : (state) => {
        const path  = location.pathname;
        const match = path.match(/^\/[^/]+\/(?<repo_name>[^/]+)/);

        if (match === null) {
            return null;
        }

        return match.groups.repo_name;
    },
    [GETTERS.SELECTION_TEXT]: (state) => {
    },
}
