export default function(title,legend,xData,data,yName){
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
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      itemHeight: 14,
      itemWidth: 14,
      textStyle: {
        color: '#fff'
      },
      data: legend,
      top: '30px'
    },
    calculable: true,
    xAxis: [
      {
        name: '年',
        nameTextStyle: {
          padding: [26,0,0,0]
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
        },
        type: 'category',
        boundaryGap: false,
        data: xData
      }
    ],
    yAxis: [
      {
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
        type: 'value',
        name:yName,
      }
    ],
    series:data,
    // series: [
    //   {
    //     name: '邮件营销',
    //     type: 'line',
    //     stack: '总量',
    //     data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 210]
    //   },
    //   {
    //     name: '联盟广告',
    //     type: 'line',
    //     stack: '总量',
    //     data: [220, 182, 191, 234, 290, 330, 310, 290, 330, 310]
    //   },
    //   {
    //     name: '视频广告',
    //     type: 'line',
    //     stack: '总量',
    //     data: [150, 232, 201, 154, 190, 330, 410, 190, 330, 410]
    //   },
    //   {
    //     name: '直接访问',
    //     type: 'line',
    //     stack: '总量',
    //     data: [320, 332, 301, 334, 390, 330, 320, 390, 330, 320]
    //   },
    //   {
    //     name: '搜索引擎',
    //     type: 'line',
    //     stack: '总量',
    //     data: [820, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320]
    //   }
    // ]
  }
}
