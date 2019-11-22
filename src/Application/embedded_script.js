import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import App from '../../resources/components/App.vue';

Vue.component('app', App);

Vue.use(Vuex);

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

new Vue({
    render: h => h(App),
    store,
}).$mount('#' + rootElemID);