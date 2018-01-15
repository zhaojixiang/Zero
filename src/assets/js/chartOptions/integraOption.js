export default function(title,legend,data){
  return {
    title : {
      text: title,
      x: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize:16,
      }
    },
    // color: ['#54d7e3','#0fff47','#c56272','#ffae00','#c050e7'],
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: 'vertical',
      top: 33,
      left: 'left',
      data: legend,
      itemHeight: 14,
      itemWidth: 14,
      textStyle: {
        fontWeight: 'normal',
        color: '#fff',
        // fontSize:14,
      }
    },
    series : [
      {
        name: '数量',
        type: 'pie',
        radius : '50%',
        center: ['60%', '72%'],
        data:data,
        label: {
          normal: {
            show:true,
            formatter: '{b}:{c} \n {d}% ',
            color: '#fff',
            fontSize:10,
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
