<template>
  <div>
    <div class="data-reply">
      <div class="reply__head">
        <div class="reply__title">
        </div>
        <div class="label">
          <span v-show="station!=''">{{station}}&nbsp;&nbsp;</span><span v-show="date!=''">时间：{{date}}&nbsp;&nbsp;经度：{{lng}} 纬度：{{lat}}</span>
        </div>
        <!--<span>参考电平：{{refLevel}} dB</span>-->
        <i class="close fa fa-times" aria-hidden="true" @click="close"></i>
      </div>
      <highcharts id="chart" :options="frequencyOption" ref="highcharts"/>
      <div class="axis-btn_up">
        <span @click="axisChange('max',10)" role="button" class="axis-btn__increase"><i class="el-icon-plus"></i></span>
        <span @click="axisChange('max',-10)" role="button" class="axis-btn__decrease"><i class="el-icon-minus"></i></span>
      </div>
      <div class="axis-btn_down">
        <span @click="axisChange('min',10)" role="button" class="axis-btn__increase"><i class="el-icon-plus"></i></span>
        <span @click="axisChange('min',-10)" role="button" class="axis-btn__decrease"><i class="el-icon-minus"></i></span>
      </div>
      <div class="progress">
        <el-slider @change="switchProgress" :max="endTime" class="progress-bar" v-model="percentage"></el-slider>
        <div class="play">
          <div class="play-container">
            <div class="play-icon">
              <i @click="play" :class="[isPlaying ? 'icon-pause' : 'icon-play']"></i>
              <i @click="stop" class="icon-stop"></i>
            </div>
            <div class="play-time">
              <span>{{ firstTime }}/{{ endTime }}</span>
            </div>
            <div class="play-speed">
              <label>播放速度 ：</label>
              <span @click="switchSpeed(1)" :class="[activeSpeed==1 ? 'speed-span play-active':'speed-span']">x1</span>
              <span @click="switchSpeed(2)" :class="[activeSpeed==2 ? 'speed-span play-active':'speed-span']">x2</span>
              <span @click="switchSpeed(4)" :class="[activeSpeed==4 ? 'speed-span play-active':'speed-span']">x4</span>
              <span @click="switchSpeed(8)" :class="[activeSpeed==8 ? 'speed-span play-active':'speed-span']">x8</span>
              <span @click="switchSpeed(16)" :class="[activeSpeed==16 ? 'speed-span play-active':'speed-span']">x16</span>
            </div>
            <div class="play-legend">
              <label>显示 ：</label>
              <span @click="switchLegend(0)" :class="[activeLegend.scan?'legend-span legend-active':'legend-span']">瞬时值</span>
              <span @click="switchLegend(1)" :class="[activeLegend.avg?'legend-span legend-active':'legend-span']">平均值</span>
              <span @click="switchLegend(2)" :class="[activeLegend.min?'legend-span legend-active':'legend-span']">最小值</span>
              <span @click="switchLegend(3)" :class="[activeLegend.max?'legend-span legend-active':'legend-span']">最大值</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import getFrequencyOption from '../../assets/js/chartOptions/hfrequencyOption'
  import {processData,spliceData} from '../../assets/js/frequencyDataDeal'
  import simplify from '../../assets/js/simplify'
  var ws = null
  export default {
    props:[
      'url',
      'station',
    ],
    data(){
      return {
        frequencyOption:{},
        isPlaying:false,
        percentage:0,
        timerFlag:0,
        timer:null,
        renderTimer:null,
        refLevel:80,
        firstTime:0,
        endTime:0,
        activeSpeed:1,
        activeLegend:{
          avg:false,
          max:false,
          min:false,
          scan:true,
        },
        avgArray:[],
        minArray:[],
        maxArray:[],
        series:[],
        date:'',
        lat:'',
        lng:'',
        staName:'',
        timer:null,
      }
    },
    mounted(){
      this.frequencyOption = getFrequencyOption([]);
    },
    methods:{
      initWebscoket:function(url) {
        this.percentage = 0;
        this.firstTime = 0;
        this.activeSpeed = 1;
        this.minArray = [];
        this.maxArray = [];
        this.series = [];
        this.avgArray = [];
        this.isPlaying = false;
        this.emptyChart();
        ws = new WebSocket(url);
        // if(ws.readyState != ws.OPEN) {
        //     this.$message.error('链接错误');
        //     ws = null;
        //     return;
        // } else {
          ws.binaryType = 'arraybuffer';
          ws.onopen = function(e){
            console.log('onopen');
            //获取总帧数
            ws.send('counts');
          }
          var i = 0;
          //监听ws，如果未返回数据则提示用户并且关闭回放框
          this.timer = setInterval(()=>{
            if(i===0){
              this.$message.warning("服务端未响应，请稍候再试!");
              // this.close();
              if(this.timer) {
                clearInterval(this.timer);
              }
            }
          },3000);
          ws.onmessage = (e)=>{
            i++;
            if(typeof e.data == 'string') {
              let temp = eval('('+e.data+')');
              if(temp.CMD == 'Counts') {
                this.endTime = temp.Values;
              }
              if(temp.Values == 0) {
                this.$message.warning('回放数据为空！');
              }
              //获取数据总帧数后开始回放
              this.play();
            }
            if(typeof e.data === 'object') {
              //处理数据流，返回格式obj:{head:{},data:{}}
              let obj = processData(e.data);
              //移动站marker移动
              if(obj.sign == "M") {
                let latlng = {
                  lat:obj.lat,
                  lng:obj.lon,
                };
                console.log(latlng,'latlng');
                this.$emit('mobileEnergyMarker',latlng);
              }


              this.date = `${obj.wYear}年${obj.wMonth}月${obj.wDay}日 ${obj.wHour}:${obj.wMinute}:${obj.wSecond}`;
              this.lat = obj.lat.toFixed(6);
              this.lng = obj.lon.toFixed(6);
              if (i < 2) {
                let min = obj.startFreq / 1000000;
                let max = (obj.startFreq + obj.stepFreq * obj.nCount) / 1000000;
                this.$refs.highcharts.chart.xAxis[0].update({
                  min: min,
                  max: max,
                  // minRange:(obj.stepFreq/1000000)*100,
                  // tickInterval:(obj.stepFreq*obj.nCount)/(1000000*2)
                });
              }
              let data = spliceData(this.avgArray, this.maxArray, this.minArray, obj);
              this.series = data[0];
              this.avgArray = data[1];
              this.maxArray = data[2];
              this.minArray = data[3];
              if (this.$refs.highcharts.chart.series != undefined && this.isPlaying) {
                if (this.activeLegend.scan) {
                  console.time('refresh');
                  this.$refs.highcharts.chart.series[0].setData(data[0], true, true, false);
                  console.timeEnd('refresh');
                }
                if (this.activeLegend.avg) {
                  this.$refs.highcharts.chart.series[1].setData(this.avgArray, true, true, false);
                }
                if (this.activeLegend.min) {
                  this.$refs.highcharts.chart.series[2].setData(this.minArray, true, true, false);
                }
                if (this.activeLegend.max) {
                  this.$refs.highcharts.chart.series[3].setData(this.maxArray, true, true, false);
                }
                //收一次数据，进度条加一次
                this.firstTime = obj.Index;
                this.percentage = this.firstTime;
              }
            }
          }


        // }
      },
      play:function(){
        // if(ws.readyState != ws.OPEN) {
        //   this.$message.error('链接错误');
        //   return;
        // }
        this.isPlaying = !this.isPlaying;
        if(!this.isPlaying) {
          this.$refs.highcharts.chart.stop = true;
          this.$refs.highcharts.chart.originalData = {
            series:this.series,
            avg:this.avgArray,
            min:this.minArray,
            max:this.maxArray,
          };
        } else {
          this.$refs.highcharts.chart.stop = false;
        }
        if(this.isPlaying) {
          // ws.send(`speed${this.speed}`);
        }
        //清楚警告的timer
        clearInterval(this.timer);
        if(this.isPlaying && this.percentage!=100) {
          console.log(this.firstTime,'first');
          if(this.firstTime === 0) {
            ws.send('start');
            console.log('send start');
          } else {
            ws.send('recover');
            console.log('send recover');
          }
        } else {
          ws.send('pause');
          console.log('send pause');
        }
      },
      stop(){
        this._stop();
        this.isPlaying = false;
      },
      //补零
      toDub:function(n){
        return n<10?"0"+n:""+n;
      },
      switchSpeed:function(speed){
        this.activeSpeed = speed;
        if(this.isPlaying) {
          ws.send(`speed${speed}`);
        }
      },
      switchLegend:function(legend){
        switch (legend) {
          case 0:
            this.activeLegend.scan = !this.activeLegend.scan;
            this.$refs.highcharts.chart.series[0].setVisible(this.activeLegend.scan);
            break;
          case 1:
            this.activeLegend.avg = !this.activeLegend.avg;
            this.$refs.highcharts.chart.series[1].setVisible(this.activeLegend.avg);
            break;
          case 2:
            this.activeLegend.min = !this.activeLegend.min;
            this.$refs.highcharts.chart.series[2].setVisible(this.activeLegend.min);
            break;
          case 3:
            this.activeLegend.max = !this.activeLegend.max;
            this.$refs.highcharts.chart.series[3].setVisible(this.activeLegend.max);
            break;
        }
      },
      switchProgress:function(value){
        if(ws) {
          ws.send("count"+value);
        }
      },
      emptyChart(){
        if(this.$refs.highcharts.chart.originalData!=undefined) {
          this.$refs.highcharts.chart.originalData = {
            series:[],
            avg:[],
            min:[],
            max:[],
          };
        }
        if (this.$refs.highcharts.chart.series != undefined) {
          this.$refs.highcharts.chart.series[0].setData([]);
            this.$refs.highcharts.chart.series[1].setData([]);
            this.$refs.highcharts.chart.series[2].setData([]);
            this.$refs.highcharts.chart.series[3].setData([]);
        }
      },
      close(){
        if(this.timer) {
          clearInterval(this.timer);
        }
        this._stop();
        ws&&ws.close();
        this.$emit('minus');
      },
      _stop(){
        try {
          ws&&ws.send("stop");
        } catch(e) {
          console.error(e);
        }
        this.percentage = 0;
        this.firstTime = 0;
        this.activeSpeed = 1;
        this.minArray = [];
        this.maxArray = [];
        this.series = [];
        this.avgArray = [];
        this.emptyChart();
      },
      axisChange(opera,step){
        if(this.$refs.highcharts.chart.yAxis[0]) {
          console.log('update');
          switch (opera.toUpperCase()) {
            case 'MAX':
              this.$refs.highcharts.chart.yAxis[0].update({
                max: this.$refs.highcharts.chart.yAxis[0].max+step,
              });
              break;
            case 'MIN':
              this.$refs.highcharts.chart.yAxis[0].update({
                min: this.$refs.highcharts.chart.yAxis[0].min+step,
              });
              break;
          }
        }
      },
    },
    computed:{
    },
    watch:{
      url:function(newVal){
        if(newVal!=''){
          ws = null;
          console.log(newVal,'replyUrl');
          this.initWebscoket(newVal)
        }
      },
    },
  }
</script>
<style scoped>
  .data-reply{
    background: #FEFEFE;
    height: 725px;
    width: 800px;
  }
  .chart {
    width: 800px;
    height: 600px;
  }
  .data-reply .icon-play {
    background: url('../../assets/image/play.png') no-repeat;
    background-size: contain;
    /*padding-top: 20px;*/
  }
  .data-reply .icon-pause {
    display: inline-block;
    background: url('../../assets/image/pause.png') no-repeat;
    background-size: contain;
  }
  .data-reply .icon-stop {
    display: inline-block;
    background: url('../../assets/image/stop.png') no-repeat;
    background-size: contain;
  }
  .data-reply .play {
    width: 100%;
    height: 50px;
  }
  .data-reply .play-time {
    /*line-height: 90px;*/
    padding: 15px 0px 0 0px;
    width: 100px;
  }
  .data-reply .play-icon {
    width: 70px;
    height: 30px;
    margin: auto 0 auto 20px;
  }
  .data-reply .play-icon i{
    /*margin-left: 30px;*/
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .data-reply .play-speed {
    width: 350px;
    padding-top: 15px;
  }
  .data-reply .play-legend {
    width: 300px;
    padding-top: 15px;

  }
  .data-reply .progress {
    position: absolute;
    /*bottom: 0;*/
    width: 800px;
  }
  .data-reply .label {
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 1;
    color:yellow;
  }
  .data-reply .speed-span {
    width: 30px;
    height: 20px;
    display: inline-block;
    border: solid 1px #5F78BB;
    border-radius: 5px;
    margin: 0 5px;
    cursor: pointer;
  }
  .data-reply .legend-span {
    width: 40px;
    height: 20px;
    display: inline-block;
    border: solid 1px #5F78BB;
    border-radius: 5px;
    margin: 0 5px;
    cursor: pointer;
  }
  .data-reply .play-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    /*padding-top: 25px;*/
    text-align: center;
  }
  .play-active,.legend-active {
    background: #5F78BB;
  }
  .progress-bar {
    height: 20px;
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #fff;
    cursor: pointer;
  }
  .status__bar {
    text-align: center;
  }
  .reply__head {
    width: 100%;
    height: 40px;
    background: #293A55;
  }
  .reply__title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  .axis-btn_up {
    position: absolute;
    top: 50px;
    width: 20px;
    right: 5px;
  }
  .axis-btn_down {
    position: absolute;
    bottom: 17px;
    width: 20px;
    right: 5px;
  }
  .axis-btn__increase {
    background: #FEFEFE;
    border: solid 1px #edf0f1;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    cursor: pointer;

  }
  .axis-btn__decrease {
    background: #FEFEFE;
    border: solid 1px #edf0f1;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

</style>
