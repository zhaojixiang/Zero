<!--信道占用度-->
<template>
    <el-row :gutter="20" class='clear_bottom_margin20 clear_bottom channelUse'>
        <el-col>
            <span class="bottom_right" @click.stop='openHours'>
                {{openHour?'收起小时用度':'展开小时用度'}}
                <i :class="[openHour?'el-icon-arrow-up':'el-icon-arrow-down','el-icon--right']"></i>
            </span>
            <el-container class='zoneContainer' :style="{'height':highchartH}">
                <el-header height='30' class='headerTitle'>
                    <span>
                    <img :src="icon_right_arrow" alt="right icon">
                    成都广播电台在10月1日-10月30日的38.5MHz信道占用度
                    </span>
                </el-header>
                <el-main>
                    <bar-graph :rateCover='transactionBarData' :width='width' height='300px'></bar-graph>
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
          return this.highchartHeight?'800px':'400px'
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
.channelUse .clear_bottom_margin20{
    margin-bottom: 0;
}
.channelUse .clear_bottom {
    padding-bottom:0;
}
.channelUse .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.channelUse .right_container {
  border: 1px solid #4fdaff;
  margin: 0.5em 0 0 0.5em;
  padding: 0.5em 0 0 0;
}
.channelUse .cover_default {
  padding: 0 1em;
}
.channelUse .right_main_top {
  top: -39px;
  position: relative;
}
.channelUse .zoneContainer {
  height: 15em;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid #4fdaff;
  background: #5195d1;
  /* margin: 0.5em 0 .5em .5em;
  padding: 0.5em 0 0 0; */
}
.channelUse .bottom_right{
    position: absolute;
    right: 5em;
    top: 1em;
    color:yellow;
    text-align: right;
    cursor: pointer;
}
</style>
