export default function ( {title='',series_data=[],xAxis_data=[],yAxis_name='',title_offset='center',title_top='10px',title_color='#fff',series_color=['#ff8b35'],legend_data=[],legend_show=true} = {}) {
  // *1 title 是 图表的标题 String
  // *2  series_data 是图表的数据 Array
  // *3 xAxis_data 是xAxis 里的data值 Array
  // *4  title_offset 是 title的位置
  // *5  title_top 在top上的距离 String
  // *6 series_color 是图表柱的颜色 Array
  // *7  title_color 是title字体颜色 String
  // *8 legend_data legend X轴的文字描述 Array
  // *9 yAxis_name  Y轴上的单位
  return {
    title: {
      top: title_top,
      itemGap: '40px',
      text: title,
      x: title_offset,
      textStyle: {
        fontWeight: 'normal',
        color: title_color,
        fontSize: 12
      }
    },
    legend: {
      show:legend_show,
      right: '10%',
      // left: 40,
      data:legend_data,
      itemWidth:12,
      itemHeight:12,
      textStyle:{
        color:'#fff'
      }
    },
    grid: {
      // x: 30,
      // y: 70,
      // x2: 5,
      // y2: 80,
      top: '15%',
      borderWidth: 1
    },
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
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        type: 'category',
        data: xAxis_data ? xAxis_data : ['固定站', '移动站', '可搬移监测设施', '便携设备', '管制设备']
      }
    ],
    yAxis: [
      {
        name: yAxis_name,
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
      }
    ],
    series:(typeof series_data[0]!=='object')? [
      {
        name: legend_data[0],
        type: 'bar',
        data: series_data,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: series_color.length == 1?series_color[0] : function (params) {
              return series_color[params.dataIndex]
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
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
        },
        barWidth: 20
      }
    ]:series_data
  }
}
