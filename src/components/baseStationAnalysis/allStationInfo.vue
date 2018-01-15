<template>
    <el-container class="wrapper">
        <el-header class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
            所有基站信息</span>
            <span >
            <el-radio-group v-model="radio">
                <el-radio :label="1" style='color:#fff;'>所有基站</el-radio>
                <el-radio :label="2" style='color:#fff;'>异常基站</el-radio>
                <el-radio :label="3" style='color:#fff;'>正常基站</el-radio>
            </el-radio-group>
            </span>
        </el-header>
        <el-checkbox-group v-model="checkList" class="checkBox">
            <el-checkbox :label="1">移动</el-checkbox>
            <el-checkbox :label="2">联通</el-checkbox>
            <el-checkbox :label="3">电信</el-checkbox>
            <el-checkbox :label="4">2G</el-checkbox>
            <el-checkbox :label="5">3G</el-checkbox>
            <el-checkbox :label="6">4G</el-checkbox>
        </el-checkbox-group>
        <el-row>
            <el-col :span="5" class="column_title">基站名称</el-col>
            <el-col :span="3" class="column_title">运营商</el-col>
            <el-col :span="3" class="column_title">技术体制</el-col>
            <el-col :span="3" class="column_title">制式</el-col>
            <el-col :span="5" class="column_title">启用时间</el-col>
            <el-col :span="5" class="column_title">频率范围(MHz)</el-col>
        </el-row>
        <el-main>
            <list :data='allStationInfo'></list>
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
import List from 'base/listDetail'
import * as Global_ from "assets/js/global";

export default {
    props:['allStationInfo'],
    data() {
        return {
            checkList:[1,3,6],
            icon_right_arrow:Global_.right_arrow,
            radio:1
        }
    },
    components:{
        List
    }
}
</script>
<style>
.wrapper{
    border:1px solid #4fdaff;
}
.wrapper .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
 .wrapper .column_title{
     text-align: center;
     color:#b7bdfd;
 }
.wrapper .checkBox{
    /* color:#fff; */
    padding: 10px 30px;
}
.wrapper .checkBox .el-checkbox{
    color:#fff;
}
.wrapper .footer{
    text-align: center;
}
.wrapper .el-pagination .btn-next, .el-pagination .btn-prev,.wrapper .el-pagination button.disabled,.el-dialog, .el-pager li{
  background: none;
  color: #fff;
}
.wrapper .el-pagination button.disabled{
  background: none;
}
</style>
