<template>
<div class="trackInformation">
  <h3>轨迹信息</h3>
  <i class="fa fa-times" aria-hidden="true" @click="closeTrackInformation"></i>
  <highChartLine :options='highChartLineData' />
</div>
</template>

<script>
import highChartLine from 'base/highchartLine.vue'
import highChartsLineOption from '../../assets/js/chartOptions/highchartLineOption'
export default {
  data() {
    return {
      // bigLine: {}
    }
  },
  components: {
    highChartLine
  },
  props: [
    'highChartLineData'
  ],
  mounted() {
    // if(this.highChartLineData){
    //   this.bigLine = highChartsLineOption(this.highChartLineData)
    // }
  },
  methods: {
    closeTrackInformation() {
      this.$emit('closeTrackInformation')
    }
  }
}
</script>

<style>
.trackInformation {
  /* height: 400px; */
  /* width: 800px; */
  position: relative;
  border: solid 1px #31ccff;
  box-shadow: 0px 4px 20px #888888;
}

.trackInformation h3 {
  font-weight: normal;
  font-size: 14px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0px;
  border-bottom: solid 1px #fff;
}

.trackInformation .fa-times {
  position: absolute;
  top: 14px;
  right: 14px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>
