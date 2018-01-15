<!-- 已使用频率 未使用频率 -->
<template>
  <section>
      <el-container class="container_list">
        <el-header height='30' class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
                {{header_title}}
            </span>
            <span @click="changeShow" class="right_click_title">{{title_click?'未使用频率':'已使用频率'}}</span>
        </el-header>
        <div class='main-title' v-show="title_click">
            <span class='title_item'>频率(MHz)</span>
            <span class='title_item'>带宽(KHz)</span>
            <span class='title_item'>信号覆盖率</span>
            <span class='title_item'>频率性质</span>
        </div>
        <el-main>
            <list :data='data'></list>
        </el-main>
        <el-footer height='40px' class="footer">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </el-footer>
      </el-container>
  </section>
</template>
<script>
import * as Global_ from "assets/js/global";
import List from 'base/listDetail'
export default {
  data() {
      return {
        icon_right_arrow: Global_.right_arrow,
        title_click:true
      }
  },
  props:['data'],
  computed: {
      header_title() {
          return this.title_click?'已使用频率':'未使用频率'
      }
  },
  methods:{
      changeShow() {
          this.title_click = !this.title_click
          this.$emit('changeUseRate',this.title_click)
      }
  },
  components:{
      List
  }
}
</script>
<style>
.container_list {
  height: 380px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.5em 0 0 0;
}
.container_list .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
}
.container_list .headerTitle .right_click_title{
    color:yellow;
    text-decoration: underline;
    cursor: pointer;
}
.container_list .main-title {
  width: 100%;
  display: flex;
  color: #b7bdfd;
  /* position: relative; */
  padding: 0.5em 0;
}
.container_list .footer{
    text-align: center;
}
.title_item {
  width: 25%;
  text-align: center;
}
.el-pagination button.disabled,.el-dialog, .el-pager li,.el-pagination .btn-next, .el-pagination .btn-prev{
  background: none;
  color: #fff;
}
</style>
