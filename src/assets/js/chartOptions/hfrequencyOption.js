export default function(data){
  return {
    chart: {
      zoomType: 'x',
      // backgroundColor:'#FEFEFE',
      backgroundColor:'#293A55',
      width:800,
      height:600,
      events:{
        render:function(){
          // console.log(this.series);
        },
      }
    },
    boost: {
        useGPUTranslations: true,
    },
    legend:{
      enabled:false,
      // backgroundColor:'#000',
      backgroundColor:'#fff',
      itemStyle:{
        // color:'#000',
        color:'#fff',
      },
      itemHiddenStyle:{
        color:'#aaa'
      },
    },
    credits:{
      enabled:true,
      text:"零点科技",
    },
    title: {
        text: '',
        style:{
          color:'#fff'
        },
    },
    noData: {

    },
    // subtitle: {
    //     text: 'Using the Boost module'
    // },
    tooltip: {
        valueDecimals: 2
    },
    xAxis:{
      title:{
        text:'频率(MHz)',
        style:{
          color:'#fff'
        }
      },
      labels:{
        style:{
          color:'#fff'
        }
      },
      events:{
        afterSetExtremes:function(e){
          if(e.target.chart.stop != undefined && e.target.chart.stop === true) {
            console.log("缩放更新后，根据缩放级别设置采样率更新图表");
            e.target.chart.series[0].setData(e.target.chart.originalData.series);
            e.target.chart.series[1].setData(e.target.chart.originalData.avg);
            e.target.chart.series[2].setData(e.target.chart.originalData.min);
            e.target.chart.series[3].setData(e.target.chart.originalData.max);
          }
        }
      },
      tickColor:'#555860',
      showFirstLabel:true,
      showLastLabel:true,
      gridLineWidth: 1,
      gridLineColor:'#555860',
      lineColor:'#fff',
      // tickAmount:3,
      startOnTick: false,
      // endOnTick: false,
      crosshair: true,
      // tickPixelInterval:20,
      tickPositioner: function(){
          let min = Math.floor(this.dataMin);
          let max = Math.floor(this.dataMax);
          let middle = Math.ceil((max - min) / 2)+min;
        return [min,middle,max];
      }
    },
    yAxis:{
      title:{
        text:'峰值(dBμV)',
        style:{
          color:'#fff'
        }
      },
      labels:{
        style:{
          color:'#fff'
        }
      },
      min:-20,
      max:80,
      // tickWidth:1,
      crosshair: true,
      // lineWidth:1,
      gridLineWidth: 1,
      gridLineColor:'#555860',
      lineColor:'#fff',
      tickColor:'#555860',
      // min:-40,
      // max:40,
    },
    series: [
      {
        allowPointSelect:true,
        name:'瞬时值',
        marker: {
          enabled: false
        },
        color:'green',
        downsample:{
          threshold:1000,
        },
        data: data,
        lineWidth: 0.8,
        visible:true,
      },
      {
        allowPointSelect:true,
        name:'平均值',
        marker: {
          enabled: false
        },
        color:'yellow',
        downsample:{
          threshold:1000,
        },
        data: data,
        lineWidth: 0.8,
        visible:false,
      },
      {
        allowPointSelect:true,
        name:'最小值',
        marker: {
          enabled: false
        },
        color:'blue',
        downsample:{
          threshold:1000,
        },
        data: data,
        lineWidth: 0.8,
        visible:false,
      },
      {
        allowPointSelect:true,
        name:"最大值",
        marker: {
          enabled: false
        },
        color:'red',
        downsample:{
          threshold:1000,
        },
        data: data,
        lineWidth: 0.8,
        visible:false,
      },
  ],
  }
}
