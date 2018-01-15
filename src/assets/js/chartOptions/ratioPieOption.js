export default function() {
  return {
    title : {
      text: '',
      x: 30,
      y: 10,
      textStyle:{
        color: '#56e5ff',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 30,
      top: 50,
      itemWidth: 14,
      itemHeight: 14,
      data: ['合法','违规','非法','干扰','未分配'],
      textStyle:{
        color: '#fff'
      }
    },
    color:['#13c3a9', '#e5b639', '#e47d60', '#238fe2', '#adb1b4'],
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '70%',
        center: ['60%', '55%'],
        data:[
          {value:25, name:'合法'},
          {value:30, name:'违规'},
          {value:15, name:'非法'},
          {value:25, name:'干扰'},
          {value:5, name:'未分配'}
        ],
        label: {
          normal: {
            formatter: '{b} :\n{c}个 \n {d}%  ',
            color: '#fff'
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
