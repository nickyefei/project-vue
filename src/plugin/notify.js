import modal from './notify.vue'

let notify = {};

notify.install = (Vue, option = {delay: 3000}) => {
  Vue.prototype.$notify = (msgs, opt) => {
    if (notify.el) return
    const opts = {...option,...opt}
    const oDiv = document.createElement('div')
    const Instance = Vue.extend(modal) // 注册组件
    let vm = new Instance()
    vm.$mount(oDiv) //将组件挂载到dom元素上
    notify.el = vm.$el //储存el对象,避免重复添加dom结构
    vm.msg = msgs //改变文案
    document.body.appendChild(vm.$el)
    setTimeout(() => {
      document.body.removeChild(vm.$el)
      notify.el = null
    }, opts.delay)
  }
}

export default notify