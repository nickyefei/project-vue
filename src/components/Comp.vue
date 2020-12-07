<template>
  <div>
    <button @click="showList = true" v-show="!showList">显示列表</button>
    <child :show.sync="showList" @listen="listenHandle" @hook:mounted="doHook">
      <ul slot="list">
        <li>11</li>
        <li>22</li>
        <li>33</li>
      </ul>
    </child>
    <div v-show="showMsg">已接收到子孙组件调用，展示信息</div>
    <br>
    <br>
    <br>
    <br>
    <div>
      <children1></children1>
      <children2></children2>
    </div>
    <br>
    <br>
    <br>
    <br>
    <functional :list.sync="list">
      <div slot-scope="scope">
        <label>{{ scope.label }}</label>
        <input type="text" v-bind="scope.inputAttrs" v-on="scope.inputEvents">
        <button @click="scope.add">添加</button>
        <div v-for="item in scope.list" :key="item">
          {{ item }}
        </div>
      </div>
    </functional>
    <br>
    <br>
    <br>
    <br>
    <div>
      <smart :list="list"></smart>
    </div>
  </div>
</template>
<script>
import child from '../base/child-component'

function createCompDemo() {
  const creatEle = this.$createElement;
  return creatEle(
    'div',
    {
      class: {
        myclass1: true,
        myclass2: true,
      },
      style: {
        color: 'red',
        fontSize: '14px'
      },
      attrs: {
        id: 'text'
      },
      props: {
        propsText: 'this is propstext'
      },
      domProps: {
        innerHtml: 'inner'
      },
      on: {
        click: this.clickHandler
      },
      nativeOn: {
        click: this.nativeClickHandler
      },
      directives: [
        {
          name: 'directive-one',
          value: '1'
        },
        {
          name: 'directive-two',
          value: '2'
        }
      ],
      scopedSlots: {
        default(props) {
          return creatEle('span', props.propsText)
        }
      },
      slot: 'myslot',
      ref: 'myref'
    },
    [
      node1,
      node2,
      node3
    ]
  )

  // v-for
  function vfor(list) {
    const h = this.$createElement;
    if (list.length > 0) {
      return h('ul', list.map(ele => {
        return h('li', ele.text)
      }))
    } else {
      return h('p', 'no data')
    }
    
  }
}

const grandgrandson1 = {
  template: '<div>这是孙子的孙子的组件{{ gg1 }}<br>-------------父亲的值{{ f1 }}' +
  '<button @click="dispatch()">孙子孙子传值</button>' +
  '</div>',
  data() {
    return {
      gg1: 'gg1',
      eventName: 'dispatch',
      data: 'dis',
      f1: '',
    }
  },
  mounted() {
    this.$on('broadcast', val => {
      this.f1 = val
    })
  },
  methods: {
    dispatch() {
      let parent = this.$parent;
      while (parent) {
        if (parent) {
          parent.$emit(this.eventName, this.data)
          parent = parent.$parent
        } else {
          break;
        }
      }
    }
  }
}
const grandson1 = {
  template: '<div>这是孙子组件{{ g1 }}<br>----------孙子的孙子的值{{ ggs }}<br>-------------父亲的值{{ f1 }}<grandgrandson1/></div>',
  data() {
    return {
      g1: 'g1',
      ggs: '',
      f1: ''
    }
  },
  components: {
    grandgrandson1
  },
  mounted() {
    this.$on('dispatch', val => {
      this.ggs = val
    })
    this.$on('broadcast', val => {
      this.f1 = val
    })
  }
}
const grandson2 = {
  template: '<div>这是孙子组件{{ g2 }}</div>',
  data() {
    return {
      g2: 'g2'
    }
  },
}
const children1 = {
  template: '<div>这是儿子组件{{ c1 }}<br>----------孙子的孙子的值{{ ggs }}<grandson1/>' + 
  '<button @click="broadcast()">老子传值</button>' +
  '</div>',
  data() {
    return {
      c1: 'c1',
      ggs: '',
      eventName: 'broadcast',
      data: 'bro'
    }
  },
  components: {
    grandson1
  },
  mounted() {
    this.$on('dispatch', val => {
      this.ggs = val
    })
  },
  methods: {
    broadcast() {
      bob.call(this, this.eventName, this.data)
    }
  }
}
const children2 = {
  template: '<div>这是儿子组件{{ c2 }}<grandson2/></div>',
  data() {
    return {
      c2: 'c2'
    }
  },
  components: {
    grandson2
  }
}

function bob(eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data)
    if (child.$children.length) {
      bob.call(child, eventName, data) 
    }
  });
}


export default {
  name: 'personlist',
  components: {
    children1,
    children2,
    child
  },
  data() {
    return {
      showList: false,
      showMsg: false,
      list: [1,2,3,4,5,6]
    }
  },
  mounted() {
    //this.getPages()
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
  },
  methods: {
    listenHandle() {
      this.showMsg = true
      console.log('listen传递')
    },
    doHook() {
      console.log('hook监听子组件生命周期')
    }
  }
}
</script>
<style scoped lang="less">
.smartLi {
  margin: 10px 5px;
  background-color: coral;
}
</style>
