<!-- 信号多维分析 -->
<template>
<section class="multidimensional">
  <!-- 导航栏 -->
  <nav1 @export='exportList' :navBarTitleShow="true" :navBarTitle="navBarTitle"></nav1>
  <section class="container">
    <div class="side-span">
      <span @click="fadeChange(['signalMultidimensional','analysisRelevant'])" style="height: 120px">相关查询</span>
      <span @click="fadeChange(['signalMultidimensional','rateList'])" style="height: 120px;" :class="[fade.signalMultidimensional.rateListBtn?fadeInCss:fadeOutCss]">频率列表</span>
    </div>
    <div :class="['change',fade.signalMultidimensional.changeBtn?zoomInCss:zoomOutCss]">
      <change :show="showChange" @energyRetangle="energyRetangle" @frequencyMap="frequencyMap" @energyCircle="energyCircle" />
    </div>
    <!-- 地图 -->
    <leaflet class="map" @showLine="showLine" ref="map"></leaflet>
    <!-- 相关分析 -->
    <analysis-relevant @minus="fadeChange(['signalMultidimensional','analysisRelevant'])" @do_analysis="do_analysis" :class="['analysisRelevant',fade.signalMultidimensional.analysisRelevant?fadeInCss:fadeOutCss]"></analysis-relevant>

    <!-- 频率列表 -->
    <VueDraggableResizable :resizable="false" :x="40" :y="375" :z="fade.signalMultidimensional.rateList?1000:0">
      <rate-list :fixedLoading="fixedLoading" :freqLoading="freqLoading" :freqInfoLoading="freqInfoLoading" :freqEmpty="freqEmpty" :freqInfoShow="freqInfoShow" :freqInfoEmpty="freqInfoEmpty" :freqShow="freqShow" :fixedStationShow="fixedStationShow" :fixedStationEmpty="fixedStationEmpty" @showFixedStation="showFixedStation" :fixedStation="form_data.activeName=='second'?false:true" @showOccupancy="showOccupancy"
        @minus="rateListShow" @details="details" :data='rateListData' :fixationData="fixationData" :signalInfoData="signalInfoData" v-show="fade.signalMultidimensional.rateList?zoomInCss:zoomOutCss" :class="[fade.signalMultidimensional.rateList?zoomInCss:zoomOutCss]"></rate-list>
    </VueDraggableResizable>
    <!-- 频谱图 -->
    <VueDraggableResizable :resizable="false" :x="400" :y="298" :z="fade.signalMultidimensional.trackInformation?1000:0">
      <trackInformation :highChartLineData="bigLine" @closeTrackInformation="closeTrackInformation" :class="['trackInformation',fade.signalMultidimensional.trackInformation?zoomInCss:zoomOutCss]" />
    </VueDraggableResizable>

    <!-- 频率相关信息 -->
    <VueDraggableResizable :resizable="false" :x="500" :y="408" :z="fade.signalMultidimensional.relationInfo?1000:0">
      <relation-info :freqInfo="freqInfo" @closeRelaTionInfo="fadeChange(['signalMultidimensional','relationInfo'])" @showChannelUse="showChannelUse" style="height:237px;" :stationInfo='stationInfo' :class="[fade.signalMultidimensional.relationInfo?zoomInCss:zoomOutCss]"></relation-info>
    </VueDraggableResizable>

    <!-- 信道占用度 -->
    <channel-use :keyData="keyData" @channelDateChange="channelDateChange" :loading="channelUseLoading" :bigMapLoading="bigMapLoading" :timePeriod="timeData" width="100%" :style="{'z-index':fade.signalMultidimensional.channelUse?1002:0}" id="channelUse" @closeChannel="fadeChange(['signalMultidimensional','channelUse'])"
      :class="[fade.signalMultidimensional.channelUse?zoomInCss:zoomOutCss]" @closeRelaTionInfo="fadeChange(['signalMultidimensional','channelUse'])" :transactionBarData="transactionBarData" :highchartData='highchartData'>
      <span slot="channel_title">{{channel_title}}</span>
    </channel-use>
  </section>
</section>
</template>
<script>
import nav1 from "components/equipmentControl/common/Nav1";
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet";
import ChannelUse from "components/signalMultidimensionalAnalysis/channelUse";
import RateList from "components/signalMultidimensionalAnalysis/rateList";
import RelationInfo from "components/signalMultidimensionalAnalysis/relationInfo";
import AnalysisRelevant from "components/signalMultidimensionalAnalysis/analysisRelevant";
import trackInformation from "components/signalMultidimensionalAnalysis/trackInformation"
import normalizeBarOption from "assets/js/chartOptions/barVariable";
import normalize from "assets/js/chartOptions/highchartsOptions";
import nomarlizeLine from "assets/js/chartOptions/highchartLineOption";
import highchartOption from "assets/js/chartOptions/highchartOption";
import VueDraggableResizable from 'components/common/draggable'
import change from 'components/stationManage/change'
import grid from 'assets/json/geo.json'
import {
  menuShowMixin,
  animateMixin
} from "assets/js/mixin";

export default {
  mixins: [menuShowMixin, animateMixin],
  data() {
    return {
      // analysisRelevant: {},
      navBarTitle: '',
      rateListData: [],
      fixationData: [],
      signalInfoData: [],
      keyData: [],
      valueData: [],
      bigLine: {},
      transactionBarData: {},
      highchartData: {},
      freqInfo: {},
      stationInfo: [],
      freqLoading: false,
      freqInfoLoading: false,
      channelUseLoading: false,
      bigMapLoading: false,
      channel_title: '',
      timeData: {},
      freqEmpty: false,
      freqShow: false,
      fixedStationEmpty: false,
      freqInfoShow: false,
      freqInfoEmpty: false,
      fixedStationShow: false,
      fixedLoading: false,
      showChange: [true, true, true],
      form_data: {
        startTime: '',
        stopTime: '',
        sid: '',
        activeName: '',
        startFreq: '',
        stopFreq: '',
        stepFreq: '',
        threshold: '',
        thresholdType: '',
        selectName: '',
        bandwidth: '',
        freq: ''
      }
    };
  },
  methods: {
    // 头部导航 导出数据
    exportList() {
      console.log("export list in signalMultidimensionalAnalysis");
    },
    // 自定义频段网格占用度
    customEnergyRetangle(){
      let params = {
        cid: this.$const.CID,
        startFreq: this.form_data.startFreq,
        // stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType == 1 ? true : false,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetGridOccupancy(params).then(res => {
        let{success,data,msg}=res
        if(success){
          if(data){
            this.$refs.map.energyRetangle(data.position_NetOccuys);
          }
        }else{
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    // 网格占用度
    energyRetangle() {
        this.customEnergyRetangle()
    },
    // 频谱地图
    frequencyMap() {
      if (this.form_data.activeName == 'second') {
        this.customFrequencyMap()
      } else {
        this.freqFrequencyMap()
      }
      // console.log(this.form_data,'00000');
      // this.$refs.map.frequencyMap(grid)
    },
    // 自定义频段频谱地图
    customFrequencyMap() {
      let params = {
        cid: this.$const.CID,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType == 1 ? true : false,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetFreqBandSpectrumMap(params).then(res => {
        let{success,data,msg} = res
        if (success) {
          if (data) {
            this.refs.map.frequencyMap(data)
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
        // console.log(res, '0000')
      })
    },
    // 频率频谱地图
    freqFrequencyMap() {
      let params = {
        cid: this.$const.CID,
        freq: this.form_data.freq,
        bandwidth: this.form_data.bandwidth,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetFreqSpectrogram(params).then(res => {
        let{success,data,msg} = res
        if (success) {
          if (data) {
            this.refs.map.frequencyMap(data)
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
        // console.log(res, '0000')
      })
    },
    // 能量轨迹
    energyCircle() {
      if (this.form_data.activeName == 'second') {
        // 自定义频段
        this.customEnergyCircle()
      } else {
        // 频率
        this.freqEnergyCircle()
      }
    },
    // 自定义频段能量轨迹
    customEnergyCircle() {
      let params = {
        cid: this.$const.CID,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        // thresholdType: this.form_data.thresholdType==1?true:false,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        area: ""
      }
      this.$api.SignalAnalysis.GetFreqBandTrace(params).then(res => {
        let {success,data,msg} = res
        // console.log(data,'-----');
        if (success) {
          if (data) {
            let datas = data.position_Powers
            let minPower = data.minPower
            let maxPower = data.maxPower
            this.$refs.map.energyCircle(datas, maxPower, minPower)
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
    },
    // 频率能量轨迹
    freqEnergyCircle() {
      let params = {
        cid: this.$const.CID,
        freq: this.form_data.freq,
        bandwidth: this.form_data.bandwidth,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetFreqTrace(params).then(res => {
        // console.log(res,'0000')
        let {success,data,msg} = res
        if(success){
          if (data) {
            let datas = data.position_Powers
            let minPower = data.minPower
            let maxPower = data.maxPower
            this.$refs.map.energyCircle(datas, maxPower, minPower)
          }
        }else{
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
    },
    // 最大电平位置
    maxMarker(){
      let params = {
        cid: this.$const.CID,
        freq: this.form_data.freq,
        bandwidth: this.form_data.bandwidth,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetLevelPosition(params).then(res=>{
        // console.log(res,'---------');
        let {success, data, msg} = res
        if (success) {
          if (data) {
            this.$refs.map.maxMarker(data)
            // console.log(data,'==========');
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
    },
    // 执行分析
    do_analysis(param, activeName) {
      // 保存表单中的数据
      this.form_data.activeName = activeName
      this.form_data.startTime = param.daterange[0]
      this.form_data.stopTime = param.daterange[1]
      // 自定义频段表单数据
      this.form_data.startFreq = param.startFreq
      this.form_data.stopFreq = param.stopFreq
      this.form_data.stepFreq = param.stepFreq
      this.form_data.threshold = param.threshold
      this.form_data.thresholdType = param.thresholdType == 1 ? true : false
      // 单频表单数据
      this.form_data.bandwidth = param.bandwidth
      this.form_data.freq = param.freq
      // 点击执行分析清空数据
      this.fixationData = []
      this.rateListData = []
      this.signalInfoData = []
      this.stationInfo = []
      this.freqInfo = {}

      this.fade.signalMultidimensional.trackInformation = false
      this.fade.signalMultidimensional.relationInfo = false
      this.fade.signalMultidimensional.channelUse = false
      if (activeName === "second") {
        this.showChange = [true, true, true]
        this.customAnalyze()
        this.navBarTitle=`您当前查询的是 : ${param.startFreq}-${param.stopFreq}MHz 的相关信息`
      } else {
        this.showChange = [true, true, false]
        this.freqAnalyse()
        this.navBarTitle=`您当前查询的是 : ${this.form_data.freq}MHz 的相关信息`
        // 最大电平位置
        this.maxMarker()

      }
      // console.log(param,'9999');

      // console.log(this.fadeChange,'00000');
      // console.log('Data from son: ' , param)
      // this.$message({
      //   type:'success',
      //   message:`Data from son:${JSON.stringify(param)}`
      // })
    },
    // 自定义频段执行分析
    customAnalyze() {
      let params = {
        cid: this.$const.CID,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetBeginStart(params).then(res => {
        // console.log(res.data,'88888');
        let {success,data,msg} = res
        if (success) {
          if (data) {
            if (this.form_data.selectName == "second") {
              // 获取固定站列表
              this.getFixationData()
            } else {
              // 获取频率列表数据
              this.getRateListData()
            }
            this.fadeChange(['signalMultidimensional', 'rateList'], true)
            this.fadeChange(['signalMultidimensional', 'changeBtn'], true)
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
    },
    // 频率执行分析
    freqAnalyse() {
      //暂无接口 开始分析返回true
      this.freqInfomation();
      this.fadeChange(['signalMultidimensional', 'rateList'], true)
      this.fadeChange(['signalMultidimensional', 'changeBtn'], true)
    },
    // 获取频率信息
    freqInfomation(){
      this.freqInfoShow = false
      this.freqInfoEmpty = false
      this.freqInfoLoading = true
      let params = {
        cid: this.$const._CID,
        freq: this.form_data.freq,
        bandwidth: this.form_data.bandwidth,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetFreqType(params).then(res=>{
        this.freqInfoLoading = false
        let{success,data,msg}= res
        // console.log(res,'//////');
        if (success) {
          if(data){
            if (data.signalList.length) {
              this.freqInfoShow = true
              this.freqInfoEmpty = false
              data.signalList.forEach((item) => {
                if(item.mSignalType=='0'){
                  item.mSignalType='合法'
                }else if(item.mSignalType=='1'){
                  item.mSignalType='非法'
                }else if(item.mSignalType=='2'){
                  item.mSignalType='违规'
                }else{
                  item.mSignalType='登记未使用'
                }
                this.signalInfoData.push({
                  desc: item.mFreq,
                  date: item.mBand,
                  power: `${item.mCover.toFixed(2)}%`,
                  signalNature: item.mSignalType,
                  mark: '4'
                })
              })
              // console.log(this.rateListData, '////////');
            } else {
              this.freqInfoShow = false
              this.freqInfoEmpty = true
            }
          }
        } else {
          this.$message({
            type: "warning",
            message: mag
          })
          this.freqInfoShow = false
          this.freqInfoEmpty = true
        }
        // console.log(success,data,msg,'//////');
      })
    },
    // 隐藏频率列表
    rateListShow() {
      this.fadeChange(['signalMultidimensional', 'rateListBtn'], true)
      this.fadeChange(['signalMultidimensional', 'rateList'], false)
    },
    // 获取自定义频段频率列表
    getRateListData() {
      this.freqShow = false
      this.freqEmpty = false
      this.freqLoading = true
      this.fadeChange(['signalMultidimensional', 'rateList'], true)
      let params = {
        cid: this.$const._CID,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        pageSize: 10,
        pageIndex: 1
      }
      this.$api.SignalAnalysis.GetFreqList(params).then(res => {
        this.freqLoading = false
        let {
          success,
          data,
          msg
        } = res
        if (success) {
          if (data.signalList.length) {
            this.freqShow = true
            this.freqEmpty = false
            data.signalList.forEach((item) => {
              if(item.mSignalType=='0'){
                item.mSignalType='合法'
              }else if(item.mSignalType=='1'){
                item.mSignalType='非法'
              }else if(item.mSignalType=='2'){
                item.mSignalType='违规'
              }else{
                item.mSignalType='登记未使用'
              }
              this.rateListData.push({
                desc: item.mFreq,
                date: item.mBand,
                power: `${item.mCover.toFixed(2)}%`,
                signalNature: item.mSignalType,
                mark: '4'
              })
            })
            // console.log(this.rateListData, '////////');
          } else {
            this.freqShow = false
            this.freqEmpty = true
          }
        }else{
          this.$message({
            type: "warning",
            message: msg
          })
          this.freqShow = false
          this.freqEmpty = true
        }
      }).catch((err)=>{
        this.freqLoading = false
        this.freqShow = false
        this.freqEmpty = true
      })
      // this.$http.get("api/GetRateList").then(res => {
      //   res.data.forEach(item => {
      //     this.rateListData.push({
      //       desc: item.rate,
      //       date: item.bandWidth,
      //       power: `${item.signalCover.toFixed(2)}%`,
      //       signalNature: item.rateNature,
      //       mark: '4'
      //     });
      //   });
      // });
    },
    // 频率列表、固定站列表切换
    showFixedStation(param) {
      // console.log(param,'-=-=-=-=');
      this.form_data.selectName = param
      if(param=="second"){
        if (!this.fixationData.length) {
          this.getFixationData()
        }
      }else{
        if (!this.rateListData.length) {
          this.getRateListData()
        }
      }
    },
    // 获取固定站列表
    getFixationData(param) {
      this.fixedStationEmpty = false
      this.fixedStationShow = false
      this.fixedLoading = true
      let params = {
        cid: this.$const.CID,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      this.$api.SignalAnalysis.GetFixedStationList(params).then(res => {
        this.fixedLoading = false
        let{success,data,msg}= res
        if (success) {
          let datas = Object.values(data)
          if (datas.length) {
            this.fixationData = datas
            this.fixedStationEmpty = false
            this.fixedStationShow = true
          } else {
            this.fixedStationEmpty = true
            this.fixedStationShow = false
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
          this.fixedStationEmpty = true
          this.fixedStationShow = false
        }
      })
      // this.rateListLoading = false
    },
    // 固定站信道占用度
    showOccupancy(num, name) {
      this.channelUseLoading = true
      this.fadeChange(['signalMultidimensional', 'channelUse'], true);
      this.channel_title = `${name} 在 ${this.form_data.startTime} 至 ${this.form_data.stopTime} ${this.form_data.startFreq}MHz 至 ${this.form_data.stopFreq}MHz 信道占用度`
      this.form_data.sid = num
      let params = {
        cid: this.$const.CID,
        sid: this.form_data.sid,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType == 1 ? true : false,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime
      }
      // console.log(params,'0000-');
      this.$api.SignalAnalysis.GetFixedStationChannel(params).then(res => {
        this.channelUseLoading = false
        // console.log(res,'999=');
        let {
          success,
          data,
          msg
        } = res
        if (success) {
          if (data) {
            this.keyData = Object.keys(data.freq_ChannelOccupys);
            this.valueData = Object.values(data.freq_ChannelOccupys);
            this.transactionBarData = normalizeBarOption({
              dataAxis: this.keyData,
              data: this.valueData,
              yAxis_name: '信道占用度(%)',
              yAxis_color: '#686868',
              xAxis_color: '#686868',
              xAxis_name: '（MHz）'
            })
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
      // 获取小时占用度日期
      this.$api.SignalAnalysis.GetFixedStationDate(params).then(res => {
        let {
          data
        } = res
        this.timeData = data
      })

    },
    // 获取小时占用度
    channelDateChange(val) {
      this.bigMapLoading = true
      let params = {
        cid: this.$const.CID,
        sid: this.form_data.sid,
        startFreq: this.form_data.startFreq,
        stepFreq: this.form_data.stepFreq,
        stopFreq: this.form_data.stopFreq,
        selectTime: val,
        threshold: this.form_data.threshold,
        thresholdType: this.form_data.thresholdType
      }
      this.$api.SignalAnalysis.GetFixedStationHour(params).then(res => {
        this.bigMapLoading = false
        let {
          success,
          data,
          msg
        } = res;
        // this.bigMapLoading = false;
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
                  value: it == -1 ? undefined : it
                });
              });
            });
            this.highchartData = normalize({
              data: value_arr,
              yAxis_name: '(MHz)',
              xAxis_name: '时间'
            });
            // console.warn(this.highchartData)
            console.log('GetWaterfallPlot: ', this.highchartData);
          }
        } else {
          this.$message({
            type: "warning",
            message: msg
          });
        }
      })
    },
    // 关闭频谱图
    closeTrackInformation() {
      this.fadeChange(['signalMultidimensional', 'trackInformation'], false)
    },
    // 获取大型折线图
    showLine(param) {
      let params = {
        cid: this.$const.CID,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        startFreq: this.form_data.startFreq,
        stopFreq: this.form_data.stopFreq,
        lat: param.lat,
        lon: param.lng
      }
      if (this.form_data.activeName=="second") {
        this.fade.signalMultidimensional.analysisRelevant = false
        this.fade.signalMultidimensional.rateListBtn = true
        this.fade.signalMultidimensional.rateList = false
        this.fade.signalMultidimensional.relationInfo = false
        this.fade.signalMultidimensional.channelUse = false
        this.fadeChange(['signalMultidimensional', 'trackInformation'], true)
        this.$api.SignalAnalysis.GetFreqBandSpectrogram(params).then(res => {
          let {
            success,
            data,
            msg
          } = res
          if (success) {
            if (data.levels.length) {
              let data_arr = data.levels.map((item, idx) => [idx, item / 10]);
              this.bigLine = nomarlizeLine(data_arr)
            }
          } else {
            this.$message({
              type: "warning",
              message: msg
            })
          }
        })
      }
    },
    // 获取信道占用度
    // _getChannelUsed() {
    //   this.$http.get("api/GetChannelUsed").then(res => {
    //     this.transactionBarData = normalizeBarOption({
    //       title: "",
    //       series_data: res.data.data1,
    //       xAxis_data: [],
    //       title_offset: "0px",
    //       title_top: "left",
    //       series_color: ["#ff8b35"],
    //       title_color: "#4fdaff",
    //       legend_data: ["频率"],
    //       legend_right: '82%'
    //     });
    //     this.highchartData = highchartOption({
    //       title: '信道占用度',
    //       series_data: res.data.data2,
    //       xAxis_data: [],
    //       title_offset: '0px',
    //       title_top: 'left',
    //       series_color: ['#ff8b35'],
    //       title_color: '#4fdaff',
    //       legend_data: ['信道占用度']
    //     });
    //   });
    // },

    // 点击频率列表显示频率相关信息
    details(param) {
      // console.log(param,'1111111111');
      this.fadeChange(['signalMultidimensional', 'relationInfo'], true);
      // this.fade.signalMultidimensional.channelUse = false
      if(this.form_data.activeName=="second"){
        // 自定义频段
        this.getFreqInfo(param)
      }else{
        // 单频
        // 获取单位信息
        this.getCompanyInfo(param)
        // 获取附近3个固定站
        this.aroundstation(param)
      }
    },
    // 获取西定义频段频率相关信息
    getFreqInfo(param){
      let params = {
        cid: this.$const.CID,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        freq: param.desc,
        bandwidth: param.date
      }
      this.$api.SignalAnalysis.GetFreqInfo(params).then(res=>{
        let {success, data, msg} = res
        if (success) {
          if(data){
            this.freqInfo = data.freqInfo
            this.stationInfo = data.staList
          }
        } else {
          this.$message.warning(msg)
        }
      })
    },
    // 获取单频单位信息
    getCompanyInfo(param) {
      // console.log(param,'............');
      let params = {
        cid: this.$const.CID,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        freq: param.desc,
        bandwidth: param.date
      }
      // this.$api.SignalSignalAnalysis.GetMaxSignalStationListAnalysis.GetFreqInfo(params).then(res=>{
      //
      // })
      this.$http.get("api/GetCompanyInfo").then(res => {
        // console.log(res.data)
        this.freqInfo = res.data
      });
    },
    // 获取单频附近3个固定站
    aroundstation(param){
      let params = {
        cid: this.$const.CID,
        startTime: this.form_data.startTime,
        stopTime: this.form_data.stopTime,
        freq: param.desc,
        bandwidth: param.date
      }
      this.$api.SignalAnalysis.GetMaxSignalStationList(params).then(res=>{
        let {success,data,msg} = res
        if (success) {
          this.stationInfo = data
        } else {
          this.$message({
            type: "warning",
            message: msg
          })
        }
      })
    },
    // 查看附近固定站信道占用度
    showChannelUse() {
      // 显示信道占用度柱状图
      this.fadeChange(['signalMultidimensional', 'channelUse'], true);
    }
  },
  mounted() {},
  components: {
    change,
    ChannelUse,
    RateList,
    RelationInfo,
    AnalysisRelevant,
    nav1,
    Leaflet,
    VueDraggableResizable,
    trackInformation
  }
};
</script>
<style lang="less">
/* .multiLeftContent{
    margin-top: 10px;
    height: 570px;
  } */

.multidimensional {
    width: 100%;
    .container {
        width: 100%;
        height: 100%;
        margin: auto;
        position: relative;
    }
    .map {
        min-height: 1000px;
        z-index: 999;
    }
    #channelUse {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 1000;
        margin: 0 !important;
    }
    .analysisRelevant {
        position: absolute;
        top: 0;
        left: 40px;
        z-index: 1000;
    }
    .trackInformation {
        z-index: 1000;
        background: #283a55;

    }
    .change {
        width: 400px;
        position: absolute;
        top: 5px;
        left: 50%;
        margin-left: -200px;
        z-index: 1000;
    }
}
</style>
