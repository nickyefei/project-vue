<template>
  <div>
    页面不存在，请<a @click="goHome" style="color: blue">返回首页</a>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
  },
  methods: {
    showTip() {
      this.$notify('这是传入的提示',{
        delay: 500
      })
    },
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>
