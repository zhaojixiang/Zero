<!-- 频率38.5MHz相关信息 -->
<template>
  <div class='auxiliaryInfo'>
        <div class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
           频率38.5MHz相关信息</span>
        </div>
        <section class="unit_info">
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
            <el-row style="height:80px;overflow:auto;margin-bottom:5px" :gutter="0">
                <el-col :span="8" class="col_flex" v-for="(item,index) in stationInfo.around_station" :key="index">
                    <a href="javascript:;" class="clickable_col">{{ item.name }}</a>
                </el-col>
            </el-row>
        </el-main>
    </div>
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
    .auxiliaryInfo .headerTitle {
        color: #4fdaff;
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding: 0 10px;
    }
    .auxiliaryInfo {
        border: 1px solid #4fdaff;
        background: rgba(0, 0, 0, 0.2);
        margin-top: 10px;
    }
    .auxiliaryInfo .unit_info{
      /* margin-left: 20px; */
      margin: 0 0 10px 31px;
        /* padding: 10px; */
    }
    .auxiliaryInfo .cover_default {
        padding: 0 1em;
    }
    .auxiliaryInfo .right_main_top {
      margin-left: 20px;
    }
    .auxiliaryInfo .col_flex{
        padding: 10px 10px 0 0px;
        color: #fff;
    }
    .auxiliaryInfo .subTitle{
        color:#4fdaff;
        font-size: 14px;
        margin-bottom: 5px;
    }
    .auxiliaryInfo .clickable_col{
        text-decoration: underline;
        color: #fdff35 !important;
    }
</style>
