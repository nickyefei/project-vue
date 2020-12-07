<template>
  <div class="parent" id="parent">
    <button @click="addVuex">点击加载vuex模块</button>
    <span>{{ name  }}</span>
    <span>{{ $store.getters['admin/doubleApple'] || 0 }}</span>
  </div>
</template>
<script>

const admin = () => import('../store/modules/admin') // 动态引入module模块


export default {
  beforeDestroy() {
    // 卸载vuex模块
    this.hasRegister ? this.$store.unregisterModule('admin') : null
  },
  computed: {
    name() {
      return this.$store.state.admin && this.$store.state.admin.name || '展示姓名'
    },
    apple() {
      return this.$store.state.admin && this.$store.state.admin.apple || 0
    },
  },
  data() {
    return {
      hasRegister: false
    }
  },
  methods: {
    addVuex() {
      if (!this.$store.state.admin) {
        admin().then(res => {
          this.hasRegister = true;
          // 动态注册vuex模块
          this.$store.registerModule('admin', res.default)
          // 可以直接调用action或mutation方法，但是state使用时，需要this.$store.state[模块名][属性名]
          this.$store.commit('admin/increment')
        })
      } else {
        this.$store.commit('admin/increment')
      } 
    }
  }
}
</script>
<style lang="less" scoped>
</style>
