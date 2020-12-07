<template>
  <div>
    <!-- <div>
      这是普通文本
      <span v-text-format>50min</span>
    </div> -->
    <Debounce :time="1000" events="click,change">
      <button @click="debHandler">点击触发防抖</button>
    </Debounce>
    <Throttle :time="500" events="click">
      <button @click="throHandler">点击触发节流</button>
    </Throttle>
  </div>
</template>
<script>

export default {
  directives: {
    textFormat(el, binding, vnode) {
      el.style.color = 'blue'
      el.style.fontSize = '20px'
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    throHandler() {
      console.log('节流')
    },
    debHandler() {
      console.log('防抖')
    }
  }
}
</script>
<style scoped lang="less">
.drag{
  position: absolute;
  top: 50px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: red;
}
.animate-enter-active{
  transition: all 50s ease;
}
.animate-leave-active{
    transition: all 50s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.animate-enter, .animate-leave-to{
    transform: translateX(100px);
    opacity: 0;
}
</style>

