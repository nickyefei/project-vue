export default {
  namespaced: true,
  state: { 
    name: 'Nick',
    apple: 0
  },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.apple++
      console.log(state.apple)
    }
  },
  getters: {
    doubleApple (state) {
      return state.apple * 2
    }
  }
}