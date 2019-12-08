import Vue from 'vue'
import Vuex from "vuex";
import {default as baseState} from "./state";
import mutations from "./mutations";
import getters from "./getters";
import {container} from "tsyringe";

export function setupStore() {
    Vue.use(Vuex);

    const stateProvider = container.resolve('StateProvider');

    const state = Object.assign({}, baseState, stateProvider.provide());

    const store = new Vuex.Store({
        state,
        mutations,
        getters,
    });

    container.register('Store', { useValue: store });

    return store;
};