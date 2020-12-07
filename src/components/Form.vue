<template>
  <div style="width:100%">
    <z-form :model="form" :rules="rules" ref="ruleForm">
      <z-form-item prop="name" label="姓名">
        <z-input v-model="form.name"></z-input>
      </z-form-item>
      <z-form-item prop="password" label="密码">
        <z-input v-model="form.password" type="password"></z-input>
      </z-form-item>
      <z-button @click="submitForm" type="primary">提交</z-button>
      <z-button @click="goto">取消</z-button>
    </z-form>
  </div>
</template>
<script>
import zForm from '@/zframe/z-form.vue'
import zFormItem from '@/zframe/z-form-item.vue'
import zInput from '@/zframe/z-input.vue'
import zButton from '@/zframe/z-button.vue'
export default {
  inheritAttrs: false, // 组件中设置后，attrs中属性可不显式挂载在元素上
  optionValue: '23456',
  components: {
    zForm,
    zFormItem,
    zInput,
    zButton
  },
  data() {
    return {
      buttonPressed: false,
      form: {
        name: '123',
        password: '567'
      },
      rules: {
        name: [
          { 
            required: true,
            validator: this.validatorName,
            trigger: 'blur'
          },
        ],
        password: [
          { 
            required: true,
            validator: this.validatorPwd,
            trigger: 'focus'
          }
        ]
      }
    }
  },
  methods: {
    validatorName(rule, value, callback) {
      if (!value) {
        callback('请输入姓名')
        return
      } 
      callback()
    },
    validatorPwd(rule, value, callback) {
      if (!value) {
        callback('请输入密码')
        return
      }
      callback()
    },
    submitForm(e) {
      this.$refs['ruleForm'].validate(valid => {
        console.log('valid---------' + valid)
      })
    },
    goto() {
      this.$router.push('/list')
    }
  },
  created() {
    console.log(this.$options.optionValue)
  },
}
</script>

