<template>
  <div :style="{
    width: systemInfo.width + 'px',
    height: systemInfo.height + 'px',
    left: 0,
    top: 0,
    zIndex: 998,
    backgroundColor: bgColor,
    position: 'absolute',
    overflow: 'hidden'
  }">
    <div 
      v-for="item in skeletonRectLists" 
      :key="item.width"
      :class="{chiaroscuro: loadingType == 'chiaroscuro'}"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        left: item.left + 'px',
        top: item.top + 'px',
        backgroundColor: 'rgb(246, 246, 246)',
        position: 'absolute'
      }"/>
    <div 
      v-for="item in skeletonCircleLists" 
      :key="item.width"
      :class="{chiaroscuro: loadingType == 'chiaroscuro'}"
      :style="{
        width: item.width + 'px',
        height: item.height + 'px',
        left: item.left + 'px',
        top: item.top + 'px',
        backgroundColor: 'rgb(246, 246, 246)',
        position: 'absolute',
        borderRadius: item.width + 'px'
      }"/>
    <div class="spinbox" v-if="loadingType == 'spin'">
      <div class="spin"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#FFF'
    },
    selector: {
      type: String,
      default: 'skeleton'
    },
    loading: {
      type: String,
      default: 'chiaroscuro'
    }
  },
  computed: {
    loadingType () {
      return ['spin', 'chiaroscuro'].indexOf(this.loading) > -1 ? this.loading : 'chiaroscuro'
    }
  },
  onLoad () {
    // 默认的首屏宽高，防止内容闪现
    const systemInfo = mpvue.getSystemInfoSync()
    this.systemInfo.width = systemInfo.windowWidth
    this.systemInfo.height = systemInfo.windowHeight
    // 等待页面基础结构加载完毕，计算骨架元素位置
    setTimeout(() => {
      // 绘制背景
      this.backGroundHandle()
      // 绘制矩形
      this.rectHandle()
      // 绘制圆形
      this.circleHandle()
    }, 80)
  },
  data () {
    return {
      systemInfo: {
        width: 0,
        height: 0
      },
      skeletonRectLists: [],
      skeletonCircleLists: []
    }
  },
  methods: {
    rectHandle () {
      // mpvue.createSelectorQuery().selectAll(`.${this.selector}-rect`).fields({
      //   rect: true
      // }, res => {
      //   console.log(res)
      //   this.skeletonRectLists = res
      // }).exec()
      mpvue.createSelectorQuery().selectAll(`.${this.selector} .${this.selector}-rect`).boundingClientRect(res => {
        console.log(res)
        this.skeletonRectLists = res
      }).exec()
      // setTimeout(() => {
      //   mpvue.createSelectorQuery().selectAll(`.${this.selector}-rect`).boundingClientRect(res => {
      //     console.log(res)
      //     this.skeletonRectLists = res
      //   }).exec()
      // }, 5000)
      // mpvue.createSelectorQuery().selectAll(`.${this.selector}-rect`).boundingClientRect().exec(res => {
      //   console.log(res)
      //   this.skeletonRectLists = res[0]
      // })
    },
    circleHandle () {
      mpvue.createSelectorQuery().selectAll(`.${this.selector} .${this.selector}-circle`).boundingClientRect(res => {
        console.log(res)
        this.skeletonCircleLists = res
      }).exec()
    },
    backGroundHandle () {
      mpvue.createSelectorQuery().selectAll(`.${this.selector}`).boundingClientRect().exec(res => {
        this.systemInfo.height = res[0][0].height + res[0][0].top || 0
      })
    }
  }
}
</script>

<style scoped lang="less">
.spinbox {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 999
}
.spin {
  display: inline-block;
  width: 64rpx;
  height: 64rpx;
}
.spin:after {
  content: " ";
  display: block;
  width: 46rpx;
  height: 46rpx;
  margin: 1rpx;
  border-radius: 50%;
  border: 5rpx solid #409eff;
  border-color: #409eff transparent #409eff transparent;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.chiaroscuro {
  width: 100%;
  height: 100%;
  animation-duration: 3s;
  animation-name: blink;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: .4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .4;
  }
}

.shine {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  animation: flush 2s linear infinite;
  background: linear-gradient(to left,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 255, 255, .85) 50%,
  rgba(255, 255, 255, 0) 100%
  )
}
@keyframes flush {
  0% {
    left: -100%;
  }
  50% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>
