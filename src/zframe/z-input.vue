<template>
  <input :type="type" :value="value" @input="inputChange" @blur="inputHandler('blur')" @focus="inputHandler('focus')">
</template>
<script>
export default {
  inject: ['form'],
  props:{
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    inputChange(e) {
      this.$emit('input', e.target.value)
    },
    inputHandler(act) {
      const actName = this.form.rules[this.$parent.prop][0].trigger
      if (act == actName) {
        this.$parent.$emit('validate')
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>


