export default function ({data = [], category = [], yAxis_name = '', xAxis_name = ''} = {}) {
  return {
    chart: {
      type: 'heatmap',
      // margin: [60, 10, 80, 50],
      zoomType: 'x',
      events: {
        click: function (e) {


        }
      }
    },
    credits: {
      enabled: true,
      text: "零点科技",
    },
    tooltip: {
      formatter: function () {
        var result = '';
        let x = '';
        if (!!category.length) {
          x = this.key.split('-')[1];
        } else {
          x = this.key;
        }
        if(x == undefined) {
          x = this.x;
        }
        if(x == undefined) {
          x = this.point.x;
        }
        let y = `${(Array(2).join(0) + this.y).slice(-2)}:00`;
        result += x + "<br/>" + y + "<br/> " + '<span>' + (this.point.value * 100).toFixed(2) + "%</span><br>";
        return result;
      },
      valueDecimals: 2
    },
    boost: {
      useGPUTranslations: true,
      usePreAllocated: true
    },
    title: {
      text: '',
      align: 'left',
      x: 40
    },
    subtitle: {
      // text: '2013每天每小时的热力变化',
      // align: 'left',
      // x: 40
    },
    xAxis: [{
        type: 'category',
        name: xAxis_name,
        // min:87,
        // max:107,
        labels: {
          align: 'right',
          x: 5,
          y: 14,
          formatter: function () {
            if (!!category.length) {
              return this.value.split('-')[1];
            } else {
              return this.value;
            }
          },
        },
        crosshair: true,
        showLastLabel: true,
        // startOnTick: true,
        // tickLength: 16
      },
      {
        type: 'category',
        labels: {
          align: 'left',
          x: 5,
          y: 14,
          // format: '{value:%B}' // long month
        },
        showLastLabel: true,
        startOnTick: true,
        tickPosition: 'inside',
        offset:30,
        visible: !!category.length,
      },
    ],
    yAxis: {
      name: yAxis_name,
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return `${(Array(2).join(0) + this.value).slice(-2)}:00`;
        },
      },
      gridLineColor: '#197F07',
      gridLineWidth: 1,
      tickWidth: 1,
      minPadding: 0,
      maxPadding: 0,
      startOnTick: true,
      endOnTick: false,
      reversed: true,
      tickInterval: 4,
    },
    colorAxis: {
      className: "colorAxis",
      stops: [
        [0.1, '#6364c7'],
        [0.2, '#6364f8'],
        [0.3, '#6396fa'],
        [0.4, '#64c7f9'],
        [0.5, '#62fafa'],
        [0.6, '#94fac5'],
        [0.7, '#c7fb94'],
        [0.8, '#f8fa63'],
        [0.9, '#fac767'],
      ],
      min: 0,
      max: 1,
      startOnTick: false,
      endOnTick: false,
      labels: {
        formatter: function () {
          return this.value * 100 + "%";
        },
      },
      tickInterval: 0.1,
      reversed: false,

    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 0,
      symbolHeight: 350,
      reversed: true,
    },
    series: [
      {
        name: '占用度',
        xAxis: 0,
        animation: false,
        borderWidth: 0,
        nullColor: '#EFEFEF',
        data: data,
        colsize: 1,
        rowsize: 1,
        // tooltip: {
        //   headerFormat: 'value<br/>',
        //   pointFormat: '{point.value}'
        // },
        turboThreshold: Number.MAX_VALUE // #3404, remove after 4.0.5 release
      },
      {
        xAxis: 1,
        data: category,
      }
    ]
  }
}
