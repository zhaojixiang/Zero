export default function(data){
  return {
    chart: {
      zoomType: 'x',
      backgroundColor:'#283858',
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
      backgroundColor:'#fff',
      itemStyle:{
        color:'#000',
      },
      itemHiddenStyle:{
        color:'#aaa'
      },
    },
    credits:{
      enabled:false,
    },
    title: {
        text: '频谱分析',
        style:{
          color:'yellow'
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
      },
      // minRange:200,
      showFirstLabel:true,
      showLastLabel:true,
      gridLineWidth: 0,
      tickInterval:1,
      startOnTick: true,
      endOnTick: true,
      crosshair: true,
      min:88,
      max:108,
      // tickPositioner: ()=>{
      //     var positions = [];
      //     let len = data.length;
      //     if(len == 0) {
      //       return null;
      //     }
      //     var tick = Math.floor(this.dataMin),
      //         increment = Math.ceil((this.dataMax - this.dataMin) / len);
      //     for (tick; tick - increment <= (this.dataMax-2); tick += increment) {
      //         positions.push(tick);
      //     }
      //     return positions;
      // }
    },
    yAxis:{
      title:{
        text:'峰值(dB)',
      },
      tickWidth:1,
      crosshair: true,
      lineWidth:1,
      // gridLineWidth: 0,
      // min:-40,
      // max:40,
    },
    series: [
      {
        name:'瞬时值',
        marker: {
          enabled: false
        },
        color:'green',
        data: data,
        lineWidth: 0.8,
        visible:true,
      },
      {
        name:"最大值",
        marker: {
          enabled: false
        },
        color:'red',
        data: data,
        lineWidth: 0.8,
        visible:false,
      },
      {
        name:'最小值',
        marker: {
          enabled: false
        },
        color:'yellow',
        data: data,
        lineWidth: 0.8,
        visible:false,
      },
  ],
  }
}
