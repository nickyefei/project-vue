<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <div v-if="errors" style="color: red">{{ errors }}</div>
  </div>
</template>
<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props:{
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errors: ''
    }
  },
  mounted() {
    this.$on('validate', this.validateResult)
  },
  methods: {
    validate() {
      // 获取校验规则
      const rules = this.form.rules[this.prop]
      // 获取数据模型
      const value = this.form.model[this.prop]
      // 校验对象
      const decs = {[this.prop]: rules}
      // 创建校验器
      const schema = new Schema(decs)
      // 校验
      return new Promise((resolve,reject) => {
        schema.validate({[this.prop]: value}, err => {
          resolve(err ? err[0].message : '')
        })
      })
    },
    async validateResult() {
      const err = await this.validate()
      this.errors = err || ''
      return err ? false : true
    }
  }
}
</script>
<style scoped lang="less">
</style>


