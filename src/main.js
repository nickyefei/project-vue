import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import notify from './plugin/notify.js'
import emitter from './plugin/emitter.js'
// const emitter = require('./plugin/emitter.js')
// console.log(emitter)

// 组件通讯---广播与派发
Vue.prototype.$dispatch = emitter.dispatch
Vue.prototype.$broadcast = emitter.broadcast

Vue.config.productionTip = false
Vue.use(notify)

// 全局路由钩子为以下3个
router.beforeEach((to, from, next) => {
  console.log('beforeEach ========' + 1)
  document.title = to.query.title ? to.query.title : to.meta.title
  // 登录权限判断
  if('登录' || to.name === 'login'){ next() }
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve ========' + 2)
  next()
})
router.afterEach((to,from) => {
  console.log('afterEach ========' + 3)
  return

  if ('未登录' && to.name !== 'login') {
    router.push({ name: 'login' }); // 跳转login
  }
})

// 节流全局组件
const throttle = (fn, wait = 50, vnode) => {
  let timer;
  let lastCall = 0;
  return function(...args) {
    clearTimeout(timer)
    const now = new Date().getTime();
    if (now - lastCall >= wait) {
      fn.apply(vnode, args)
      lastCall = now
    } else {
      timer = setTimeout(() => {
        fn.apply(vnode, args)
      }, wait)
    }
  }
};

Vue.component('Throttle', {
  abstract: false,
  props: ['time', 'events'],
  created() {
    this.eventKeys = this.events.split(',')
    this.originMap = {}
    this.throttleMap = {}
  },
  render(h) {
    const vnode = this.$slots.default[0];
    this.eventKeys.forEach(key => {
      const target = vnode.data.on[key];
      if (this.originMap[key] === target && this.throttleMap[key]) {
        vnode.data.on[key] = this.throttleMap[key] 
      } else if (target) {
        this.originMap[key] = target;
        this.throttleMap[key] = throttle(target, this.time, vnode);
        vnode.data.on[key] = this.throttleMap[key]
      }
    })
    return vnode
  }
})

// 防抖全局组件
const debounce = (func, time = 50, vnode) => {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(vnode, args)
    }, time)
  }
};

Vue.component('Debounce', {
  functional: true,
  props: ['time', 'events'],
  render(h, context) {
    const vnode = context.slots().default[0];
    const eventKeys = context.props.events.split(',')
    const originMap = {}
    const debounceMap = {}
    eventKeys.forEach(key => {
      const target = vnode.data.on[key];
      if (originMap[key] === target && debounceMap[key]) {
        vnode.data.on[key] = debounceMap[key] 
      } else if (target) {
        originMap[key] = target;
        debounceMap[key] = debounce(target, context.props.time, vnode);
        vnode.data.on[key] = debounceMap[key]
      }
    })
    return vnode
  }
})

Vue.component('functional', {
  props: ['list'],
  data() {
    return {
      val: '',
    }
  },
  methods: {
    add() {
      if (!this.val) return
      this.$emit('update:list', [...this.list, this.val])
      this.val = ''
    }
  },
  render(h) {
    return this.$scopedSlots.default({
      inputAttrs: {
        value: this.val
      },
      inputEvents: {
        input:e => {
          this.val = e.target.value
        }
      },
      label: '输入值：',
      list: this.list,
      add: this.add,
    })
  }
})

let EmptyList='p';
let TableList='ul';
let OrderedList='ul';
let UnorderedList='ol';

Vue.component('smart', {
  functional: true,
  props: ['list'],
  render(h, context) {
    let orgList = context.props.list
    function applyList() {
      if (orgList.length == 0) return EmptyList
      if (orgList instanceof Array) return OrderedList
      
      return UnorderedList
    }

    return h(
      applyList(),
      Array.apply(null, {length: orgList.length}).map((ele, index) => {
        return h('li', { class: 'smartLi'}, orgList[index])
      })
    )
  }
})

Vue.config.errorHandler = function(err, vm, info) {
  // console.dir(err)
  // console.dir(vm)
  // console.log(info)
  throw new Error(err)
  // const errs = new Error(err)
  // console.log(errs)
}

window.onerror = function(err) {
  alert(err)
}

window.addEventListener('unhandledrejection', (event) => {
  console.dir(event)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

