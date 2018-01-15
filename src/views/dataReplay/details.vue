<template>
  <div class="details">
    <!--导航栏-->
    <nav1/>
    <div class="content">
      <div class="left">
        <paging class="paging2" :replayShow="replayShow" :data="pagingdata" :three="three"/>
      </div>
      <div class="right">
        <div class="replayLine2">
          <div class="label">
              <span>参考电平：{{refLevel}} dB</span>
          </div>
          <highcharts id="chart" :options="frequencyOption" ref="highcharts"></highcharts>
          <highcharts-renderer :width="100" :height="100" ref="highchartsRenderer"></highcharts-renderer>
          <div class="progress">
            <el-progress :percentage="percentage" :show-text="false"></el-progress>
            <div class="play">
                <div class="play-icon">
                    <i @click="play" :class="[isPlaying ? 'icon-pause' : 'icon-play']"></i>
                </div>
                <div class="play-time">
                  <span>{{ firstTime }}/60:00</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .details{
      color: #f4f5f5;
    }
    .details .content{
      width: 96%;
      margin: 0 auto;
      margin-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
    .details .left{
      width: 35%;
      height: 700px;
    }
    .details .paging2{
      height:100%;
      width: 100%;
      background: rgba(0,0,0,0.2);
      border: 1px solid #3388ff;
    }
    .details .right{
      width: 63%;
      height: 700px;
      position: relative;
    }
    /*.details .right .line{*/
      /*width: 600px;*/
      /*height: 400px;*/
      /*background: #293855;*/
      /*border: 1px solid #3388ff;*/
      /*position: absolute;*/
      /*top: 23%;*/
      /*left: 18%;*/
      /*z-index: 2000;*/
    /*}*/
    .details .right .line h2{
      font-weight: normal;
      height: 45px;
      line-height: 45px;
      text-align: center;
      margin: 0px;
    }
    .details  .right .line p,.right .line h2{
      background: #5294d1;
      border-bottom: solid 1px #fff;
    }
    .details .right .line p{
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
    }
    .details .right .line p span:nth-of-type(1){
      margin-right: 40px;
    }
    .details .right .line i{
      position:absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
    }
    .details .right .replayLine2{
      background: #000;
      height: 700px;
      width: 800px;
    }
    .details .icon-play {
    background: url('../../assets/image/play.png') no-repeat;
    background-size: contain;
    }
    .details .icon-pause {
      display: inline-block;
      background: url('../../assets/image/pause.png') no-repeat;
      background-size: contain;
    }
    .details .play {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
    }
    .details .play-time {
      line-height: 90px;
      padding: 0 20px;
    }
    .details .play-icon {
      line-height: 110px;

    }
    .details .play-icon i{
      margin-left: 30px;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: contain;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    .details .progress {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .details .label {
      position: absolute;
      top: 10px;
      left: 20px;
      z-index: 1;
      color:yellow;
    }
</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import paging from '../../components/dataReplay/paging.vue'
  import replayLine from '../../components/dataReplay/replayLine.vue'
  import getReplayLineOption from '../../assets/js/chartOptions/replayLineOption'
  import getFrequencyOption from '../../assets/js/chartOptions/hfrequencyOption'
  import {processData,spliceData} from '../../assets/js/frequencyDataDeal'
  var ws = null;
  export default {
    data () {
      return {
        replayShow: false,
        three:true,
        pagingdata:[],
        markerData: [],
        replayLineOption: {},
        frequencyOption:{},
        isPlaying:false,
        percentage:30,
        minutes:'00',
        seconds:'00',
        timerFlag:0,
        timer:null,
        renderTimer:null,
        series:[],
        chart:null,
        dataArray:[],
        temp:[],
        maxArray:[],
        minArray:[],
        refLevel:80
      }
    },
    components: {
      nav1,
      paging,
      replayLine,
//      station
    },
    created(){
      this.frequencyOption = getFrequencyOption([]);
      ws = new WebSocket('ws://192.168.100.48:32681/api/wsChart/Get');
    },
    mounted(){
      this.chart = this.$refs.highcharts.chart;
      ws.binaryType = 'arraybuffer';
      ws.onopen = function(e){
        console.log('onopen');
      }
      let that = this;
      let data = [];
      let i = 0;
      ws.onmessage = (e)=>{
          i++;
          //处理数据流，返回格式obj:{head:{},data:{}}
          let obj = processData(e.data);
          let data = spliceData(this.series,this.maxArray,this.minArray,obj.data);
          this.series = data[0];
          this.maxArray = data[1];
          this.minArray = data[2];
          // this.series = this.mockData(800);
          console.log('rec');
          if(this.chart.series != undefined){
            this.chart.series[0].setData(this.series,true,true,false);
            this.chart.series[1].setData(this.maxArray,true,true,false);
            this.chart.series[2].setData(this.minArray,true,true,false);
          }
      }
      // let data = this.mockData(300000);

//      分页
      this.$http.get('apiGetPaging').then(res=>{
        this.pagingdata=res.data.data;
      })
    },
    mixins: [menuShowMixin],
    methods: {
      mockData:function(n){
        var arr = [],
            i,
            a,
            b,
            c,
            spike;
        for (i = 0; i < n; i = i + 1) {
            if (i % 100 === 0) {
                a = 2 * Math.random();
            }
            if (i % 1000 === 0) {
                b = 2 * Math.random();
            }
            if (i % 10000 === 0) {
                c = 2 * Math.random();
            }
            if (i % 50000 === 0) {
                spike = 10;
            } else {
                spike = 0;
            }
            arr.push([
                i,
                10 * Math.sin(i / 100) + i*10*Math.random()
                // 10 * Math.sin(i / 100) + a + b + c + spike + Math.random()
            ]);
        }
        return arr;
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
    },
    computed:{
      firstTime:function(){
        return this.minutes+":"+this.seconds;
      }
    },
  }
</script>
