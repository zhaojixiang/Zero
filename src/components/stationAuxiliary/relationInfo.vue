<!-- 频率38.5MHz相关信息 -->
<template>
  <div class='auxiliaryInfo'>
        <div class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
           频率38.5MHz相关信息</span>
          <span class="minus" @click="close"><i class="el-icon-close i-minus"></i></span>
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
            <el-row style="margin-bottom:10px" :gutter="0">
                <el-col :span="8" class="col_flex" v-for="(item,index) in stationInfo.around_station" :key="index">
                    <a href="javascript:;" class="clickable_col">{{ item.name }}</a>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>
<script>
export default {
  props:{
      stationInfo:{
          type:Object
      }
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    close(){
      this.$emit('close');
    },
  },
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
        border-bottom: solid 1px #dfe4ed;
    }
    .auxiliaryInfo {
        border: 1px solid #4fdaff;
        background: #FEFEFE;
        width: 400px;
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
        color: #88898A;
    }
    .auxiliaryInfo .subTitle{
        color:#4fdaff;
        font-size: 14px;
        margin-top: 5px;
    }
    .auxiliaryInfo .clickable_col{
        text-decoration: underline;
        color: #88898A !important;
    }
</style>
