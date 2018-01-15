<template>
  <!--主要内容盒子-->
  <div class="content" :hide="currentLocation">
    <!--左边内容-->
    <div class="left">
      <!--最近十年全省GDP与监测设施关系-->
      <linebar1 v-on:select="showPie" id="leftline" :lineOption="peopleLineOption" :barOption="peopleBarOption" :setting="{width: '400px', height: '320px'}" />
      <p style="font-size:16px;">最近十年全{{ locationLevelStr }}人口和监测设施关系</p>
      <ul class="left-ul">
        <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
        <li><span :style="{background:'#ff0200'}"></span> 人口</li>
      </ul>
      <!--点击图表的弹出框-->
      <div id="alert" v-if="pieShow">
        <pie :option="pieOption" :data="pieList" :setting="{width: '620px', height: '400px'}"/>
        <span @click="closePie" id="close"><i class="el-icon-close"></i></span>
      </div>
    </div>
    <!--中间内容-->
    <div class="r-box" v-if="!mapShow">
      <div class="center">
        <areaProvince :option="areaOption" v-on:select="showMap"/>
        <div class="mapbg"><p>监测设施总数：<span>{{equipCount}}个</span>，人口总数 : {{ population }}万，每个站点的人口为{{ perStaPopulation }}万</p></div>
        <div class="remark">备注 : 地图上的数字代表该市设施数量（个）</div>
      </div>
      <!--右边内容-->
      <div class="right">
        <contrast class="city" :contrastOption="contrastOption" :setting="{width:'400px',height:'600px'}"/>
      </div>
    </div>
    <div id="map2" class="r-box" v-if="mapShow">
      <div class="areabg"><p>监测设施总数：<span>{{cityEquipCount}}个</span>，人口总数 : {{ cityPopulation }}万，每个站点的人口为{{ cityPerStaPopulation }}万</p></div>
      <map2 ref="map"/>
      <div class="map-legend">
        <ul class="map-ul">
          <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
        </ul>
      </div>
      <!-- <span @click="closeMap" class="close"><i class="el-icon-close"></i></span> -->
    </div>
  </div>
</template>
<style scoped>
  .content {
    position: relative;
    width: 90%;
    height: 600px;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  /*左边内容*/
  .left{
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    width: 400px;
  }
  .left p{
    position: relative;
    top: -465px;
    font-size: 18px;
    text-align: center;
  }
  .left-ul{
    position: relative;
    top: -456px;
    left: 10px;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }
  .left-ul li{
    width: 100px;
    list-style: none;
  }
  .left span{
    display: inline-block;
    height: 12px;
    width: 12px;
    background: #3388ff;
    position: relative;
    top: 1px;
  }
  #leftline{
    padding-top: 50px;
  }
  #alert{
  display: block;
  z-index: 101;
  top: -430px;
  left: 100px;
  height: 400px;
  width: 620px;
  background: #5294d1;
  border: solid 1px #0078A8;
  position: relative;
  }
  #close{
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  /* color: #ff3b2b; */
  }
  /*中间内容*/
  /*.center{*/
    /*width: 40%;*/
  /*}*/
  .r-box {
    width: 68%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .remark{
    color: #e8f04d;
    position: relative;
    top: -166px;
    left: 145px;
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
</style>
<script>
  import linebar1 from '../../../components/equipmentControl/index/linebar1.vue'
  import pie from '../../../components/equipmentControl/index/pie.vue'
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import areaProvince from '../../../components/equipmentControl/facilitiesCondition/overview/map.vue'
  import GetPieOption from '../../../assets/js/chartOptions/pieOption'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import GetLineOption from '../../../assets/js/chartOptions/lineOption'
  import GetLinearBarOption from '../../../assets/js/chartOptions/linearBarOption'
  import contrast from '../../../components/equipmentControl/common/contrast.vue'
  import GetContrastOption from '../../../assets/js/chartOptions/contrastOption'
  import GetAreaOption from '../../../assets/js/chartOptions/areaOption'
  import {dateData} from '../../../assets/js/public'
  import {getFacilityType} from "../../../assets/js/mixin"


  export default {
    mixins:[getFacilityType],
    data() {
      return {
        pieList:[],
        linearLineOption:{},
        linearBarOption:{},
        peopleLineOption:{},
        peopleBarOption:{},
        contrastOption:{},
        pieOption:{},
        areaOption:{},
        equipCount:0,
        integraCount:0,
        mapShow:false,
        pieShow:false,
        year:dateData.endyear,
        cityCode:'',
        locationLevelStr:'',
        markerData:[],
        perStaPopulation:0,
        cityEquipCount:0
      }
    },
    components: {
      linebar1,
      city,
      areaProvince,
      map2,
      contrast,
      pie
    },

    mounted() {
      // this.init();
    },
    methods:{
      showMap:function (e) {
        if(e.componentType === "series") {
          this.initMap();
          this.mapShow = true;
        }
      },
      showPie:function (e) {
        if(e.componentType === "series") {
          this.year = dateData.xData[e.dataIndex];
          this.initPie();
          this.pieShow = true;
        }
      },
      closeMap:function(){
        this.mapShow = false;
      },
      closePie:function(){
        this.pieShow = false;
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
            this.initArea();
            this.initRight();
        }
        this.initPie();
        this.initBar();
        this.initLegend();
      },
      initPie:function(){
        //      全省/市监测设施数量统计
        this.$http.get('api/HomePage/ProvEquCountStatistics',{
            procode:this.$store.state.procode,
            citycode:this.cityCode,
            year:this.year,
        }).then(res => {
          this.pieList = res.data;
          let pieChildData = [];
          this.cityEquipCount = 0;
          for (var i = 0; i < this.pieList.length; i++) {
            if(this.year == dateData.endyear) {
              this.cityEquipCount += this.pieList[i].value;
            }
            let temp = {
              itemStyle:{
                normal:{
                  color:this.pieList[i].color,
                }
              }
            };
            this.pieList[i] = Object.assign(this.pieList[i],temp);
            if(this.pieList[i].childs != undefined) {
              pieChildData = this.pieList[i].childs;
              for (var j = 0; j < pieChildData.length; j++) {
                let temp = {
                  itemStyle:{
                    normal:{
                      color:pieChildData[j].color,
                    }
                  }
                };
                pieChildData[j] = Object.assign(pieChildData[j],temp);
              }
            }
          }
          this.pieOption = GetPieOption(this.year+'年全'+this.locationLevelStr+'监测设施数量统计',this.pieList,pieChildData,[0, 75],[83, 98],['59%', '48%'],true);
          });
      },
      initBar:function(){
        this.$http.get('api/HomePage/LastDecaPopuEquRela', {
          procode: this.$store.state.procode,
          citycode:this.cityCode,
          startyear:dateData.startyear,
          endyear:dateData.endyear,
          }).then(res => {
          let list = res.data;
          for (var i = 0; i < list.ratio.length; i++) {
            let temp = {
              type: 'line',
              itemStyle: {
                normal: {
                  color: list.ratio[i].color,
                },
              },
            }
            list.ratio[i] = Object.assign(list.ratio[i], temp);
          }
          // this.cityPopulation = list.amount[9];
          this.peopleLineOption = GetLineOption('', ['人口'], dateData.xData, list.ratio, '比值(万/个)');
          this.peopleBarOption = GetLinearBarOption(dateData.xData, list.amount,'人口(万)');
        });
      },
      initRight:function(){
        //      2017年全省各地市GDP和监测设施关系
        this.$http.get('api/EquipSurvey/AllCitiesEquStatistics',{
                procode:this.$store.state.procode,
                year:dateData.endyear,
                }).then(res => {
                let list = res.data;
                for (var i = 0; i < list.length; i++) {
                  let temp = {
                    stack: 'two',
                    type: 'bar',
                    barGap: 20,
                    barWidth: 20,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
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
          this.$http.get('api/HomePage/ProEachCityPopu',{
                    procode:this.$store.state.procode,
                    year:dateData.endyear,
                  }).then(res=>{
                    let ratio = {
                            name: '人口',
                            type: 'bar',
                            barGap: 20,
                            barWidth: 20,
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
                                color: '#ff0200',
                              },
                            },
                            data: res.data,
                        }
                    list.push(ratio);
                    this.contrastOption = GetContrastOption(dateData.endyear+'年全省各地市人口和监测设施关系',this.$store.state.cityList,list,'人口(万)');
                  });
              });
      },
      initArea:function(){
        this.$http.get('api/EquipSurvey/ProEachCityEquInfo',{
          procode:this.$store.state.procode,
          year:dateData.endyear
          }).then(res=>{
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].value = res.data.data[i].data;
            }
            this.areaOption = GetAreaOption(res.data.data);
            this.equipCount = res.data.count;
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
    },
    computed:{
      currentLocation:function(){
        this.cityCode = this.$store.state.currentLocation.code;
        this.init();
        return this.$store.state.currentLocation;
      },
      population:function(){
        if(this.equipCount == 0) {
          this.perStaPopulation = 0;
        } else {
          this.perStaPopulation = (this.$store.state.provinceData.population/this.equipCount).toFixed(2);
        }
        return this.$store.state.provinceData.population;
      },
      cityPopulation:function(){
        return this.$store.state.cityInfo.population;
      },
      cityPerStaPopulation:function(){
        if(this.cityEquipCount == 0) {
          return 0;
        } else {
          return (this.cityPopulation/this.cityEquipCount).toFixed(2);
        }
      },
    },
  }


</script>
