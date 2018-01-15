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
    grid:{
      containLabel:true,
      left:"1%",
      right:'4%',
      bottom:'6%',
    },
    xAxis: {
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
      name:'设施个数',
      nameGap:25,
      position:'bottom',
      nameLocation:'middle',
      type: 'value'
    },
    yAxis: {
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
      type: 'category',
      data: xData,
    },
    series:data,
  }
}
