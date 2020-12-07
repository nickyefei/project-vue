import Vue from 'vue'
import Router from 'vue-router'
import Form from '../components/Form'
import Detail from '../components/Detail'
import Home from '../components/Home'
import List from '../components/List'
import Comp from '../components/Comp'
import Direct from '../components/Direct'
import Drag from '../components/Drag'
import Left from '../components/Left'
import Right from '../components/Right'
import VuexRegister from '../components/VuexRegister'
import HocComp from '../components/HocComp'
import Error from '../components/Error'
import Scroll from '../components/Scroll'
import Input from '../components/Input'

import rightHoc from '../mixins/auth'

const _import = require('./_import_' + process.env.NODE_ENV)


// 动态引入模块
const StyleScoped = () => import('../components/StyleScopedParent');

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: route => {
      const { path, hash, params, query } = route;
      if (path === '/') {
        return '/home'
      }
    },
    //alias: 'gogogo' // 申明别名的alias属性不要用在path为’/’中。
  },
  {
    path: '/form',
    component: Form,
    name: 'Form',
    meta: {
      keepAlive: false,
      title: '表单页'
    },
  },
  {
    path: '/home',
    components: { // 路由组写法：页面内多个router-view，通过router-view的name属性匹配，components要有s
      default: Home,
      left: Left,
      right: Right
    },
    name: 'Home',
    meta: {
      keepAlive: true,
      title: '首页'
    }
  },
  {
    path: '/list',
    component: _import('List'),
    name: 'List',
    meta: {
      keepAlive: false,
      title: '列表页'
    },
  },
  {
    path: '/detail/:pid(\\d+)',
    component: () => import('../components/Detail'), // 懒加载路由写法
    name: 'Detail',
    meta: {
      keepAlive: false,
      title: '详情页'
    },
    beforeEnter(to, from, next) {
      console.log('beforeEnter ========' + 4)
      next()
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter ========' + 5)
      // 在路由独享守卫后调用 不！能！获取组件实例 `this`，组件实例还没被创建
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate ========' + 6)
      // 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 `this`

      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，

      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      next()
    },
    beforeRouteLeave(to, from, next) { 
      console.log('beforeRouteLeave ========' + 7)
      // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
      if (false) {
        //出现弹窗提醒保存草稿，或者自动后台为其保存
      } else { 
        next(true);//用户离开
        // next(false);//取消离开
      }
    },
  },
  {
    path: '/Component',
    component: Comp,
    name: 'Component',
    meta: {
      keepAlive: false,
      title: '组件页'
    },
    props: true // 页面中需要通过props接收
  },
  {
    path: '/Directive',
    component: Direct,
    name: 'Directive',
    meta: {
      keepAlive: false,
      title: '指令页'
    },
    props: (route) => ({
      id: route.query.id
    })
  },
  {
    path: '/Drag',
    component: Drag,
    name: 'Drag',
    meta: {
      keepAlive: false,
      title: '拖拽页'
    },
    children: [
      {
        path: 'ChildDrag',
        component: Direct,
        name: 'ChildDrag',
      }
    ]
  },
  {
    path: '/StyleScoped',
    component: rightHoc(StyleScoped, 'StyleScoped'),
    name: 'StyleScoped',
    meta: {
      keepAlive: false,
      title: 'StyleScoped测试页'
    },
  },
  {
    path: '/VuexRegister',
    component: VuexRegister,
    name: 'VuexRegister',
    meta: {
      keepAlive: false,
      title: 'Vuex动态注册'
    },
  },
  {
    path: '/HocComp',
    component: HocComp,
    name: 'HocComp',
    meta: {
      keepAlive: false,
      title: '高阶组件'
    },
  },
  {
    path: '/Scroll',
    component: Scroll,
    name: 'Scroll',
    meta: {
      keepAlive: false,
      title: '无限滚动组件'
    },
  },
  {
    path: '/Input',
    component: Input,
    name: 'Input',
    meta: {
      keepAlive: false,
      title: 'Input测试'
    },
  },
  {
    path: '*',
    name: 'Error',
    component: Error,
    meta: {
      keepAlive: false,
      title: '暂无此页'
    },
  }
]

export default new Router({
  routes,
  linkActiveClass: 'blue',
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { //如果savedPosition存在，滚动条会自动跳到记录的值的地方
     return savedPosition
    } else { 
     return { x:0, y:0 }//savedPosition也是一个记录x轴和y轴位置的对象
    }
  }
})