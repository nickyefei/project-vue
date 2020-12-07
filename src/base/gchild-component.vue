<template>
  <div>
    <button @click="accept">子孙组件调用父组件方法</button>
  </div>
</template>
<script>
export default {
  name: 'pagelist',
  inheritAttrs: false,
  data() {
    return {

    }
  },
  methods: {
    accept() {
      this.$listeners.listen()
    }
  }
}
</script>
