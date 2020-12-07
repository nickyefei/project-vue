<template>
  <div>home的同级路由right</div>
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
