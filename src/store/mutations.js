import * as types from './mutation-types'

const mutations = {
  [types.ADD] (state, value) {
    state.counter += value
  },
  [types.MINUS] (state, value) {
    state.counter -= value
  },
  [types.GETAUTH] (state, value) {
    state.authMapList = value
  }
}

export default mutations
