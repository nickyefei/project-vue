const actions = {
  addAction({ commit }, value) {
    setTimeout(() => {
      commit('ADD', value)
    },1000)
  },
  minusAction({ commit }, value) {
    commit('MINUS', value)
  },
  authAction({ commit }, value) {
    commit('GETAUTH', value)
  }
}

export default actions