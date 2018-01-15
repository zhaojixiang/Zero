<template>
  <chart :options="bar" id="myChart9" :style="{width: '400px', height: '600px'}">
  </chart>
</template>

<style scoped>
</style>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        bar: {
          title: {
            text: '2017年全省各地市监测设施数量统计',
            x: 'center',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          legend: {
//            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
//          },
//          grid: {
//            left: '3%',
//            right: '4%',
//            bottom: '3%',
//            containLabel: true
//          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: 10
              }
            },
            type: 'value'
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: 10
              }
            },
            type: 'category',
            data: ['广州', '深圳', '珠海', '汕头', '佛山', '韶关', '湛江', '深圳', '珠海', '汕头', '佛山', '韶关', '湛江', '深圳', '珠海', '汕头', '佛山', '韶关', '湛江', '深圳', '珠海']
          },
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: 30,
              barGap: '100%',
              stack: '总量',
              barWidth : 22,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    }
  }
</script>
