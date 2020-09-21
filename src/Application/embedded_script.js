import '../setup_container';
import Vue from 'vue';
import Embedded from '../../resources/components/Embedded';
import BootstrapVue from 'bootstrap-vue';
import '../../resources/scss/embedded.scss';
import hotkeys from 'hotkeys-js';
import {container} from "tsyringe";
import {setupStore} from './store';
import {dispatchEvent, listenEvent} from "../events";
import Hotkeys from "../Domain/ValueObjects/Hotkeys";
import {MUTATION} from "./mutations";
import {DelegateStorage} from "../Infrastructure/Repositories/DelegateStorage";

//
// Setup Service Container
//
container.register("IStorage", {useClass: DelegateStorage });

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
    store: setupStore(),
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

listenEvent("on_loaded_hotkeys", (payload) => {
    let hotkeyData = payload;

    if (hotkeyData === null) {
        hotkeyData = new Hotkeys('ctrl+shift+f');
    }

    hotkeys(hotkeyData.fastTravelKeys, function(event, handler){
        event.preventDefault();

        vm.$bvModal.show('fast-travel-modal');
    });
});

dispatchEvent("on_loaded_embedded_script");