<!--选中固定站-信道占用度-->
<template>
    <section class='clear_bottom_margin20 clear_bottom channelUse' v-loading="loading">
        <span @click="closeRain" class="minus"><i class="el-icon-close" style="color:#6c6c6c;"></i></span>
        <span class="bottom_right" @click.stop='openHours' v-if="keyData.length">
            {{openHour?'收起小时用度':'展开小时用度'}}
            <i :class="[openHour?'el-icon-arrow-up':'el-icon-arrow-down','el-icon--right']" style='color:#6c6c6c;font-size:20px;'></i>
        </span>
        <div class='zoneContainer' :style="{'height':highchartH}">
            <div height='30' class='headerTitle'>
                <img :src="icon_right_arrow" alt="right icon">
                <slot name='channel_title'></slot>
            </div>
            <div style="width: 100%;">
                <bar-graph :rateCover='transactionBarData' :keyData='keyData' :width='width' height='300px' v-if="keyData.length"></bar-graph>
                <section v-if='specialBarFixedStationEmpty' class="box_container">
                  <i class="iconfont icon-box-empty icon_box_empty"></i>
                  <p style="color:#ccc;">暂时没有数据～</p>
                </section>
                <highcharts :loading='bigMapLoading' :channelHighchatTitle='channelHighchatTitle' @channelDateChange='channelDateChange' @tabCheck='tabCheck' @heatMapClick='heatMapClick' :timePeriod='timePeriod' :highchartData='highchartData' height='450px' v-if='openHour'>
                </highcharts>
            </div>
        </div>
    </section>
</template>
<script>
import BarGraph from "base/barVariable";
import Highcharts from "base/highCharts";
export default {
  props: {
    transactionBarData: {
      type: Object
    },
    highchartData: {
      type: Object
    },
    width: {
      type: String
    },
    keyData: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    timePeriod: {
      type: Object
    },
    channelHighchatTitle: {
      type: String,
      default: ''
    },
    bigMapLoading:{
      type:Boolean,
      default:false
    },
    specialBarFixedStationEmpty:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    highchartH() {
      return this.openHour ? "760px" : "340px";
    },
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  data() {
    return {
      openHour: false
    };
  },
  methods: {
    openHours(val=true) {
      if (val) {
        this.openHour = !this.openHour;
        this.$emit('openHour',this.openHour)
      } else {
        this.openHour = val;
      }
      
    },
    tabCheck(val) {
      this.$emit('tabCheck', val)
    },
    heatMapClick(item) {
      this.$emit('heatMapClick', item);
    },
    closeRain() {
      this.$emit('closeChannel')
    },
    // 瀑布图日期选择后获取数据
    channelDateChange(val) {
      this.$emit('channelDateChange', val);
    }
  },
  components: {
    BarGraph,
    Highcharts
  }
};
</script>
<style lang='less'>
.channelUse {
    margin: 0;
    padding: 0;
    position: relative;
	.minus {
		position: absolute;
		right: 20px;
		cursor: pointer;
		z-index: 100;
		color: #2774A5 !important;
		font-size: 20px;
		top: 15px;
	}
	.bottom_right {
		position: absolute;
		right: 5em;
    top: 2.5em;
    z-index: 199;
		color: #686868;
		text-align: right;
		cursor: pointer;
	}
	.zoneContainer {
		height: 14em;
		min-width:520px;
		border: 1px solid #4fdaff;
    box-shadow: 5px -2px 5px #888888;
		/* background: rgba(0, 0, 0, 0.2); */
		background: #fff;
		/* margin: 0.5em 0 .5em .5em;
		padding: 0.5em 0 0 0; */
		.headerTitle {
			color: #4fdaff;
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			padding: 0 10px;
		}
	}
}
</style>
