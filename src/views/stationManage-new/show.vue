<template>
  <div id="stationMange"
       v-loading="loading"
       element-loading-text="数据加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!--<nav1 :showTitle="true" :navBarTitleShow="true" :navBarTitle="`频段:${startFreq}MHz-${endFreq}MHz 当前查询：${startTime.getFullYear()}年${startTime.getMonth()}月${startTime.getDate()}日-${endTime.getFullYear()}年${endTime.getMonth()}月${endTime.getDate()}日${startTime.toLocaleDateString()}`"/>-->
    <nav1 :showTitle="true" :navBarTitleShow="true" :navBarTitle="navBarTitle"/>
    <div class="container">
      <div class="side-span">
        <span @click="fadeChange(['stationManage','filtrate'])" style="height: 60px">筛选</span>
        <span v-show="submitted" @click="fadeChange(['stationManage','tab'])" style="height: 140px;">信道使用详细情况</span>
        <span v-show="submitted" @click="fadeChange(['stationManage','pie'])" style="height: 140px;">信号使用统计情况</span>
      </div>
      <!-- 地图 -->
      <map1 class="map" ref="map" @showLine="showLine" @stationInfoAlertList="markerClick"/>
      <!-- 切换 -->
      <change v-show="submitted" @energyCircle="energyCircle" @frequencyMap="frequencyMap1"
              @energyRetangle="energyRetangle" class="tabbar"/>
      <!-- 筛选表单 -->
      <!--<VueDraggableResizable :resizable="true" :x="20" :y="50" :z="999" :parent="true">-->
      <filtrate        v-loading="filtrate_loading"
                       element-loading-text="数据加载中"
                       element-loading-spinner="el-icon-loading"
                       element-loading-background="rgba(255, 255, 255, 0.8)"
                       :date-type="dateType" v-on:submit="submit"
                v-on:filtrate-minus="fadeChange(['stationManage','filtrate'])"
                :class="['switch-form',fade.stationManage.filtrate?fadeInCss:fadeOutCss]"/>
      <!--</VueDraggableResizable>-->

      <VueDraggableResizable :resizable="false" :x="40" :y="132" :z="fade.stationManage.tab?1000:0">
        <tab id="tab" :tab-data="tabData" v-on:currentClick="tabClick" v-on:minus="fadeChange(['stationManage','tab'])"
             :class="[fade.stationManage.tab?zoomInCss:zoomOutCss]"/>
        <div @click="multiShow" class="multi__show">
            多站多信道对比
        </div>
      </VueDraggableResizable>
      <vue-draggable-resizable v-show="line_show"  :resizable="false" :x="30" :y="132" :z="1001">
      <lineChart :data="line_data" @showLine="line_show=!line_show" />
      </vue-draggable-resizable>
      <!--&lt;!&ndash; 信号使用情况饼图 &ndash;&gt;-->
      <VueDraggableResizable :resizable="false" :x="40" :y="182" :z="fade.stationManage.pie?1000:0">
        <div
          v-loading="pieLoading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          class="pie" :class="[fade.stationManage.pie?zoomInCss:zoomOutCss]">
          <div class="pie-top">
            <div class="pie-head">
              <span class="pie-title">信号使用情况</span>
            </div>
            <span @click="fadeChange(['stationManage','pie'])" class="minus"><i
              class="el-icon-minus i-minus"></i></span>
          </div>
          <ratioPie :option="ratioPieOption" :setting="{width:'500px',height:'300px'}"/>
        </div>
      </VueDraggableResizable>
      <VueDraggableResizable v-show="rainShow" :resizable="false" :x="500" :y="80" :z="1000">
        <div class="figure-rain">
          <div class="rain-head">
            <div class="rain-title">{{ stationName}}固定站信道占用度变化趋势</div>
            <div class="rain-date">
              <label>日期筛选：</label>
              <el-select class="rain-date-pick" @change="dateChange(0)" size="small" v-model="rainYear"
                         placeholder="选择年">
                <el-option v-for="(item,index) in selectYear" :key="index" :value="index">{{index}}</el-option>
              </el-select>
              <el-select class="rain-date-pick" @change="dateChange(1)" size="small" v-model="rainMonth"
                         placeholder="选择月">
                <el-option v-for="(item,index) in selectMonth" :key="index" :value="index">{{index}}</el-option>
              </el-select>
              <el-select class="rain-date-pick" @change="updateRainData()" size="small" v-model="rainDay"
                         placeholder="选择日">
                <el-option v-for="(item) in selectDay" :key="item" :value="item">{{item}}</el-option>
              </el-select>
            </div>
            <span @click="closeRain" class="minus" style="top:10px"><i class="el-icon-close"></i></span>
          </div>
          <div class="rain-chart">
            <highcharts @click.native="hiClick" id="chart" :options="heatMapOption" ref="highcharts"></highcharts>
          </div>
        </div>
      </VueDraggableResizable>
    </div>
  </div>
</template>
<style scoped>
  #stationMange .container {
    width: 100%;
    height: 100%;
    margin: auto;
    /* margin-top: 20px; */
    position: relative;
  }

  .colorAxis {

  }

  #stationMange {
    color: #ffffff;
    /* height: 1200px; */
  }

  .map {
    min-height: 900px;
    z-index: 999;
  }

  #stationMange .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pie-top {
    height: 50px;
    color: #6192B4;
  }

  .pie-head {
    height: 50px;
    line-height: 50px;
    padding-left: 14px;
    background: url('../../assets/image/doubleArrows.png') no-repeat;
    background-position: 14px;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
    border-bottom: solid 1px #c6c6c6;
  }

  .pie-title {
    color: #56e5ff;
  }

  .rain-date-pick {
    width: 100px;
    margin: 0 10px;
  }

  .minus {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: #2774A5;
    font-size: 16px;
    top: 15px;
  }

  .switch-form {
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 1000;
  }

  #tab {
    /*position: absolute;*/
    /*top: 132px;*/
    /*left: 40px;*/
    z-index: 1000;
  }

  #stationMange .filBox {
    width: 90%;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  #stationMange .pie {
    border: solid 1px #33ccff;
    background: #FEFFFF;
    width: 500px;
    min-height: 400px;
    top: 200px;
    left: 50px;
    z-index: 1000;
  }

  .figure-rain {
    border: solid 1px #33ccff;
    background: #FEFFFF;
    width: 900px;
    height: 500px;
    color: #686868;
  }

  .figure-rain .rain-head {
    height: 80px;
    margin: 0 auto;
  }

  .rain-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: solid 1px #c6c6c6;
  }

  .rain-date {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
  }

  #stationMange .pie img {
    position: absolute;
    top: 17px;
    left: 13px;
  }

  #stationMange .table {
    padding: 0 10px;
    position: absolute;
    top: 490px;
    left: 20px;
    z-index: 1000;
    border: solid 1px #33ccff;
    background: rgba(0, 0, 0, 0.88);
  }

  #stationMange .tabbar {
    width: 40%;
    position: absolute;
    z-index: 1000;
    top: 2px;
    left: 33%;
  }

  .topz {
    z-index: 1000;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0 !important;
  }
  .multi__show {
    background: #FEFEFE;
    width: 500px;
    height: 40px;
    color: #53ABEE;
    border: solid 1px #80DCF7;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
<script>
  import {menuShowMixin, animateMixin} from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import filtrate from '../../components/stationManage/filtrate.vue'
  import ratioPie from '../../components/stationManage/ratioPie.vue'
  import GetRatioPieOption from 'assets/js/chartOptions/ratioPieOption'
  import tab from '../../components/stationManage/tab.vue'
  import change from '../../components/stationManage/change.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import VueDraggableResizable from 'components/common/draggable'
  import GetHeatMapOption from "assets/js/chartOptions/highchartsOptions";
  import lineChart from '../../components/common/lineChart'
  export default {
    data() {
      return {
        ratioPieOption: {},
        heatMapOption: {},
        isShow: true,
        rainYear: '',
        rainMonth: '',
        rainDay: '',
        rainShow: false,
        startFreq: 88,
        stopFreq: 108,
        startTime: '2017-01-01',
        stopTime: '2017-11-01',
        dateType: '',
        tabData: [],
        param: {},
        submitted: false,
        navBarTitle: '',
        selectYear: [],
        selectMonth: [],
        selectDay: [],
        sid: 0,
        line_show:false,
        line_data:[],
        energyCircleData:[],
        filtrate_loading:false,
        loading:false,
        stationName:'',
        pieLoading:false,
      }
    },
    components: {
      nav1,
      filtrate,
      ratioPie,
      tab,
      map1,
      change,
      VueDraggableResizable,
      lineChart
    },
    mixins: [menuShowMixin, animateMixin],
    mounted() {
      this.submitted = false;
      this._getDateType();
      this.startFreq = this.$route.query.startFreq;
      this.stopFreq = this.$route.query.stopFreq;
      if(this.$route.query.startTime && this.$route.query.stopTime) {
        let param = {
          startTime:this.$route.query.startTime,
          endTime:this.$route.query.stopTime,
        };
        this.submit(param);

      }
    },
    methods: {
      _emptyMap(){
        this.energyCircle(false);
        this.frequencyMap1(false);
        this.energyRetangle(false);
        this.$refs.map.stationMarker([],false,false);
      },
      energyCircle: function (show) {
        if (!show) {
          this.$refs.map.energyCircle([],0,0,show);
          return
        }
        this.loading = true;
        this.$api.stationManage.getBandTrace(this.param).then(res => {
          this.$refs.map.energyCircle(res.data.position_Powers, res.data.maxPower, res.data.minPower, show);
          this.loading = false;
        })
      },
      frequencyMap1: function (show) {
        if (!show) {
          this.$refs.map.frequencyMap([], 0, 0, show);
          return
        }
        this.loading = true;
        this.$api.stationManage.getBandSpectrumMap(this.param).then(res => {
          this.$refs.map.frequencyMap(res.data.datas,res.data.max,res.data.min, show,false);
          this.loading = false;
        });
      },
      energyRetangle(show) {
        if (!show) {
          this.$refs.map.energyRetangle([], 0, 0, show);
          return
        }
        this.loading = true;
        this.$api.stationManage.getNetOccuy(this.param).then(res => {
          let data = [];
          let {aNetOccuy, position_NetOccuys} = res.data;
          this.loading = false;
          // this.navBarTitle = `您所查询的频段网格化占用度为：${aNetOccuy.toFixed(2)}%`;
          this.$refs.map.energyRetangle(position_NetOccuys, show);
        })
      },
      initMarker() {
        this.$api.stationManage.getBandFixStations(this.param).then(res => {
          console.log(res);
          let data = [];
          for (let i = 0; i < res.data[0].stations.length; i++) {
            let sta = res.data[0].stations[i];
            data.push({
              code: sta.sid,
              name: sta.stationName,
              longitude: sta.stationPosition.x,
              latitude: sta.stationPosition.y
            });
          }
          this.$refs.map.stationMarker(data,false);
        });
      },
      submit(param) {
        this._emptyMap();
        this.filtrate_loading = true;
        this.startTime = param.startTime;
        this.stopTime = param.endTime;
        this.param = {
          cid: '34170000',
          startTime: param.startTime,
          stopTime: param.endTime,
          startFreq: this.startFreq,
          stopFreq: this.stopFreq,
        };
        this.initMarker();
        this.loading = true;
        this.pieLoading = true;
        //获取信号使用情况
        this.$api.stationManage.getBandSignalUsageInfo(this.param).then(res => {
          this.pieLoading = false;
          this.loading = false;
          this.filtrate_loading = false;
          let key_data = [];
          let color = [];
          let pieData = res.data.info;
          for (let i = 0; i < pieData.length; i++) {
            key_data.push(pieData[i].name);
            color.push(pieData[i].color);
          }
          this.ratioPieOption = GetRatioPieOption({key_data: key_data, value_data: pieData, color: color});
          this.submitted = true;
          this.tabData = res.data.detail;
          this.filtrate_loading = false;
          this.submitted = true;
          this.fadeChange(['stationManage', 'filtrate'], true);
          this.fadeChange(['stationManage', 'tab'], true);
          this.fadeChange(['stationManage', 'pie'], true);
        });
        // //获取信道使用情况
        // this.$api.stationManage.getBandChannelUsageInfo(this.param).then(res => {
        //
        // });
        //获取固定站marker
        this.navBarTitle = `频段:${this.startFreq}MHz-${this.stopFreq}MHz 当前查询：${this.startTime}~${this.stopTime}`;
      },
      tabClick(item) {
        const {href} = this.$router.resolve({
          name: 'useSituation',
          query: {
            freq: item.freq,
            startTime:this.startTime,
            stopTime:this.stopTime,
            startFreq:this.startFreq,
            stopFreq:this.stopFreq,
          }
        });
        window.open(href, '_blank');
        // this.updateRainData(data);
      },
      closeRain() {
        this.rainShow = false;
      },
      dateChange(index) {
        switch (index) {
          case 0:
            let year = this.rainYear;
            this.selectMonth = this.selectYear[year];
            break;
          case 1:
            let month = this.rainMonth;
            this.selectDay = this.selectMonth[month];
            break;
        }
      },
      hiClick(e) {
        console.log(e, 'e');
      },
      _getDateType() {
        this.$api.stationManage.getDateType().then(res => {
          this.dateType = res.data.toLowerCase();
        });
      },
      markerClick(marker) {
        this.loading = true;
        let sid = marker.code;
        this.stationName = marker.name;
        this.sid = sid;
        this._getFixStDays(sid).then(res => {
          this.selectYear = res.data;
          this.rainYear = Object.keys(res.data)[0];
          let temp = res.data[this.rainYear];
          this.rainMonth = Object.keys(temp)[0];
          this.rainDay = temp[this.rainMonth][0];
          this.dateChange(0);
          this.dateChange(1);
          this.updateRainData();
        });
      },
      _getFixStDays(sid) {
        let param = this.param;
        param.sid = sid;
        return this.$api.stationManage.getFixStDays(param);
      },
      updateRainData() {
        if (!this.rainYear || !this.rainMonth || !this.rainDay) {
          this.$message.error("请先选择年、月！");
          return;
        }
        if (!this.sid) {
          this.$message.error("参数错误!");
        }
        let param = this.param;
        param.sid = this.sid;
        param.time = `${this.rainYear}-${this.rainMonth}-${this.rainDay}`;
        this.$api.stationManage.getFixWaterfall(param).then(res => {
          let temp = Object.entries(res.data.channelOccupyDatas);
          console.log(temp, 'res');
          let data = [];
          for (let i = 0; i < temp.length; i++) {
            let subTemp = temp[i];
            for (let j = 0; j < subTemp[1].length; j++) {
              data.push({
                x: Number(subTemp[0]),
                y: j,
                value: subTemp[1][j] == -1 ? undefined : subTemp[1][j] / 100,
              });
            }
          }
          console.log(data, 'data');
          this.heatMapOption = GetHeatMapOption({
            data: data,
            yAxis_name: '(MHz)',
            xAxis_name: '时间'
          });
          this.loading = false;
          this.rainShow = true;
        });

      },
      multiShow(){
        const {href} = this.$router.resolve({
          name:'multiShow',
          query:{
            startTime:this.startTime,
            stopTime:this.stopTime,
            startFreq:this.startFreq,
            stopFreq:this.stopFreq,
          },
        });
        window.open(href, '_blank');
      },
      showLine(point){
        this._getTraceSpertrum(point)
      },
      _getTraceSpertrum(point){
        let param = this.param;
        param.lat = point.lat;
        param.lon = point.lng;
        this.$api.stationManage.getTraceSpertrum(param).then(res=>{
          this.line_data = res.data;
          if(res.data)
            this.line_show = true;
        });
      },
    }
  }
</script>
