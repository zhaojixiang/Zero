<!-- 频谱评估分析 -->
<template>
  <section id="analyse">
    <!-- 头部导航 -->
    <nav1/>
    <section class="container">
      <!-- 切换功能组件 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 相关分析 -->
          <analyseForm :options='options' @Analyse='Analyse' class="analyseForm"/>
          <!-- 固定站列表 和 频率覆盖率 -->
          <section class="table">
            <p class="table1 channelInfo" @click="showChannelInfo">{{channel_rate}}</p>
            <p class="table1" @click="toggles">{{right_title}}</p>
            <paging @tabCheck='tabCheck' :timePeriod='timePeriod' :pagingLoading='pagingLoading' :loading='loading' :mainTitle='main_title' :keyData='keyData' :valueData='valueData' :columns="columns" :data="datas" :transactionBarData="transactionBarData" :highchartData='highchartData' @searchCurrent='searchCurrent' @openHour='openHour' v-if="showList"/>
            <tab v-else :nearlyStaions='nearlyStaions' @currentClick='currentClick' :tabData='tabData' class="tab_style"></tab>
          </section>
        </el-col>
        <el-col :span="16" style="padding-left:0px;padding-right:0px;">
          <!-- 总览 -->
          <overview :BarLoading='BarLoading' :PieLoading='PieLoading' :valueData='value_data' :keyData='key_data' :ratioPieOption='ratioPieOption' :rateCover='rateCover'></overview>
          <section class="map_change_wrap">
            <!-- 信道频谱地图-信道能量轨迹-信道网格优化占用度 切换按钮 -->
            <change class="change_check" @energyCircle='energyTrace' @frequencyMap='frequencyMap'></change>
            <!-- 地图控件 -->
            <map1 ref="map" @showLine='showLine' style="height:400px;margin-top:10px;"></map1>
            <!-- 能量轨迹 点击每个点弹出的频谱图 -->
            <el-container class="line_style" v-show="line_show">
              <el-header height='30'>
                <span class="main_title">频谱图</span>
                <i class="fa fa-times close_icon" @click="showLine"></i>
              </el-header>
              <el-main>
                <!-- 大型折线图 -->
                <highchart-line :options='bigLine'></highchart-line>
              </el-main>
            </el-container>
          </section>
        </el-col>
      </el-row>
    </section>
  </section>
</template>
<style scoped>
.container {
  width: 98%;
  height: 100%;
  /* margin: auto; */
  padding: 10px;
  /* margin-top: 20px; */
  position: relative;
}
.map_change_wrap {
  position: relative;
}
.map_change_wrap .change_check {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}
.map_change_wrap .line_style {
  position: absolute;
  top: 12px;
  background-color: #5195d1;
  z-index: 999;
}
.main_title {
  display: block;
  /* margin: 0 auto; */
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}
.close_icon {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 15px;
}
.el_main {
  padding: 0 20px 20px;
}
#analyse {
  color: #ffffff;
  /* height: 1200px; */
}
#analyse .left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.analyseForm {
  /* position: absolute; */
  width: 100%;
  /* background: #4fdaff; */
}
.tab_style {
  margin-top: 10px;
}
.filBox {
  width: 90%;
  margin: 20px auto 0px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.table {
  /* min-width: 450px; */
  height: 490px;
  margin-top: 10px;
  /* padding-right: 10px; */
  z-index: 999;
  border: solid 1px #33ccff;
  position: relative;
}
.over_view {
  position: relative;
  /* width: 600px; */
  left: 400px;
  top: 300px;
}
#analyse .table .table1 {
  color: #fdff35;
  font-size: 14px;
  text-decoration: underline;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  z-index: 99;
}
.table .channelInfo {
  right: 110px !important;
}
#analyse .right {
  width: 890px;
  height: 800px;
  position: relative;
}
/*#filtrate .right .spe{*/
/*width: 90%;*/
/*}*/
.tabbar {
  width: 98.5%;
  position: absolute;
  z-index: 1000;
  top: 0px;
  left: 20px;
}
</style>
<script>
import { menuShowMixin } from "assets/js/mixin";
import nav1 from "components/equipmentControl/common/Nav1.vue";
import analyseForm from "components/analyse/analyseForm.vue";
import change from "components/stationManage/change.vue";
import spectra from "components/stationManage/spectraBar.vue";
import map1 from "components/equipmentControl/facilitiesCondition/overview/leaflet.vue";
import VueDraggableResizable from "components/common/draggable";
import GetRatioPieOption from "assets/js/chartOptions/ratioPieOption";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import normalizeBarVariable from "assets/js/chartOptions/barVariable";
import normalize from "assets/js/chartOptions/highchartsOptions";
import nomarlizeLine from "assets/js/chartOptions/highchartLineOption";
import highchartOption from "assets/js/chartOptions/highchartOption";
import Overview from "components/analyse/overview";
import paging from "components/dataReplay/paging.vue";
import Tab from "components/stationManage/tab";
import HighchartLine from "base/highchartLine";
import * as JsonData from "assets/json/geo";
export default {
  data() {
    return {
      select1: true,
      title_click: false,
      line_show: false,
      datas: [],
      columns: 4,
      ratioPieOption: {},
      rateCover: {},
      showList: true,
      transactionBarData: {},
      highchartData: {},
      checkedStationInfo: {},
      bigLine: {},
      nearlyStaions: [],
      energyTraceData: [],
      key_data: [],
      keyData: [],
      options: [],
      value_data: [],
      valueData: [],
      key_arr: [],
      val_arr: [],
      timePeriod: [],
      tabData: [],
      loading: false,
      PieLoading: false,
      BarLoading: false,
      pagingLoading: false
    };
  },
  watch: {
    main_title(val, oldVal) {
      //   console.log(val)
      if (val === "频率列表") {
        this.columns = 4;
        this._getRateList();
      } else {
        this.columns = 2;
        this._getFixedStationList();
      }
    },
    showList(val) {
      if (!val) {
        this._getNearbyStationOfSelectedChannel();
        this._getChannelUsage();
      }
    }
  },
  computed: {
    right_title() {
      return this.title_click ? "频率列表" : "固定站列表";
    },
    main_title() {
      return this.title_click ? "固定站列表" : "频率列表";
    },
    channel_rate() {
      return this.showList ? "信道使用情况" : "频率列表";
    }
  },
  components: {
    nav1,
    analyseForm,
    Overview,
    map1,
    change,
    spectra,
    VueDraggableResizable,
    Tab,
    paging,
    HighchartLine
  },
  mixins: [menuShowMixin],
  mounted() {
    this.initPagesData();
  },
  methods: {
    toggles: function() {
      //   console.log("rate or station: ", this.right_title);
      this.title_click = !this.title_click;
      this.showList = true;
    },
    // 单点固定站 查看信息
    searchCurrent(item) {
      //   console.log("search this item: ", item);
      sessionStorage.setItem("station_info", JSON.stringify(item));
      this._getChannelUsed();
    },
    // 执行分析
    Analyse() {
      this._getRateCover();
      this._getPieChartData();
      this._getRateList();
      this._getNearlyStationInfo();
    },
    // 查询有数据的天数后再-显示大型热力图
    openHour() {
      // console.log('=============',val)
      if (this.highchartHeight) this._getDaysOfTimePeriod();
    },
    // popover 中的 时间切换 以 获取大型热力图对应的数据
    tabCheck(val) {
      // console.info('==========',val)
      this._getBigHeatMapData(val);
    },
    // 当前tab被选中点击
    currentClick(val) {
      // console.log('currentClick: ',val)
      let { value } = val;
      this._getNearbyStationOfSelectedChannel(value);
    },
    // 点击触发频谱图显示隐藏
    showLine(val) {
      let { _latlng } = val;
      // console.log("showLine", _latlng);
      this._getTraceSpertrum(_latlng);
      this.line_show = !this.line_show;
    },
    // 能量轨迹
    energyTrace(val) {
      let param = {
        CID: this.$const.CID,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME,
        Area: this.$const.AREA
      };
      this.$api.spectrumEvaluation.GetTrace(param).then(res => {
        let { data, success, msg } = res;
        this.energyTraceData = [];
        if (success) {
          this.$message({
            type: "success",
            message: msg
          });
          if (data.position_Powers.length) {
            data.position_Powers.forEach(item => {
              let { position, power } = item;
              this.energyTraceData.push({
                Lng: position.x,
                Lat: position.y,
                Value: power
              });
            });
            // console.log('energyTraceData',this.energyTraceData)
            this.$refs.map.energyCircle(this.energyTraceData, val);
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      });
    },
    // 频谱地图(没有接口)
    frequencyMap(val) {
      this.$refs.map.frequencyMap(JsonData, val);
    },
    // 信道使用情况处理事件
    showChannelInfo() {
      //   console.log(this.channel_rate)
      if (this.channel_rate === "频率列表") {
        this.showList = true;
        this.title_click = false;
      } else {
        // 信道使用情况
        this.showList = false;
        this.title_click = false;
      }
    },
    initPagesData() {
      this._getRateList();
      this._getRateCover();
      this._getPieChartData();
      this._getAllPartData();
      this._getNearlyStationInfo();
    },
    // 业务频段数据获取
    _getAllPartData() {
      this.$api.spectrumEvaluation.GetBusinessBand().then(res => {
        // console.log("all part data: ", res);
        this.options = [];
        let { data, success } = res;
        if (success) {
          if (data.length) {
            data.forEach((item, index) => {
              this.options.push({
                value: index,
                label: item
              });
            });
          }
        }
      });
    },
    // 获取频率覆盖率-柱状图
    _getRateCover() {
      this.BarLoading = true;
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID:this.$const.CID,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME
      };
      this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
        this.BarLoading = false;
        let { data, success } = res;
        if (success) {
          this.key_data = Object.keys(data.freq_covers);
          this.value_data = Object.values(data.freq_covers);
          if (this.value_data.length) {
            this.rateCover = normalizeBarVariable({
              dataAxis: this.key_data,
              data: this.value_data,
              title: "移动站---信号覆盖率"
            });
          }
          // console.log("rateCover: ", this.rateCover);
        }
      });
    },
    // 获取饼状图数据
    _getPieChartData() {
      this.PieLoading = true;
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID:this.$const.CID,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME
      };
      this.$api.spectrumEvaluation.GetGrid.GetRangeOfGrid(param).then(res => {
        let { data, success } = res;
        this.PieLoading = false;
        if (success) {
          let key_data = Object.keys(data.netOccuyDistributeValue);
          let value_data = Object.values(data.netOccuyDistributeValue);
          if (value_data.length) {
            let val_data = [];
            value_data.forEach((item, index) => {
              val_data.push({
                value: item,
                name: key_data[index]
              });
            });
            //信号使用情况比例
            this.ratioPieOption = GetRatioPieOption({
              key_data,
              value_data: val_data,
              title: "移动站---网格化频段占用度覆盖率"
            });
          }
        }
      });
    },
    // 获取频率覆盖率列表
    _getRateList() {
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID:this.$const.CID,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME
      };
      this.$api.spectrumEvaluation.GetSignalCalculate(param).then(res => {
        let { data, success } = res;
        this.datas = [];
        if (success) {
          // console.log("rate", res);
          let arr = Object.values(data.mSignals);
          if (arr.length) {
            let arr_ = [];
            arr.forEach(item => {
              arr_ = arr_.concat(item);
            });
            arr_.forEach(item => {
              let { mSignalType, mFreq, mCover, mBand } = item;
              this.datas.push({
                rate: mFreq,
                band_width: mBand,
                rate_cover: `${mCover.toFixed(2)}%`,
                natrue:
                  mSignalType === 0
                    ? "合法"
                    : mSignalType === 1
                      ? "非法"
                      : mSignalType === 2 ? "违规" : "登记未使用"
              });
            });
          }
          //   console.log('rate list: ',this.datas)
        }
      });
    },
    // 获取固定站列表及频段占用度
    _getFixedStationList() {
      this.pagingLoading = true;
      this.datas = [];
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID: this.$const.CID,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME
      };
      this.$api.spectrumEvaluation.StationAndCover.GetStation(param).then(
        res => {
          this.pagingLoading = false;
          //   console.log("fixed list :", res);
          let { data, success } = res;
          if (success) {
            let data_arr = Object.values(data);
            if (data_arr.length) {
              data_arr.forEach((item, index) => {
                let { station, m_Channel } = item;
                this.datas.push({
                  station_name: station.stationName,
                  part_cover: `${m_Channel}%`,
                  station_info: station
                });
              });
            }
          }
        }
      );
    },
    // 获取信道占用度
    _getChannelUsed() {
      this.loading = true;
      let { station_info } = JSON.parse(sessionStorage.getItem("station_info"));
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID: this.$const.CID,
        SID: station_info.stationNumber,
        BusinessBand: business ? business.value : this.$const.BUSINESS_BAND,
        StartTime: business ? business.start_date : this.$const.START_TIME,
        StopTime: business ? business.end_date : this.$const.END_TIME
      };
      this.$api.spectrumEvaluation.StationAndCover.GetChannelOfStation(
        param
      ).then(res => {
        let { success, data, msg } = res;
        this.loading = false;
        if (success) {
          this.keyData = Object.keys(data.freq_ChannelOccupys);
          this.valueData = Object.values(data.freq_ChannelOccupys);
          this.transactionBarData = normalizeBarVariable({
            dataAxis: this.keyData,
            data: this.valueData
          });
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      });
    },
    // 某个固定站在指定时断段内的数据天数
    _getDaysOfTimePeriod() {
      let { station_info } = JSON.parse(sessionStorage.getItem("station_info"));
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID: this.$const.CID,
        SID: station_info.stationNumber,
        BusinessBand: business ? business.value : this.$const.BUSINESS_BAND,
        StartTime: business ? business.start_date : this.$const.START_TIME,
        StopTime: business ? business.end_date : this.$const.END_TIME
      };
      // console.log('GetDaysOfTimePeriod: ',param)
      this.$api.spectrumEvaluation.StationAndCover.GetDaysOfTimePeriod(
        param
      ).then(res => {
        let { success, data, msg } = res;
        if (success) {
          if (data.length > 0) {
            this.timePeriod = data.map(item =>
              item.split(" ")[0].replace(/\//g, "-")
            );
            // console.log('GetDaysOfTimePeriod: ',this.timePeriod[0])
            this._getBigHeatMapData(this.timePeriod[0]);
          }
          // console.log(this.timePeriod)
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      });
    },
    // 获取大型热力图的数据
    _getBigHeatMapData(val) {
      let { station_info } = JSON.parse(sessionStorage.getItem("station_info"));
      let session = sessionStorage.getItem("business");
      let business = session !== null ? JSON.parse(session) : "";
      let param = {
        CID:this.$const.CID,
        SID: this.$const.station_info.stationNumber,
        BusinessBand: this.$const.BUSINESS_BAND,
        StartTime: this.$const.START_TIME,
        StopTime: this.$const.END_TIME
      };

      this.$api.spectrumEvaluation.StationAndCover.GetWaterfallPlot(param).then(
        res => {
          let { success, data, msg } = res;
          if (success) {
            let data_arr = Object.entries(data.channelOccupyDatas);
            let value_arr = [];
            if (data_arr.length) {
              data_arr.forEach(item => {
                let freq = item[0];
                let arr = item[1];
                arr.forEach((it, idx) => {
                  value_arr.push({
                    x: freq,
                    y: idx,
                    value: it
                  });
                });
              });
              this.highchartData = normalize(value_arr);
            }
          } else {
            this.$message({
              type: "warning",
              message: msg
            });
          }
        });
	},
  }
};
</script>
