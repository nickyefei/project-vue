<template>
  <ul ref="perList" @scroll="scrollDown" @touchstart="tstart" @touchmove="tmove" @touchend="tend" class="list">
    <router-link v-for="item in list" :key="item.id" :to="{name:'Detail',params:{pid:item.id}}" tag="li" class="perLi">
      <slot :item="item"></slot>
      <span>姓名：{{ item.name | upcase }}</span>
      <span>年龄：{{ item.age }}</span>
      <button @click.stop="delPerson(item.id)" v-if="item.hasSelect">删除</button>
    </router-link>
  </ul>
</template>
<script>
const mixOption = {
  mounted() {
    console.log('这是mixins')
  }
}
const extendOption = {
  created() {
    console.log('这是extends')
  }
}
import { 
  getList,
  delItem,
  getPage,
} from '../api'
export default {
  mixins: [mixOption],
  extends: extendOption,
  filters: {
    upcase(value) {
      return value.toUpperCase()
    }
  },
  data() {
    return {
      list: [],
      hasMore: true,
      page: 0,
      total: 0,
      timer: null,
      top: 0,
      distance: 0,
      start: 0,
      end: 0,
      scrollEle: null
    }
  },
  methods: {
    getPages() {
      if (!this.page || this.total > this.list.length) {
        this.page += 1
        if (this.hasMore) {
          getPage(this.page).then(({result, hasMore, total}) => {
            this.list = [...this.list,...result];
            this.hasMore = hasMore;
            this.total = total;
            
          })
        }
      }
    },
    delPerson(id) {
      delItem(id).then(rest => {
        getList().then(res => {
          this.list = res;
        })
        this.$notify('删除成功！',{
          delay: 1000
        })
      })
    },
    scrollDown() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = this.$refs.perList
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getPages()
        }
      }, 300);
    },
    tstart(e) {
      this.start = e.touches[0].pageY;
    },
    tmove(e) {
      if (this.scrollEle.scrollTop != 0 && this.top == this.scrollEle.offsetTop) return
      this.end = e.touches[0].pageY;
      this.distance = this.end - this.start;
      if (this.distance > 0) {
        if (this.distance <= 100) {
          this.scrollEle.style.top = this.distance + this.top + 'px';
        } else {
          this.distance = 100;
          this.scrollEle.style.top = this.top + this.distance + 'px';
        }
        
      } else {
        this.scrollEle.removeEventListener('touchmove',this.tmove);
        this.scrollEle.removeEventListener('touchend',this.tend);
      }
    },
    tend(e) {
      if (this.scrollEle.scrollTop != 0 || this.top == this.scrollEle.offsetTop) return
      clearInterval(this.timer1);
      this.timer1 = setInterval(() => {
        if (this.distance <= 0) {
          this.distance = 0;
          this.scrollEle.removeEventListener('touchmove',this.tmove);
          this.scrollEle.removeEventListener('touchend',this.tend);
        }
        this.distance -= 1;
        this.scrollEle.style.top = this.top + this.distance + 'px';
      }, 5);
    },
  },
  mounted() {
    this.scrollEle = this.$refs.perList
    this.$nextTick(() => {
      this.top = this.scrollEle.offsetTop
    })
  },
  created() {
    this.getPages();
  },
}
</script>
<style scoped lang="less">
ul{
  width: 100%;
  background-color: aliceblue;
}
.perLi{
  height: 100px;
}
</style>

