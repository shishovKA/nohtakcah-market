import Vue from "vue";
import Vuex from "vuex";
import { gEngine } from "./modules/googleEngine";
import { getProducts } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
    },
    mutations: {
        addProducts(state, products) {
            state.products = [...state.products, ...products];
            console.log(state.products);
        },
    },
    actions: {
        searchProduct({ commit }, valueForSearch) {
            return getProducts(valueForSearch)
                .then((products) => {
                    commit("addProducts", products);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    modules: {
        gApi: gEngine,
    },
});
