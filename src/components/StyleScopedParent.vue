<template>
  <div class="parent" id="parent">
    <span class="parent-text">父组件样式区域</span>
    <Child></Child>
  </div>
</template>
<script>
const StyleScopedChild = () => import('./StyleScopedChild')

const right = (Comp, type) => ({
  computed: {
    hasRight() {
      return ['demo', 'StyleScopedChild'].indexOf(type) > -1
    }
  },
  render(h) {
    return this.hasRight ? h(Comp, {}) : alert('暂无组件权限')
  }
})

export default {
  components: {
    Child: right(StyleScopedChild, 'StyleScopedChild')
  }
}
</script>
<style lang="less" scoped>
.parent {
  background-color: darkgrey;
  .parent-text {
    display: inline-block;
    width: 100px;
    height: 50px;
    color: #ffffff;
    background-color: orange;
  }
}
.children {
  background-color:greenyellow;
}
.children-text-content {
  color: palegreen
}
</style>
