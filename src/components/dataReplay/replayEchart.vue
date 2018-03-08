<template>
  <div class="data-reply">
    <div class="label">
      <span>参考电平：{{refLevel}} dB</span>
    </div>
    <chart :options="eOption" ref="echart" class="chart"></chart>
    <!--<highcharts id="chart" :options="frequencyOption" ref="highcharts"></highcharts>-->
    <div class="progress">
      <el-progress :percentage="percentage" :show-text="false"></el-progress>
      <div class="play">
        <div class="play-container">
          <div class="play-icon">
            <i @click="play" :class="[isPlaying ? 'icon-pause' : 'icon-play']"></i>
          </div>
          <div class="play-time">
            <span>{{ firstTime }}/60:00</span>
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
</template>
<script>
  import getFrequencyOption from '../../assets/js/chartOptions/hfrequencyOption'
  import {processData,spliceData} from '../../assets/js/frequencyDataDeal'
  import simplify from '../../assets/js/simplify'
  var ws = null
  export default {
    props:[
      'url'
    ],
    data(){
      return {
        frequencyOption:{},
        isPlaying:false,
        percentage:30,
        minutes:'00',
        seconds:'00',
        timerFlag:0,
        timer:null,
        renderTimer:null,
        refLevel:80,
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
        eOption:{},
      }
    },
    mounted(){
      this.frequencyOption = getFrequencyOption([]);
      this.initWebscoket(this.url);
      this.eOption = this.getEoption();
    },
    methods:{
      initWebscoket:function(url) {
        ws = new WebSocket(url);
        console.log(ws,'ws');
        // if(ws.readyState != ws.OPEN) {
        //     this.$message.error('链接错误');
        //     ws = null;
        //     return;
        // } else {
          ws.binaryType = 'arraybuffer';
          ws.onopen = function(e){
            console.log('onopen');
          }
          let that = this;
          let data = [];
          let i = 0;
          ws.onmessage = (e)=>{
            i++;
            console.log(i,'msgTimes');
            //处理数据流，返回格式obj:{head:{},data:{}}
            let obj = processData(e.data);
            // if(i<2) {
            //   this.$refs.highcharts.chart.xAxis[0].update({
            //     min:obj.startFreq/1000000,
            //     max:(obj.startFreq+obj.stepFreq*obj.nCount)/1000000,
            //     // tickInterval:(obj.stepFreq*obj.nCount)/(1000000*2)
            //   });
            // }
            // console.log(obj,'obj');
            let data = spliceData(this.avgArray,this.maxArray,this.minArray,obj);
            let series = data[0];
            this.avgArray = data[1];
            this.maxArray = data[2];
            this.minArray = data[3];
            let temp = {};
            let level = 5;
            console.time('refresh');
            this.$refs.echart.mergeOptions({
              series:[{
                data:data[0]
              }],
            });
            console.timeEnd('refresh');
            // console.log(this.avgArray.length,'avgArray-before');
            // temp.avgArray = simplify(this.avgArray,level,false);
            // console.log(temp.avgArray.length,'avgArray-after');
            // console.log(series.length,'series-before');
            // temp.series = simplify(series,level,false);
            // console.log(temp.series.length,'series-after');
            // console.log(this.minArray.length,'minArray-before');
            // temp.minArray = simplify(this.minArray,level,false);
            // console.log(temp.minArray.length,'minArray-after');
            // console.log(this.maxArray.length,'maxArray-before');
            // temp.maxArray = simplify(this.maxArray,level,false);
            // console.log(temp.maxArray.length,'maxArray-before');
            // if(this.$refs.highcharts.chart.series != undefined){
            //   if(this.activeLegend.scan) {
            //     this.$refs.highcharts.chart.series[0].setData(series,true,true,false);
            //     // this.$refs.highcharts.chart.series[0].setData(temp.series,true,true,false);
            //   }
            //   if(this.activeLegend.avg) {
            //     this.$refs.highcharts.chart.series[1].setData(this.avgArray,true,true,false);
            //     // this.$refs.highcharts.chart.series[1].setData(temp.avgArray,true,true,false);
            //   }
            //   if(this.activeLegend.min) {
            //     this.$refs.highcharts.chart.series[2].setData(this.minArray,true,true,false);
            //     // this.$refs.highcharts.chart.series[2].setData(temp.minArray,true,true,false);
            //   }
            //   if(this.activeLegend.max) {
            //     this.$refs.highcharts.chart.series[3].setData(this.maxArray,true,true,false);
            //     // this.$refs.highcharts.chart.series[3].setData(temp.maxArray,true,true,false);
            //   }
            // }
          }
        // }
      },
      play:function(){
        // if(ws.readyState != ws.OPEN) {
        //   this.$message.error('链接错误');
        //   return;
        // }
        this.isPlaying = !this.isPlaying;
        clearInterval(this.timer);
        if(this.isPlaying && this.percentage!=100) {
          ws.send('start');
          console.log('send start');
          // this.renderTimer=setInterval(()=> {
          //   if(this.chart.series != undefined){
          //     let series = this.temp;
          //     this.chart.series[0].setData(series,true,true,false);
          //     this.chart.series[1].setData(this.maxArray,true,true,false);
          //     this.chart.series[2].setData(this.minArray,true,true,false);
          //   }
          // },100);
          this.timer=setInterval(()=>{
            this.timerFlag++;
            this.minutes=this.toDub(parseInt(this.timerFlag/60));
            this.seconds=this.toDub(parseInt(this.timerFlag%60));
            // console.log(this.timerFlag,'t',this.firstTime,this.minutes,this.seconds);
          },1000);
        } else {
          clearInterval(this.renderTimer);
          ws.send('stop');
        }
      },
      //补零
      toDub:function(n){
        return n<10?"0"+n:""+n;
      },
      switchSpeed:function(speed){
        this.activeSpeed = speed;

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
      getEoption(){
        return {
          title: {
            text: '动态数据 + 时间坐标轴'
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          tooltip:{
            trigger: 'axis',
          },
          dataZoom:{
            type:'inside',
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            },
            min:-40,
            max:100,
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            lineStyle:{
              color:'green',
              width:0.8,
            },
            // smooth:true,
            // smoothMonotone:'x',
            hoverAnimation: false,
            sampling:'sum',
            data: []
          }],
          progressive:true,
        }
      },
    },
    computed:{
      firstTime:function(){
        return this.minutes+":"+this.seconds;
      }
    },
  }
</script>
<style scoped>
  .data-reply{
    background: #000;
    height: 700px;
    width: 800px;
  }
  .chart {
    width: 800px;
    height: 600px;
  }
  .data-reply .icon-play {
    background: url('../../assets/image/play.png') no-repeat;
    background-size: contain;
    padding-top: 20px;
  }
  .data-reply .icon-pause {
    display: inline-block;
    background: url('../../assets/image/pause.png') no-repeat;
    background-size: contain;
  }
  .data-reply .play {
    width: 100%;
    height: 100px;
  }
  .data-reply .play-time {
    /*line-height: 90px;*/
    padding: 15px 20px 0 20px;
    width: 100px;
  }
  .data-reply .play-icon {
    /*position: relative;*/
  }
  .data-reply .play-icon i{
    margin-left: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .data-reply .play-speed {
    width: 300px;
    padding-top: 15px;
  }
  .data-reply .play-legend {
    width: 300px;
    padding-top: 15px;

  }
  .data-reply .progress {
    position: absolute;
    bottom: 0;
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
    padding-top: 25px;
    text-align: center;
  }
  .play-active,.legend-active {
    background: #5F78BB;
  }

</style>
