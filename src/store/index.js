// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutationTypes'

Vue.use(Vuex)

const state = {
  tags: [],
  feedbacks: [],
  searchResult: []
}

const getters = {
  tags: state => state.tags,
  feedbacks: state => state.feedbacks,
  searchResult: state => state.searchResult,
  getFeedbackById: (state) => (id) => {
    return state.feedbacks.find(feedback => feedback.id == id)
  }
}

const actions = {
  updateTags({ commit }, data) {
    commit(types.UPDATE_TAGS, data)
  },
  clearTags({ commit }, data) {
    commit(types.CLEAR_TAGS, data)
  },
  updateFeedbacks({ commit }, data) {
    commit(types.UPDATE_FEEDBACKS, data)
  },
  updateSearchResult({ commit }, data) {
    commit(types.UPDATE_SEARCH_RESULT, data)
  },
  updateSupport({ commit }, data) {
    commit(types.UPDATE_SUPPORT, data)
  },
  toggleTag({ commit }, data) {
    commit(types.TOGGLE_TAG, data)
  },
  
}

const mutations = {
  [types.UPDATE_TAGS](state, data) {
    state.tags = data
  },
  [types.CLEAR_TAGS](state, data) {
    state.tags.forEach(tag => {
      tag.selected = false
    })
  },
  [types.UPDATE_FEEDBACKS](state, data) {
    state.feedbacks = data
  },
  [types.UPDATE_SEARCH_RESULT](state, data) {
    state.searchResult = data
  },
  [types.UPDATE_SUPPORT](state, { id }) {
    state.feedbacks.forEach(feedback => {
      if (feedback.id == id) {
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
    state.searchResult.forEach(feedback => {
      if (feedback.id == id) {
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
  [types.TOGGLE_TAG](state, { id }) {
    state.tags.forEach(tag => {
      if (tag.id == id) {
        tag.selected = !tag.selected
      }
    })
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
