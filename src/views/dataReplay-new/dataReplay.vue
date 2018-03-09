<template>
<div
  v-loading="loading"
  element-loading-text="数据加载中..."
  id="dataReplay">
  <nav1 :showTitle="true" :dataReplayTop="true" @occupy="occupy1" />
  <div class="container">
    <div class="side-span">
      <span @click="fadeChange(['dataReplay','inquire'])" style="height: 90px">回放窗口</span>
      <span v-show="submitted" @click="fadeChange(['dataReplay','paging'])" style="height: 120px;">移动站列表</span>
    </div>
    <!-- 地图 -->
    <map1 @dataReplyMarkerClick="reply" @showLine="showLine" class="map" ref="map" @showSpectra0="showSpectra1" />
    <!-- 切换 -->
    <change v-show="submitted" :show='[false,true,false]' @energyCircle="energyCircle" class="tabbar" :select="select" />
    <!-- 相关查询 -->
    <inquire :business="business" v-on:submit="submit" v-on:filtrate-minus="fadeChange(['dataReplay','inquire'])" :class="['switch-form',fade.dataReplay.inquire?fadeInCss:fadeOutCss]">
      <span slot="zjx" @click="fadeChange(['dataReplay','inquire'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
    </inquire>

    <!-- 分页 -->
    <VueDraggableResizable v-show="submitted" :resizable="false" :x="40" :y="182" :z="fade.dataReplay.paging?1000:0">
      <paging @energyCircle="mobileEnergyCircle" @reply="reply" id="paging" pagingTitle="移动站列表" :pagingData="pagingData" :columns="3" v-on:minus="fadeChange(['dataReplay','paging'])" :class="[fade.dataReplay.paging?zoomInCss:zoomOutCss]">
        <span slot="zjx" @click="reply('')" class="replayBtn">回放所有移动站数据</span>
        <span slot="zjx" @click="fadeChange(['dataReplay','paging'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
      </paging>
    </VueDraggableResizable>
    <!-- 轨迹信息 -->
    <vue-draggable-resizable v-show="line_show"  :resizable="false" :x="30" :y="132" :z="1001">
      <lineChart :data="line_data" @showLine="line_show=!line_show" />
    </vue-draggable-resizable>
    <VueDraggableResizable v-show="fade.dataReplay.chart" :resizable="false" :x="550" :y="60" :z="fade.dataReplay.chart?1000:0" :drag-cancel="'#chart'">
        <chart @mobileEnergyMarker="mobileEnergyMarker" v-on:minus="fadeChange(['dataReplay','chart'])" :class="['chart',fade.dataReplay.chart?zoomInCss:zoomOutCss]" class="highChart" :station="stationName" :url="replyUrl" />
    </VueDraggableResizable>
  </div>
</div>
</template>
<style scoped>
#dataReplay .container {
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
}

#dataReplay {
  color: #000000;
}

#dataReplay .map {
  min-height: 900px;
  z-index: 999;
}

#dataReplay .left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#dataReplay .minus {
  position: absolute;
  right: 13px;
  cursor: pointer;
  color: #2774A5;
  font-size: 16px;
  top: 9px;
  z-index: 3000;
}

#dataReplay .switch-form {
  width: 468px;
  background: #fff;
  position: absolute;
  border: solid 1px #32ccff;
  top: 0;
  left: 40px;
  z-index: 1000;
}

#dataReplay #paging {
  position: absolute;
  top: 198px;
  left: 0px;
  height: 500px;
  width: 468px;
  background: #fff;
  /* z-index: 1000; */
  border: 1px solid #32ccff;
}

#dataReplay .filBox {
  width: 90%;
  margin: 20px auto 0px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

#dataReplay .pathInfo {
  height: 400px;
  width: 600px;
  background: #283a55;
  position: absolute;
  top: 0px;
  left: 550px;
}

#dataReplay .pathInfo h3 {
  font-weight: normal;
  font-size: 14px;
  border-bottom: solid 1px #fff;
  text-align: center;
  margin: 0px;
  height: 40px;
  line-height: 40px;
}

#dataReplay .pathInfo i {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}


#dataReplay .table {
  padding: 0 10px;
  position: absolute;
  top: 490px;
  left: 20px;
  z-index: 1000;
  border: solid 1px #33ccff;
  background: rgba(0, 0, 0, 0.88);
}

#dataReplay .tabbar {
  width: 40%;
  position: absolute;
  z-index: 1000;
  top: 2px;
  left: 33%;
}

#dataReplay .occupyBar,
#dataReplay .spectra {
  position: absolute;
  bottom: -847px;
  left: 22px;
  z-index: 1000;
  background-color: #5294d1;
}

#dataReplay .occupyBar i,
#dataReplay .spectra i {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  z-index: 1200;
}

#dataReplay .topz {
  z-index: 1000;
}

#dataReplay .side-span {
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

#dataReplay .side-span span {
  width: 20px;
  background: #2F74A1;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  letter-spacing: 5px;
  cursor: pointer;
  border-top: solid 1px #fff
}

#dataReplay .el-input--suffix .el-input__inner {
  padding-right: 0;
}

#dataReplay .paging .replayBtn {
  position: absolute;
  /* z-index: 3000; */
  color: #2c73a1;
  text-decoration: underline;
  top: 17px;
  right: 80px;
  cursor: pointer;
  z-index: 3000;
}

#dataReplay .chart {
}

#dataReplay .chart i {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2000;
  cursor: pointer;
  /* color: ; */
}
</style>
<script>
import {
  menuShowMixin,
  animateMixin
} from "assets/js/mixin";
import nav1 from '../../components/equipmentControl/common/Nav1.vue'
import inquire from '../../components/dataReplay/inquire-new.vue'
import paging from '../../components/dataReplay/paging.vue'
import change from '../../components/stationManage/change.vue'
import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
import VueDraggableResizable from 'components/common/draggable'
import highChartLine from 'base/highchartLine'
import GethighChartLineOption from 'assets/js/chartOptions/highchartLineOption'
import chart from '../../components/dataReplay/replayHiChart'
import occupyBar from 'components/stationManage/occupyBar.vue'
import GetOccupyBarOption from 'assets/js/chartOptions/occupyBarOption'
import spectra from 'components/stationManage/spectraBar.vue'
import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
import lineChart from '../../components/common/lineChart'

// import side from 'components/common/Aside'
export default {
  data() {
    return {
      showOccupy: false,
      showSpectra: false,
      select: true,
      highchartLineOption: {},
      occupyBarOption: {},
      spectraBarOption: {},
      isShow: true,
      pagingData: [],
      formData:{},
      replyUrl:'',
      submitted:false,
      line_data:[],
      line_show:false,
      stationName:'',
      loading:false,
      business: []
    }
  },
  components: {
    nav1,
    inquire,
    paging,
    map1,
    change,
    chart,
    highChartLine,
    spectra,
    occupyBar,
    VueDraggableResizable,
    lineChart
  },
  mixins: [menuShowMixin, animateMixin],
  mounted() {
    this._getBusiness();
    this.highchartLineOption = GethighChartLineOption();
  },
  methods: {
    _getBusiness() {
    	this.$api.dataReply.getBusiness().then(res => {
        let {success, data, msg} = res
        if(success){
          if (data) {
            this.business = data.businesInfos;
          }else{
            this.$message({
              type: 'warning',
              message: '没有查询到业务频段'
            })
          }
        }else{
          this.$message({
            type: 'warning',
            message: msg
          })
        }
    	})
    },
    _emptyMap(){
      //清空上一次submit产生的地图上的数据
      this.energyCircle(false);
      // this.mobileEnergyMarker({},false);
    },
    energyCircle: function(show) {
      if(show) {
        this.loading = true;
        this.$api.dataReply.getTrace(this.formData).then(res=>{
          this.loading = false;
          let {success, data, msg} = res
          if (success) {
            if (data) {
              this.$refs.map.energyCircle(res.data.position_Powers,res.data.maxPower,res.data.minPower, show);
            }else{
              this.$message.warning("暂无数据！")
            }
          } else {
            this.$message.warning(msg)
          }
        })
      } else {
        this.$refs.map.energyCircle([],0,0,show);
      }

    },
    mobileEnergyCircle:function(sta){
      let sid = sta.sid;
      let param = this.formData;
      param.sid = sid;
      this.loading = true;
      // this.$message.warning("功能实现中!");
      //单个移动站能量轨迹，接口暂未实现
      this.$api.dataReply.getTrace(param).then(res=>{
        this.loading = false;
        let {success, data, msg} = res
        if (success) {
          if (data) {
            this.$refs.map.energyCircle(res.data.position_Powers,res.data.maxPower,res.data.minPower, true,sta.name);
          }else{
            this.$message.warning("暂无数据！")
          }
        } else {
            this.$message.warning(msg)
        }
      })
    },
    mobileEnergyMarker:function(latlng,show=true){
      this.$refs.map.dataReplyEnergyMarker(latlng,show);
    },
    occupy1() {
      this.showOccupy = !this.showOccupy;
    },
    showSpectra1() {
      this.showSpectra = !this.showSpectra
      // alert(222);
    },
    filtrateMinus() {
      this.fadeOut.filtrate = true;
    },
    initMarker(data) {
      this.$refs.map.dataReplyMarker(data);
    },
    submit(data) {
      this._emptyMap();
      this.loading = true;
      let startFreq = 0;
      let stopFreq = 0;
      //单频
      if(data.type == 2) {
        startFreq = data.center_freq;
        stopFreq = data.center_freq;
      } else {
        startFreq = data.start_freq;
        stopFreq = data.stop_freq;
      }
      let param = {
        CID:'34010000',
        // CID:this.$store.state.currentLocation.value,
        StartFreq:startFreq,
        StopFreq:stopFreq,
        StartTime:data.date_range[0],
        StopTime:data.date_range[1],
      };
      this._getStationInfo(param).then(()=>{
        this.fadeChange(['dataReplay', 'inquire'], true);
        this.fadeChange(['dataReplay', 'paging'], true);
        this.loading = false;
        this.submitted = true;
      });
      param.StepFreq = data.step;
      this.formData = param;
    },
    _getStationInfo(param){
      return this.$api.dataReply.getStationInfo(param).then(res=>{
        let {success, data, msg} = res
        if (success) {
          if(data){
            let fixStations = [];
            let moveStations = [];
            //筛选固定站和移动站
            for (let i=0;i<data.length;i++){
                let temp = data[i];
                if(temp.type == 1) {
                  temp.checked = false;
                  fixStations.push(temp)
                } else {
                  moveStations.push(temp)
                }
            }
            this.pagingData = moveStations;
            this.initMarker(fixStations);
          }else{
            this.$message({
              type: 'warning',
              message: '没有查询到数据'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: msg
          })
        }

      });
    },
    reply(da) {
      console.log(da,'station');
      if(da){
        this._setReplyUrl(da.sid);
        this.stationName = da.name;
      } else {
        this._setReplyUrl('');
        this.stationName = "所有移动站";
      }
      this.fadeChange(['dataReplay','chart'],true);
    },
    _setReplyUrl(sid){
      let ip = '192.168.100.166:18000';
      // let cid = this.$store.state.currentLocation.value;
      let cid = '34010000';
      let startFreq = this.formData.StartFreq;
      let stopFreq = this.formData.StopFreq;
      let startTime = this.formData.StartTime;
      let stopTime = this.formData.StopTime;
      let stepFreq = this.formData.StepFreq;
      this.replyUrl = `ws://${ip}/api/DataPlayback/GetWebSocketForPlayback?SID=${sid}&CID=${cid}&StartFreq=${startFreq}&Stopfreq=${stopFreq}&StartTime=${startTime}&StopTime=${stopTime}&StepFreq=${stepFreq}&Speed=1&hash=${Math.random()}`
    },
    showLine(point){
      this._getTraceSpertrum(point)
    },
    _getTraceSpertrum(point){
      this.loading = true;
      let param = this.formData;
      param.lat = point.lat;
      param.lon = point.lng;
      this.$api.dataReply.getTraceSpectrum(param).then(res=>{
        let {success, data, msg} = res
        if (success) {
          this.line_data = data;
          if(data) {
            this.line_show = true;
          } else {
            this.$message.warning("该点暂无数据!");
          }
          this.loading = false;
        } else {
          this.$message.warning(msg);
        }
      });
    },

  }
}
</script>
