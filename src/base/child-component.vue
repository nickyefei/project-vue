<template>
  <div>
    <div v-show="show">
      <button @click="close">隐藏列表</button>
      <slot name="list"></slot>
    </div>
    
    <gchild v-on="$listeners"/>
  </div>
</template>
<script>
import gchild from '../base/gchild-component'

export default {
  name: 'pagelist',
  inheritAttrs: false,
  props: ['show'],
  components: {
    gchild,
  },
  // model: {
  //   prop: 'showList',
  //   event: 'toggle'
  // },
  data() {
    return {
      originMap: {},
      debouncedMap: {}
    }
  },
  mounted() {
    console.log(this.$listeners)
    console.log('hook子组件生命周期')
  },
  computed: {

  },
  methods: {
    close() {
      this.$emit('update:show', false)
    },
    
  }
}
</script>
