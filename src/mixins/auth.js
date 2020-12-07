import { mapActions } from 'vuex'

export default (Comp, rightType) => ({
  components: {
    Comp,
  },
  computed: {
    hasRight() {
      const authMapList = this.$store.state.authMapList
      return authMapList.indexOf(rightType) > -1
    }
  },
  methods: {
    ...mapActions([
      'authAction'
    ])
  },
  created() {
    const authMapList = ['demo', 'demo2', 'demo3']
    this.authAction(authMapList)
  },
  render(h) {
    return this.hasRight ? h(Comp, {}) : alert('暂无路由权限')
  }
})
