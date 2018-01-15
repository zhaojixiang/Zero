export default function(){
  return{
    title: {
      text: '频率:105.925000MHz 最大值:26.4dBuV 平均值:14.9dBuV',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: [90, 91, 92, 93, 94, 95, 97, 98, 99, 100],
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      }
    },
//          dataZoom: [{
//            startValue: '2014-06-01'
//          }, {
//            type: 'inside'
//          }],
    series: [
      {
        name: 'Beijing AQI',
        type: 'line',
        itemStyle : {
          normal : {
            color:'#ff001b',
            lineStyle:{
              color:'#ff001b'
            }
          }
        },
        data: [45, 46, 47, 48, 94, 4,45, 46, 47, 48, 94, 4]
      },
      {
        name: 'chengdu',
        type: 'line',
        itemStyle : {
          normal : {
            color:'#fff922',
            lineStyle:{
              color:'#fff922'
            }
          }
        },
        data: [47, 3, 47, 48, 94,47, 3, 47, 48, 94]
      },
      {
        name: 'chengdu',
        type: 'line',
        itemStyle : {
          normal : {
            color:'#00ff0c',
            lineStyle:{
              color:'#00ff0c'
            }
          }
        },
        data: [47, 8, 47, 48, 94,47, 8, 47, 48, 94]
      },
      {
        name: 'chengdu',
        type: 'line',
        itemStyle : {
          normal : {
            color:'#0100ff',
            lineStyle:{
              color:'#0100ff'
            }
          }
        },
        data: [47, 8, 5, 48, 94,47, 8, 5, 48, 94]
      }
    ]
  }
}
