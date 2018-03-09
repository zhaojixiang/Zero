import 'assets/fonts/iconfont.css'
import Vue from 'vue'
import App from './Enter'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCarousel from 'vue-carousel'
import 'echarts'
import http from './utils/axios'
import guangdong from './assets/json/guangdong.json'
import './assets/leaflet/leaflet.css'
import  './assets/leaflet/leaflet-src-1.3.1'
import  'assets/leafletJS/leaflet-html-legend/L.Control.HtmlLegend'
import  'assets/leafletJS/leaflet-html-legend/L.Control.HtmlLegend.css'
import 'assets/js/choropleth'
import "assets/leafletJS/groupControlLayer/leaflet.groupedlayercontrol"
import "assets/leafletJS/groupControlLayer/leaflet.groupedlayercontrol.css"
// import MarkerCluster from 'leaflet.markercluster'
import 'assets/leafletJs/fullcanvas'
import 'assets/leafletJs/leaflet.fullcanvas.downsample'
import './assets/leafletJs/leaflet.markercluster.js'
import './assets/leafletJs/MarkerCluster.css'
import './assets/leafletJs/MarkerCluster.Default.css'
import 'assets/leafletjs/leaflet.draw.css'
// import 'assets/leafletjs/leaflet.draw-src'
import 'assets/leafletJS/leaflet.draw-src'
import 'animate.css/animate.min.css'
import globalConstant from './assets/js/global.constant'
import ViserVue from 'viser-vue'
// 引入highcharts组件
import VueHighcharts from 'vue-highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import heatMap from 'highcharts/modules/heatmap';
import loadHighchartsMore from 'highcharts/highcharts-more';
import boost from 'highcharts/modules/boost';
import extendHeatMap from 'assets/js/chartOptions/extendHeatMap'
import downSample from 'assets/js/chartOptions/highcharts-downsample'
import Highcharts from 'highcharts';
//全局引入api接口
import {request} from 'api/api'
//正则验证
import SimpleVueValidation from 'simple-vue-validator';
import "animate.css"
global.Validator = SimpleVueValidation.Validator;//正则验证
NoDataToDisplay(Highcharts)
heatMap(Highcharts)
loadHighchartsMore(Highcharts)
boost(Highcharts)
extendHeatMap(Highcharts)
downSample(Highcharts)
Highcharts.setOptions({
  lang:{
    noData:"",
    // noData:"暂无数据",
    resetZoomTitle:"重置缩放"
  },
});
ECharts.registerMap('guangdong', guangdong)
Vue.use(ViserVue);
Vue.use(http)
Vue.use(ElementUI)
// Vue.use(LeafletDraw)
// Vue.use(leafletChoropleth)
Vue.use(VueCarousel)
// Vue.use(MarkerCluster)
Vue.component('chart', ECharts)
Vue.use(VueHighcharts, { Highcharts })
Vue.use(SimpleVueValidation);
Vue.prototype.$http = http;
Vue.prototype.$const = globalConstant;
Vue.prototype.$api = request;
Vue.config.productionTip = false

let initData = JSON.parse(document.getElementById('init').innerHTML);
// console.log(initData,'init',initData.procode);
let init = (initData)=>{
  store.state.procode = initData.procode;
  store.state.province = initData.province;
  store.state.cityData = initData.citys;
  let cityList = [];
  for (var i = 0; i < initData.citys.length; i++) {
    cityList.push(initData.citys[i].name);
  }
  store.state.cityList = cityList;
};
init(initData);

// require('./assets/js/mock');
let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
Vue.use({
  vm
})
