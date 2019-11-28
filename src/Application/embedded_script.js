import './setup-container';
import Vue from 'vue';
import Embedded from '../../resources/components/Embedded';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/embedded.scss';
import hotkeys from 'hotkeys-js';
import {container} from "tsyringe";
import {setupStore} from './store';
import {dispatchEvent, listenEvent} from "./event-util";

//
// View Setup
//
Vue.use(BootstrapVue);

const rootElemID = 'chrome-extension-github-fast-traveler';
const rootElem = document.createElement("div");
rootElem.setAttribute('id', rootElemID);
document.body.appendChild(rootElem);

const vm = new Vue({
    render: h => h(Embedded),
    state: setupStore(),
}).$mount('#' + rootElemID);

//
// Application Setup
//
const interactor = container.resolve('AppInitializationInteractor');
interactor.initialize();

//
// Logic Par Page
//
const pageContext = container.resolve('PageContextDetector');
if (pageContext.isFileFindPage()) {
    const interactor = container.resolve('FileFindPageOpeningInteractor');
    interactor.onOpen();
}

listenEvent("on_loaded_hotkeys", () => {
    const hotkeyData = event.data.payload;

    hotkeys(hotkeyData.findCodeKeys, function(event, handler){
        event.preventDefault();

        vm.$bvModal.show('code-find-modal');
    });

    hotkeys(hotkeyData.findFileKeys, function(event, handler){
        event.preventDefault();

        const interactor = container.resolve('FileFindingInteractor');
        interactor.find();
    });
});

dispatchEvent("on_loaded_embedded_script");