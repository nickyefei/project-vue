<template>
  <div>
    <slot name="img"></slot>
    <p>这是组件自带内容，在两个插槽之间，但是有传入内容为：{{ text }}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['text'],
  created() {
    // console.log(this.$vnode.context === this.$vnode.componentOptions.children[0].context)
  }
}
</script>
<style scoped lang="less">
img {
  width: 50px;
}
</style>

