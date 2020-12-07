import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'
import logger from 'vuex/dist/logger.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: true,  
  plugins: [logger()],
})