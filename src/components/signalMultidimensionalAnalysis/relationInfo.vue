<!--频率38.5MHz相关信息-->
<template>
  <div class='relationInfo'>
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
        <div class='cover_default'>
            <el-row :gutter="20">
                <el-col class="subTitle">
                    附近固定站
                </el-col>
            </el-row>
            <el-row :gutter="0" style="overflow:auto; height: 50px;">
                <el-col :span="8" class="col_flex" v-for="(item,index) in stationInfo.around_station" :key="index">
                    <a href="javascript:;" class="clickable_col">{{ item.name }}</a>
                </el-col>
            </el-row>
        </div>
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
  .relationInfo .headerTitle {
        color: #4fdaff;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
    }
    .relationInfo {
        height: 250px;
        border: 1px solid #4fdaff;
        background: rgba(0,0,0,0.2);
    }
    .relationInfo .unit_info{
        margin-left: 30px;
    }
    .relationInfo .cover_default {
        margin-left: 30px;
        margin-top: 10px;
    }
    .relationInfo .col_flex{
        padding: 10px 10px 0 0;
        color: #fff;
    }
    .relationInfo .subTitle{
        color:#4fdaff;
        font-size: 15px;
    }
    .relationInfo .clickable_col{
        text-decoration: underline;
        color: #fdff35 !important;
    }
</style>
