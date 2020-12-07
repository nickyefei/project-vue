<template>
  <div class="z-scroll">
    <header class="z-header">{{ tipText }}</header>
    <div class="list-container">
      <ul id="total-doc">
        <li v-for="(item, index) in slist" :key="index" class="block-item" >
          <img :src="item.url" :class="['image', {'show-out': item.showOut}]"/>
          <p>{{ item.name }}</p>
          <p>{{ item.age }}</p>
          <p>{{ item.title }}{{ item.offTop }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import img1 from '@/assets/logo.png'
import img2 from '@/assets/sea.jpg'
import img3 from '@/assets/mount.jpg'

export default {
  data() {
    return {
      slist: [],
      sliceCache: [
        {
          name: 'nick',
          age: 18,
          gender: 'male',
          title: 'boss',
          url: img1,
          showOut: false,
          offTop: 0
        },
        {
          name: 'nancy',
          age: 18,
          gender: 'female',
          title: 'employee',
          url: img2,
          showOut: false,
          offTop: 0
        },
        {
          name: 'aaa',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img3,
          showOut: false,
          offTop: 0
        },
        {
          name: 'bbb',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img1,
          showOut: false,
          offTop: 0
        },
        {
          name: 'ccc',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img2,
          showOut: false,
          offTop: 0
        },
        {
          name: 'ddd',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img3,
          showOut: false,
          offTop: 0
        },
        {
          name: 'eee',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img1,
          showOut: false,
          offTop: 0
        },
        {
          name: 'fff',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img2,
          showOut: false,
          offTop: 0
        },
        {
          name: 'ggg',
          age: 18,
          gender: 'male',
          title: 'manager',
          url: img3,
          showOut: false,
          offTop: 0
        }
      ],
      fetching: false, //
      page: 1, // 
      sliceMap: {}, // 
      lastScrollY: 0, // 
      scrollY: 0, // 
      innerHeight: 650, // 
      topViewPort: 0, // 
      bottomViewPort: 0, //
      tipText: '',
      listEl: null
    }
  },
  created() {
    this.slist = [...this.sliceCache]
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
    // setTimeout(() => {
    //   this.showOut = true
    // }, 1000)
  },
  mounted() {
    this.listEl = document.getElementsByClassName('list-container')[0]
    this.listEl.addEventListener('touchstart', this.refreshTouchStart)
    this.listEl.addEventListener('touchmove', this.refreshTouchMove)
    this.listEl.addEventListener('touchend', this.refreshTouchEnd)
  },
  beforeDestroy() {
    this.listEl.removeEventListener('touchstart', this.refreshTouchStart)
    this.listEl.removeEventListener('touchmove', this.refreshTouchStart)
    this.listEl.removeEventListener('touchend', this.refreshTouchStart)
  },
  methods: {
    refreshTouchStart(e) {
      const touch = e.changedTouches[0]
      this.tipText = '下拉刷新'
      this.startY = touch.clientY
    },
    refreshTouchMove(e) {
      let touch = e.changedTouches[0]
      let _move = touch.clientY - this.startY
      this.moveDistance = _move
      if (_move > 0 && _move < 500) {
        this.listEl.style.marginTop = `${_move}px`
        if (_move > 50) {
          this.tipText = '松开即可刷新'
        }
      }
    },
    refreshTouchEnd(e) {
      if (this.moveDistance > 50) {
        this.tipText = '数据加在中...'
        let timer = setInterval(() => {
          this.listEl.style.marginTop = this.listEl.style.marginTop.split('px')[0] -5 + 'px'
          if (Number(this.listEl.style.marginTop.split('px')[0]) <= 50) {
            clearInterval(timer)
            setTimeout(() => {
              this.resetData()
            }, 200);
          }
        }, 10);
      }
    },
    resetData() {
      if (this.moveDistance > 0) {
        let timer = setInterval(() => {
          this.listEl.style.marginTop = this.listEl.style.marginTop.split('px')[0] - 1 + 'px';
          if (this.listEl.style.marginTop.split('px')[0] <= 0) {
            clearInterval(timer)
          }
        } ,10)
      }
      this.moveDistance = 0
    },
    handleScroll(e, force = false) {
      const scrollTop = e.target.scrollTop
      
      // if (!force && this.lastScrollY === scrollTop) {
      //   // setTimeout(this.handleScroll, 100)
      // } else {
      //   this.lastScrollY = scrollTop
      // }

      this.scrollY = scrollTop
      // this.topViewPort = scrollTop - 1000
      // this.bottomViewPort = scrollTop + this.innerHeight + 100
      
      const totalEl = document.getElementById('total-doc')

      // if (scrollTop + this.innerHeight + 350 > totalEl.offsetHeight) {
      //   console.log('fetchdata')
      //   this.fetchData()
      // }
      this.handleDefer()
      // setTimeout(this.handleScroll, 100)
    },
    fetchData() {
      if (this.fetching) {
        return
      } else {
        this.fetching = true
      }

      setTimeout(() => {
        this.slist = [...this.slist, ...this.sliceCache]
        this.fetching = false
        // this.handleScroll(null, true)
        this.page++
      }, 500)
    },
    handleDefer() {
      const ht = document.getElementById('total-doc').style.height
      this.slist.forEach((ele, index) => {
        const offTop = index * 147
        ele.offTop = offTop
        if (offTop < this.scrollY - 100 || offTop > this.innerHeight + this.scrollY) {
          ele.showOut = false
        } else {
          ele.showOut = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.z-scroll {
  position: relative;
}
.z-header {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  position: absolute;
  background-color: white;
  top: 0px;
}
.list-container {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 650px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: darkgray;
  .block-item {
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    // height: 50px;
    color: yellow;
    > p {
      flex: 1;
    }
    .image {
      width: 200px;
      height: 100px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      &.show-out {
        opacity: 1;
      }
    }
  }
}
.list-container::-webkit-scrollbar {
  background-color: transparent;
}
.list-container::-webkit-scrollbar-track {
  background-color: transparent;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
