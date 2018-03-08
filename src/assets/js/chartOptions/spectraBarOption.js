export default function({title = '',xAxis=[],series=[]} = {}){
  let legend = [];
  for (let i=0;i<series.length;i++){
    legend.push(series[i].name);
  }
  return{
    title:{
      text:title,
      left:'40%',
      top:10,
      textStyle:{
        color:'#8F9091',
        fontWeight:'normal',
        fontSize: 14
      }
    },
    // color: ['#e47c61', '#13c0a5'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function(params){
        let str = '';
        for (let i=0;i<params.length;i++){
          if(i==0){
            str+=`${params[i].name}:<br/>`;
          }
          str+="&nbsp;&nbsp;&nbsp;&nbsp;"+params[i].seriesName+":"+params[i].value+"<br/>"
        }
        return str;
      },
    },
    legend: {
      top: 30,
      left: '60',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: '#8F9091'
      },
      data: legend,
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
        // data : ['1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00','1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00','1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00', '1日\n17:00'],
        data : xAxis,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#8F9091'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#8F9091',
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
            color: '#8F9091'
          }
        },
        name:'功率(dBμV)',
        nameLocation:'center',
        nameGap:20,
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value}',
          textStyle: {
            color: '#8F9091',
            fontSize: 10
          }
        }
      }
    ],
    series : [
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
    // series:series
  }
}
