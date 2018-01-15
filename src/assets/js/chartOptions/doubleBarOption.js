export default function(title,legend,xData,FisrtData,SecondData,x,y) {
  return {
    title: {
      top: '10px',
      itemGap: '40px',
      text: title,
      x: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize:16,
      }
    },
    // backgroundColor: 'rgba(0,0,0,0.2)',
    grid: {
      x: 25,
      y: 80,
      x2: 55,
      y2: 40,
      left:"3%",
      right:'8%',
      bottom:'3%',
      borderWidth: 1,
      containLabel:true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: legend,
      x: x,
      y: y,
      borderRadius: 0,
      textStyle: {
        color: '#fff'
      },
      itemHeight: 14,
      itemWidth: 14
    },
    calculable: true,
    xAxis: [
      {
        name: '年',
        nameTextStyle: {
          padding: [26,0,0,-10]
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          interval: 0,
          show: 'true',
          textStyle: {
            show: 'true',
            color: '#fff',
            fontSize: 10
          }
        },
        type: 'category',
        data: xData,
        textStyle: {
          color: 'red'
        },
        splitNumber:10,
      }
    ],
    yAxis: [
      {
        // offset:-4,
        position:'left',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          // margin:-2,
        },
        name: SecondData.yName,
        type: 'value'
      },
      {
        position:'right',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
        },
        name: FisrtData.yName,
        type: 'value'
      }
    ],
    series: [
      {
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#000000',
            fontSize: '8'
          }
        },
        name: FisrtData.seriesName,
        type: 'bar',
        data: FisrtData.data,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#fff'
          }
        }
      },
      {
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
            fontSize: '8'
          }
        },
        name: SecondData.seriesName,
        type: 'bar',
        data: SecondData.data,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: '#47098E'
          }
        }
      }
    ]
  }
}
