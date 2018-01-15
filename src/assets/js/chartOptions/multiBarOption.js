export default function(title,xData,data){
  return {
    title: {
      text: title,
      x: 'center',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize:16,
      }
    },
    backgroundColor: 'rgba(0,0,0,0.2)',
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
//          legend: {
//            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
//          },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      name: '年',
      type: 'category',
      data: xData,
      nameTextStyle: {
        padding: [25, 60, 0, -10]
      },
      axisLabel: {
        interval: 0,
        // show:'true',
        showMinLabel:true,
        showMaxLabel:true,
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
    },
    yAxis: {
      name: '设施个数',
      type: 'value',
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
      }
    },
    series: data,
  }
}
