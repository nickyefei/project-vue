<template>
  <div id='app' style="padding-bottom: 52px;">
    <transition name="fadeIn">
      <keep-alive include="homeComponent,listComponent"> <!--组件name-->
        <router-view/>
      </keep-alive>
    </transition>
    <router-view name="left"></router-view>
    <router-view name="right"></router-view>
    <Tab/>
  </div>
</template>
<script src="//unpkg.com/element-ui@1.4.13/lib/index.js"></script>
<script>
import Tab from './base/Tab'
export default {
  name: 'app',
  components: {
    Tab
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height:100%;
  overflow:hidden;
}
ul,li {
  list-style: none;
}
a{
  text-decoration: none;
  color: cornflowerblue;
}
input,button{
  -webkit-appearance:none
}
.fadeIn-enter{
  opacity: 0;
}
.fadeIn-enter-active{
  opacity: 1;
}
.fadeIn-leave-active{
  opacity: 0;
}
.fadeIn-enter-active, .fadeIn-leave-active{
  transition: all 0.3s linear;
}
</style>




