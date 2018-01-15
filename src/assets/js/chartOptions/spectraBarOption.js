export default function({title = ''} = {}){
  return{
    title:{
      text:'',
      left: 30,
      textStyle:{
        color:'#fff',
        fontWeight:'normal',
        fontSize: 14
      }
    },
    color: ['#e47c61', '#13c0a5'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      top: 30,
      left: '60',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: '#fff'
      },
      data: ['非法信道占用度', '合法信道占用度']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00','1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00','1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00'],
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
        show: true,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} %',
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        }
      }
    ],
    series : [
      {
        name:'非法信道占用度',
        type:'bar',
        barWidth: '40%',
        data:[38, 45, 87, 99, 12, 44, 55, 77, 43, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name:'合法信道占用度',
        type:'bar',
        barWidth: '40%',
        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 43, 45, 38, 45, 87, 99, 12, 44, 55]
      },
      {
        name:'直接访问',
        type:'line',
        data:[38, 45, 87, 99,55, 77, 43, 45, 12, 44,  38, 45, 87, 99, 55, 77, 43, 45, 12, 44],
        symbolSize: 8,
        itemStyle: {
          normal: {
            lineStyle: {
              color: '#ffda48'
            }
          }
        }
      }
    ]
  }
}
