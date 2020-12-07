<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  provide() {
    return {
      form: this
    }
  },
  props:{
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
    }
  },
  data() {
    return {
      msg: '这是默认值'
    }
  },
  methods: {
    validate(cb) {
      this.$children.forEach(ele => {
        if (ele.validateResult && typeof ele.validateResult === 'function' ) {
          ele.validateResult().then(err => {
            cb(err)
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>


