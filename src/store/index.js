import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import mutations from './mutations'
Vue.use(Vuex);
const state = {
  procode:440000,
  currentLocation:{
    id:1,
    name:'广东省',
  },
  provinceData:{
    gdp: 79512.05,
    population: 10849,
    measurment: 17.97,
    workers: 500,
    stations: 1000
  },
  cityInfo:{
    gdp: 79512.05,
    population: 10849,
    measurment: 17.97,
    workers: 500,
    stations: 1000
  },
  province:'广东省',
  locationLevel:0,//0表示省级，1表示市级
  cityData:[],
  cityList:[],
  equipment:{
    subMenuShow:false,
    active:'1',
    subActive:'1'
  },
  menuShow:true,
  highchartHeight:false,
  headerTitle:''
};
export default new Vuex.Store({
  state,
  getters,
  mutations
});
