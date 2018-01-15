export default function(xData,data,yName){
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    calculable: true,
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        type: 'category',
        position: 'top',
        data: xData,
        axisLabel: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: yName,
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
        type: 'value',
        inverse: true
      }
    ],
    series: [
      {
        name: yName,
        type: 'bar',
        data: data,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#FF0200'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
            fontSize: '8'
          }
        }
      }
    ]
  }
}
