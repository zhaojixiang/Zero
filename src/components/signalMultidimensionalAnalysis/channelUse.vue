<!--信道占用度-->
<template>
    <el-row :gutter="20" class='clear_bottom_margin20 clear_bottom channelUse'>
        <el-col style="position: relative">
            <span class="bottom_right" @click.stop='openHours'>
                {{openHour?'收起小时用度':'展开小时用度'}}
                <i :class="[openHour?'el-icon-arrow-up':'el-icon-arrow-down','el-icon--right']"></i>
            </span>
            <div class='zoneContainer' :style="{'height':highchartH}">
                <div height='30' class='headerTitle'>
                    <span>
                    <img :src="icon_right_arrow" alt="right icon">
                    成都广播电台在10月1日-10月30日的38.5MHz信道占用度
                    </span>
                </div>
                <div style="width: 100%;">
                    <bar-graph :rateCover='transactionBarData' :width='width' height='300px'></bar-graph>
                    <highcharts :data='highchartData' height='450px'  v-if='openHour'></highcharts>
                </div>
            </div>
                    <highcharts :data='highchartData' height='450px' v-if='highchartHeight'></highcharts>
                </el-main>
            </el-container>
        </el-col>
    </el-row>
</template>
<script>
import BarGraph from 'base/barGraph'
import Highcharts from "base/highCharts";
import normalizeBarOption from 'assets/js/chartOptions/barOption'
import highchartOption from 'assets/js/chartOptions/highchartOption'
import { hightchartHeight } from "assets/js/mixin";

import * as Global_ from 'assets/js/global'

export default {
  mixins:[hightchartHeight],
  props:{
      transactionBarData:{
          type:Object
      },
      highchartData:{
          type:Object
      },
      width:{
          type:String,
          default:'100%'
      }
  },
  computed:{
      highchartH() {
          return this.highchartHeight?'760px':'340px'
      }
  },
  data() {
      return {
          openHour:false,          
          icon_right_arrow:Global_.right_arrow
      }
  },
  methods:{
      openHours() {
          this.openHour = !this.openHour
          this.setHighchartHeight(this.openHour);
      },
  },
  components:{
      BarGraph,
      Highcharts
  },
  mounted() {
    //   console.log(this.highchartData)
  }
}
</script>
<style>
.channelUse{
    margin-bottom: 0;
    padding-bottom:0;
}
.channelUse .headerTitle {
  color: #4fdaff;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.channelUse .zoneContainer {
  height: 14em;
  margin-top: 10px;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
  background: #5195d1;
  /* margin: 0.5em 0 .5em .5em;
  padding: 0.5em 0 0 0; */
}
.channelUse .bottom_right{
    position: absolute;
    right: 5em;
    top: 2.5em;
    color:yellow;
    text-align: right;
    cursor: pointer;
}
</style>
