<template>
  <div>
    <Header :title="title"></Header>
    <div>
      <label for="name">姓名：</label>
      <input v-model="data.name" name="name">
      <label for="age">年龄：</label>
      <input v-model="data.age" name="age">
      <button type="text" @click="sub">提交</button>
    </div>
  </div>
</template>
<script>
import Header from '../base/Header'
import { 
  getDetail,
  updatePerson,
} from '../api'
export default {
  components: {
    Header,
  },
  data() {
    const pid = this.$route.params.pid
    return {
      title: '详情',
      data: {
        name: '',
        age: null,
        id: null,
      },
      pid,
    }
  },
  mounted() {
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
  },
  methods: {
    sub() {
      updatePerson(this.pid,this.data).then(res => {
        // getDetail(this.pid).then(res => {
        //   this.data = res
        // })
        this.$notify('提交成功！',{
          delay: 1000
        })
        this.$router.push('/home')
      })
    }
  },
  created() {
    getDetail(this.pid).then(res => {
      this.data = res
    })
  }
}
</script>


