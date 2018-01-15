<!-- 频率38.5MHz相关信息 -->
<template>
  <el-container class='right_container1'>
        <el-header class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">                
           频率38.5MHz相关信息</span>
        </el-header>
        <section class="right_main_top unit_info">
            <el-row :gutter="20">
                <el-col class="subTitle">
                    单位信息
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="col_flex">
                    名称：{{ stationInfo.station_name }}
                </el-col>
                <el-col :span="12" class="col_flex">
                    启用日期：
                    {{stationInfo.launch_date}}
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="col_flex">
                    发射功率：
                    {{stationInfo.out_power}}
                </el-col>
                <el-col :span="12" class="col_flex">
                    台站性质：
                    {{stationInfo.station_nature}}
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="col_flex">
                    覆盖率：
                    {{stationInfo.cover_rate}}
                </el-col>
            </el-row>
        </section>
        <el-main class='cover_default right_main_top'>
            <el-row :gutter="20">
                <el-col class="subTitle">
                    附近固定站
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8" class="col_flex" v-for="(item,index) in stationInfo.around_station" :key="index">
                    <a href="javascript:;" class="clickable_col">{{ item.name }}</a>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import * as Global_ from 'assets/js/global'

export default {
  props:{
      stationInfo:{
          type:Object
      }
  },
  data() {
      return {
          icon_right_arrow:Global_.right_arrow
      }
  }
}
</script>
<style>
    .right_container1 .headerTitle {
        color: #4fdaff;
        display: flex;
        justify-content: space-between;
    }
    .right_container1 {
        border: 1px solid #4fdaff;
        margin: 0.5em 0 0 .5em;
        padding: 0.5em 0 0 0;
    }
    .right_container1 .unit_info{
        padding: 10px;
    }
    .right_container1 .cover_default {
        padding: 0 1em;
    }
    .right_container1 .right_main_top {
        top: -39px;
        position: relative;
    }
    .right_container1 .col_flex{
        padding: 10px 10px 0 10px;
        color: #fff;
    }
    .right_container1 .subTitle{
        color:#4fdaff;
        font-size: 15px;
    }
    .right_container1 .clickable_col{
        text-decoration: underline;
        color: #fdff35 !important;
    }
</style>

