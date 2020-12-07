<template>
  <div>
    <Header :title="title" msg="这是传入msg"/>
    <h3>这是首页信息表</h3>
    <div>
      <button @click="minusAction(2)">-</button>
      <span>{{ counter }}</span>
      <span>{{ getCounter }}</span>
      <button @click="addAction(5)">+</button>
    </div>
    
    <!-- <div class="mouseDowmArea" v-press>长按区域</div> -->
    <!-- <div v-directcirle>自定义指令生命周期</div> -->

    组件类型：
    <button @click="addList1">添加普通组件列表</button>
    <button @click="addList2">添加函数组件列表</button>

    <ul style="position:absolute; top:25px;">
      <Stateful v-for="item in list1" :key="item" :index="item">
        {{ item }}
      </Stateful>
    </ul>

    <ul style="position: absolute;top: 25px;left: 200px">
      <Functional v-for="item in list2" :key="item" :index="item">
        {{ item }}
      </Functional>
    </ul>

    <div id="example"></div>

    <!-- <div @click="showTip">点击弹出提示</div>-->
    <!-- <input class="input fixed" @focus="focusHandler" @blur="blurHandler" autofocus> -->
  </div>
</template>
<script>
import Header from '@/base/Header'
import Functional from '@/base/functionalComp'
import Stateful from '@/base/stateful'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'homeComponent',
  components: {
    Header,
    Functional,
    Stateful
  },
  beforeUpdate() {
    console.time('timer')
  },
  updated() {
    console.log("Time for render:");
    console.timeEnd('timer')
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  },
  created() {
    localStorage['aaa'] = '115';
    // localStorage['aaa'] = 'bbb';
    // getList().then(res => {
    //   this.list = res;
    // })
    // console.lg(222)
  },
  activated() {
    console.log('act')
    // keep-alive时使用
  },
  deactivated() {
    console.log('deact')
    // 配合activated一起使用
  },
  watch: {
    '$route': {
      handler: 'resetData',
      immediate: true,
      deep: true, // 深度监控
    }
  },
  computed: {
    ...mapState(['counter']),
    ...mapGetters(['getCounter'])
  },
  directives: {
    press: (el,binding,vnode) => {
      if (typeof binding.value !== 'function') {
        // 获取组件名称
        const compName = vnode.context.name;
        // 将警告传递给控制台
        let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;
        if (compName) { warn += `Found in component '${compName}' `}
        console.warn(warn);
      }
      let pressTimer = null;
      let start = (e) => {
        if(e.type === 'click' && e.detail !== 0) return
        if (pressTimer == null) {
          pressTimer = setTimeout(() => {
            handler()
          }, 2000);
        }
      }
      let cancel = (e) => {
        if (pressTimer) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }
      
      
      // 添加事件监听器
      el.addEventListener("mousedown", start);
      el.addEventListener("touchstart", start);

      el.addEventListener("click", cancel);
      el.addEventListener("mouseout", cancel);
      el.addEventListener("touchend", cancel);
      el.addEventListener("touchcancel", cancel);

      const handler = (e) => {
        
      }
    },
    directcirle: {
      bind(el,binding,vnode) {
        console.log('bind')
      },
      inserted(el,binding,vnode) {
        console.log('inserted')
      },
      update(el,binding,vnode) {
        console.log('update')
      },
      componentUpdated(el,binding,vnode) {
        console.log('componentUpdated')
      },
      unbind(el,binding,vnode) {
        console.log('unbind')
      }
    }
  },
  data() {
    return {
      title: '首页',
      list1: [],
      list2: [],
      component: 'Stateful',
    }
  },
  methods: {
    focusHandler(e) {
      // document.body.scrollTop = document.body.scrollHeight - document.body.clientHeight
      const scrollTop = document.documentElement.scrollHeight - document.body.clientHeight
      e.target.className = 'input static'
      this.$nextTick(() => {
        document.body.scrollTop = document.documentElement.scrollHeight
      })
    },
    blurHandler(e) {
      e.target.className = 'input fixed'
    },
    addList1() {
      this.list1 = Array.apply(null, {length: 1000}).map(ele => {
        return Math.random()
      })
    },
    addList2() {
      this.list2 = Array.apply(null, {length: 1000}).map(ele => {
        return Math.random()
      })
    },
    showTip() {
      this.$notify('这是传入的提示',{
        delay: 1000
      })
      const timer = setInterval(() => {
        console.log('timer')
      }, 1000);
      this.$once('hook:beforeDestroy', function() {
        clearInterval(timer)
      })
    },
    resetData(to, from) {
      // 重置数据
    },
    ...mapMutations([
      'add',
      'minus'
    ]),
    ...mapActions([
      'addAction',
      'minusAction'
    ]),
  },
}
</script>
<style lang="less" scoped>
.mouseDowmArea{
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 50%;
  background-color: #ff8800
}
.header {
  background-color: aquamarine;
  
}
.goBack {
  color: red;
}
.input {
  width: 100%;
  height: 50px;
  background-color: darkgrey;
}
.input.fixed {
  position: fixed;
  bottom: 0
}
.input.static {
  position: static;
}

@svg square {
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 100%;
  }
}

#example {
  height: 1px;
  background: white svg(square param(--color #00b1ff));
}

@media only screen and (-webkit-min-device-pixel-radio: 2.0) {
  .border-bottom::after {
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}
</style>
