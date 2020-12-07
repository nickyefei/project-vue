<template>
  <div class="container">
    <Header :title="title"/>
    <data-list>
      <template slot-scope="scope">
        <span v-if="scope.item.hasSelect">√</span>
        <span v-else>X</span>
      </template>
    </data-list>
  </div>
</template>
<script>
import DataList from '../base/DataList'
import Header from '../base/Header'

export default {
  name: 'listComponent',
  components: {
    DataList,
    Header
  },
  data() {
    return {
      title: '列表页',
      list: [],
      funcList: [
        {
          count: 1
        },
        {
          count: 2
        },
        {
          count: 3
        },
      ]
    }
  },
  mounted() {
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
  },
  computed: {
    pickAll: {
      get() {
        return this.list.some(ele => ele.isSelect)
      },
      set(val) {
        this.list.forEach(ele => {
          ele.isSelect = val
        });
      }
    },
    sum() {
      let total = this.list.reduce((prev,next) => {
        if (!next.isSelect) return prev;
        return prev + next.price * next.count
      },0)
      return total
    },
  },
  methods: {
    del(id) {
      this.list = this.list.filter(ele => {
        return ele.id != id
      })
    },
    add(item) {
      item.count += 1
    },
    minus(item) {
      item.count -= 1
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  padding-bottom: 50px;
  position: relative;
  .list{
    position: absolute;
    max-height: 440px;
    overflow-y: scroll;
  }
}
</style>

