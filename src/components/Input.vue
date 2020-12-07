<template>
  <div>
    <label for="lb1" class="input-item">
      输入框1
      <input v-model="int1" name="lb1" @focus="handleFocus" @blur="handleBlur">
    </label>
    <label for="lb2" class="input-item">
      输入框2
      <input v-model="int2" name="lb2" @focus="handleFocus" @blur="handleBlur">
    </label>
    <label for="lb3" class="input-item">
      输入框3
      <input v-model="int3" type="tel" name="lb3" novalidate="novalidate" @focus="handleFocus" @blur="handleBlur">
    </label>
    <label for="lb4" class="input-item">
      输入框4
      <input v-model="int4" name="lb4" @focus="handleFocus" @blur="handleBlur">
    </label>
  </div>
</template>
<script>
export default {
  data() {
    return {
      int1: '1',
      int2: '2',
      int3: '3',
      int4: '4',
      deviceType: {}
    }
  },
  mounted() {
    // 判断设备类型
    this.deviceType = this.UAType()
    this.orgHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 应对android关闭键盘，但输入框不失焦，监听resize
    window.addEventListener('resize', () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (this.orgHeight <= resizeHeight) { // 键盘收起
          
      } else { // 键盘弹出
        this.elem && this.eleScrollIntoView(this.elem)
      }
    })
  },
  methods: {
    showTip() {
      this.$notify('这是传入的提示',{
        delay: 500
      })
    },
    goHome() {
      this.$router.push('/home')
    },
    UAType() {
      const ua = window.navigator.userAgent.toLocaleLowerCase()
      const isIOS = /iphone|ipad|ipod/.test(ua)
      const isAndroid = /android/.test(ua)
      return {
        isIOS,
        isAndroid
      }
    },
    handleFocus(e) {
      this.elem = e.target
      if (this.deviceType.isAndroid) {
        this.eleScrollIntoView(e.target)
      }
    },
    handleBlur(e) {

    },
    eleScrollIntoView(target) {
      const editable = target.getAttribute('contenteditable')
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || editable || editable === '') {
        setTimeout(() => {
          target.scrollIntoView()
        }, 500)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.input-item {
  display: block;
  margin: 300px auto;
  text-align: center;

}
</style>
