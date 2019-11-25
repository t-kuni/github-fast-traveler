import './setup-container';
import Vue from 'vue';
import App from '../../resources/components/App.vue';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/custom.scss';
import hotkeys from 'hotkeys-js';
import {container} from "tsyringe";
import {setupStore} from './store';

//
// View Setup
//
Vue.use(BootstrapVue);

const rootElemID = 'chrome-extension-github-fast-traveler';
const rootElem = document.createElement("div");
rootElem.setAttribute('id', rootElemID);
document.body.appendChild(rootElem);

const vm = new Vue({
    render: h => h(App),
    state: setupStore(),
}).$mount('#' + rootElemID);

//
// Application Setup
//
const interactor = container.resolve('AppInitializationInteractor');
interactor.initialize();

//
// Event Listener Setup
//
hotkeys('ctrl+shift+f', function(event, handler){
    event.preventDefault();

    vm.$bvModal.show('code-find-modal');
});

hotkeys('ctrl+shift+p', function(event, handler){
    event.preventDefault();

    const interactor = container.resolve('FileFindingInteractor');
    interactor.find();
});

//
// Logic Par Page
//
const pageContext = container.resolve('PageContextDetector');
if (pageContext.isFileFindPage()) {
    const interactor = container.resolve('FileFindPageOpeningInteractor');
    interactor.onOpen();
}