<!-- 频谱评估分析 -->
<template>
<section id="analyse" v-loading="pageLoading" element-loading-text="数据加载中">
  <!-- 头部导航 -->
  <nav1 :navBarTitleShow='true' :navBarTitle='navBarTitle' />
  <section class="container">
    <!-- 侧边栏按钮 -->
    <div class="side-span">
      <span @click="checkNow(fadeChange(['analyse','analyseForm']),'analyseForm_')" style="height: 95px">相关分析</span>
      <span @click="checkNow(fadeChange(['analyse','overview']),'overview_')" v-show='sideBar_overview' style="height: 100px">移动站信息</span>
      <span @click="checkNow(fadeChange(['analyse','paging']),'paging_')" v-show='sideBar_paging' style="height: 95px">频率列表</span>
      <span @click="openTaskList" style="height: 95px">任务管理</span>
    </div>
    <!-- 地图控件 -->
    <map1 class="maps" ref="map" @showLine='showLine' @gridOccupyClick='gridOccupyClick' style="height:400px;"></map1>
    <!-- 信道频谱地图-信道能量轨迹-信道网格优化占用度 切换按钮 -->
    <change ref="change" class="changes" v-show="change_show" :isSingle='notSingle' @energyRetangle='energyRetangle' @energyCircle='energyTrace' @frequencyMap='frequencyMap'></change>
    <!-- 相关分析 -->
    <vue-draggable-resizable v-show="fade.analyse.analyseForm_" :resizable="false" :x="45" :y="5" :z="1000" :class="[fade.analyse.analyseForm?zoomInCss:zoomOutCss]">
      <i class="el-icon-minus minus-icon" @click="checkNow(fadeChange(['analyse','analyseForm']),'analyseForm_')"></i>
      <analyseForm ref="forms" :options='options' :singleData='singleData' @formsTabChange='formsTabChange' @Analyse='Analyse' @singleSub='singleSub' class="analyseForm" />
    </vue-draggable-resizable>
    <!-- 固定站列表 和 频率覆盖率 -->
    <vue-draggable-resizable v-show="fade.analyse.paging_" :resizable="false" :x="45" :y="265" :z="1000" :class="[fade.analyse.paging?zoomInCss:zoomOutCss]">
      <i class="el-icon-minus minus-icon" @click="checkNow(fadeChange(['analyse','paging']),'paging_')"></i>
      <section class="table">
        <paging :freqList='freqList' :pageSize='pageSize' :channelCount='channelCount' :stationListTotalCount='stationListTotalCount' :freqListTotalCount='freqListTotalCount' :freqListLoading='freqListLoading' :fixedStationLoading='fixedStationLoading' :channelUseLoading='channelUseLoading'
          :tweentyFourHours='tweentyFourHours' @tabCheck='tabCheck' class="paging" :nearlyStaions='nearlyStaions' :freqListEmpty='freqListEmpty' :fixedStationEmpty='fixedStationEmpty' :channelOccupyEmpty='channelOccupyEmpty' :tabData='tabData' :channelColors='channelColors'
          @tabChange='tabChange' :loading='loading' :stationList="station_list" :highchartData='highchartData' @searchCurrent='searchCurrent' @currentClick='currentClick' @freqListCurrentChange='freqListCurrentChange' @stationListCurrentChange='stationListCurrentChange'
          @moveToSingle='moveToSingle' ref='paging' />
      </section>
    </vue-draggable-resizable>
    <!-- 总览 -->
    <vue-draggable-resizable v-show="fade.analyse.overview_" :resizable="false" :x="520" :y="50" :z="1000" :class="[fade.analyse.overview?zoomInCss:zoomOutCss]">
      <i class="el-icon-minus minus-icon" @click="checkNow(fadeChange(['analyse','overview']),'overview_')"></i>
      <overview class="overview" :BarLoading='BarLoading' :PieLoading='PieLoading' :valueData='value_data' :keyData='key_data' :barMoveEmpty='barMoveEmpty' :pieMoveEmpty='pieMoveEmpty' :ratioPieOption='ratioPieOption' :rateCover='rateCover' :currentFreq='currentFreq'>
        <span slot="overview_title">{{overview_title}}</span>
      </overview>
    </vue-draggable-resizable>
    <!-- 能量轨迹 点击每个点弹出的频谱图 -->
    <vue-draggable-resizable v-show="line_show" class="map_change_wrap" :resizable="false" :x="400" :y="40" :z="1000">
      <el-container class="line_style">
        <el-header height='30'>
          <span class="main_title">频谱图<i class="fa fa-times close_icon" @click="showLine(false)"></i></span>
        </el-header>
        <el-main>
          <!-- 大型折线图 -->
          <highchart-line :options='bigLine'></highchart-line>
        </el-main>
      </el-container>
    </vue-draggable-resizable>
    <!-- 指定固定站 信道占用度 -->
    <vue-draggable-resizable v-show="fade.analyse.channel_" :resizable="false" :x="540" :y="70" :z="1000" :class="[fade.analyse.channel?zoomInCss:zoomOutCss]">
      <channel-use ref="channelUse" @closeChannel='closeChannel' @heatMapClick='_getChannelOfFreqInOneday' :timePeriod='timePeriod' @channelDateChange='channelDateChange' :loading='loading' :bigMapLoading='bigMapLoading' :specialBarFixedStationEmpty='specialBarFixedStationEmpty'
        :keyData='keyData' :transactionBarData='transactionBarData' @openHour='openHour' :highchartData='highchartData' :width='channelWidth' :channelHighchatTitle='channel_highchat_title'>
        <span slot="channel_title">{{channel_title}}</span>
      </channel-use>
    </vue-draggable-resizable>
    <!-- 24小时占度 -->
    <vue-draggable-resizable v-show="fade.analyse.tweentyFourHours_" :resizable="false" :x="540" :y="160" :z="1001" :class="[fade.analyse.tweentyFourHours?zoomInCss:zoomOutCss]">
      <section style="background:#64a6d1;box-sizing:border-box;border:1px solid #31cdff;">
        <span @click="close_spot_bar" class="minus">
						<i class="el-icon-close"></i>
					</span>
        <bar-graph :rateCover='tweentyFourHours' width='900px' height='300px'></bar-graph>
      </section>
    </vue-draggable-resizable>
    <!-- 任务管理 -->
    <vue-draggable-resizable v-show="fade.analyse.taskManage_" :resizable="false" :x="540" :y="160" :z="1001" :class="[fade.analyse.taskManage?zoomInCss:zoomOutCss]">
      <taskManage :taskManageData="allTaskList" @deleteRefresh="deleteRefresh" @refresh="refresh" @closeTaskList="closeTaskList" :taskListLoading="taskListLoading" :showTaskList="showTaskList" />
    </vue-draggable-resizable>
  </section>
</section>
</template>
<style scoped lang='less'>
@background: #fefefe;
#analyse {
    color: @background;
    .container {
        position: relative;
        .maps {
            min-height: 900px;
        }
        .changes {
            width: 40%;
            position: absolute;
            z-index: 1000;
            top: 2px;
            left: 33%;
        }
        .overview {
            background-color: @background;
        }
        .map_change_wrap {
            // position: relative;
            .line_style {
                position: absolute;
                top: 12px;
                background-color: #5195d1;
                z-index: 999;
                .main_title {
                    display: block;
                    /* margin: 0 auto; */
                    text-align: center;
                    font-size: 18px;
                    margin-top: 10px;
                    .close_icon {
                        position: absolute;
                        right: 10px;
                        top: 7px;
                        font-size: 15px;
                    }
                }
            }
        }
        .analyseForm {
            /* position: absolute; */
            width: 100%;
            background: @background;
        }
        .side-span {
            position: absolute;
            z-index: 1001;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            span {
                width: 20px;
                background: #2f74a1;
                display: inline-block;
                text-align: center;
                padding: 0 10px;
                -webkit-writing-mode: vertical-lr;
                writing-mode: vertical-lr;
                letter-spacing: 5px;
                cursor: pointer;
                border-top: solid 1px @background;
            }
        }
        .minus {
            position: absolute;
            right: 20px;
            cursor: pointer;
            z-index: 100;
            color: #2774A5;
            font-size: 20px;
            top: 15px;
        }
        .minus-icon {
            color: #2975a2;
            z-index: 1000;
            font-size: 20px;
            right: 20px;
            top: 10px;
            cursor: pointer;
            position: absolute;
        }
        .table {
            min-width: 400px;
            min-height: 440px;
            /* margin-top: 10px; */
            /* padding-right: 10px; */
            z-index: 999;
            border: solid 1px #33ccff;
            border-radius: 4px 4px 0 0;
            background-color: @background;
            position: relative;
            box-sizing: border-box;
        }
    }
}
.el_main {
    padding: 0 20px 20px;
}
</style>
<script>
import {
  menuShowMixin,
  animateMixin,
  pageLoading
} from "assets/js/mixin";
import nav1 from "components/equipmentControl/common/Nav1.vue";
import analyseForm from "components/analyse/analyseForm-new.vue";
import BarGraph from "base/barVariable";
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
import paging from "components/dataReplay/paging-new.vue";
import ChannelUse from "components/signalMultidimensionalAnalysis/channelUse";
import HighchartLine from "base/highchartLine";
import taskManage from "components/analyse/taskManage"
export default {
  data() {
    return {
      navBarTitle: "",
      singleNavTitleCache: '', // tab 切换时 单频 暂存 title
      gridNavTitleCache: '', // tab 切换时 网格 暂存 title
      overview_title: "",
      channel_title: "",
      channel_highchat_title: "",
      channelWidth: "800px",
      currentFreq: -1,
      singleData: {},
      freqListTotalCount: 0, // 频率列表-总条数
      stationListTotalCount: 0, // 固定站列表-总条数
      channelCount: 0, // 信道使用情况-信道数量
      pageSize: this.$const.pageSize, // 每页显示的数量
      select1: true,
      notSingle: true, // change 栏，是否是单频显示项 控制字段
      //   title_click: false,
      line_show: false, // 大型折线图-显示 or 隐藏
      sideBar_overview: false, // 侧边栏 - 移动站信息
      sideBar_paging: false, // 侧边栏 - 固定站列表，频率列表，信道占用度
      sideBar_task: false, // 侧边栏 - 任务管理
      change_show: false,
      clickedFlag: false, // 点击事件标志-防止快速地重复点击
      bigMapLoading: false,
      freqListEmpty: false, // 频率列表 缺省展示
      channelOccupyEmpty: false, // 信道使用情况 缺省展示
      fixedStationEmpty: false, // 固定站列表 缺省展示
      pieMoveEmpty: false, // 移动站 饼状图 缺省展示
      barMoveEmpty: false, // 移动站 柱状体 缺省 展示
      specialBarFixedStationEmpty: false, // 选定固定站 柱状图 缺省展示
      station_list: [], // 固定站列表
      freqList: [], // 频率列表
      ratioPieOption: {}, // 饼图-option
      rateCover: {}, // 信号覆盖率-柱状图-option
      showList: true,
      transactionBarData: {},
      highchartData: {},
      checkedStationInfo: {},
      bigLine: {},
      tweentyFourHours: {},
      nearlyStaions: [],
      key_data: [],
      keyData: [],
      options: [],
      value_data: [],
      timePeriod: {}, // 选定固定站 - 时间区间
      tabData: [], // 信道使用情况
      channelColors: {}, // 信道使用情况-颜色
      loading: false,
      PieLoading: false, // 移动站-饼状图 loading
      BarLoading: false, // 移动站-柱状图 loading
      channelUseLoading: false, // 信道使用情况 loading
      fixedStationLoading: false, // 固定站 loading
      freqListLoading: false, // 频率列表 loading
      allTaskList: [], //业务管理列表数据
      taskListLoading: true,
      showTaskList: false
    };
  },
  watch: {
    "fade.analyse.overview": function(val) {
      if (val) {
        if (!Object.getOwnPropertyNames(this.rateCover).length) this._getRateCover();
        if (!Object.getOwnPropertyNames(this.ratioPieOption).length) this._getPieChartData();
      }
    },
    "fade.analyse.paging": function(val) {
      if (val) {
        if (!this.freqList.length) this.getRateList();
      }
    }
  },
  components: {
    nav1,
    analyseForm,
    Overview,
    map1,
    change,
    BarGraph,
    spectra,
    ChannelUse,
    VueDraggableResizable,
    paging,
    HighchartLine,
    taskManage
  },
  mixins: [menuShowMixin, animateMixin, pageLoading],
  mounted() {
    this._getAllPartData();
  },
  methods: {
    // 单点固定站 查看信息
    searchCurrent(item) {
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      let station_name = item.station_name;
      let start_time = business.date_range[0];
      let stop_time = business.date_range[1];
      let channel = business.value ? business.value : `${business.start_freq} - ${business.stop_freq}`;
      this.channel_title = `${station_name} 在${start_time} 至 ${stop_time}的 ${channel} 信道占用度`;
      sessionStorage.setItem("station_info", JSON.stringify(item));
      this.fade.analyse.channel_ || this.checkNow(this.fadeChange(['analyse', 'channel']), 'channel_');
      this.$refs.channelUse.openHours(false);
      this.$nextTick(() => {
        this._getChannelUsed();
      })
    },
    // tab 切换 请求新的数据
    tabChange(val) {
      if (val === "频率列表") {
        if (!this.freqList.length) this.getRateList();
      } else if (val === "信道使用情况") {
        if (!this.tabData.length) this._getChannelUsage();
        // this._getNearbyStationOfSelectedChannel();
      } else if (val === "固定站列表") {
        if (!this.station_list.length) this._getFixedStationList();
      }
    },
    // 将 点击需要 隐藏的组件 的 附标记 更改，以确保 vue-VueDraggableResizable 被移除
    checkNow(callback, target) {
      // 由显示变为隐藏需要有一个缓冲时间做动画
      if (!this.clickedFlag) {
        callback;
        this.clickedFlag = true;
        if (this.fade.analyse[target]) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.fade.analyse[target] = false;
            }, 600);
          })
        } else {
          // 由隐藏变为显示则立即执行
          this.fade.analyse[target] = true;
        }
        let timer = setTimeout(() => {
          this.clickedFlag = false;
        }, 1000);
      }

    },
    // 执行分析-按钮点击 （暂无自定义频段接口）
    Analyse() {
      this.notSingle = true;
      let param;
      this.setLoading(true);
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      // 点击执行分析 - 清除地图上的所有轨迹
      this.clearPages();
      // 自定义频段
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          startTime: business.date_range[0],
          stopTime: business.date_range[1],
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          threshold: business.signal,
          thresholdType: business.checked
        }
      } else {
        // 选择频段
        param = {
          CID: this.$const.CID,
          businessBand: business.value,
          startTime: business.date_range[0],
          stopTime: business.date_range[1]
        }
      }
      // 请求执行分析接口
      this.$api.spectrumEvaluation.GetStartAnalysis(param).then(res => {
        let {
          success,
          msg
        } = res;
        if (success) {
          this.Analysis();
          console.log('enter Analyse');
        } else {
          this.$message.warning(msg);
          this.sideBar_overview = this.sideBar_paging = false;
          // this.checkNow(this.fadeChange(['analyse','overview']),'overview_');
          // this.checkNow(this.fadeChange(['analyse','paging']),'paging_');
        }
        setTimeout(() => {
          this.setLoading(false);
        }, 1000);
      }).catch(e => {
        this.setLoading(false);
      })
    },
    // 页面清除计划
    clearPages() {
      // 清除 checkbox 被选中的状态
      this.$refs.change.checkboxGroup = [];
      // 清除 网格占用度
      this.$refs.map.energyRetangle([], false);
      // 清除 能量轨迹
      this.$refs.map.energyCircle([], 0, 0, false);
      // 清除 频谱地图
      this.$refs.map.frequencyMap({
        show: false
      });
      // 大型折线图 隐藏
      this.line_show = false;
      // 清除 导航 title 和缓存title
      this.singleNavTitleCache = this.gridNavTitleCache = this.navBarTitle = '';
    },
    // 单频 Tab - 按钮点击
    singleSub(val) {
      this.clearPages();
      this.singleNavTitleCache = this.navBarTitle = `频率：${val.center_freq}MHz`;
      this.change_show = true;
      this.notSingle = false;
      this.singleSubmit(val);
    },
    singleSubmit(val) {
      // console.log(val);
      let param = {
        CID: this.$const._CID,
        startFreq: val.center_freq,
        stopFreq: val.center_freq,
        StartTime: val.date_range[0],
        StopTime: val.date_range[1],
        stepFreq: val.step
      }
      this.singleData = Object.assign({}, param, {
        threshold: val.signal,
        thresholdType: val.checked
      });
      // this._frequencyMap(param,true);
      this._getSingleSignalCover(this.singleData);
    },
    // 单频模式下 获取信号覆盖率
    _getSingleSignalCover(param) {
      this.setLoading(true);
      this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
        let {
          data,
          success,
          msg
        } = res;
        if (success) {
          if (typeof data === 'object' && data !== null) {
            this.navBarTitle = this.singleNavTitleCache += `  信号覆盖率：${data.coverageDate.toFixed(2)}%`;
          }
        } else {
          this.$message({
            type: "warning",
            message: '信号覆盖率: ' + msg
          });
        }
        setTimeout(() => {
          this.setLoading(false);
        }, 3000);
      })
    },
    // 点击 频率列表触发
    moveToSingle(param) {
      let date_range = JSON.parse(sessionStorage.getItem('businessInfomation')).date_range;
      this.singleNavTitleCache = this.navBarTitle = `频率：${param.rate}MHz 信号覆盖率：${param.rate_cover}`;
      this.$refs.forms.activeName = '5';
      this.$refs.forms.name = '单频';
      this.notSingle = false;
      this.singleData = Object.assign({}, this.singleData, {
        startFreq: param.rate,
        stopFreq: param.rate,
        stepFreq: param.band_width,
        rate_cover: param.rate_cover,
        date_range
      });
    },
    // 执行分析 - tab 页切换 改变 change的显示项
    formsTabChange(tab) {
      if (tab.label === '单频') {
        this.notSingle = false;
        this.navBarTitle = this.singleNavTitleCache;
      } else {
        this.navBarTitle = this.gridNavTitleCache;;
        this.notSingle = true;
      }
    },
    // 点击 paging 里 tab 中 的 cell 将所选的 频率下传到 barVariable 组件
    currentClick(item) {
      this.fade.analyse.overview_ = true;
      this.fadeChange(['analyse', 'overview'], true);
      this.currentFreq = item.freq;
    },
    // 预备页面显示东西
    initPage() {
      // 将 侧边栏 tab 项全部置为 true 可见
      this.sideBar_overview = this.sideBar_paging = this.change_show = true;
      // 将 三大块 v-show 初始值全部置为 true 调用方法将 隐藏 的 移动站组件 及 频率列表组件 以动画的形式展现出来
      this.fade.analyse.overview_ = this.fade.analyse.paging_ = this.taskManage_ = true;
      this.fadeChange(['analyse', 'overview'], true);
      this.fadeChange(['analyse', 'paging'], true);
      // this.fadeChange(['analyse', 'taskManage'], true);
      // 其余未显现的模块 仍置为 false
      this.fade.analyse.tweentyFourHours_ = false;
      this.fade.analyse.channel_ = false;
      this.barMoveEmpty = this.pieMoveEmpty = this.channelOccupyEmpty = this.fixedStationEmpty = this.freqListEmpty = this.specialBarFixedStationEmpty = false;
      this.tabData = [];
      this.freqList = [];
      this.station_list = [];
    },
    // 执行分析-方法调用 (complete)
    Analysis() {
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      // 执行调用默认模块的方法
      this._getRateCover();
      this._getPieChartData();
      // 预备数据和页面展示
      this.initPage();
      //初始时获取paging组件三个tab的数组
      this.getRateList();
      this._getChannelUsage();
      this._getFixedStationList();
      // 给 移动站信息 组件标题赋值
      let bandWidth = business.value ? business.value : `${business.start_freq} - ${business.stop_freq}`
      let start_time = business.date_range[0];
      let stop_time = business.date_range[1];
      this.overview_title = `${bandWidth} 在 ${start_time} 至 ${stop_time} 的网格占用度覆盖率及信号覆盖率`;
    },
    // 查询有数据的天数后再-显示大型热力图
    openHour(val) {
      if (val) this._getDaysOfTimePeriod();
    },
    // 指定固定站 选择日期之后 获取数据
    channelDateChange(val) {
      this._getBigHeatMapData(val);
    },
    // 关闭瀑布流热力图点击后弹出的柱状图
    close_spot_bar() {
      this.checkNow(this.fadeChange(['analyse', 'tweentyFourHours']), 'tweentyFourHours_');
    },
    // popover 中的 时间切换 以 获取大型热力图对应的数据
    tabCheck(val) {
      this._getBigHeatMapData(val);
    },
    // 关闭当前站点 信道占用度柱状图和热力图
    closeChannel() {
      this.checkNow(this.fadeChange(['analyse', 'channel']), 'channel_');
    },
    // 点击触发频谱图显示隐藏
    showLine(val) {
      this.line_show = !this.line_show;
      if (!val) return
      if (Object.keys(val).length) this._getTraceSpertrum(val);
    },
    // 网格占用度点击事件
    gridOccupyClick(val) {
      alert('gridOccupyClick')
    },
    // 能量轨迹 (complete)
    energyTrace(val) {
      if (!val) {
        this.line_show = false;
        this.$refs.map.energyCircle([], 0, 0, val);
      } else {
        this.setLoading(true);
        let param;
        if (this.notSingle) {
          // 自定义频段
          let session = sessionStorage.getItem("businessInfomation");
          let business = session !== null ? JSON.parse(session) : "";
          if (!business.value) {
            param = {
              CID: this.$const.CID,
              StartTime: business.date_range[0],
              StopTime: business.date_range[1],
              startFreq: business.start_freq,
              stopFreq: business.stop_freq,
              stepFreq: business.step
            }
          } else {
            // 选择频段
            param = {
              CID: this.$const.CID,
              BusinessBand: business.value,
              StartTime: business.date_range[0],
              StopTime: business.date_range[1],
              Area: this.$const.AREA
            }
          }
        } else {
          param = {
            CID: this.$const.CID,
            StartTime: this.singleData.StartTime ? this.singleData.StartTime : this.singleData.date_range[0],
            StopTime: this.singleData.StopTime ? this.singleData.StopTime : this.singleData.date_range[1],
            startFreq: this.singleData.startFreq,
            stopFreq: this.singleData.stopFreq,
            stepFreq: this.singleData.stepFreq
          }
        }
        this._energyTrace(param, val);
      }
    },
    //
    _energyTrace(param, val) {
      this.$api.spectrumEvaluation.GetTrace(param).then(res => {
        let {
          data,
          success,
          msg
        } = res;
        this.setLoading(false);
        if (success) {
          this.$message({
            type: "success",
            message: '能量轨迹：' + msg
          });
          this.$refs.map.energyCircle(
            data.position_Powers,
            data.maxPower,
            data.minPower,
            val
          );
        } else {
          this.$message({
            type: "warning",
            message: '能量轨迹：' + msg
          });
        }
      })
    },
    // 频谱地图-（complete）
    frequencyMap(val) {
      if (!val) {
        this.$refs.map.frequencyMap({
          show: val
        });
      } else {
        console.log('enter frequencymap');
        let param;
        if (this.notSingle) {
          let session = sessionStorage.getItem("businessInfomation");
          let business = session !== null ? JSON.parse(session) : "";
          // 自定义频段
          if (!business.value) {
            param = {
              CID: this.$const._CID,
              startFreq: business.start_freq,
              stopFreq: business.stop_freq,
              StartTime: business.date_range[0],
              StopTime: business.date_range[1],
              stepFreq: business.step
            }
          } else {
            // 选择频道
            let value = business.value;
            let data = value.match(/\d+/g);
            param = {
              CID: this.$const._CID,
              BusinessBand: business.value,
              StartTime: business.date_range[0],
              StopTime: business.date_range[1]
            }
          }
        } else {
          // 单频 - 请求频谱地图
          param = {
            CID: this.$const._CID,
            startFreq: this.singleData.startFreq,
            stopFreq: this.singleData.stopFreq,
            StartTime: this.singleData.StartTime ? this.singleData.StartTime : this.singleData.date_range[0],
            StopTime: this.singleData.StopTime ? this.singleData.StopTime : this.singleData.date_range[1],
            stepFreq: this.singleData.stepFreq
          }
        }
        this._frequencyMap(param, val);
      }
    },
    _frequencyMap(param, val) {
      this.setLoading(true);
      this.$api.spectrumEvaluation.StationAndCover.GetSpectrumMap(param).then(res => {
        this.setLoading(false);
        let {
          success,
          data,
          msg
        } = res;
        if (success) {
          this.$message({
            type: 'success',
            message: '频谱地图: ' + msg
          });
          this.$refs.map.frequencyMap({
            data: data.datas,
            maxPower: data.max,
            minPower: data.min,
            show: val,
            maxPosition: data.maxPosition
          });
        } else {
          this.$message.warning(`频谱地图：${msg}`)
        }
      });
    },
    // 获取频段占用度计算(网格占用度)
    energyRetangle(val) {
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!val) {
        this.$refs.map.energyRetangle([], val);
      } else {
        this.setLoading(true);
        // 自定义频段
        if (!!business && !business.value) {
          param = {
            CID: this.$const.CID,
            StartTime: business.date_range[0],
            StopTime: business.date_range[1],
            startFreq: business.start_freq,
            stopFreq: business.stop_freq,
            threshold: business.signal,
            thresholdType: business.checked
          }
        } else {
          // 选择频段
          param = {
            CID: this.$const.CID,
            BusinessBand: business.value,
            StartTime: business.date_range[0],
            StopTime: business.date_range[1]
          }
        }
        this.$api.spectrumEvaluation.GetGrid(param).then(res => {
          let {
            success,
            data,
            msg
          } = res;
          this.setLoading(false);
          if (success) {
            let {
              aNetOccuy,
              position_NetOccuys
            } = data;
            this.navBarTitle = `您所查询的频段网格化占用度为：${aNetOccuy.toFixed(2)}%`;
            this.gridNavTitleCache = this.navBarTitle;
            this.$message({
              type: 'success',
              message: '频段网格化占用度: ' + msg
            });
            this.$refs.map.energyRetangle(position_NetOccuys, val);
          } else {
            this.$message.warning(`频段网格化占用度:${msg}`);
          }
        })
      }

    },
    // 业务频段数据获取
    _getAllPartData() {
      this.$api.spectrumEvaluation.GetBusinessBand().then(res => {
        this.options = [];
        let {
          data,
          success
        } = res;
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
      this.rateCover = {};
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      // 自定义频段
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          threshold: business.signal,
          thresholdType: business.checked
        }
      } else {
        // 选择频段
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      }
      this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
        this.barMoveEmpty = this.BarLoading = false;
        let {
          data,
          success,
          msg
        } = res;
        if (success) {
          if (typeof data === 'object' && data !== null) {
            this.key_data = Object.keys(data.freq_covers);
            this.value_data = Object.values(data.freq_covers);
            if (this.value_data.length) {
              this.value_data = this.value_data.map(item => item.toFixed(2))
              this.rateCover = normalizeBarVariable({
                dataAxis: this.key_data,
                data: this.value_data,
                title: "移动站-信号覆盖率",
                xAxis_color: '#6c6c6c',
                yAxis_name: '信号覆盖率(%)',
                yAxis_color: '#6c6c6c',
                xAxis_name: '(MHz)',
                legend_data: ['信号覆盖率'],
                series_name: '信号覆盖率',
                tooltip_formatter: "{a} <br/>{b}MHz 覆盖率 : {c}%"
              });
            } else {
              this.barMoveEmpty = true;
            }
          } else {
            this.barMoveEmpty = true;
          }
        } else {
          this.barMoveEmpty = true;
          this.$message({
            type: "warning",
            message: '移动站-信号覆盖: ' + msg
          });
        }
      }).catch(e => {
        this.barMoveEmpty = true;
        this.BarLoading = false;
      })
    },
    // 获取网格化频段占用率数据-饼状图 (complete)
    _getPieChartData() {
      this.PieLoading = true;
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          threshold: business.signal,
          thresholdType: business.checked
        }
      } else {
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      }
      this.$api.spectrumEvaluation.GetRangeOfGrid(param).then(res => {
        let {
          data,
          success
        } = res;
        this.pieMoveEmpty = this.PieLoading = false;
        if (success) {
          if (typeof data === 'object' && data !== null) {
            let key_data = Object.keys(data.netOccuyDistributeValue);
            if (key_data.length) {
              key_data = key_data.map(item => item + '%');
            }
            let value_data = Object.values(data.netOccuyDistributeValue);
            if (value_data.length) {
              let val_data = [];
              value_data.forEach((item, index) => {
                val_data.push({
                  value: item.toFixed(2),
                  name: key_data[index]
                });
              });
              //信号使用情况比例
              this.ratioPieOption = GetRatioPieOption({
                key_data,
                value_data: val_data,
                title: "移动站-网格化频段占用度覆盖率",
                xAxis_color: '#818181',
                series_name: '频段占用度覆盖率',
                tooltip_formatter: '{a} <br/>{b} : {c}%'
              });
            } else {
              this.pieMoveEmpty = true;
            }
          } else {
            this.pieMoveEmpty = true;
          }
        } else {
          this.pieMoveEmpty = true;
        }
      }).catch(e => {
        this.PieLoading = false;
        this.pieMoveEmpty = true;
      })
    },
    // 频率列表-页面切换
    freqListCurrentChange(val) {
      this.getRateList(val);
    },
    // 获取频率覆盖率列表
    _getRateList(param) {
      this.freqListLoading = true;
      this.$api.spectrumEvaluation.getFreqList(param).then(res => {
        let {
          data,
          success
        } = res;
        this.freqListEmpty = this.freqListLoading = false;
        this.freqList = [];
        if (success) {
          if (typeof data === 'object' && data !== null) {
            let arr = data.currentPageObjects;
            this.freqListTotalCount = data.totalCount;
            if (arr.length) {
              arr.forEach(it => {
                let {
                  mSignalType,
                  mFreq,
                  mCover,
                  mBand
                } = it;
                this.freqList.push({
                  rate: mFreq,
                  band_width: mBand,
                  rate_cover: `${mCover.toFixed(2)}%`,
                  natrue: mSignalType === 0 ? "合法" : mSignalType === 1 ? "非法" : mSignalType === 2 ? "违规" : mSignalType === 3 ? "登记未使用" : "未分配"
                });
              });
            } else {
              this.freqListEmpty = true;
            }
          } else {
            this.freqListEmpty = true;
          }
        } else {
          this.freqListEmpty = true;
        }
      });
    },
    getRateList(val = 1) {
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          threshold: business.signal,
          thresholdType: business.checked,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          pageIndex: val,
          pageSize: this.pageSize
        }
      } else {
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          pageIndex: val,
          pageSize: this.pageSize
        }
      }
      this._getRateList(param);
    },
    // 固定站列表-页面切换
    stationListCurrentChange(val) {
      this._getFixedStationList(val);
    },
    // 获取固定站列表及频段占用度
    _getFixedStationList(val = 1) {
      this.fixedStationLoading = true;
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      // 自定义频段
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          startFreq: business.start_freq,
          StopFreq: business.stop_freq,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          stepFreq: business.step,
          threshold: business.signal,
          thresholdType: business.checked,
          pageIndex: val,
          pageSize: this.pageSize
        }
      } else {
        // 选择频段
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          pageIndex: val,
          pageSize: this.pageSize
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetStationList(param).then(res => {
        this.fixedStationEmpty = this.fixedStationLoading = false;
        this.station_list = [];
        let {
          data,
          success
        } = res;
        if (success) {
          if (typeof data === 'object' && data !== null) {
            let data_arr = Object.values(data.currentPageObjects);
            this.stationListTotalCount = data.totalCount;
            if (data_arr.length) {
              data_arr.forEach((item, index) => {
                let {
                  station,
                  m_Channel
                } = item;
                this.station_list.push({
                  station_name: station.stationName,
                  part_cover: `${m_Channel.toFixed(2)}%`,
                  station_info: station
                });
              });
            } else {
              this.fixedStationEmpty = true;
            }
          } else {
            this.fixedStationEmpty = true;
          }
        }
      })
    },
    // 获取选中固定站的信道占用度
    _getChannelUsed() {
      this.loading = true;
      let {
        station_info
      } = JSON.parse(sessionStorage.getItem("station_info"));
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      // 自定义频段
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          SID: station_info.sid,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          thresholdType: business.checked,
          threshold: business.signal
        }
      } else {
        // 选择频段
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          SID: station_info.sid,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetStationChannel(param).then(res => {
        let {
          success,
          data,
          msg
        } = res;
        this.specialBarFixedStationEmpty = this.loading = false;
        if (success) {
          let valueData = [];
          this.transactionBarData = {};
          if (typeof data === 'object' && data !== null) {
            if (!business.value) {
              this.keyData = data.freqs;
              valueData = data.datas;
            } else {
              if (data.freq_ChannelOccupys) {
                this.keyData = Object.keys(data.freq_ChannelOccupys);
                valueData = Object.values(data.freq_ChannelOccupys);
              }
            }
            if (valueData.length) {
              valueData = valueData.map(item => item.toFixed(2));
            }
            this.transactionBarData = normalizeBarVariable({
              dataAxis: this.keyData,
              data: valueData,
              yAxis_name: '信道占用度(%)',
              yAxis_color: '#6c6c6c',
              xAxis_name: '（MHz）',
              xAxis_color: '#6c6c6c',
              legend_data: ['信道占用度'],
              series_name: '信道占用度',
              tooltip_formatter: "{a} <br/>{b}MHz 信道占用度 : {c}%"
            });
            if (!valueData.length) this.specialBarFixedStationEmpty = true;
          } else {
            this.specialBarFixedStationEmpty = true;
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      })
    },
    // 某个固定站在指定时断段内的数据天数 (complete)
    _getDaysOfTimePeriod() {
      let {
        station_info,
        station_name
      } = JSON.parse(sessionStorage.getItem("station_info"));
      this.channel_highchat_title = `${station_name} 信道时间占用度`
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      this.timePeriod = {};
      // 自定义频段
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          SID: station_info.sid,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: step,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      } else {
        // 选择频段
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          SID: station_info.sid,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetStationDays(
        param
      ).then(res => {
        let {
          success,
          data,
          msg
        } = res;
        if (success) {
          this.timePeriod = data;
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      });
    },
    // 获取大型热力图的数据 (complete)
    _getBigHeatMapData(val = "2017-12-12") {
      this.bigMapLoading = true;
      let {
        station_info
      } = JSON.parse(sessionStorage.getItem("station_info"));
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          SID: station_info.sid,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          FixedTime: val
        }
      } else {
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          SID: station_info.sid,
          FixedTime: val
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetWaterfallPlot(param).then(
        res => {
          let {
            success,
            data,
            msg
          } = res;
          this.bigMapLoading = false;
          if (success) {
            let data_arr = Object.entries(data.channelOccupyDatas);
            let value_arr = [];
            if (data_arr.length) {
              data_arr.forEach(item => {
                let freq = item[0];
                let arr = item[1];
                arr.forEach((it, idx) => {
                  value_arr.push({
                    x: Number(freq),
                    y: idx,
                    value: it == -1 ? undefined : it / 100
                  });
                });
              });
              this.highchartData = normalize({
                data: value_arr,
                yAxis_name: '(MHz)',
                xAxis_name: '时间'
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: msg
            });
          }
        }
      );
    },
    // 获取信道附近的固定站信息（暂为模拟数据） （暂时未使用）
    _getNearlyStationInfo() {
      let param;
      let {
        station_info
      } = JSON.parse(sessionStorage.getItem("station_info"));
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          SID: station_info.sid,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: step,
          threshold: business.signal,
          thresholdType: business.checked
        }
      } else {
        param = {
          CID: this.$const.CID,
          SID: station_info.sid,
          BusinessBand: business.value,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1]
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetStationInfo(
        param
      ).then(res => {
        let {
          success,
          data
        } = res;
        if (success) {
          if (data.length) {
            let data_arr = [];
            data.forEach((item, index) => {
              data_arr.push({
                id: item.sid,
                sName: item.sName,
                sProducer: item.sProducer,
                sModel: item.sModel,
                sType: item.sType,
                sPeople: item.sPeople,
                sBuileTime: item.sBuileTime,
                longitude: item.sLon,
                latitude: item.sLat
              });
            });
            this.$refs.map.initMarker(data_arr);
          }
        }
      });
    },
    // 获取当前选择信道附近的固定站名称（暂为模拟数据） （暂时未使用）
    _getNearbyStationOfSelectedChannel(val) {
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          threshold: business.signal,
          thresholdType: business.checked,
          Frequency: val ? `${val}MHz` : "91.6MHz"
        }
      } else {
        param = {
          CID: this.$const.CID,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          Frequency: val ? `${val}MHz` : "91.6MHz"
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetNearbyStation(
        param
      ).then(res => {
        let {
          success,
          data
        } = res;
        if (success) {
          this.nearlyStaions = data;
        }
      });
    },
    // 查询频谱图-大型折线图（complete）
    _getTraceSpertrum(val) {
      let {
        lat,
        lng
      } = val;
      let param;
      if (this.notSingle) {
        let session = sessionStorage.getItem("businessInfomation");
        let business = session !== null ? JSON.parse(session) : "";
        // 自定义频段
        if (!business.value) {
          param = {
            CID: this.$const.CID,
            StartTime: business.date_range[0],
            StopTime: business.date_range[1],
            StartFreq: business.start_freq,
            StopFreq: business.stop_freq,
            Lat: lat,
            Lon: lng
          }
        } else {
          // 选择频段
          param = {
            CID: this.$const.CID,
            StartTime: business.date_range[0],
            StopTime: business.date_range[1],
            BusinessBand: business.value,
            Lat: lat,
            Lon: lng
          }
        }
      } else {
        param = {
          CID: this.$const.CID,
          StartTime: this.singleData.StartTime ? this.singleData.StartTime : this.singleData.date_range[0],
          StopTime: this.singleData.StopTime ? this.singleData.StopTime : this.singleData.date_range[1],
          StartFreq: this.singleData.startFreq,
          StopFreq: this.singleData.stopFreq,
          Lat: lat,
          Lon: lng
        }
      }
      this.$api.spectrumEvaluation.GetTraceSpertrum(param).then(res => {
        let {
          success,
          data,
          msg
        } = res;
        if (success) {
          if (data.levels.length) {
            let data_arr = data.levels.map((item, idx) => [idx, item / 10]);
            this.bigLine = nomarlizeLine(data_arr);
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      });
    },
    // 获取信道使用情况 (complete)
    _getChannelUsage() {
      this.channelUseLoading = true;
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          stepFreq: business.step,
          threshold: business.signal,
          thresholdType: business.checked
        }
      } else {
        param = {
          CID: this.$const.CID,
          StartTime: business.date_range[0],
          StopTime: business.date_range[1],
          BusinessBand: business.value
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetChannelUsage(param).then(
        res => {
          this.tabData = [];
          let {
            success,
            data
          } = res;
          this.channelCount = 0;
          this.channelOccupyEmpty = false;
          if (success) {
            if (typeof data === 'object' && data !== null) {
              this.channelColors = data.colors;
              if (data.data.length) {
                for (let i = 0; i < data.data.length; i++) {
                  let item = data.data[i];
                  let name = item.name;
                  let data_arr = item.data;
                  let empty_arr = [];
                  if (data_arr.length) {
                    for (let j = 0; j < data_arr.length; j++) {
                      empty_arr.push(data_arr[j]);
                      this.channelCount += data_arr[j].count;
                    }
                    this.tabData.push({
                      name,
                      data: empty_arr
                    });
                  }
                }
              } else {
                this.channelOccupyEmpty = true;
              }
            } else {
              this.channelOccupyEmpty = true;
            }
          }
          this.channelUseLoading = false;
        }
      );
    },
    // 获取指定频率的24小时占用度情况-大型热力图上点击触发 (complete)
    _getChannelOfFreqInOneday(val = 88) {
      this.checkNow(this.fadeChange(['analyse', 'tweentyFourHours']), 'tweentyFourHours_');
      let param;
      let session = sessionStorage.getItem("businessInfomation");
      let business = session !== null ? JSON.parse(session) : "";
      if (!business.value) {
        param = {
          CID: this.$const.CID,
          SID: station_info.stationNumber,
          startFreq: business.start_freq,
          stopFreq: business.stop_freq,
          stepFreq: business.step,
          FixedTime: this.$const.FIXED_TIME,
          Freq: val
        }
      } else {
        param = {
          CID: this.$const.CID,
          BusinessBand: business.value,
          SID: station_info.stationNumber,
          FixedTime: this.$const.FIXED_TIME,
          Freq: val
        }
      }
      this.$api.spectrumEvaluation.StationAndCover.GetOnedayOccupy(
        param
      ).then(res => {
        let {
          success,
          data
        } = res;
        if (success) {
          this.tweentyFourHours = normalizeBarOption({
            series_data: data,
            title: `频率88MHz 信道时间占用度：90%`,
            color: '#fff'
          });
        }
      });
    },
    // 获取业务列表
    GetAllTaskList() {
      this.taskListLoading = true
      this.showTaskList = false
      let params = {
        userID: 'admin'
      }
      this.$api.spectrumEvaluation.GetAllTaskList(params).then(res => {
        this.taskListLoading = false
        this.showTaskList = true
        let {
          success,
          data,
          msg
        } = res
        if (success) {
          if (data.length) {
            this.allTaskList = data
          } else {
            this.$message({
              type: 'warning',
              message: '暂时没有数据哦'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    // 刷新任务列表
    refresh() {
      this.GetAllTaskList()
    },
    // 关闭任务列表
    closeTaskList() {
      // this.fadeChange(['analyse', 'taskManage'], false);
			this.checkNow(this.fadeChange(['analyse','taskManage']),'taskManage_')
    },
		// 打开任务管理列表
		openTaskList(){
			// alert(111)
			// this.fadeChange(['analyse', 'taskManage'], false);
			this.checkNow(this.fadeChange(['analyse','taskManage']),'taskManage_')
			this.GetAllTaskList()
		},
    deleteRefresh(){
      this.allTaskList = []
      this.GetAllTaskList()
    }
  }
};
</script>
