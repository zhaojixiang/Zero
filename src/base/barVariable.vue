<template>
  <chart :options="rateCover" id="myChart001" ref="chart" :style="{width, height}">
  </chart>
</template>
<style scoped>
</style>

<script>
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
      keyData:{
          type:Array
      },
      currentFreq:{
        type:Number
      }
    },
    watch: {
      currentFreq(val){
          // console.log('val',val)
          // console.log('keyData: ',this.keyData)
          let currentIndex = this.keyData.indexOf(val.toString());
          // console.log('currentIndex: ',currentIndex)
          this.$refs.chart.dispatchAction({
            type:'showTip',
            seriesIndex:1,
            dataIndex:currentIndex
          });
      }
    }
  }
</script>
