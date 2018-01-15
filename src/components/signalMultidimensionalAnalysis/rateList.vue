
<!--频率列表-->
<template>
  <el-container class='rate_container'>
    <el-header height='30' class='headerTitle'>
        <span>
        <img :src="icon_right_arrow" alt="right icon">
        频率列表
        </span>
    </el-header>
    <div class='main-title'>
        <span class='title_item'>频率(MHz)</span>
        <span class='title_item'>带宽(KHz)</span>
        <span class='title_item'>信号覆盖率</span>
        <span class='title_item'>频率性质</span>
    </div>
    <el-main class='cover_default'>
        <list :data='data'></list>
    </el-main>
    <el-footer height='40px' class="footer">
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import * as Global_ from "assets/js/global";
import List from "base/listDetail";
export default {
  components: {
    List
  },
  props:{
    data:{
      type:Array
    }
  },
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
    };
  }
};
</script>
<style>
.rate_container {
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
  height: 228px;
  /* margin: 0.5em 0 0.5em 0.5em; */
  /* padding: 0.5em 0 0 0; */
}
.rate_container .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.rate_container .cover_default {
  padding: 0 1em;
}
.rate_container .main-title {
  width: 100%;
  display: flex;
  color: #fff;
  /* position: relative; */
  padding: 0.5em 0;
}
.rate_container .title_item {
  width: 25%;
  text-align: center;
}
.rate_container .footer{
    text-align: center;
}
.rate_container .el-pagination .btn-next, .el-pagination .btn-prev,.el-pagination button.disabled{
  color: #fff;
}
.rate_container .el-pagination button.disabled, .el-pager li, .el-pager li.active, .el-pager,.el-pagination .btn-next, .el-pagination .btn-prev{
  background: transparent;
}
.rate_container .el-pager li{
  font-size: 16px;
  color:#fff;
}
.rate_container .el-pager li:hover{
  color:#fdff35;
}
.rate_container .el-pager li.active{
  color:#fdff35;
}
::-webkit-scrollbar {
  display: none;
}
</style>
