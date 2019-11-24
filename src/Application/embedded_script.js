import './setup-container';
import Vue from 'vue';
import App from '../../resources/components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/custom.scss';
import hotkeys from 'hotkeys-js';
import {container} from "tsyringe";
import {setupStore} from './store';

Vue.use(BootstrapVue);

const rootElemID = 'chrome-extension-github-fast-traveler';
const rootElem = document.createElement("div");
rootElem.setAttribute('id', rootElemID);
document.body.appendChild(rootElem);

const vm = new Vue({
    render: h => h(App),
    state: setupStore(),
}).$mount('#' + rootElemID);

hotkeys('ctrl+shift+f', function(event, handler){
    event.preventDefault();

    vm.$bvModal.show('code-find-modal');
});

hotkeys('ctrl+shift+p', function(event, handler){
    event.preventDefault();

    const interactor = container.resolve('FileFindingInteractor');
    interactor.find();
});

const interactor = container.resolve('AppInitializationInteractor');
interactor.initialize();