import api from './api';
import {GETTERS} from "./getters";
import {MUTATION} from "./mutations";

export const ACTION = {
    FETCH_REPO_DETAIL: 'fetch_repo_detail',
};

export default {
    [ACTION.FETCH_REPO_DETAIL]: ({commit, getters, state}, payload) => {
        const repo   = getters[GETTERS.CURRENT_REPO];
        const user   = getters[GETTERS.CURRENT_USER];

        return api.fetchRepoDetail(user, repo)
            .then((response) => {
                console.log(response);
                commit(MUTATION.SET_CURRENT_REPO_DETAIL, {
                    repoDetail  : response,
                });
            })
    },
}
