import {STATE} from "./state";

export const MUTATION = {
    SET_CURRENT_REPO_DETAIL: 'set_current_repo_detail',
};

export default {
    [MUTATION.SET_CURRENT_REPO_DETAIL]: (state, payload) => {
        state[STATE.CURRENT_REPO_DETAIL] = payload.repoDetail;
    },
}
