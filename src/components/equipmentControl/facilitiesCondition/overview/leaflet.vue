<template>
  <div id="map" :hide="currentLocation">
    <popup v-show="popupShow" id="popupAlert" @showSpectra="show"/>
    <stationInfoAlert ref="stationInfoAlert" :stationInfoAlertData="stationInfoAlertData" v-show="!stationShow" id="stationInfoAlert"/>
  </div>
</template>

<style>
  #map {
    width: 100%;
    height: 100%;
  }

  .info {
    /*padding: 6px 8px;*/
    font: 14px/16px Arial, Helvetica, sans-serif;
    /*background: white;*/
    /*background: rgba(255, 255, 255, 0.8);*/
    /*box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);*/
    /*border-radius: 5px;*/
    color: #000;
    display: flex;

  }

  .info h4 {
    margin: 0 0 5px;
    color: #777;
  }

  .legend__list {
    width: 180px;
    line-height: 5px;
    display: flex;
    flex-direction: row;
  }
  .legend__list i {
    width: 100%;
    height: 10px;
    /*opacity: 0.7;*/
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
  import colorScale from 'assets/leafletjs/colorScale'
  import coordtransform from 'assets/leafletjs/coordtransform.js'
  import LatLon from 'assets/leafletjs/geodesyTools'
  import popup from '../../../stationManage/leafletAlert'
  import stationInfoAlert from 'components/stationShow/stationInfoAlert'
  import HighchartLine from "base/highchartLine";
  import VueDraggableResizable from "components/common/draggable";
  import getHichartLineOption from "assets/js/chartOptions/highchartLineOption";


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
        popupShow: false,
        stationShow: false,
        line_show: true,
        markersLayer: new L.LayerGroup(),
        maxMarkersLayer: new L.LayerGroup(),
        stationLayer: new L.MarkerClusterGroup({
          renderer: L.canvas(),

        }),
        energyRetangleLayer: new L.LayerGroup(),
        energyCircleLayer: new L.LayerGroup(),
        // energyCircleLayer: new L.Layer.DownSample(),
        frequencyMapLayer: new L.LayerGroup(),
        legendLayer: L.control.htmllegend({
          position: 'bottomright',
          legends: [],   // array of legend entries. see below for the structure
          collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
          detectStretched: false,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
          collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
          // defaultOpacity: 1, // default opacity for layers in specified in legends.
          // visibleIcon: 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
          hiddenIcon: 'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
          toggleIcon: 'leaflet-html-legend-icon-eye-slash'
        }),
        stationInfoAlertData: {},
        layerObj: {},
        groupControlLayer: L.control.groupedLayers({}, {}, {
          position: 'topright',
        }),
        bigLine: {},
        replyEnergyMarker: null,

      }
    },
    components: {
      popup,
      stationInfoAlert,
      VueDraggableResizable,
      HighchartLine
    },
    watch: {},
    methods: {
      say: function () {
        alert(111);
      },
      alert1() {
        alert(111);
      },
      //设备管理-显示台站位置marker
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
        //每次点击切换城市时需要先清除上一个城市的markerLayer
        this.markersLayer.clearLayers();
        this.markersLayer.removeFrom(map);
        for (var i = 0; i < data.length; i++) {
          let id = data[i].code ? data[i].code : data[i].id;
          let marker = L.marker([data[i].latitude, data[i].longitude], {icon: myIcon});
          marker.infomation = data[i];
          this.markersLayer.addLayer(marker);
          let router = this.$router;
          let that = this;
          marker.on('click', function (e) {
            this._icon.src = this.flag ? '/static/img/marker1.png' : '/static/img/marker2.png';
            this.flag = !this.flag;
            let href = router.resolve({name: 'WorkAnalyze'}).href + '?id=' + id;
            let temp = marker.getPopup();
            let a = '';
            if (this.infomation.sName) {
              a = "<div id='basic'><p class='title'>基本信息</p><div class='bottom'>" +
                "<img class='left' src='/static/img/leafletimg.png'><ul class='right'>" +
                "<li>站名 : " + this.infomation.sName + "</li>" +
                "<li>厂家 : <span>" + this.infomation.sProducer + "</span></li>" +
                "<li>型号 : " + this.infomation.sModel + "</li>" +
                "<li>类型 : " + this.infomation.sType + "</li>" +
                "<li>负责人 : " + this.infomation.sPeople + "</li>" +
                "<li>建设时间 : " + this.infomation.sBuileTime + "</li>" +
                "<span class='info'><a href='" + href + "'>详情</a></span></ul></div></div>";
            } else {
              if (temp === undefined) {
                that.$http.get('api/EquipSurvey/EquInfo', {
                  mfid: id,
                }).then(res => {
                  let data = res.data;
                  a = "<div id='basic'><p class='title'>基本信息</p><div class='bottom'>" +
                    "<img class='left' src='/static/img/leafletimg.png'><ul class='right'>" +
                    "<li>站名 : " + data.name + "</li>" +
                    "<li>厂家 : <span>" + data.manu + "</span></li>" +
                    "<li>型号 : " + data.model + "</li>" +
                    "<li>类型 : " + data.type + "</li>" +
                    "<li>负责人 : " + data.chargeMen + "</li>" +
                    "<li>建设时间 : " + data.date + "</li>" +
                    "<span><a href='" + href + "'>详情</a></span></ul></div></div>";
                  let popup = L.popup({minWidth: 300, className: 'leaf-alert'})
                    .setContent(a);
                  marker.bindPopup(popup).openPopup();
                });
              } else {
                temp.setContent(a);
                temp.openPopup();
              }
              console.log(marker, 'marker');
            }
            // let popup = L.popup({minWidth: 300, className: 'leaf-alert'})
            //   .setContent(a);
            // marker.bindPopup(popup).openPopup();
          });
          marker.on('popupclose', function (e) {
            this._icon.src = '/static/img/marker1.png';
          });
        }
        this.markersLayer.addTo(map);
      },
      //设备管理-移除台站marker
      removeMarker: function () {
        this.markersLayer.clearLayers();
      },
      // 最大电平位置
      maxMarker(data){
        this.maxMarkersLayer.clearLayers();
        this.maxMarkersLayer.removeFrom(map);
        let myIcon = L.icon({
          iconUrl: '/static/img/maxMarker.png',
          iconSize: [45, 60],
          iconAnchor: [22.5, 60],
          popupAnchor: [0, -60]
        });
        // console.log(data.position.x,']]]]]]]');
        let marker = L.marker([data.position.y, data.position.x], {icon: myIcon});
        this.maxMarkersLayer.addLayer(marker);
        this.maxMarkersLayer.addTo(map);
      },
      //台站显示
      stationMarker: function (data, popupShow = true, show = true) {
        let that = this
        //     地图上的marker
        if (!(data instanceof Array)) {
          data = [];
        }
        //每次点击切换城市时需要先清除上一个城市的markerLayer
        this.stationLayer.clearLayers();
        this.stationLayer.removeFrom(map);

        let alert = document.getElementById('stationInfoAlert');
        let popup = L.popup({
          minWidth: 400,
          className: 'leaf-alert'
        })
          .setContent(alert);
        for (var i = 0; i < data.length; i++) {
          let stationIcon = L.divIcon({
            iconAnchor: [22.5, 60],
            popupAnchor: [0, -60],
            html: '<img width="45" height="60" src="/static/img/marker2.png"/>',
            className: 'stationIcon',
          });
          let marker = L.marker([data[i].latitude, data[i].longitude], {
            icon: stationIcon
          });
          marker.id = i;
          this.stationLayer.addLayer(marker);
          let that = this;
          marker.on('click', function (e) {
            if (popupShow) {
              let temp = marker.getPopup();
              let latlng = marker.getLatLng();
              popup.setLatLng([latlng.lat + 0.15, latlng.lng]);
              that.stationInfoAlertData = data[this.id].stations;
              if (temp != undefined) {
                if (marker.isPopupOpen()) {
                  marker.closePopup();
                } else {
                  marker.openPopup();
                }
                marker.togglePopup();
              } else {
                marker.bindPopup(popup).openPopup();
              }
            }
            console.log("marker click", data[marker.id]);
            // popup.openOn(map);
            that.$emit('stationInfoAlertList', data[marker.id])
          });
        }
        this.stationLayer.addTo(map);
        this.groupControlLayer.addOverlay(this.stationLayer, 'Marker图层');
        // map.on('click', function (e) {
        //   console.log(e,map,'marker listen e');
        //   var latlngPoint = new L.LatLng(e.latlng.lng, e.latlng.lat);
        //   that.stationLayer.fireEvent('marker',{
        //     latlng: latlngPoint,
        //   });
        //   // console.log(that.stationLayer.fire('click',e,true),'layer');
        //   // map._fireDOMEvent(e,'click',[that.stationLayer]);
        // });
      },
      //能量轨迹-矩形
      energyRetangle: function (data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.energyRetangleLayer.clearLayers();
          this.energyRetangleLayer.removeFrom(map);
          this.groupControlLayer.removeLayer(this.energyRetangleLayer);
          return
        }
        let data_ = [];
        let datas_arr = Object.entries(data);
        datas_arr.forEach(item => {
          let tmp = item[0].replace(/\=/g, ':');
          tmp = tmp.replace(/\X/g, '"X"');
          tmp = tmp.replace(/\Y/g, '"Y"');
          tmp = JSON.parse(tmp);
          data_.push({
            Lng: tmp.X,
            Lat: tmp.Y,
            Value: item[1]
          });
        });
        let energy = data_;
        let minPower = energy[0] ? energy[0].Value : 0;
        let maxPower = minPower;
        for (var i = 0; i < data_.length; i++) {
          var value = Number(energy[i].Value);
          // console.log(data[i].Value);
          if (value > maxPower) {
            maxPower = value;
          }
          if (value <= minPower) {
            minPower = value;
          }
        }
        colorScale.calcColorScale(Math.ceil(maxPower - minPower));
        let len = energy.length;
        let pop = L.popup({}).setContent('');
        for (var i = 0; i < len; i++) {
          // if (isNaN(energy[i].Lng) || isNaN(energy[i].Lat)) {
          //   continue;
          // };
          var p = coordtransform.wgs84togcj02(energy[i].Lng, energy[i].Lat);
          var pCentre = new LatLon(p[1], p[0]);
          var p1 = pCentre.rhumbDestinationPoint(125, 270);
          var p2 = pCentre.rhumbDestinationPoint(125, 180);
          var d = map.distance([pCentre.lat, pCentre.lon], [p1.lat, p1.lon]);
          var c = colorScale.getColor(minPower, maxPower, energy[i].Value);
          let energy1 = L.rectangle([[pCentre.lat * 2 - p2.lat, p1.lon], [p2.lat, pCentre.lon * 2 - p1.lon]], {
            color: c,
            fillOpacity: 1,
            // opacity:0.6
          });
          energy1.occupy = energy[i].Value / 10;
          this.energyRetangleLayer.addLayer(energy1);
          energy1.on('click', () => {
            let occupy = energy1.occupy;
            let str = `网格化占用度：${occupy}%`;
            pop.setLatLng(energy1.getCenter())
            pop.setContent(str);
            pop.openOn(map);
            this.$emit('gridOccupyClick', this)
          })
        }
        this.energyRetangleLayer.addTo(map);
        this.groupControlLayer.addOverlay(this.energyRetangleLayer, '网格化占用度');
        this.legend(minPower, maxPower,'网格化占用度',this.energyRetangleLayer,show);
      },
      //频谱地图
      frequencyMap: function ({data = [], maxPower=0, minPower=0, maxPosition={},show = true, clickShow = true, popupAlertShow = false} = {}) {
        //再次点击传入show=false则清除layer
        if (!show) {
          if (this.frequencyMapLayer) {
            this.frequencyMapLayer.clearLayers();
            this.frequencyMapLayer.removeFrom(map);
          }
          this.groupControlLayer.removeLayer(this.frequencyMapLayer);
          return
        }
        let grid = data;
        minPower = Math.ceil(minPower);
        maxPower = Math.ceil(maxPower);
        // colorScale.calcColorScale(48);
        colorScale.calcColorScale(Math.ceil(maxPower - minPower));
        var colorGradient = new Array();
        for (var i = minPower; i <= maxPower; ++i) {
          colorGradient.push(colorScale.getColor(minPower, maxPower, i));
        }
        if (!map.getBounds().contains([maxPosition.x, maxPosition.y])) {
          this.setMapView([maxPosition.y, maxPosition.x], 10);
          console.log('set center')
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
          }
        });
        // 频谱地图弹出层
        // if (popupAlertShow) {
        // }
        let popup, a;
        a = document.getElementById('popupAlert')
        popup = L.popup({
          minWidth: 240,
          className: 'leaf-alert'
        })
        .setContent(a);
        let that = this;
        choroplethLayer.on('click', function (e) {
          if (clickShow) {
            that.popupShow = true;
            popup.setLatLng(e.latlng);
            popup.openOn(map);
          } else {
            // let occupy = energy1.occupy;
            // let str = `网格化占用度：${occupy}%`;
            // popup.setContent(str);
          }
        });
        // 经纬度
        this.frequencyMapLayer.addLayer(choroplethLayer);
        this.frequencyMapLayer.addTo(map);
        this.groupControlLayer.addOverlay(this.frequencyMapLayer, '频谱地图');
        this.legend(minPower?minPower:0,maxPower?maxPower:48,'频谱地图',this.frequencyMapLayer,show);

      },

      // 能量轨迹-圆形
      energyCircle(data, maxPower, minPower, show = true, name = '') {
        //再次点击传入show=false则清除layer
        let that = this;
        if (!show) {
          if (that.energyCircleLayer)
            that.energyCircleLayer.remove();
          // that.legend(minPower, maxPower, show);
          this.groupControlLayer.removeLayer(this.energyCircleLayer);
          return
        }
        // colorScale.calcColorScale(Math.ceil(maxPower - minPower));
        // let points = [];
        // for (let i = 0; i < data.length; i++) {
        //   if (isNaN(data[i].position.x) || isNaN(data[i].position.y)) {
        //     continue;
        //   }
        //   var p = coordtransform.wgs84togcj02(data[i].position.x, data[i].position.y);
        //   var c = colorScale.getColor(minPower, maxPower, data[i].power);
        //   p[2] = c;
        //   points.push(p);
        // }
        // that.energyCircleLayer.setData(points);
        // that.energyCircleLayer.addTo(map);
        // that.energyCircleLayer.addEventParent(this.stationLayer);
        // this.groupControlLayer.addOverlay(this.energyCircleLayer,"能量轨迹");
        // that.legend(minPower, maxPower, show);
        /*=======================*/
        colorScale.calcColorScale(Math.ceil(maxPower - minPower));
        let centerIndex = Math.ceil(data.length / 2);
        for (let i = 0; i < data.length; i++) {
          // var v = r[i].split(',');
          if (isNaN(data[i].position.x) || isNaN(data[i].position.y)) {
            continue;
          }
          var p = coordtransform.wgs84togcj02(data[i].position.x, data[i].position.y);
          if (i == centerIndex && !map.getBounds().contains([p[1], p[0]])) {
            this.setMapView([p[1], p[0]], 12);
          }
          var c = colorScale.getColor(minPower, maxPower, data[i].power);
          // var circlePoint = L.circleMarker([p[1], p[0]], {
          //   color: c,
          //   radius: 5,
          //   fillOpacity: 1,
          // });
          var circlePoint = L.circleMarker([p[1], p[0]], {
            color: c,
            radius: 5,
            fillOpacity: 1,
            // weight:5,
          });
          circlePoint.addTo(map);
          that.energyCircleLayer.addLayer(circlePoint);
          circlePoint.on('click', function () {
            let point = this._latlng;
            that.$emit('showLine', point)
          })
        }
        this.groupControlLayer.addOverlay(this.energyCircleLayer, name ? name : "能量轨迹");
        that.energyCircleLayer.addTo(map);
        that.legend(minPower, maxPower,'能量轨迹', this.energyCircleLayer,show);
      },

      //添加色柱
      legend(minPower, maxPower,name,layer,show = true) {
        if (!show) {
          if (this.legendLayer)
            this.legendLayer.remove();
            // 将色柱清空
            this.legendLayer.options.legends.length = 0;
            return
        }
        if (this.legendLayer) {
          this.legendLayer.remove();
            // 将色柱清空
          this.legendLayer.options.legends.length = 0;
        }
        // console.log(minPower,maxPower);
        var strHtml = '<div class="info legend">';
        strHtml += "<span style='line-height: 10px;width: 32px'>"+Math.ceil(maxPower)+"</span>";
        strHtml += "<div class='legend__list'>";
        // console.log(maxPower,minPower);
        var len = Math.ceil(maxPower - minPower);
        //.style.height = window.innerheight / len + "px";
        // loop through our density intervals and generate a label with a colored square for each interval
        if (len !== 0) {
          for (var i = len; i >= 0; i--) {
            //只绘制100个图例dom元素
            let temp = Math.ceil(len / 100);
            if (i % temp != 0 && i != len && i != Math.ceil(minPower)) {
              continue;
            }
            strHtml +=
              '<i style="background:' + colorScale.getColor(minPower, maxPower, minPower + i) + '"></i>';
          }
        }
        strHtml += "</div>";
        strHtml += "<span style='line-height: 10px;width: 32px'>"+Math.ceil(minPower)+"</span>";

        strHtml += '</div>';
        this.legendLayer.addLegend({
          name: name,
          layer: layer,
          elements: [{
            html: strHtml,
          }]
        });
        this.legendLayer.addTo(map);
      },
      show() {
        that.$emit('showSpectra0')
      },
      dataReplyMarker(data, show = true) {
        //再次点击传入show=false则清除layer
        if (!show) {
          this.markersLayer.clearLayers();
          this.markersLayer.removeFrom(map);
          return
        }
        var myIcon = L.icon({
          iconUrl: '/static/img/marker2.png',
          iconSize: [45, 60],
          iconAnchor: [22.5, 60],
          popupAnchor: [0, -60]
        });
        //     地图上的marker
        if (data === undefined) {
          data = [];
        }
        //每次点击切换城市时需要先清除上一个城市的markerLayer
        this.markersLayer.clearLayers();
        this.markersLayer.removeFrom(map);
        for (var i = 0; i < data.length; i++) {
          let marker = L.marker([data[i].position.y, data[i].position.x], {
            icon: myIcon
          });
          marker.index = i;
          this.markersLayer.addLayer(marker);
          let that = this;
          marker.on('click', function (e) {
            that.$emit('dataReplyMarkerClick', data[marker.index]);
          });
        }
        this.markersLayer.addTo(map);
      },
      dataReplyEnergyMarker(latlng, name, show = true) {
        if (!show && this.replyEnergyMarker) {
          this.replyEnergyMarker.remove();
        }
        let stationIcon = L.divIcon({
          iconAnchor: [22.5, 60],
          popupAnchor: [0, -60],
          html: '<img width="50" height="50" src="/static/img/che.png"/>',
          className: 'vecIcon',
        });
        let p = coordtransform.wgs84togcj02(latlng.lng, latlng.lat);
        latlng.lat = p[1];
        latlng.lng = p[0];
        if (!this.replyEnergyMarker) {
          this.replyEnergyMarker = L.marker([latlng.lat, latlng.lng], {
            icon: stationIcon
          }).bindPopup('移动站');
        } else {
          this.replyEnergyMarker.setLatLng(latlng);
        }
        if (!map.getBounds().contains(latlng)) {
          this.setMapView([latlng.lat, latlng.lng], 10);
        }
        this.replyEnergyMarker.addTo(map);
      },

      // 绘制区域
      drawPolygon() {
        var points = [],
          points_length = 0,
          polyline,
          polygon;
        // 单击
        var clickFlag,
          clickTimes = 1,
          isDrag = false;
        map.on('mousedown', function (e) {
          map.off('mousemove');
          if (clickFlag) clearTimeout(clickFlag);
          clickFlag = setTimeout(function () {
            if (clickTimes == 1 && !isDrag) {
              points.push([e.latlng.lat, e.latlng.lng]);
              points_length = points.length;
              // 移动
              map.on('mousemove', function (e) {
                // 清除
                if (polyline) map.removeLayer(polyline);
                if (polygon) map.removeLayer(polygon);
                // polyline
                points[points_length] = [e.latlng.lat, e.latlng.lng];
                polyline = new L.Polyline(points);
                map.addLayer(polyline);
                // polygon
                polygon = new L.Polygon(points);
                map.addLayer(polygon);
              });
            }
          }, 300);
        });
        // 双击
        map.on('dblclick', function () {
          if (points.length) {
            clickTimes = 2;
            // polyline
            polyline = new L.Polyline(points);
            map.addLayer(polyline);
            // polygon
            polygon = new L.Polygon(points);
            map.addLayer(polygon);
            // 移除事件
            map.off('mousemove');
            setTimeout(function () {
              clickTimes = 1;
              // 保存layer(方便后面删除)
              var layerName = prompt('请入名称');
              if (layerName) {
                this.layerObj[layerName] = [polyline, polygon];
                console.log(this.layerObj);
              }
              points = [];
            }, 300);
          }
        });
        // 键盘事件
        $(document).keyup(function (e) {
          if (e.keyCode == 27) { // esc键
            if (points.length) {
              map.off('mousemove');
              clickTimes = 1;
              map.removeLayer(polyline);
              map.removeLayer(polygon);
              points = [];
            }
          }
        });
        // 拖动
        map.on('movestart', function () {
          isDrag = true;
        });
        map.on('moveend', function () {
          isDrag = false;
        });
      },
      // drawPolygon();
      // this.initMarker();
      // this.markersLayer.addTo(map);
      setMapView(latlng, zoom = 0) {
        if (!(latlng instanceof Array)) {
          console.error("latlng must be array");
          return
        }
        if (!zoom) {
          zoom = map.getZoom();
        }
        if (map) {
          map.setView(latlng, zoom);
        }
      },


    },
    mounted() {
      //初始化一个地图
      map = L.map('map', {
        preferCanvas: true,
        fullscreenControl: true, //加载全屏插件配置
        zoomControl: false, //地图缩放控制按钮
        doubleClickZoom: true, //双击缩放地图
        dragging: true, //拖拽地图
        keyboard: true, //使用键盘左右键移动地图
        // drawControl: true,
        scrollWheelZoom: false, //使用滚轮控制住缩放
        inertia: false,//拖动惯性
        zoomAnimation: true,//缩放动画

      }).setView([23.1099, 113.097], 8);

      // //加载地图资源
      // let mapSou = L.tileLayer('//192.168.100.89:23333/{z}/{x}/{y}',{
      //   maxZoom: 18,
      //   minZoom: 3,
      // }).addTo(map);

      let mapSou = L.tileLayer('//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        minZoom: 3,
        subdomains: [1, 2, 3, 4]
      }).addTo(map);
      let options = {
        //配置画画属性
        color: 'red',
        showMeasurements: true //显示距离数据
      };
      var editableLayers = new L.FeatureGroup();
      map.addLayer(editableLayers);

      var opt = {
        position: 'topright',
        draw: {
          polyline: {
            shapeOptions: {
              color: '#f357a1',
              weight: 10
            },
            showLength: true //计算距离
          },
          polygon: {
            allowIntersection: true, // Restricts shapes to simple polygons
            showArea: true, //计算面积
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
              color: '#fd5659'
            }
          },
          circle: false,
          rectangle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: true
        }
      };

      var drawControl = new L.Control.Draw(opt);
      map.on('draw:drawstart ', function (e) {
        console.log(e, '222222222');
        var layers = e.layers;
        // layers.eachLayer(function (layer) {
        //     //do whatever you want; most likely save back to db
        // });
      });

      map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === 'marker') {
          layer.bindPopup('A popup!');
        }

        editableLayers.addLayer(layer);
      });
      this.groupControlLayer.addTo(map);
      this.groupControlLayer.addOverlay(editableLayers, '绘制图层');
      let control = L.control.zoom({
        position: 'topright',
      }).addTo(map);
      map.addControl(drawControl);
      let current = this.currentLocation;
      if (current.latitude && current.longitude) {
        let latlng = [current.latitude, current.longitude];
        this.setMapView(latlng, 10);
      }
      //能量轨迹点击事件
      // map.on('energy',(point)=>{
      //   console.log("energy fire point",point);
      //   this.$emit('showLine', point);
      // });
      // var that = this;
      // map.on('energy:outside',function(e){
      //   console.log('energy:outside',e.containerPoint);
      //   //遍历marker查询点击事件
      //   that.stationLayer.eachLayer((layer)=>{
      //     let markerPoint = map.latLngToContainerPoint(layer._latlng);
      //     let bounds = L.bounds([
      //       [markerPoint.x+23,markerPoint.y],
      //       [markerPoint.x-23,markerPoint.y],
      //       [markerPoint.x+23,markerPoint.y-60],
      //       [markerPoint.x-23,markerPoint.y-60],
      //     ]);
      //     if(bounds.contains(e.containerPoint)){
      //       layer.fire('click',e);
      //       return;
      //     }
      //   });
      //   //编辑频谱地图查询点击事件
      //   that.frequencyMapLayer.eachLayer((layer)=>{
      //     console.log(layer,'l');
      //   });
      // });
    },
    computed: {
      currentLocation() {
        return this.$store.state.currentLocation;
      }
    },
    watch: {
      currentLocation: function (newVal, oldVal) {
        if (newVal.code != oldVal.code) {
          let current = this.currentLocation;
          let latlng = [current.latitude, current.longitude];
          this.setMapView(latlng, 10);
        }
      }
    },
  }
</script>
