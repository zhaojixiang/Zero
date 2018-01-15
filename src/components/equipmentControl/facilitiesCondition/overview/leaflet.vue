<template>
  <div id="map">
    <popup id="popupAlert" @showSpectra="show"/>
  </div>
</template>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  .info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .info h4 {
    margin: 0 0 5px;
    color: #777;
  }

  .legend {
    line-height: 8px;
    color: #555;
  }

  .legend i {
    width: 18px;
    height: 8px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
  }

  .legend i2 {
    width: 8px;
    height: 18px;
    float: left;
    margin-right: 0px;
    opacity: 0.7;
  }
</style>

<script>

  import colorScale from 'assets/leafletJS/colorScale'
  import coordtransform from 'assets/leafletJs/coordtransform.js'
  import LatLon from 'assets/leafletJS/geodesyTools'
  import popup from '../../../stationManage/leafletAlert'

  var minPower = 0,
    maxPower = 0
  var map
  export default {
    props: ['markerData', 'energyData'],

    data() {
      return {
        forbidZoomMove: true,
        count: 0,
        flag: true,
        markersLayer: new L.LayerGroup(),
        energyRetangleLayer: new L.LayerGroup(),
        energyCircleLayer: new L.LayerGroup(),
        frequencyMapLayer: new L.LayerGroup(),
      }
    },
    components: {
      popup
    },
    watch: {
    },
    methods: {
      say: function () {
        alert(111);
      },
      alert1() {
        alert(111);
      },
      initMarker: function (data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.markersLayer.clearLayers();
          this.markersLayer.removeFrom(map);
          return
        }
        var myIcon = L.icon({
          iconUrl: '/static/img/marker1.png',
          iconSize: [45, 60],
          iconAnchor: [22.5, 60],
          popupAnchor: [0, -60]
        });
        //     地图上的marker
        if (data === undefined) {
          data = [];
        }
        console.log(data, 'marker');
        //每次点击切换城市时需要先清除上一个城市的markerLayer
        this.markersLayer.clearLayers();
        this.markersLayer.removeFrom(map);
        for (var i = 0; i < data.length; i++) {
          let id = data[i].code;
          let marker = L.marker([data[i].latitude, data[i].longitude], {icon: myIcon});
          this.markersLayer.addLayer(marker);
          let router = this.$router;
          let that = this;
          marker.on('click', function (e) {
            this._icon.src = this.flag ? '/static/img/marker1.png' : '/static/img/marker2.png';
            this.flag = !this.flag;
            let href = router.resolve({name: 'WorkAnalyze'}).href + '?id=' + id;
            let temp = marker.getPopup();
            if (temp === undefined) {
              that.$http.get('api/EquipSurvey/EquInfo', {
                mfid: id,
              }).then(res => {
                let data = res.data;
                let a = "<div id='basic'><p class='title'>基本信息</p><div class='bottom'>" +
                  "<img class='left' src='/static/img/leafletimg.png'><ul class='right'>" +
                  "<li>站名 : " + data.name + "</li>" +
                  "<li>厂家 : <span>" + data.manu + "</span></li>" +
                  "<li>型号 : " + data.model + "</li>" +
                  "<li>类型 : " + data.type + "</li>" +
                  "<li>负责人 : " + data.chargeMen + "</li>" +
                  "<li>建设时间 : " + data.date + "</li>" +
                  "<span class='info'><a href='" + href + "'>详情</a></span></ul></div></div>";
                let popup = L.popup({minWidth: 300, className: 'leaf-alert'})
                  .setContent(a);
                marker.bindPopup(popup).openPopup();
              });
            } else {
              // temp.setContent(a);
              temp.openPopup();
            }
          });
          marker.on('popupclose', function (e) {
            this._icon.src = '/static/img/marker1.png';
          });
        }
        this.markersLayer.addTo(map);
      },
      energyRetangle: function (data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.energyRetangleLayer.clearLayers();
          this.energyRetangleLayer.removeFrom(map);
          return
        }
        //能量轨迹
        // console.log('=====',this.energyData);
        let energy = data;
        colorScale.calcColorScale(100);
        for (var i = 0; i < energy.length; i++) {
          // if (isNaN(energy[i].Lng) || isNaN(energy[i].Lat)) {
          //   continue;
          // };
          var p = coordtransform.wgs84togcj02(energy[i].Lng, energy[i].Lat);
          var pCentre = new LatLon(p[1], p[0]);
          // console.log(pCentre);
          var p1 = pCentre.rhumbDestinationPoint(125, 270);
          var p2 = pCentre.rhumbDestinationPoint(125, 180);
          var d = map.distance([pCentre.lat, pCentre.lon], [p1.lat, p1.lon]);
          var c = colorScale.getColor(0, 100, energy[i].Value);
          //var p3 = pCentre.rhumbDestinationPoint(100, 90);
          //var p4 = pCentre.rhumbDestinationPoint(100, 0);
          let energy = L.rectangle([[pCentre.lat * 2 - p2.lat, p1.lon], [p2.lat, pCentre.lon * 2 - p1.lon]], {
            color: c,
            fillOpacity: 1
          });
          this.energyRetangleLayer.addLayer(energy);
        }
        this.energyRetangleLayer.addTo(map);
      },

      //频谱地图
      frequencyMap: function (data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.frequencyMapLayer.clearLayers();
          this.frequencyMapLayer.removeFrom(map);
          return
        }
        let grid = data;
        colorScale.calcColorScale(48);
        var colorGradient = new Array();
        for (var i = 1; i <= 48; ++i) {
          colorGradient.push(colorScale.getColor(0, 48, i));
        }
        var choroplethLayer = L.choropleth(grid, {
          valueProperty: "power",
          //colors: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
          colors: colorGradient,
          //scale: ['008ae5', 'lightgreen', 'yellow', 'red'],
          steps: 48,
          mode: 'k',
          style: {
            color: '#fff',
            weight: 0,
            fillOpacity: 0.6
          },
          onEachFeature: function (feature, layer) {
            let b = document.getElementById('popupAlert')
            // let b = '<popup/>'
            let popup = L.popup({minWidth: 200})
              .setContent(b)
            layer.bindPopup(popup)
          }
        });
        this.frequencyMapLayer.addLayer(choroplethLayer);
        this.frequencyMapLayer.addTo(map);
      },

      // 能量轨迹
      energyCircle(data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.energyCircleLayer.clearLayers();
          this.energyCircleLayer.removeFrom(map);
          return
        }
        //圆圈
        let that = this;
        // console.log(data);
        minPower = data[0].Value;
        maxPower = minPower;
        for (var i = 0; i < data.length; i++) {
          var value = Number(data[i].Value);
          // console.log(data[i].Value);
          if (value > maxPower) {
            maxPower = value;
          }
          if (value < minPower) {
            minPower = value;
          }
        }
        colorScale.calcColorScale(Math.ceil(maxPower - minPower));
        for (let i = 0; i < data.length; i++) {
          // var v = r[i].split(',');
          if (isNaN(data[i].Lng) || isNaN(data[i].Lat)) {
            continue;
          }
          var p = coordtransform.wgs84togcj02(data[i].Lng, data[i].Lat);
          //var c = getColor(getGradient(minPower, maxPower, v[2]));
          var c = colorScale.getColor(minPower, maxPower, data[i].Value);
          var circlePoint = L.circleMarker([p[1], p[0]], {
            color: c,
            radius: 5,
            fillOpacity: 1,
            onEachFeature: function (feature, layer) {
              let b = document.getElementById('popupAlert')
              // let b = '<popup/>'
              let popup = L.popup({minWidth: 200})
                .setContent(b)
              layer.bindPopup(popup)
            }
          });
          this.energyCircleLayer.addLayer(circlePoint);

          // console.log(circlePoint,'-----------------------');
          circlePoint.on('click', function () {
            // alert(111);
            // console.log(this,'--------------------------');
            // let a = "hello kitty"
            // let popup  = L.popup({minWidth: 300,className:'leaf-alert'})
            //       .setContent(a);
            // this.bindPopup(popup).openPopup();
            that.$emit('showLine',this)
          })
        }
        this.energyCircleLayer.addTo(map);
        // legend.remove();
        // legend.addTo(map);
      },
      show() {
        // alert(111);
        this.$emit('showSpectra0')
      }

    },
    mounted() {
      //初始化一个地图
      map = L.map('map', {
        fullscreenControl: true,//加载全屏插件配置
        zoomControl: false,//地图缩放控制按钮
        doubleClickZoom: true, //双击缩放地图
        dragging: true, //拖拽地图
        keyboard: true,//使用键盘左右键移动地图
        scrollWheelZoom: true //使用滚轮控制住缩放
      }).setView([23.1099, 113.097], 8);
      let control = L.control.zoom({
        position: 'topright',
      }).addTo(map);
      // //加载地图资源
      // let mapSou = L.tileLayer('//192.168.100.150:23333/{z}/{x}/{y}',{
      //   maxZoom: 18,
      //   minZoom: 3,
      // }).addTo(map);

      let mapSou = L.tileLayer('//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        minZoom: 3,
        subdomains: [1, 2, 3, 4]
      }).addTo(map);
      // L.tileLayer('http://192.168.100.150:23333/{z}/{x}/{y}').addTo(map)
      let options = {
        //配置画画属性
        color: 'red',
        showMeasurements: true //显示距离数据
      };
      map.on('click', function (e) {
        // console.log(e.latlng,'map-click-latlng');
      });


      // //添加色柱
      // var legend = L.control({position: 'bottomright'});
      // legend.onAdd = function (map) {
      //   var div = L.DomUtil.create('div', 'info legend'),
      //     labels = [];
      //   var grades = new Array();
      //    // console.log(maxPower,minPower);
      //   var len = Math.ceil(maxPower - minPower);
      //   //.style.height = window.innerheight / len + "px";
      //   // loop through our density intervals and generate a label with a colored square for each interval
      //   if (len!==0){
      //     for (var i = Math.ceil(maxPower - minPower); i >= 0; i--) {
      //       if (i == len) {
      //         div.innerHTML += Math.ceil(maxPower) + "<br>";
      //       }
      //       div.innerHTML +=
      //         '<i style="background:' + colorScale.getColor(minPower, maxPower, minPower + i) + '"></i><br>';
      //       if (i == 0) {
      //         div.innerHTML += Math.ceil(minPower);
      //       }
      //     }
      //   }
      //   return div;
      // };
      // legend.addTo(map);


      //     // 绘制区域
      // var layerObj = {};
      // function drawPolygon() {
      //     var points = [],
      //         points_length = 0,
      //         polyline,
      //         polygon;
      //     // 单击
      //     var clickFlag,
      //         clickTimes = 1,
      //         isDrag = false;
      //     map.on('mousedown', function(e) {
      //         map.off('mousemove');
      //         if(clickFlag) clearTimeout(clickFlag);
      //         clickFlag = setTimeout(function() {
      //             if(clickTimes==1 && !isDrag) {
      //                 points.push([e.latlng.lat, e.latlng.lng]);
      //                 points_length = points.length;
      //                 // 移动
      //                 map.on('mousemove', function(e) {
      //                     // 清除
      //                     if(polyline) map.removeLayer(polyline);
      //                     if(polygon) map.removeLayer(polygon);
      //                     // polyline
      //                     points[points_length] = [e.latlng.lat, e.latlng.lng];
      //                     polyline = new L.Polyline(points);
      //                     map.addLayer(polyline);
      //                     // polygon
      //                     polygon = new L.Polygon(points);
      //                     map.addLayer(polygon);
      //                 });
      //             }
      //         }, 300);
      //     });
      //           // 双击
      //     map.on('dblclick', function() {
      //         if(points.length) {
      //             clickTimes = 2;
      //             // polyline
      //             polyline = new L.Polyline(points);
      //             map.addLayer(polyline);
      //             // polygon
      //             polygon = new L.Polygon(points);
      //             map.addLayer(polygon);
      //             // 移除事件
      //             map.off('mousemove');
      //             setTimeout(function() {
      //                 clickTimes = 1;
      //                 // 保存layer(方便后面删除)
      //                 var layerName = prompt('请入名称');
      //                 if(layerName) {
      //                     layerObj[layerName] = [polyline, polygon];
      //                     console.log(layerObj);
      //                 }
      //                 points = [];
      //             }, 300);
      //         }
      //     });
      //     // 拖动
      //     map.on('movestart', function() {
      //         isDrag = true;
      //     });
      //     map.on('moveend', function() {
      //         isDrag = false;
      //     });
      // }
      // drawPolygon();
      // this.initMarker();
      // this.markersLayer.addTo(map);
    }
  }
</script>
