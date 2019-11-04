import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    data,
  },
  state: {
    currentUser: localStorage.getItem('currentUser'),
    token: localStorage.getItem('token'),
    cartLength: localStorage.getItem('cartLength'),
  }
})