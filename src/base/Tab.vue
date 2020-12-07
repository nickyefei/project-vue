<template>
  <div class="footer">
    <router-link to="/home" exact>
      <span>首页</span>
    </router-link>
    <router-link to="/list" exact>
      <span>列表</span>
    </router-link>
    <router-link to="/form" exact>
      <span>表单</span>
    </router-link>
    <router-link to="/Component" exact>
      <span>组件</span>
    </router-link>
    <router-link to="/Directive" exact>
      <span>指令</span>
    </router-link>
    <router-link to="/Drag" exact>
      <span>拖拽</span>
    </router-link>
    <router-link to="/VuexRegister" exact>
      <span>Vuex动态注册</span>
    </router-link>
    <router-link to="/Scroll" exact>
      <span>无限滚动</span>
    </router-link>
    <router-link to="/Input" exact>
      <span>Input</span>
    </router-link>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="less">
.footer{
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top:2px solid gainsboro;
  text-align: center;
  background-color: #fff;
  >a{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    &:active{
      color: #fff;
    }
  }
  .blue{
    color: #ffffff;
    background-color: cornflowerblue;
    opacity: .7;
  }
}
</style>

