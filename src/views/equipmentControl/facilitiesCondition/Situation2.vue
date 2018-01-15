<template>
  <!--主要内容盒子-->
  <div class="content" :hide="currentLocation">
    <!--左边内容-->
    <div class="left">
      <!--2017年全省监测设施数量统计饼图-->
      <div class="cake">
        <integration :option="integraOption"/>
        <div class="tab">
          <input type="radio" name="faci" v-model="type" value="0">所有设施
          <input type="radio" name="faci" v-model="type" value="1">固定站
          <input type="radio" name="faci" v-model="type" value="2">移动监测设施
          <input type="radio" name="faci" v-model="type" value="3">可搬移设备
          <input type="radio" name="faci" v-model="type" value="4">管制设备
        </div>
      </div>
      <!--最近十年全省监测设施数量统计 柱状图-->
      <div class="province">
        <province :option="multiBarOption"/>
      </div>
    </div>
    <!--中间内容-->
    <div class="r-box" v-if="!mapShow">
      <div class="center">
        <areaProvince :option="areaOption" v-on:select="show"/>
        <div class="mapbg">监测设施总数：<span>{{equipCount}}个</span>，集成商总数 : {{ integraCount }}家</div>
        <div class="remark">备注 : 地图上的数字代表该市设施数量（个）</div>
      </div>
      <!--右边内容-->
      <div class="right">
          <city :option="cityOption" class="city"/>
      </div>
    </div>
    <div id="map2" class="r-box" v-if="mapShow">
      <div class="areabg"><p>监测设施总数：<span>{{cityEquipCount}}个</span>，集成商总数 : {{ integraCount }}家</p></div>
      <map2 ref="map"/>
      <div class="map-legend">
        <ul class="map-ul">
          <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
        </ul>
      </div>
      <!-- <span @click="close" class="close"><i class="el-icon-close"></i></span> -->
    </div>
  </div>
</template>

<style scoped>
  .mapbg , .areabg {
    line-height: 70px;
  }
  .content {
    position: relative;
    width: 90%;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  /*左边内容*/
  .left{
    display: flex;
    flex-direction: column;
  }
  .cake{
    position: relative;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    width: 400px;
    height: 280px;
  }
  .province{
    margin-top: 27px;
  }

  /*中间内容*/
  /*.centre{
    width: 40%;
    height: 600px;
  }*/
  .r-box {
    width: 68%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .right {
    width: 400px;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    height: 600px;
  }
  .city {
    /*padding: 10px 0 0 0;*/
  }
  #map2{
      display: flex;
      height: 600px;
      width: 65%;
      background: rgba(0,0,0,0.5);
      border: solid 1px blanchedalmond;
      position: absolute;
      top: 0px;
      right: 0%;
      z-index: 98;
      margin-left: 20px;
    }
    .close {
      display: block;
      width: 30px;
      height: 20px;
      z-index: 1000;
      position: absolute;
      top: 10px;
      right: 10px;
      color: black;
      font-size: 24px;
    }
    .remark{
      color: #e8f04d;
      position: relative;
      top: -90px;
      left: 145px;
    }
    .tab{
      color: #deeb41;
      position: absolute;
      top: 25px;
      right: 0px;
      width: 230px;
    }
    .tab input{
      vertical-align: -2px;
      margin-right: 2px;
    }
</style>
<script>
  import integration from '../../../components/equipmentControl/facilitiesCondition/overview/integration.vue'
  import province from '../../../components/equipmentControl/facilitiesCondition/overview/province.vue'
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import areaProvince from '../../../components/equipmentControl/facilitiesCondition/overview/map.vue'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import GetIntegraOption from '../../../assets/js/chartOptions/integraOption'
  import GetMultiBarOption from '../../../assets/js/chartOptions/multiBarOption'
  import GetCityOption from '../../../assets/js/chartOptions/cityOption'
  import GetAreaOption from '../../../assets/js/chartOptions/areaOption'
  import {dateData} from '../../../assets/js/public'
  import {getFacilityType} from "../../../assets/js/mixin"

  export default {
    mixins:[getFacilityType],
    data() {
      return {
        pieList:[],
        pieOption:{},
        integraOption:{},
        multiBarOption:{},
        cityOption: {},
        areaOption:{},
        equipCount:0,
        integraCount:0,
        mapShow:false,
        type:'0',
        cityCode:'',
        locationLevelStr:'',
        markerData:[],
        cityEquipCount:0,
      }
    },
    components: {
      province,
      city,
      integration,
      areaProvince,
      map2
    },
    methods:{
      show:function (e) {
        if(e.componentType === "series") {
          this.initMap();
          this.mapShow = true;
        }
      },
      close:function(){
        this.mapShow = false;
      },
      init:function(){
        //如果是市级
        if(this.$store.state.locationLevel === 1) {
            this.mapShow = true;
            this.locationLevelStr = '市';
            this.cityCode = this.$store.state.currentLocation.code;
            this.initMap();
        } else {
            this.mapShow = false;
            this.locationLevelStr = '省';
            this.cityCode = '';
            this.initCity();
        }
        this.initPie();
        this.initMultiBar();
        this.initArea();
        this.initLegend();

      },
      initPie:function(){
        this.$http.get('api/EquipSurvey/InteCountStatistics',{
          procode:this.$store.state.procode,
          year:dateData.endyear,
          citycode:this.cityCode,
          type:this.type,
          }).then(res=>{
          this.integraCount = res.data.length;
          let labelShow = true;
          //判断如果数据过多，则不显示label
          if(this.integraCount > 10) {
            labelShow = false;
          }
          let legend = [];
          for (var i = 0; i < res.data.length; i++) {
            legend.push(res.data[i].name);
            let temp = {
              itemStyle:{
                normal:{
                  color:res.data[i].color,
                },
              },
              label:{
                normal:{
                  show:labelShow,
                },
                emphasis:{
                  show:labelShow,
                },
              },
              labelLine:{
                normal:{
                  show:labelShow,
                },
                emphasis:{
                  show:labelShow,
                },
              },
            };
            res.data[i] = Object.assign(res.data[i],temp);
          }
          this.integraOption = GetIntegraOption(dateData.endyear+'年全'+this.locationLevelStr+'集成商设施数量统计',legend,res.data);
        });
      },
      initMap:function(){
        this.$http.get('api/EquipSurvey/EquList',{
            procode:this.$store.state.procode,
            citycode:this.$store.state.currentLocation.code,
            year:dateData.endyear,
          }).then(res=>{
              this.$refs.map.initMarker(res.data);
          });
      },
      initCity:function(){
        this.$http.get('api/EquipSurvey/AllCitiesInteStatistics',{
            procode:this.$store.state.procode,
            citycode:this.cityCode,
            year:dateData.endyear
          }).then(res => {
          let list = res.data;
          for (var i = 0; i < list.length; i++) {
            let temp = {
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  formatter:({value})=>{
                    if(value <= 0) {
                      return '';
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: list[i].color,
                },
              },
            };
            list[i] = Object.assign(list[i], temp);
          }
          this.cityOption = GetCityOption(dateData.endyear+'年全省各地市各监测设施数量统计', this.$store.state.cityList, list);
        });
      },
      initMultiBar:function(){
        this.$http.get('api/EquipSurvey/LastYearsInteInfo',{
          procode:this.$store.state.procode,
          startyear:dateData.startyear,
          endyear:dateData.endyear,
          citycode:this.cityCode,
        }).then(res => {
          let list = res.data;
          for (var i = 0; i < list.length; i++) {
            let temp = {
              type: 'bar',
              stack: '总量',
              barMinHeight:10,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight',
                  formatter:({value})=>{
                    if(value <= 0) {
                      return 0;
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: list[i].color,
                },
              },
            }
            list[i] = Object.assign(list[i], temp);
          }
          this.multiBarOption = GetMultiBarOption('最近10年全'+this.locationLevelStr+'各集成商设施数量统计', dateData.xData, list);
        });
      },
      initArea:function(){
        this.$http.get('api/EquipSurvey/ProEachCityEquInfo',{
          procode:this.$store.state.procode,
          year:dateData.endyear
          }).then(res=>{
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              data[i].value = data[i].data;
              if(data[i].code == this.cityCode) {
                this.cityEquipCount = data[i].data;
              }
            }
            this.areaOption = GetAreaOption(res.data.data);
            this.equipCount = res.data.count;
        });
        /*****************/
      },
    },
    mounted() {
      // this.init();
      this.$store.state.equipment.subActive = '2';
    },
    computed:{
      currentLocation:function(){
        this.cityCode = '';
        this.init();
        return this.$store.state.currentLocation;
      },
    },
    watch:{
      type:function(val){
        this.initPie();
      }
    },
  }


</script>
