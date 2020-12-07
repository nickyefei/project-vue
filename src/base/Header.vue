<template>
  <div class="header">
    <div @click="goBack" class="goBack">&lt;</div>
    <div class="title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  props:[
    'title',
  ],
  computed: {
    titleVal: {
      get() {
        return this.title
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  errorCaptured (err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    return false
  },
}
</script>
<style lang="less" scoped>
.header{
  width: 100%;
  height: 50px;
  background-color: coral;
  color: #fff;
  position: relative;
  display: flex;
  .goBack{
    flex: 0 0 1;
    line-height: 50px;
  }
  .title{
    flex: 1;
    text-align: center;
    line-height: 50px;
  }
}
.mouseDowmArea {
  background-color: brown;
}
</style>

