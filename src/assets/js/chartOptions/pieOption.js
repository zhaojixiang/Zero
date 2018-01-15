export default function(title,data,child,radius1,radius2,center,isshow) {
  return {
      title: {
        text: title,
        x: 'center',
        y: '10px',
        textStyle: {
          fontWeight: 'normal',
          color: '#fff',
          fontSize:16,
        }
      },
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: '{b}:{d}%'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      calculable: false,
      series: [{
          name: '监测设施数量统计',
          type: 'pie',
          selectedMode: 'single',
          selectedOffset:3,
          radius: radius1,
          center: center,
          x: '20%',
          width: '40%',
          funnelAlign: 'right',
          hoverOffset:6,
          max: 1548,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position:'inside',
                formatter:'{b}',
                fontSize:8,
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data,
        },
        {
          name: '监测设施数量统计',
          type: 'pie',
          radius: radius2,
          hoverOffset:6,
          selectedOffset:6,
          // for funnel
          x: '60%',
          width: '35%',
          funnelAlign: 'left',
          max: 1048,
          center: center,
          labelLine: {
            normal: {
              show: isshow
            }
          },
          label: {
            normal: {
              show: isshow,
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 12,
                  lineHeight: 33,
                  color:'#000',
                },
                c:{
                  color:'#000'
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: child,
        }
      ],
    }
}
