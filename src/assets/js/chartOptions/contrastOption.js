export default function(title, xData,series,xName = 'GDP(亿元)') {
  return {
      title: {
        text: title,
        x: 'center',
        y: '10px',
        textStyle: {
          fontWeight: 'normal',
          color: '#fff',
        }
      },
      // legend: {
      //   data: ['台站', '固定站','移动监测设施','可搬移监测设备','便携设备','管制设备'],
      //   top: 4,
      //   right: '20%',
      //   textStyle: {
      //     color: '#fff',
      //   },
      // },
      tooltip: {
        show: true,
        trigger: 'axis',
        // formatter: '{b}<br/>{a}: {c}个',
        axisPointer: {
          type: 'shadow',
        },
        formatter:function(params){
          var result = params[0].name + '<br>';
          params.forEach(function(item) {
            if (item.data > 0) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
              result += item.seriesName + ": " + '<span style="color:#fff">' + item.data + "个</span><br>"
            } else {
              result += "";
            }

          });
          return result;
        },
      },
      grid: [{
        show: false,
        left: '4%',
        top: 60,
        bottom: 60,
        containLabel: true,
        width: '46%',
      },
        {
        show: false,
        left: '50.5%',
        top: 80,
        bottom: 60,
        width: '0%',
      },
        {
        show: false,
        right: '4%',
        top: 60,
        bottom: 60,
        containLabel: true,
        width: '46%',
      }, ],
      xAxis: [
        {
          name: xName,
          nameTextStyle: {
            padding: [-50,-70,10,0],
            color: '#fff'
          },
          axisLine:
            {
              lineStyle:
                {
                  color:'#FFFFFF'
                }
            },
          type: 'value',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'top',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 9,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF',
              width: 1,
              type: 'solid',
            },
          },
        }, {
          gridIndex: 1,
          show: false,
        }, {
          name: '设施总数',
          nameTextStyle: {
            padding: [-60,0,0,-55],
            color: '#fff'
          },
          gridIndex: 2,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'top',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 9,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF',
              width: 1,
              type: 'solid',
            },
          },
        }, ],
      yAxis: [
        {
          axisLine:
            {
              lineStyle:
                {
                  color:'#FFFFFF'
                }
            },
          type: 'category',
          inverse: true,
          position: 'right',
          axisLine:
            {
              show: false
            },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            formatter:'{value}个',
            margin: 8,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
          data: xData,
        },
        {
          axisLine:
            {
              lineStyle:
                {
                  color:'#FFFFFF'
                }
            },
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },

          },
          data: xData.map(function(value) {
            return {
              value: value,
              textStyle: {
                align: 'center',
              }
            }
          }),
        }, {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },

          },
          data: xData,
        }, ],
      series:series,
      // [{
      //   name: '台站',
      //   type: 'bar',
      //   barGap: 20,
      //   barWidth: 20,
      //   label: {
      //     normal: {
      //       show: true,
      //       position: 'insideRight'
      //     }
      //   },
      //   itemStyle: {
      //     normal: {
      //       color: '#ff0200',
      //     },
      //   },
      //   data: [1600, 1590, 1550, 1540, 1500, 1476, 1396, 1214, 1133, 1037, 1000, 960, 955, 892, 882, 753,750,720,700,690,688]
      // }]
  }
}
