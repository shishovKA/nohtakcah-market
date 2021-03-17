import Vue from "vue"
import Vuex from "vuex"
import { gEngine } from "./modules/googleEngine"
import { getProducts } from "../api"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        lastSearch: "",
        pageSearch: 1
    },
    mutations: {
        addProducts(state, products) {
            state.products = [...state.products, ...products]
            console.log(state.products)
        },
        clearProducts(state) {
            state.products = []
            state.pageSearch = 1
        },
        setLastSearch(state, lastSearch) {
            state.lastSearch = lastSearch
        },
        increasePageSearch(state) {
            state.pageSearch += 1
        }
    },
    actions: {
        searchProduct({ state, commit }, valueForSearch) {
            return getProducts(valueForSearch, state.pageSearch)
                .then((products) => {
                    commit("addProducts", products)
                    commit("increasePageSearch")
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        loadMore({ state, commit }) {
            console.log(state.pageSearch)
            return getProducts(state.lastSearch, state.pageSearch)
            .then((products) => {
                commit("addProducts", products)
                commit("increasePageSearch")
            })
            .catch((err) => {
                console.log(err)
            })
        },
    },
    modules: {
        gApi: gEngine,
    },
})
