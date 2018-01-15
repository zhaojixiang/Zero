<!-- 信号多维分析 -->
<template>
  <section class="multidimensional">
    <!-- 导航栏 -->
    <nav1 @export='exportList'></nav1>
    <section style="width: 98%;margin: 0 auto;">
      <el-row  :gutter="20" class="clear_bottom_margin20">
          <el-col :span="7" class="multiLeftContent">
            <!-- 相关分析 -->
            <analysis-relevant></analysis-relevant>
            <!-- 频率列表 -->
            <rate-list :data='rateListData' style="margin-top:10px;"></rate-list>
          </el-col>
          <!-- 地图 -->
          <el-col :span="10">
            <leaflet style='height:570px;margin-top:10px;'></leaflet>
          </el-col>
          <el-col :span="7">
            <!-- 频段占用度 -->
            <part-cover :rateCover='ratePartCover' style="margin-top:10px; margin-bottom:10px;"></part-cover>
            <!-- 频率相关信息 -->
            <relation-info style="height:237px;" :stationInfo='stationInfo'></relation-info>
          </el-col>
      </el-row>
      <el-row :gutter="20" class='clear_bottom_margin20 clear_bottom'>
          <!-- 信道占用度 -->
          <el-col :span="24">
            <channel-use :transactionBarData="transactionBarData" :highchartData='highchartData'></channel-use>
          </el-col>
      </el-row>
    </section>
  </section>
</template>
<script>
import nav1 from "components/equipmentControl/common/Nav1";
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet";
import ChannelUse from "components/signalMultidimensionalAnalysis/channelUse";
import RateList from "components/signalMultidimensionalAnalysis/rateList";
import PartCover from "components/signalMultidimensionalAnalysis/partCover";
import RelationInfo from "components/signalMultidimensionalAnalysis/relationInfo";
import AnalysisRelevant from "components/signalMultidimensionalAnalysis/analysisRelevant";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import highchartOption from "assets/js/chartOptions/highchartOption";
import { menuShowMixin } from "assets/js/mixin";

export default {
  mixins: [menuShowMixin],
  data() {
    return {
      rateListData: [],
      ratePartCover: {},
      transactionBarData: {},
      highchartData: {},
      stationInfo:{}
    };
  },
  methods: {
    // 头部导航 导出数据
    exportList() {
      console.log("export list in signalMultidimensionalAnalysis");
    },
    // 执行分析
    do_analysis(param) {
      // console.log('Data from son: ' , param)
      this.$message({
        type:'success',
        message:`Data from son:${JSON.stringify(param)}`
      })
    },
    // 初始化数据
    initPagesData() {
      this._getRateListData();
      this._getPartCover();
      this._getChannelUsed();
      this._getCompanyInfo()
    },
    // 获取频率列表数据
    _getRateListData() {
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
    // 获取频段占用度
    _getPartCover() {
      this.$http.get("api/GetRatePartCover").then(res => {
        this.ratePartCover = normalizeBarOption({
          title: "频段占用度",
          series_data: res.data,
          xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["频段占用度"]
        });
      });
    },
    // 获取信道占用度
    _getChannelUsed() {
      this.$http.get("api/GetChannelUsed").then(res => {
        this.transactionBarData = normalizeBarOption({
          title: "",
          series_data: res.data.data1,
          xAxis_data: [],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["频率"],
          legend_right: '82%'
        });
        this.highchartData = highchartOption( {
              title:'信道占用度',
              series_data:res.data.data2,
              xAxis_data:[],
              title_offset:'0px',
              title_top:'left',
              series_color:['#ff8b35'],
              title_color:'#4fdaff',
              legend_data:['信道占用度']
            });
      });
    },
     // 获取台站信息和附近台站
    _getCompanyInfo() {
        this.$http.get("api/GetCompanyInfo").then(res => {
            console.log(res.data)
            this.stationInfo = res.data
        });
    }
  },
  mounted() {
    this.initPagesData();
  },
  components: {
    ChannelUse,
    RateList,
    PartCover,
    RelationInfo,
    AnalysisRelevant,
    nav1,
    Leaflet
  }
};
</script>
<style>
  .multiLeftContent{
    margin-top: 10px;
    height: 570px;
    /* height: 630px; */
    /* display: flex;
    justify-content: space-between;
    flex-direction: column; */
  }
</style>
