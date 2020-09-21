import {STATE} from "./state";
import {FuzzyMatcher} from "./Services/FuzzyMatcher";


export const GETTERS = {
    LOGIN_USER    : 'login_user',
    CURRENT_USER  : 'current_user',
    CURRENT_REPO  : 'current_repo',
    SELECTION_TEXT: 'selection_text',

    REPO_ACCESS_HISTORIES_FILTERED: 'repo_access_histories_filtered',
};

export default {
    [GETTERS.REPO_ACCESS_HISTORIES_FILTERED]: (state, getters) => {
        const matcher = new FuzzyMatcher();

        const needle = state[STATE.REPO_FIND_MODAL_SEARCH_WORD];
        const histories = state[STATE.REPO_ACCESS_HISTORIES];

        return histories.filter(h => matcher.match(needle, h.toString()));
    },
}
