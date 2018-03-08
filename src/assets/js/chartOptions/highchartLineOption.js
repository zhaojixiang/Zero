export default function(data,x=[]) {
  return {
    chart: {
      zoomType: 'x'
    },
    boost: {
      useGPUTranslations: true
    },
    credits: {
      enabled: true,
      text: "零点科技",
    },
    title: {
      text: ''
    },
    subTitle: {
      text: 'Using the Boost module'
    },
    tooltip: {
      valueDecimals: 2,
      formatter:function(){
        var result = '';
        let x = this.x.toFixed(2);
        let y = this.y;
        result += "频率："+x + "MHz<br/>"+"峰值：" + y+"dBμV";
        return result;
      },
    },
    xAxis:{
      title:{
        text:'频率(MHz)',
        style:{
          color:'#000'
        }
      },
      gridLineWidth: 1,

      crosshair: true,
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
          color:'#000'
        }
      },
      crosshair: true,
      // min:-20,
      // max:80,
      tickWidth:1,
      gridLineWidth: 1,

    },
    legend:{
      enabled:false,
    },
    series: [{
      data: data,
      lineWidth: 0.5
    }]
  }
}
