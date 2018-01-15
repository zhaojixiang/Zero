export default function(data) {
  var geoCoordMap = {
    "清远": [112.9175,  24.6992],
    "韶关": [113.7964, 25.1028],
    "河源": [114.917, 24.3822],
    "梅州": [116.1255, 24.5534],
    "肇庆":[112.1265, 23.9822],
    "广州":[113.5107, 23.6196],
    "惠州":[114.6204, 23.5647],
    "潮州":[116.7847, 24.2293],
    "揭阳":[116.1255, 23.7129],
    "汕头":[117.1692, 23.7404],
    "汕尾":[115.5762, 23.4438],
    "深圳":[114.5435, 22.9439],
    "东莞":[113.8953, 23.301],
    "佛山":[112.8955, 23.5097],
    "云浮":[111.7859, 23.2516],
    "阳江":[111.8298, 22.4715],
    "江门":[112.6318, 22.5483],
    "中山":[113.4229, 22.878],
    "珠海":[113.7305, 22.5155],
    "湛江":[110.3577, 21.3894],
    "茂名":[111.0059, 22.4220],
  };
  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
          code: data[i].code,
        });
      }
    }
    return res;
  };

  return {
    geo: {
      map: 'guangdong',
      label: {
        normal: {
          show: true,
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#7ccbff',
          borderColor: '#30a2df'
        },
        emphasis: {
          areaColor: '#b6f3ff'
        }
      },
      regions: [{
          name: 'guangdong',
          itemStyle: {
            mormal: {
              color: 'blue'
            }
          }
        }
      ]
    },
    series: [{
      type: 'scatter',
      coordinateSystem: 'geo',
      symbolSize: [30, 40], // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
      symbol: 'image://static/img/mark.png',
      top: '14%',
      center: [113.3, 23.1],
      marker: true,
      data: convertData(data),
      itemStyle: {
        normal: {
          areaColor: '#7ccbff',
          areaStyle: {
            color: '#000'
          },
          label: {
            show: true,
            textStyle: {
              fontWeight: 'bold',
              color: "#10668d"
            },
            verticalAlign:'bottom',
          },
          borderColor: '#30a2df',
          borderWidth: 2,
        },
        emphasis: {
          areaColor: '#b6f3ff',
          areaStyle: {
            color: '#000'
          },
          label: {
            show: true,
            color: 'red',
            textStyle: {
              fontWeight:'bold',
              color: "#ff"
            }
          }
        }
      },
    }]
  }
}
