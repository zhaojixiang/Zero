import Vue from 'vue'
import App from './Enter'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts/components/ECharts.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCarousel from 'vue-carousel'
import 'echarts'
import http from './utils/axios'
import guangdong from './assets/json/guangdong.json'
import './assets/leaflet/leaflet.css'
import  './assets/leaflet/leaflet'
import 'assets/js/choropleth'
import globalConstant from './assets/js/global.constant'
import ViserVue from 'viser-vue'
// 引入highcharts组件
import VueHighcharts from 'vue-highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import heatMap from 'highcharts/modules/heatmap';
import loadHighchartsMore from 'highcharts/highcharts-more';
import boost from 'highcharts/modules/boost';
import Highcharts from 'highcharts';
// import leafletChoropleth from 'leaflet-choropleth'
NoDataToDisplay(Highcharts)
heatMap(Highcharts)
loadHighchartsMore(Highcharts)
boost(Highcharts)
Highcharts.setOptions({
  lang:{
    noData:"暂无数据",
    resetZoomTitle:"重置缩放"
  },
});
ECharts.registerMap('guangdong', guangdong)
Vue.use(ViserVue);
Vue.use(http)
Vue.use(ElementUI)
// Vue.use(leafletChoropleth)
Vue.use(VueCarousel)
Vue.component('chart', ECharts)
Vue.use(VueHighcharts, { Highcharts })
Vue.prototype.$http = http;
Vue.prototype.$const = globalConstant;
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

require('./assets/js/mock');
let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
Vue.use({
  vm
})
