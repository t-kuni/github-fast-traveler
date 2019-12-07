import {STATE} from "./state";
import Vue from 'vue';

export const MUTATION = {
    SET_CURRENT_REPO_DETAIL: 'set_current_repo_detail',
    SET_REPO_ACCESS_HISTORIES: 'set_repo_access_histories',
    SET_REPO_ACCESS_HISTORIES_FILTERED: 'set_repo_access_histories_filtered',

    SET_REPO_FIND_MODAL_SEARCH_WORD: 'set_repo_find_modal_search_word',
};

export default {
    [MUTATION.SET_CURRENT_REPO_DETAIL]: (state, payload) => {
        state[STATE.CURRENT_REPO_DETAIL] = payload.repoDetail;
    },
    [MUTATION.SET_REPO_ACCESS_HISTORIES]: (state, payload) => {
        console.log('mutations#SET_REPO_ACCESS_HISTORIES', payload);
        Vue.set(state, STATE.REPO_ACCESS_HISTORIES, payload.histories);
        Vue.set(state, STATE.REPO_ACCESS_HISTORIES_FILTERED, payload.histories);
    },
    [MUTATION.SET_REPO_ACCESS_HISTORIES_FILTERED]: (state, payload) => {
        Vue.set(state, STATE.REPO_ACCESS_HISTORIES_FILTERED, payload.histories);
    },
    [MUTATION.SET_REPO_FIND_MODAL_SEARCH_WORD]: (state, payload) => {
        state[STATE.REPO_FIND_MODAL_SEARCH_WORD] = payload.searchWord;
    },
}
