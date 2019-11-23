import Vue from 'vue';
import Vuex from 'vuex';
import state, {STATE} from './state';
import actions, {ACTION} from './actions';
import mutations from './mutations';
import getters, {GETTERS} from './getters';
import App from '../../resources/components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/custom.scss';
import hotkeys from 'hotkeys-js';

Vue.use(Vuex);
Vue.use(BootstrapVue);

const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});

const rootElemID = 'chrome-extension-github-fast-traveler';
const rootElem = document.createElement("div");
rootElem.setAttribute('id', rootElemID);
document.body.appendChild(rootElem);

const vm = new Vue({
    render: h => h(App),
    store,
}).$mount('#' + rootElemID);

hotkeys('ctrl+shift+f', function(event, handler){
    event.preventDefault();

    vm.$bvModal.show('code-find-modal');
});

hotkeys('ctrl+shift+p', function(event, handler){
    event.preventDefault();

    if (vm.$store.getters[GETTERS.CURRENT_USER] === null
        || vm.$store.getters[GETTERS.CURRENT_REPO] === null)
    {
        return;
    }

    const user = vm.$store.getters[GETTERS.CURRENT_USER];
    const repo = vm.$store.getters[GETTERS.CURRENT_REPO];
    const branch = vm.$store.state[STATE.CURRENT_REPO_DETAIL].default_branch;
    const url = `https://github.com/${user}/${repo}/find/${branch}`;
    window.open(url);
});

if (vm.$store.getters[GETTERS.CURRENT_REPO] !== null) {
    vm.$store.dispatch(ACTION.FETCH_REPO_DETAIL);
}