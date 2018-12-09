// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutationTypes'

Vue.use(Vuex)

const state = {
  problemTags: [],
  feedbacks: []
}

const getters = {
  problemTags: state => state.problemTags,
  feedbacks: state => state.feedbacks,
  getFeedbackById: (state) => (id) => {
    return state.feedbacks.find(feedback => feedback.id == id)
  }
}

const actions = {
  updateTags({ commit }, data) {
    commit(types.UPDATE_TAGS, data)
  },
  updateFeedbacks({ commit }, data) {
    commit(types.UPDATE_FEEDBACKS, data)
  },
  updateSupport({ commit }, data) {
    commit(types.UPDATE_SUPPORT, data)
  }
}

const mutations = {
  [types.UPDATE_TAGS](state, data) {
    state.problemTags = data
  },
  [types.UPDATE_FEEDBACKS](state, data) {
    state.feedbacks = data
  },
  [types.UPDATE_SUPPORT](state, { id }) {
    state.feedbacks.forEach(feedback => {
      if (feedback.id === id) {
        // feedback.my_support = !feedback.my_support
        if (feedback.my_support) {
          feedback.my_support = false
          feedback.support--
        } else {
          feedback.my_support = true
          feedback.support++
        }
      }
    });
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
