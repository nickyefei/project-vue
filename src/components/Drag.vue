<template>
  <div>
    <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
      <div class="hidden-columns">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header">
          <colgroup>
            <col name="el-table_1_column_1" width="180">
            <col name="el-table_1_column_2" width="180">
            <col name="el-table_1_column_3" width="189">
            <col name="gutter" width="">
          </colgroup>
          <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_1_column_1 is-leaf">
                <div class="cell">日期</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_2 is-leaf">
                <div class="cell">姓名</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_3 is-leaf">
                <div class="cell">地址</div>
              </th>
              <th class="gutter" style="width: 0px;"></th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="el-table__body-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
          <colgroup>
          <col name="el-table_1_column_1" width="180">
          <col name="el-table_1_column_2" width="180">
          <col name="el-table_1_column_3" width="189">
          </colgroup>
          <tbody>
            <tr class="el-table__row" v-for="item in tableData" :key="item.date">
                <td class="el-table_1_column_1">
                  <div class="cell">{{ item.date }}</div>
                </td>
                <td class="el-table_1_column_2">
                  <div class="cell">{{ item.name }}</div>
                </td>
                <td class="el-table_1_column_3">
                  <div class="cell">{{ item.address }}</div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

    <router-link :to="{name: 'ChildDrag'}" tag="button">childDrag</router-link>
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';

export default {
  components: {
    draggable,
    Sortable
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1511 弄'
      }, {
        date: '2016-05-02',
        name: '张小马',
        address: '上海市普陀区金沙江路 1512 弄'
      }, {
        date: '2016-05-03',
        name: '陈小狮',
        address: '上海市普陀区金沙江路 1513 弄'
      }, {
        date: '2016-05-04',
        name: '喵小鱼',
        address: '上海市普陀区金沙江路 1514 弄'
      }]
    }
  },
  mounted() {
    let el = document.getElementsByTagName('tbody')[0];
    let sortable = Sortable.create(el, {
      onEnd: (evt) => {
        console.log('拖拽完成')
      }
    })
    // const timer = setInterval(() => {
    //   this.sec += 1    
    // }, 1000)
  },
  methods: {
    showTip() {
      this.$notify('这是传入的提示',{
        delay: 500
      })
    },
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>
