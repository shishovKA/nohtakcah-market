import Vue from 'vue'
import Vuex from 'vuex'
import { gEngine } from './modules/googleEngine'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    gApi: gEngine,
  }
})
