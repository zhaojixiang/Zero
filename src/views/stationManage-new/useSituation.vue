<template>
  <div id="stationMange"
       v-loading="loading"
       element-loading-text="数据加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <nav1 :showTitle="true" :navBarTitleShow="true" :navBarTitle="`频率：${currentFreq}MHz`"/>
    <div class="container">
      <div class="side-span">
        <span class="lable2" @click="fadeChange(['stationManage','fixStation'])" style="height: 125px;">固定站列表</span>
        <span class="lable1" @click="fadeChange(['stationManage','tab'])" style="height: 125px;">信道使用情况表</span>
      </div>
      <!-- 地图 -->
      <map1 class="map" ref="map" @showLine="showLine" @showSpectra0="SpectraShow"/>
      <!-- 切换 -->
      <change @energyCircle="energyCircle" @frequencyMap="frequencyMap1" class="tabbar" :show="show"/>
      <!-- 信道使用情况表 -->
      <VueDraggableResizable :resizable="false" :x="40" :y="125" :z="fade.stationManage.tab?1001:0">
        <tab
          v-loading="tab_loading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
          :tab-data="tabData" id="tab" v-on:currentClick="tabClick" v-on:minus="fadeChange(['stationManage','tab'])"
             :class="[fade.stationManage.tab?zoomInCss:zoomOutCss]"/>
      </VueDraggableResizable>
      <VueDraggableResizable :resizable="false" :x="40" :y="0" :z="fade.stationManage.fixStation?1000:0">
        <paging
          v-loading="page_loading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
          :data="pageData" @minus="fadeChange(['stationManage','fixStation'])" v-on:selected="SpectraShow"
                :class="['paging',fade.stationManage.fixStation?zoomInCss:zoomOutCss]" :columns="2"/>
        <div @click="goback" class="multi__show">
          返回上一页
        </div>
      </VueDraggableResizable>
      <vue-draggable-resizable v-show="line_show"  :resizable="false" :x="150" :y="132" :z="1001">
        <lineChart :data="line_data" @showLine="line_show=!line_show" />
      </vue-draggable-resizable>
      <VueDraggableResizable :resizable="false" v-show="showSpectra" :x="200" :y="200" :z="1002">
        <div class="spectra">
          <div class="spectra-head">
            <div class="spectra-title">{{startTime}}至{{stopTime}} {{currentFreq}}MHz功率变化趋势</div>
            <div class="spectra-date">
              <label>日期筛选：</label>
              <el-select class="spectra-date-pick" @change="dateChange(0)" size="small" v-model="specYear"
                         placeholder="选择年">
                <el-option v-for="(item,index) in selectYear" :key="index" :value="index">{{index}}</el-option>
              </el-select>
              <el-select class="spectra-date-pick" @change="dateChange(1)" size="small" v-model="specMonth"
                         placeholder="选择月">
                <el-option v-for="(item,index) in selectMonth" :key="index" :value="index">{{index}}</el-option>
              </el-select>
              <el-select class="spectra-date-pick" @change="updateSpecData()" size="small" v-model="specDay"
                         placeholder="选择日">
                <el-option v-for="(item) in selectDay" :key="item" :value="item">{{item}}</el-option>
              </el-select>
            </div>
            <span @click="closeSpectra" class="minus" style="top:10px"><i class="el-icon-close"></i></span>
          </div>
          <div class="spectra-chart">
            <spectra :option="spectraBarOption" :setting="{width:'1000px',height:'300px'}"/>
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

  #tab {
    z-index: 1000;
  }

  .paging {
    background: #fff;
    /*position: absolute;*/
    z-index: 1000;
    width: 500px;
    height: 600px;
    color: #656565;
    border: solid 1px #33cdff;
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

  .filtrate {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
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
    background: rgba(0, 0, 0, 0.88);
    /* position: absolute; */
    width: 500px;
    top: 200px;
    left: 50px;
    z-index: 999;
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
    z-index: 999;
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

  #stationMange .occupyBar {
    position: absolute;
    bottom: 0px;
    left: 22px;
    z-index: 1000;
    background-color: #fff;
  }

  #stationMange .occupyBar i {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1200;
  }

  .side-span {
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  .side-span span {
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

  .spectra {
    border: solid 1px #33ccff;
    background: #FEFFFF;
    width: 1000px;
    height: 400px;
    color: #686868;
  }

  .spectra .spectra-head {
    height: 80px;
    margin: 0 auto;
  }

  .spectra-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: solid 1px #c6c6c6;
  }

  .spectra-date {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
  }

  .spectra-date-pick {
    width: 100px;
    margin: 0 10px;
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
  import ratioPie from '../../components/stationManage/ratioPie.vue'
  import tab from '../../components/stationManage/tab.vue'
  import change from '../../components/stationManage/change.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import spectra from 'components/stationManage/spectraBar'
  import VueDraggableResizable from 'components/common/draggable'
  import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
  import paging from 'components/stationManage/newPaging'
  import lineChart from '../../components/common/lineChart'

  export default {
    data() {
      return {
        show: [true, true, false],
        select: true,
        spectraBarOption: {},
        isShow: true,
        showSpectra: false,
        filtrateFadeOut: false,
        filtrateFadeIn: false,
        currentFreq: 10,
        startTime: '',
        stopTime: '',
        pageData: [],
        specYear: '',
        specMonth: '',
        specDay: '',
        selectYear: [],
        selectMonth: [],
        selectDay: [],
        sids: [],
        tabData:[],
        startFreq:'',
        stopFreq:'',
        line_show:false,
        line_data:[],
        page_loading:false,
        tab_loading:false,
        spectra_loading:false,
        loading:false,
      }
    },
    components: {
      nav1,
      ratioPie,
      tab,
      map1,
      change,
      spectra,
      VueDraggableResizable,
      paging,
      lineChart
    },
    mixins: [menuShowMixin, animateMixin],
    mounted() {
      this.currentFreq = this.$route.query.freq;
      this.startTime = this.$route.query.startTime;
      this.stopTime = this.$route.query.stopTime;
      this.startFreq = this.$route.query.startFreq;
      this.stopFreq = this.$route.query.stopFreq;
      this.param = {
        cid: '34170000',
        startTime: this.startTime,
        stopTime: this.stopTime,
        startFreq:this.startFreq,
        stopFreq:this.stopFreq,
        centerfreq: this.currentFreq,
        span: 100,
      };
      this._getChannelFixStations();
      this._getChannelUsage();
    },
    methods: {
      _emptyMap(){
        this.energyCircle(false);
        this.frequencyMap1(false);
      },
      energyCircle: function (show) {
        if (!show) {
          this.$refs.map.energyCircle([],0,0,show);
          return
        }
        this.$api.stationManage.getChannelTrace(this.param).then(res => {
          this.$refs.map.energyCircle(res.data.position_Powers, res.data.maxPower, res.data.minPower, show)
        })
      },
      frequencyMap1: function (show) {
        if (!show) {
          this.$refs.map.frequencyMap([], 0, 0, show);
          return
        }
        this.$api.stationManage.getChannelSpectrumMap(this.param).then(res => {
          this.$refs.map.frequencyMap(res.data, 100, 0, show);
        });
      },
      occupy1() {
        this.showOccupy = !this.showOccupy;
      },
      closeSpectra() {
        this.showSpectra = false;
        // alert(222);
      },
      SpectraShow(selected) {
        this._emptyMap();
        this.spectra_loading = true;
        console.log(selected, 'selectSations');
        let sids = [];
        for (let i = 0; i < selected.length; i++) {
          sids.push(selected[i].sid);
        }
        let param = this.param;
        this.sids = sids.join(",");
        param.sids = this.sids;
        this.loading = true;
        //获取可选日期
        this.$api.stationManage.getFixStsDays(param).then(res => {
          this.selectYear = res.data;
          this.specYear = Object.keys(res.data)[0];
          let temp = res.data[this.specYear];
          this.specMonth = Object.keys(temp)[0];
          this.specDay = temp[this.specMonth][0];
          this.dateChange(0);
          this.dateChange(1);
          this.updateSpecData();
          this.showSpectra = true;
        });
      },
      tabClick(item) {
        console.log(item, 'tab click');
        this.currentFreq = item.freq;
        this.param.centerfreq = item.freq;
        this.$message.success("已成功切换当前查询频率!");
        this._getChannelFixStations();
      },
      _getChannelFixStations() {
        this.page_loading = true;
        let param = this.param;
        this.$api.stationManage.getChannelFixStations(param).then(res => {
          this.pageData = res.data[0].stations;
          this.page_loading = false;
        });
      },
      dateChange(index) {
        switch (index) {
          case 0:
            let year = this.specYear;
            this.selectMonth = this.selectYear[year];
            break;
          case 1:
            let month = this.specMonth;
            this.selectDay = this.selectMonth[month];
            break;
        }
      },
      updateSpecData() {
        let param = this.param;
        param.sids = this.sids;
        param.time = `${this.specYear}-${this.specMonth}-${this.specDay}`;
        this.$api.stationManage.getStPowerVariety(param).then(res => {
          console.log(res, 'power');
          let xAxis = [];
          for (let i = 0; i < 24; i++) {
            xAxis.push(`${(Array(2).join(0) + i).slice(-2)}:00`);
          }
          let series = [];
          for (let i = 0; i < res.data.length; i++) {
            let sta = res.data[i];
            series.push({
              name: sta.name,
              type: 'line',
              data: sta.powers,
              symbolSize: 8,
            });
          }
          this.spectraBarOption = GetSpectraBarOption({title: '', xAxis: xAxis, series: series});
          this.spectra_loading = false;
          this.loading = false;
        });
      },
      _getChannelUsage(){
        this.tab_loading = true;
        //获取信道使用情况
        this.$api.stationManage.getBandChannelUsageInfo(this.param).then(res => {
          this.tabData = res.data;
          this.tab_loading = false;
        });
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
      goback:function(){
        this.$router.push({
          name:'StationManageShow',
          query:{
            startTime:this.startTime,
            stopTime:this.stopTime,
            startFreq:this.startFreq,
            stopFreq:this.stopFreq,
          },
        })
      },

    }
  }
</script>
