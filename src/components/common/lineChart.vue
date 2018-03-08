<template>
  <!-- 能量轨迹 点击每个点弹出的频谱图 -->
    <div class="map_change_wrap">
    <el-container class="line_style">
      <el-header height='30'>
        <span class="main_title">频谱图</span>
        <span class="main_close" @click="showLine"><i class="fa fa-times close_icon"></i></span>
      </el-header>
      <el-main>
        <!-- 大型折线图 -->
        <highcharts ref="linechart" id="container" :options='bigLine' :style="{height:'400px',width:'800px'}"></highcharts>
        <!--<div class="axis-btn_up">-->
          <!--<span @click="axisChange('max',10)" role="button" class="axis-btn__increase"><i class="el-icon-plus"></i></span>-->
          <!--<span @click="axisChange('max',-10)" role="button" class="axis-btn__decrease"><i class="el-icon-minus"></i></span>-->
        <!--</div>-->
        <!--<div class="axis-btn_down">-->
          <!--<span @click="axisChange('min',10)" role="button" class="axis-btn__increase"><i class="el-icon-plus"></i></span>-->
          <!--<span @click="axisChange('min',-10)" role="button" class="axis-btn__decrease"><i class="el-icon-minus"></i></span>-->
        <!--</div>-->
      </el-main>
    </el-container>
    </div>
</template>
<style scoped>
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
    font-size: 14px;
    display: inline-block;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    line-height: 20px;
  }
  .main_close {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .axis-btn_up {
    position: absolute;
    top: 50px;
    width: 20px;
    right: 20px;
  }
  .axis-btn_down {
    position: absolute;
    bottom: 75px;
    width: 20px;
    right: 20px;
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
<script>
  import HighchartLine from "base/highchartLine";
  import VueDraggableResizable from "components/common/draggable";
  import getHichartLineOption from "assets/js/chartOptions/highchartLineOption";
  export default {
    props:[
      'data'
    ],
    data(){
      return {
        bigLine:{},
        line_show:true,
      }
    },
    components:{
      HighchartLine,
      VueDraggableResizable
    },
    methods:{
      showLine(){
        this.$emit('showLine');
      },
      axisChange(opera,step){
        console.log(this.$refs,'chart');
        if(this.$refs.linechart.chart.yAxis[0]) {
          console.log('update',step,this.$refs.linechart.chart.yAxis[0].max+step);
          switch (opera.toUpperCase()) {
            case 'MAX':
              this.$refs.linechart.chart.yAxis[0].update({
                max: this.$refs.linechart.chart.yAxis[0].max+step,
              },true);
              break;
            case 'MIN':
              this.$refs.linechart.chart.yAxis[0].update({
                min: this.$refs.linechart.chart.yAxis[0].min+step,
              },true);
              break;
          }
        }
      },
    },
    watch:{
      data:function(newVal){
        if(newVal){
          let data_arr = newVal.levels.map((item, idx) => item / 10);
          let x = [];
          let startFreq = newVal.startFreq/1000000;
          let stopFreq = newVal.stopFreq/1000000;
          let step = newVal.step/1000000;
          let j = 0;
          for (let i=startFreq;i<stopFreq+step;i = i+step) {
            x.push([i,data_arr[j]]);
            j++;
          }
          this.bigLine = getHichartLineOption(x);
        }
      }
    },
  }
</script>
