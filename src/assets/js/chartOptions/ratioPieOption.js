export default function({key_data=[],series_label_formatter='{b} :\n{d}%  ',tooltip_formatter="{a} <br/>{b} : {c} ({d})",value_data=[],title='',series_name='',color=['#13c3a9', '#e5b639', '#e47d60', '#238fe2', '#adb1b4']}={}) {
  return {
    title : {
      text: title,
      // x: 140,
      // y: 10,
      left:'center',
      bottom:0,
      textStyle:{
        color: '#56e5ff',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    tooltip : {
      trigger: 'item',
      padding: 5,
      formatter: tooltip_formatter
    },
    legend: {
      orient: 'vertical',
      left: 30,
      top: 50,
      itemWidth: 14,
      itemHeight: 14,
      data: key_data,
      textStyle:{
        color: '#8F9091'
      }
    },
    color:color,
    series : [
      {
        name: series_name,
        type: 'pie',
        radius : '60%',
        center: ['60%', '55%'],
        // data:[
        //   {value:25, name:'合法'},
        //   {value:30, name:'违规'},
        //   {value:15, name:'非法'},
        //   {value:25, name:'干扰'},
        //   {value:5, name:'未分配'}
        // ],
        data:value_data,
        label: {
          normal: {
            formatter: series_label_formatter, // '{b} :\n{d}%  '
            color: '#8F9091'
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
