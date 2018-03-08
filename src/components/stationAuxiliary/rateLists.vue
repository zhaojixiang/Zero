<!-- 已使用频率 未使用频率 -->
<template>
  <section>
      <el-container class="auxiliary_list">
        <div class='headerTitle'>
            <!--<span style="margin-right: 10px">-->
                <!--<img :src="icon_right_arrow" alt="right icon">-->
                <!--{{header_title}}-->
            <!--</span>-->
          <el-tabs v-model="title_click" type="card" @tab-click="handleClick" style="height: 40px;">
            <el-tab-pane label="已使用频率" name="1"></el-tab-pane>
            <el-tab-pane label="未使用频率段" name="2"></el-tab-pane>
          </el-tabs>
          <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
        </div>
        <div class='main-title' v-show="title_click=='1'">
            <span class='title_item'>频率(MHz)</span>
            <span class='title_item'>带宽(KHz)</span>
            <span class='title_item'>信号覆盖率</span>
            <span class='title_item'>频率性质</span>
        </div>
        <el-main style="padding: 0 7px;">
            <list @itemClick="itemClick" :data='pageData'></list>
        </el-main>
        <el-footer height='40px' class="footer">
            <el-pagination :current-page="currentPage" @current-change="changePage"
                layout="prev, pager, next"
                :total="data.length">
            </el-pagination>
        </el-footer>
      </el-container>
  </section>
</template>
<script>
import List from 'base/listDetail'
export default {
  data() {
      return {
        title_click:'1',
        currentPage:1,
        pageData:[],
      }
  },
  props:['data'],
  computed: {
      header_title() {
          return this.title_click=='1'?'已使用频率':'未使用频率段'
      },
      icon_right_arrow() {
          return this.$const.right_arrow
      }
  },
  methods:{
    handleClick() {
      this.$emit('changeUseRate',this.title_click)
    },
    changePage(page){
      this.currentPage = page;
      let offset = (this.currentPage-1)*10;
      if((offset+10) < this.data.length) {
        this.pageData = this.data.slice(offset,offset+10);
      } else {
        this.pageData = this.data.slice(offset);
      }
    },
    minus(){
      this.$emit('minus');
    },
    itemClick(item){
      this.$emit('itemClick',item);
    }
  },
  components:{
      List
  },
  mounted(){
    this.changePage(this.currentPage);
  },
  watch:{
    data:function(val){
      if(val.length>0){
        this.changePage(1);
      }
    }
  },
}
</script>
<style>
.auxiliary_list {
  height: 380px;
  /* width: 400px; */
  /*overflow: hidden;*/
  border: 1px solid #4fdaff;
  background: #FEFEFE;
}
.auxiliary_list .headerTitle {
  color: #4fdaff;
  /* display: flex;
  justify-content: space-between; */
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  /* border-bottom: solid 1px #dfe4ed; */
}
.auxiliary_list .headerTitle .right_click_title{
    color:yellow;
    text-decoration: underline;
    cursor: pointer;
}
.auxiliary_list .main-title {
  width: 94%;
  margin: 0 auto;
  display: flex;
  padding: 0.5em 0;
}
.auxiliary_list .footer{
    text-align: center;
}
.auxiliary_list .title_item {
  width: 25%;
  text-align: center;
}
.auxiliary_list .el-pagination button.disabled,.auxiliary_list .el-dialog, .el-pager li,.auxiliary_list .el-pagination .btn-next,.auxiliary_list .el-pagination .btn-prev{
  background: none;
  color: #88898A;
}
</style>
