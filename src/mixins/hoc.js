export default function Hoc(comp) {
  const compProps = comp.props
  return {
    mounted() {
      console.log('这是高阶组件mounted周期')
    },
    render(h) {
      const slots = Object.keys(this.$slots).reduce((prev, key) => {
        return prev.concat(this.$slots[key])
      }, []).map(vnode => {
        vnode.context = this._self
        return vnode
      })
  
      console.log('attr', this.$attrs)
      console.log('props', this.$props)
  
      return h(comp, {
        on: this.$listeners,
        attrs: this.$attrs
      }, slots)
    }
  }
  
  
}
