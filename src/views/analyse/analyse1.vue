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
          <analyseForm :options='options' class="analyseForm"/>
          <!-- 固定站列表 和 频率覆盖率 -->
          <section class="table">
            <p class="table1 channelInfo" @click="showChannelInfo">{{channel_rate}}</p>
            <p class="table1" @click="toggles">{{right_title}}</p>
            <paging :mainTitle='main_title' :columns="columns" :data="datas" :transactionBarData="transactionBarData" :highchartData='highchartData' v-if="showList"/>
            <tab v-else class="tab_style"></tab>
          </section>
        </el-col>
        <el-col :span="16">
          <!-- 总览 -->
          <overview :valueData='value_data' :keyData='key_data' :ratioPieOption='ratioPieOption' :rateCover='rateCover'></overview>            
          <section class="map_change_wrap">
            <!-- 信道频谱地图-信道能量轨迹-信道网格优化占用度 切换按钮 -->
            <change class="change_check" @energy='energyTrace' @frequencyMap='frequencyMap'></change>
            <!-- 地图控件 -->            
            <map1 ref="map" @showLine='showLine' style="height:400px;margin-top:10px;margin-left:-10px;"></map1>
            <!-- 能量轨迹 点击每个点弹出的频谱图 -->
            <el-container class="line_style" v-show="line_show">
              <el-header height='30'>
                <span class="main_title">频谱图</span>
                <i class="fa fa-times close_icon" @click="showLine"></i>
              </el-header>
              <el-main>
                <!-- 大型折线图 -->
                <highchart-line></highchart-line>                
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
  width: 100%;
  height: 100%;
  margin: auto;
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
  height: 1200px;
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
  min-width: 450px;
  height: 490px;
  margin-top: 10px;
  padding-right: 10px;
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
import VueDraggableResizable from "vue-draggable-resizable";
import GetRatioPieOption from "assets/js/chartOptions/ratioPieOption";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import normalizeBarVariable from "assets/js/chartOptions/barVariable";
import highchartOption from "assets/js/chartOptions/highchartOption";
import Overview from "components/analyse/overview";
import paging from "components/dataReplay/paging.vue";
import Tab from "components/stationManage/tab";
import HighchartLine from "base/highchartLine";
import * as JsonData from "assets/json/geo";
import {
  BAND_WIDTH,
  NATRUE_LAW,
  CID,
  START_TIME,
  END_TIME,
  START_FREQ,
  STOP_FREQ,
  STEP_FREQ,
  THRES_HOLD,
  THRES_HOLD_TYPE,
  STATION_NUMBER,
  BUSINESS_BAND,
  AREA
} from "assets/js/global";
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
      energyTraceData: [],
      key_data: [],
      options:[],
      value_data: []
    };
  },
  watch: {
    main_title(val, oldVal) {
      // console.log(val,oldVal)
      if (val === "频率列表") {
        this.columns = 4;
        this._getRateList();
      } else {
        this.columns = 2;
        this._getFixedStationList();
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
      this.title_click = !this.title_click;
      this.showList = true;
    },
    // 点击触发频谱图显示隐藏
    showLine(val) {
      // console.log("showLine", val);
      this.line_show = !this.line_show;
    },
    // 能量轨迹
    energyTrace(val) {
      let param = {
        CID,
        BusinessBand: BUSINESS_BAND,
        StartTime: START_TIME,
        StopTime: END_TIME,
        Area: AREA
      };
      this.$api.spectrumEvaluation
        .GetTrace(param)
        .then(res => {
          let { data, success, msg } = res;
          if (success) {
            this.$message({
              type: "success",
              message: msg
            });
            data.positions.forEach((item, index) => {
              this.energyTraceData.push({
                Lng: item.x,
                Lat: item.y,
                Value: data.powers[index]
              });
            });
            this.$refs.map.energyCircle(this.energyTraceData, val);
          } else {
            this.$message({
              type: "warning",
              message: msg
            });
          }
        })
    },
    // 频谱地图(没有接口)
    frequencyMap(val) {
      this.$refs.map.frequencyMap(JsonData, val);
    },
    // 信道使用情况处理事件
    showChannelInfo() {
      // console.log(this.channel_rate)
      if (this.channel_rate === "频率列表") {
        this.showList = true;
        this.title_click = false;
      } else {
        this.showList = false;
        this.title_click = false;
      }
    },
    initPagesData() {
      this._getRateList();
      this._getRateCover();
      this._getChannelUsed();
      this._getPieChartData();
      this._getFixedStationList();
      this._getAllPartData();
    },
    // 业务频段数据获取
    _getAllPartData() {
        this.$api.spectrumEvaluation.GetBusinessBand().then(res => {
          // console.log("all part data: ", res);
          let { data,success } = res
          if(success) {
            data.forEach((item,index)=>{
              this.options.push({
                value:index,
                label:item
              })
            })
          }
        })
    },
    // 获取频率覆盖率-柱状图
    _getRateCover() {
      // 接口待对接
      let param = {
        CID,
        BusinessBand: BUSINESS_BAND,
        StartTime: START_TIME,
        StopTime: END_TIME
      };
      this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
        let { data, success } = res;
        // console.log('barVariable: ',data)
        if (success) {
          this.key_data = Object.keys(data.freq_covers);
          this.value_data = Object.values(data.freq_covers);
          this.rateCover = normalizeBarVariable({
            dataAxis: this.key_data,
            data: this.value_data
          });
          // console.log("rateCover: ", this.rateCover);
        }
      });
    },
    // 获取饼状图数据
    _getPieChartData() {
      let param = {
        CID,
        BusinessBand: BUSINESS_BAND,
        StartTime: START_TIME,
        StopTime: END_TIME
      };
      this.$api.spectrumEvaluation.GetGrid.GetRangeOfGrid(param).then(res => {
        let { data, success } = res;
        if (success) {
          let key_data = Object.keys(data.netOccuyDistributeValue);
          let value_data = Object.values(data.netOccuyDistributeValue);
          let val_data = [];
          value_data.forEach((item, index) => {
            val_data.push({
              value: item,
              name: key_data[index]
            });
          });
          //信号使用情况比例
          this.ratioPieOption = GetRatioPieOption(key_data, val_data);
        }
      });
    },
    // 获取频率覆盖率列表
    _getRateList() {
      let param = {
        CID,
        BusinessBand: BUSINESS_BAND,
        StartTime: START_TIME,
        StopTime: END_TIME
      };
      this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
        let { data, success } = res;
        this.datas = [];
        if (success) {
          // console.log("rate", res);
          let arr = Object.entries(data.freq_covers);
          arr.forEach(item => {
            let [rate, band_width] = item;
            this.datas.push({
              rate: rate,
              band_width: BAND_WIDTH,
              rate_cover: `${band_width.toFixed(2)}%`,
              natrue: NATRUE_LAW
            });
          });
        }
      });
    },
    // 获取固定站列表
    _getFixedStationList() {
      this.datas = [];
      let param = {
        CID,
        BusinessBand: BUSINESS_BAND,
        StartTime: START_TIME,
        StopTime: END_TIME
      };
      this.$api.spectrumEvaluation.StationAndCover
        .GetStation(param)
        .then(res => {
          console.log("fixed list :", res);
          // res.data.forEach(item => {
          //   this.datas.push({
          //     station_name: item.station_name,
          //     part_cover: `${item.part_cover.toFixed(2)}%`
          //   });
          // });
        });
    },
    // 获取信道占用度
    _getChannelUsed() {
      this.$http.get("api/GetChannelUsed").then(res => {
        this.transactionBarData = normalizeBarOption({
          title: "信道占用度",
          series_data: res.data.data1,
          xAxis_data: [],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
        this.highchartData = highchartOption({
          title: "信道占用度",
          series_data: res.data.data2,
          xAxis_data: [],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
      });
    }
    // 信道使用情况(接口修改中 暂无)
    // _getChannelUsed() {
    //   let param = {
    //     CID
    //   }
    //   this.$api.spectrumEvaluation.GetChannel(param).then(res=>{
    //     // console.log('channel: ',res)
    //   })
    // },
  }
};
</script>
