import Vue from 'vue'
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

// @ts-ignore
Vue.use(Vuex);

const store : any = new Vuex.Store({
    state,
    mutations,
    getters,
});

export default store;