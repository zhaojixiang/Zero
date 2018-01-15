<template>
  <chart :options="bar1" id="myChart16" :style="{width: '400px', height: '305px'}"></chart>
</template>

<style scoped>
</style>

<script>
  export default {
    props: ['option','data','setting','child'],
    data: function() {
      return {
        bar1:{
          title:{
            text:'>>频段占用度',
            textStyle: {
              fontSize: 16,
              color: '#56e5ff'
            }

          },
          color: ['#d3b54d'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['频段占用度'],
            left: 25,
            top: 30,
            textStyle: {
              color: '#fff'
            }
          },
          xAxis : [
            {
              type : 'category',
              data : ['1日', '2日', '3日', '4日', '5日', '6日'],
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: '#fff',
                  fontSize: 10
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: '#fff',
                  fontSize: 10
                }
              }
            }
          ],
          series : [
            {
              name:'频段占用度',
              type:'bar',
              barWidth: '30%',
              data:[10, 52, 200, 334, 390, 330]
            }
          ]
        }
      }
    },

    methods:{

    },
  }
</script>
