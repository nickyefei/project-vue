<template>
  <div class="children">
    原始组件插入位置：
    <BaseComp text="原始人">
      <div slot="img">
        <img src="../assets/logo.png">
      </div>
      <div>
        <p>插入原始组件标题</p>
        <p>
          <span>插入原始组件内容</span>
          <span>好好学习</span>
        </p>
      </div>
    </BaseComp>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    高阶组件插入位置：
    <EnhancedComp text="高阶人">
      <div slot="img">
        <img src="../assets/logo.png">
      </div>
      <div>
        <p>插入高阶组件标题</p>
        <p>
          <span>插入高阶组件内容</span>
          <span>天天向上</span>
        </p>
      </div>
    </EnhancedComp>
  </div>
</template>
<script>
import BaseComp from './BaseComp'
import HOC from '@/mixins/hoc'

export default {
  components: {
    BaseComp,
    EnhancedComp: HOC(BaseComp)
  },
  data() {
    return {}
  },
}
</script>
<style scoped lang="less">
.children {
  margin: 50px 0 0 50px;
}
</style>

