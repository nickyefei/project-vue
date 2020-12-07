<template>
  <div class="children">
    <span class="children-text">
      <span class="children-text-content">子组件样式区域</span>
    </span>
  </div>
</template>
<script>

export default {
  props: {
    currentChange: {

    },
    currentPage: {

    }
  },
  data() {
    return {}
  },
}
</script>
<style scoped lang="less">
.children {
  background-color:deepskyblue;
}
.children-text-content {
  color:darkorchid;
}
.parent {
  background-color: darkred;
}
</style>

