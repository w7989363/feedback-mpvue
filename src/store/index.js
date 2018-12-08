// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutationTypes'

Vue.use(Vuex)

const state = {
  problemTags: []
}

const getters = {
  problemTags: state => state.problemTags
}

const actions = {
  updateTags({ commit }, data) {
    commit(types.UPDATE_TAGS, data)
  }
}

const mutations = {
  [types.UPDATE_TAGS](state, data) {
    state.problemTags = data
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
