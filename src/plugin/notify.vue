<template>
  <div class="notify">
    <span>{{ msg }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '这是默认值'
    }
  }
}
</script>
<style scoped lang="less">
.notify{
  width: 200px;
  height: 100px;
  background-color: #333333;
  opacity: .7;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  >span{
    color: #ffffff;
  }
}
</style>


