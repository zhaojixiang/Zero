<template>
  <chart @click="chartClick" :options="rateCover" id="myChart007" :style="{width: width, height: height}">
  </chart>
</template>
<style scoped>
</style>

<script>
  import echarts from 'echarts'
  export default {
    props:{
      rateCover:{
        type:Object
      },
      width:{
        type:String
      },
      height:{
        type:String,
        default:'180px'
      },
      valueData:{
          type:Array
      },
      keyData:{
          type:Array
      }
    },
    methods:{
        chartClick(params) {
            var zoomSize = 6;
            // var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
            // var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
            // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            var chart = echarts.init(myChart007)
            console.log('dataAxis: ',this.keyData)
            // console.log('myChart007',chart.dispatchAction);
            
            chart.dispatchAction({
                type: 'dataZoom',
                startValue: this.keyData[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: this.keyData[Math.min(params.dataIndex + zoomSize / 2, this.valueData.length - 1)]
            });
        }
    }
  }
</script>
