import Vue from "vue"
import Vuex from "vuex"
import { gEngine } from "./modules/googleEngine"
import { getProducts } from "../api"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        lastSearch: "",
        pageSearch: 1,
        bookmarks: [],
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
        },
        importBookmarks(state) {
            const bookmarks = localStorage.bookmarks

            try {
                state.bookmarks = JSON.parse(bookmarks)
            } catch(e) {}
        },
        saveBookmark(state, product) {
            state.bookmarks.push(product)

            localStorage.bookmarks = JSON.stringify(state.bookmarks)
        },
        removeBookmark(state, product) {
            state.bookmarks = state.bookmarks.filter(
                (bookmark) => bookmark.productTitleText !== product.productTitleText,
            )

            localStorage.bookmarks = JSON.stringify(state.bookmarks)
        },
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
