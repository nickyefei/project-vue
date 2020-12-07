<template>
  <button type="button" @click="clickHandler" :class="['t-button',`t-button--${type}`]">
    <span><slot></slot></span>
  </button>
</template>
<script>
export default {
  props:{
    type: {
      type: String,
      default: 'default'
    },
  },
  methods: {
    clickHandler(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style scoped lang="less">
.default{
  padding: 10px 20px;
  border-radius: 4px;
}
.t-button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #bfcbd9;
  border-color: #c4c4c4;
  color: #1f2d3d;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
}
.t-button--primary{
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}
</style>


