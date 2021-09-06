import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './users'
import posts from './posts'

export default new Vuex.Store({
  state: {
    snackbar: {
      text: '',
      color: ''
    },
    modal: false
  },
  mutations: {
    setSnackbar: (state, snackbar) => {
      state.snackbar.text = snackbar.text
      state.snackbar.color = snackbar.color
    },
    showModal: (state, toggle) => {
      state.modal = toggle
    }
  },
  modules: {
    users,
    posts
  }
})
