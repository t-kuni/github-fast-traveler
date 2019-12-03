import {STATE} from "./state";
import Vue from 'vue';

export const MUTATION = {
    SET_CURRENT_REPO_DETAIL: 'set_current_repo_detail',
    SET_REPO_ACCESS_HISTORIES: 'set_repo_access_histories',
};

export default {
    [MUTATION.SET_CURRENT_REPO_DETAIL]: (state, payload) => {
        state[STATE.CURRENT_REPO_DETAIL] = payload.repoDetail;
    },
    [MUTATION.SET_REPO_ACCESS_HISTORIES]: (state, payload) => {
        Vue.set(state, STATE.REPO_ACCESS_HISTORIES, payload.histories);
    },
}
