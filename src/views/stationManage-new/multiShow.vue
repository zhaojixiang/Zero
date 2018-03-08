<template>
  <div
    v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    id="stationMange">
    <nav1 :showTitle="true"/>
    <div class="container">
      <div class="side-span">
        <span @click="fadeChange(['stationManage','multiFilter'])" style="height: 60px">筛选</span>
      </div>
      <!-- 地图 -->
      <map1 class="map" @showLine="showLine" ref="map"/>
      <!-- 切换 -->
      <change @energyCircle="energyCircle" class="tabbar"
              :show="show"/>
      <!-- 筛选表单 -->
      <VueDraggableResizable :resizable="false" :x="40" :y="0" :z="fade.stationManage.multiFilter?1000:0">
      <!--<filtrate v-on:submit="submit" v-on:filtrate-minus="fadeChange(['stationManage','filtrate'])" :class="['switch-form',fade.stationManage.filtrate?fadeInCss:fadeOutCss]"/>-->
        <div
          v-loading="sta_loading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
          :class="['filter',fade.stationManage.multiFilter?fadeInCss:fadeOutCss]">
          <!--筛选-->
          <div class="top">
              <span class="title">筛选</span>
              <span class="minus" @click="fadeChange(['stationManage','multiFilter'])"><i class="el-icon-minus i-minus"></i></span>
          </div>
          <div class="filter-content">
              <div class="filter-group">
                <label>站选择:</label>
                <div>
                  <el-checkbox-group
                    v-model="checkedStations">
                    <el-checkbox class="station-checkbox" v-for="(item,index) in stations" :label="item" :key="index" v-show="stationMoreShow||(!stationMoreShow&&index<8)">{{item.stationName}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <span v-show="stations.length>8" class="station-more" @click="showMoreStation"><i :class="[stationMoreShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i></span>
              </div>
              <div class="channel-group">
                <label>信道选择:</label>
                <!--<div class="legend">-->
                  <!--<ul class="icons_ul">-->
                    <!--<li class="icons">-->
                      <!--<span class="square" style="background: #13c0a5"></span>合法-->
                    <!--</li>-->
                    <!--<li class="icons">-->
                      <!--<span class="square" style="background: #e37d62"></span>违规-->
                    <!--</li>-->
                    <!--<li class="icons">-->
                      <!--<span class="square" style="background: #e3b63c"></span>非法-->
                    <!--</li>-->
                    <!--<li class="icons">-->
                      <!--<span class="square" style="background: #1f8ddd"></span>未分配-->
                    <!--</li>-->
                  <!--</ul>-->
                <!--</div>-->
                <!--<table cellspacing="0" class="tab__table">-->
                  <!--<tbody>-->
                  <!--<tr v-for="(item,index) in tabData" :key="index">-->
                    <!--<td class="channel_title">{{ index }}</td>-->
                    <!--<td v-for="(data,index) in item"-->
                        <!--:class="['channel_td',data[0].mChannelType==0?'legal':data[0].channelTypeEnum==1?'lawlessness':data[0].channelTypeEnum==2?'illegal':data[0].channelTypeEnum==3?'unregisteredUnused':'unregisteredUnused']"-->
                        <!--@click="channelClick(index)" :key="index">-->
                      <!--<i v-show="data.checked" class="channel-checked el-icon-check"></i>-->
                      <!--<el-popover-->
                        <!--placement="top"-->
                        <!--width="120"-->
                        <!--trigger="click">-->
                        <!--&lt;!&ndash; <slot>{{`频率: ${data[0].freq}  信号覆盖率: ${data[0].result.signalCover}%`}}</slot> &ndash;&gt;-->
                        <!--<div>-->
                          <!--<p>{{`频率:${data[0].freq}MHz`}}</p>-->
                          <!--<p>{{`信号覆盖率:${data[0].result.signalCover}%`}}</p>-->
                        <!--</div>-->
                        <!--<el-button type="text" slot="reference" :style="{color:'#6c6c6c'}">{{data[0]['amount']}}</el-button>-->
                      <!--</el-popover>-->
                    <!--</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                <!--</table>-->
                <tab :check="true" :tab-data="tabData" id="tab" v-on:currentClick="channelClick"/>
              </div>
          </div>
          <!--执行分析-->
          <button @click="submit" class="button">
            执行分析
          </button>
        </div>
        <div @click="goback" class="multi__show">
          返回上一页
        </div>
      </VueDraggableResizable>
      <vue-draggable-resizable v-show="line_show"  :resizable="false" :x="150" :y="132" :z="1001">
        <lineChart :data="line_data" @showLine="line_show=!line_show" />
      </vue-draggable-resizable>
      <VueDraggableResizable v-show="rainShow" :resizable="false" :x="500" :y="80" :z="1000">
        <div
          v-loading="rain_loading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          class="figure-rain">
          <div class="rain-head">
            <div class="rain-title">信道占用度对比</div>
            <div class="rain-date">
              <el-button @click="heatMapReverse" class="reverse__btn" size="small">{{heatMapReversed?"按站分类":"按频率分类"}}</el-button>
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
            <highcharts  id="chart" :options="heatMapOption" ref="highcharts"></highcharts>
          </div>
        </div>
      </VueDraggableResizable>
    </div>
  </div>
</template>
<style scoped>
  .filter-group .el-checkbox-group {
    text-align: left;
    margin: 0 auto;
  }
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
  .el-input--suffix .el-input__inner {
    padding-right: 0;
  }
  .filter {
    width: 500px;
    border: solid 1px #33ccff;
    background: #FEFFFF;
    font-size: 14px;
  }
  .filter .top {
    margin-top: 10px;
    padding-left: 43px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: 14px;
    color: #2774A5;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #c6c6c6;
  }
  .filter-group {
    color: #8F9091;
    width: 90%;
    margin: 10px auto;
  }
  .channel-group {
    color: #8F9091;
    width: 90%;
    margin: 10px auto;
  }

  .station-more {
    display: block;
    text-align: center;
    cursor: pointer;
  }
  .station-checkbox {
    margin-left: 0;
    padding: 0 15px;
    width: 50px;
  }
  .button{
    font-size: 16px;
    color: #fff;
    text-align: center;
    height: 40px;
    width: 30%;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    /*line-height: 40px;*/
    background: #66A7D0;
    margin-bottom: 10px;
  }
  .tab__table tr td {
    width: 19px;
    height: 19px;
    padding: 0;
    text-align: center;
    border: solid 1px #6c6c6c;
    cursor: pointer;
  }
  .tab__table {
    width: 80%;
    border-collapse: collapse;
    margin: 0 auto;
  }
  .channel_title,
  .channel_td {
    color: #6c6c6c;
  }
  .legend ul li {
    list-style: none;
    padding: 0px;
    height: 20px;
    line-height: 20px;
    color:#8F9091;
  }
  .legal {
    background-color: #13c0a5;
  }
  .lawlessness {
    background-color: #e37d62;
  }
  .illegal {
    background-color: #e3b63c;
  }
  .registeredUnused {
    background-color: #1f8ddd;
  }
  .unregisteredUnused {
    background-color: #c0c0c0;
  }
  .icons_ul {
    display: flex;
    justify-content: center;
  }
  .square {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 10px;
    background-color: #f40;
  }
  .item-td {
    position: relative;
  }
  .reverse__btn {
    width: 80px;
    height: 35px;
    position: absolute;
    left: 55px;
  }
  .tabbar {
    width: 40%;
    position: absolute;
    z-index: 1000;
    top: 2px;
    left: 33%;
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
  import {menuShowMixin,animateMixin} from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import change from '../../components/stationManage/change.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import VueDraggableResizable from 'components/common/draggable'
  import tab from '../../base/tab.vue'
  import GetHeatMapOption from "assets/js/chartOptions/highchartsOptions"
  import lineChart from '../../components/common/lineChart'

  export default {
    data() {
      return {
        show:[false,true,false],
        heatMapOption:{},
        isShow:true,
        rainYear:'',
        rainMonth:'',
        rainDay:'',
        rainShow:false,
        checkedStations:[],
        checkedChannels:[],
        stationMoreShow:false,
        channelMoreShow:false,
        title:[],
        tabData:[],
        startTime:'',
        stopTime:'',
        startFreq:'',
        stopFreq:'',
        stations:[],
        checkedChannels:[],
        sids:[],
        channels:[],
        selectYear: [],
        selectMonth: [],
        selectDay: [],
        heatMapData: [],
        heatMapReversed:false,
        rainLoading:true,
        line_show:false,
        line_data:[],
        sta_loading:false,
        rain_loading:false,
        loading:false,
      }
    },
    components: {
      nav1,
      map1,
      change,
      VueDraggableResizable,
      tab,
      lineChart
    },
    mixins: [menuShowMixin,animateMixin],
    mounted() {
      this.startTime = this.$route.query.startTime;
      this.stopTime = this.$route.query.stopTime;
      this.startFreq = this.$route.query.startFreq;
      this.stopFreq = this.$route.query.stopFreq;
      this.param = {
        cid:'34010000',
        startTime:this.startTime,
        stopTime:this.stopTime,
        startFreq:this.startFreq,
        stopFreq:this.stopFreq
      };
      this._getBandFixStations();
      this._getChannelUsage();
    },
    methods: {
      _emptyMap(){
        this.energyCircle(false);
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
      initMarker(data){
        this.$refs.map.stationMarker(data);
      },
      submit(){
        this._emptyMap();
        this.fadeChange(['stationManage','figure']);
        let sids = [];
        for (let i=0;i<this.checkedStations.length;i++){
          sids.push(this.checkedStations[i].sid);
        }
        this.sids = sids.join(",");
        for(let freq in this.checkedChannels) {
          if(this.checkedChannels[freq].checked) {
            this.channels.push({
              freq:freq,
              span:100,
            });
          }
        }
        this._getSpanFixStsDays();
        this.rainShow = true;
        console.log(this.sids,this.channels);
      },
      closeRain(){
        this.rainShow = false;
      },
      showMoreStation(){
        this.stationMoreShow = !this.stationMoreShow;
      },
      showMoreChannel(){
        this.channelMoreShow = !this.channelMoreShow;
      },
      channelClick(item,index,idx){
        this.checkedChannels[item.freq] = item;
        console.log(this.checkedChannels,'list');
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
      _getBandFixStations() {
        let param = this.param;
        this.$api.stationManage.getBandFixStations(param).then(res => {
          this.stations = res.data[0].stations;
        });
      },
      _getChannelUsage(){
        this.sta_loading = true;
        //获取信道使用情况
        this.$api.stationManage.getBandChannelUsageInfo(this.param).then(res => {
          this.sta_loading = false;
          let data = res.data.data;
          for(let i=0;i<data.length;i++) {
            for(let j=0;j<data[i].data.length;j++){
              data[i].data[j].checked = false;
            }
          }
          console.log(data,'data');
          this.tabData = res.data;
        });
      },
      _getSpanFixStsDays() {
        this.rain_loading = true;
        let param = this.param;
        param.sids = this.sids;
        return this.$api.stationManage.getSpanFixStsDays(param).then(res=>{
          this.rain_loading = false;
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
      updateRainData() {
        if (!this.rainYear || !this.rainMonth || !this.rainDay) {
          this.$message.error("请先选择年、月！");
          return;
        }
        if (!this.sids) {
          this.$message.error("参数错误!");
        }
        this.rain_loading = true;
        let sids = this.sids;
        let time = `${this.rainYear}-${this.rainMonth}-${this.rainDay}`;
        this.$api.stationManage.getMultiChStUsage(this.param.cid,sids,time,this.channels).then(res => {
          this.heatMapData = res.data;
          this._updateHeatMapOPtion();
          this.rain_loading = false;
        });

      },
      _updateHeatMapOPtion(){
        let heatMapData = this.heatMapData;
        if(this.heatMapReversed) {
          //按站分类
          heatMapData.sort(function(a,b){
            //按站名排序
            // var nameA = a.name.toUpperCase();
            // var nameB = b.name.toUpperCase();
            // if (nameA < nameB) {
            //   return -1;
            // }
            // if (nameA > nameB) {
            //   return 1;
            // }
            // return 0;
            //按站ID排序
            return (a.sid != b.sid)?a.sid-b.sid:a.freq-b.freq;
          });
        } else {
          //按频率分类
          heatMapData.sort(function(a,b){
            return (a.freq != b.freq)?a.freq-b.freq:a.sid-b.sid;
          });
        }
        console.log(heatMapData,'heatMapData');
        let data = [];
        let category = [];

        for (let i = 0; i < heatMapData.length; i++) {
          let temp = heatMapData[i];
          if(this.heatMapReversed) {
            var name = temp.name+"-"+temp.freq;
            category.push({name:temp.name});
          } else {
            var name = temp.freq+"-"+temp.name;
            category.push({name:temp.freq+'MHz'});
          }
          for (let j = 0; j < temp.occups.length; j++) {
            data.push({
              name: name,
              y: j,
              value: temp.occups[j] == -1 ? undefined : temp.occups[j] / 100,
            });
          }
        }
        console.log(data,category,'log');
        this.heatMapOption = GetHeatMapOption({
          data: data,
          yAxis_name: '(MHz)',
          xAxis_name: '时间',
          category:category,
        });
        this.rainShow = true;
      },
      heatMapReverse(){
        this.heatMapReversed = !this.heatMapReversed;
        this._updateHeatMapOPtion();
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
