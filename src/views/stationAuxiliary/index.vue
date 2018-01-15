<!-- 台站辅助选址 -->
<template>
  <section>
      <!-- 头部导航 -->
    <nav1 @export='exportList'></nav1>
    <section style="width: 98%; margin: 0 auto;">
      <el-row :gutter="10">
          <el-col :span="7">
            <!-- 相关分析 -->
              <relevant></relevant>
              <!-- 已使用频率 -->
              <rate-lists @changeUseRate='changeUseRate' :data='rateListData'></rate-lists>
          </el-col>
          <el-col :span="10">
              <leaflet style='height:552px;margin-top:10px;'></leaflet>
          </el-col>
          <el-col :span="7">
            <!-- 频率相关信息 -->
              <relation-info :stationInfo='stationInfo'></relation-info>
              <!-- 自由仿真分析 -->
              <free-analysis></free-analysis>
          </el-col>
      </el-row>
      <el-row :gutter="20" class='clear_bottom_margin20 clear_bottom'>
        <!-- 信道占用度 -->
          <channel :spectraBarOption='spectraBarOption'></channel>
      </el-row>
    </section>
  </section>
</template>
<script>
import nav1 from "components/equipmentControl/common/Nav1";
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet";
import RelationInfo from "components/stationAuxiliary/relationInfo"
import Relevant from "components/stationAuxiliary/relevant"
import FreeAnalysis from "components/stationAuxiliary/freeAnalysis"
import RateLists from "components/stationAuxiliary/rateLists"
import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
import { menuShowMixin } from "assets/js/mixin";
import Channel from 'components/stationAuxiliary/channelUsedAndRateTrend'

export default {
    mixins:[menuShowMixin],
    data() {
        return {
            spectraBarOption:{},
            rateListData:[],
            stationInfo:{}
        }
    },
    methods:{
        // 导出数据
        exportList() {
            // console.log("export list in signalMultidimensionalAnalysis");
            this.$message({
                type:'warning',
                message:'暂时不支持导出'
            })
        },
        // 执行分析
        do_analysis(param) {
            // console.log(param);
            this.$message({
                type:'success',
                message:`Data from son: ${JSON.stringify(param)}`
            })
        },
        // 开始仿真
       starts(param) {
           console.log(param)
           this.$message({
               type:'success',
               message:`Data from son: ${JSON.stringify(param)}`
           })
       },
        // 初始化页面数据
        initData() {
            this._getChartData()
            this._getRateUsedListsData()
            this._getCompanyInfo()
        },
        // list 子组件冒泡事件触发
        changeUseRate(param) {
           this.rateListData = []
            if(param) {
                this._getRateUsedListsData()
            }else{
                this._getRateUnusedListsData()
            }
        },
        // 底部 echarts 图表数据初始化
        _getChartData() {
            this.spectraBarOption= GetSpectraBarOption();
        },
        // 已使用频率 未使用频率数据获取
        _getRateUsedListsData() {
            this.$http.get("api/GetRateList").then(res => {
                res.data.forEach(item => {
                    this.rateListData.push({
                        desc: item.rate,
                        date: item.bandWidth,
                        power: `${item.signalCover.toFixed(2)}%`,
                        signalNature: item.rateNature,
                        mark:'4'
                    });
                });
            });
        },
         // 已使用频率 未使用频率数据获取
        _getRateUnusedListsData() {
            this.$http.get("api/GetRateUnusedList").then(res => {
                res.data.forEach(item => {
                    this.rateListData.push({
                        desc: item.column1,
                        date: item.column2,
                        power: item.column3,
                        mark:'3'
                    });
                });
            });
        },
        // 获取台站信息和附近台站
        _getCompanyInfo() {
            this.$http.get("api/GetCompanyInfo").then(res => {
                // console.log(res.data)
                this.stationInfo = res.data
            });
        }
    },
    mounted() {
        this.initData()
    },
    components:{
        nav1,
        Leaflet,
        RelationInfo,
        Relevant,
        FreeAnalysis,
        Channel,
        RateLists
    }
}
</script>
<style>
.clear_bottom_margin20 {
  margin-bottom: 0;
}
.clear_bottom {
  padding-bottom: 0;
}
</style>
