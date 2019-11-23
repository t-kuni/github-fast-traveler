import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import App from '../../resources/components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/custom.scss';

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

new Vue({
    render: h => h(App),
    store,
}).$mount('#' + rootElemID);



var data = { type: "embedded_script", text: "Hello from the webpage!" };
window.postMessage(data, "*");


window.addEventListener("message", function(event) {
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "content_script")) {
        console.log('Listener in embedded_script');
    }
});