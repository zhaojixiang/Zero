
<!--频率列表-->
<template>
  <el-container class='rate_container'>
    <div height='30' class='headerTitle'>
        <span>
        <img :src="icon_right_arrow" alt="right icon">
        频率列表
        </span>
    </div>
    <div class='main-title'>
        <span class='title_item'>频率(MHz)</span>
        <span class='title_item'>带宽(KHz)</span>
        <span class='title_item'>信号覆盖率</span>
        <span class='title_item'>频率性质</span>
    </div>
    <div class='cover_default'>
        <list :data='data'></list>
    </div>
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
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
  height: 228px;
}
.rate_container .headerTitle {
  color: #4fdaff;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.rate_container .cover_default {
  height: 120px;
  overflow: auto;

}
.rate_container .main-title {
  width: 97%;
  display: flex;
  color: #fff;
  padding: 0.5em 10px;
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
