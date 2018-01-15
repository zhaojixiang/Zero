<template>
  <!--主要内容盒子-->
  <div class="content" :hide="currentLocation">
    <!--左边内容-->
    <div class="left" >
      <!--最近十年全省监测设施数量与监测设施关系-->
      <doublebar1 v-on:select="showPie" :option="stationOption" :setting="{width: '400px', height: '600px'}" />
      <!--点击图表的弹出框-->
      <div id="alert" v-if="pieShow">
        <pie :option="pieOption" :data="pieList" :setting="{width: '620px', height: '400px'}"/>
        <span @click="closePie" id="close"><i class="el-icon-close"></i></span>
      </div>
    </div>
    <!--中间内容-->
    <div class="r-box" v-if="!mapShow">
      <div class="center" @click="show">
        <areaProvince :option="areaOption" v-on:select="show"/>
        <div class="mapbg"><p>监测设施总数：<span>{{equipCount}}个</span>，台站总数 : {{stations}}台，平均每个监测设施管理{{perStas}}个台站</p></div>
        <div class="remark">备注 : 地图上的数字代表该市设施数量（个）</div>
      </div>
      <!--右边内容-->
      <div class="right">
        <contrast class="city" :contrastOption="contrastOption" :setting="{width:'400px',height:'600px'}"/>
      </div>
    </div>
    <div id="map2" class="r-box" v-if="mapShow">
      <div class="areabg"><p>监测设施总数：<span>{{cityEquipCount}}个</span>，台站总数 : {{cityStations}}台，平均每个监测设施管理{{cityPerStas}}个台站</p></div>
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
      top: -455px;
      left: 60px;
      font-size: 18px;
    }
    .left span{
      display: inline-block;
      height: 12px;
      width: 12px;
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
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 12px;
      cursor: pointer;
      /*color: #ff3b2b;*/
    }
    /*中间内容*/
    /*.center{*/
      /*width: 40%;*/
    /*}*/
    .remark{
      color: #e8f04d;
      position: relative;
      top: -163px;
      left: 145px;
    }
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
    /*.city {*/
      /*padding: 10px 0 0 0;*/
    /*}*/
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
  import doublebar1 from '../../../components/equipmentControl/index/doublebar1.vue'
  import pie from '../../../components/equipmentControl/index/pie.vue'
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import areaProvince from '../../../components/equipmentControl/facilitiesCondition/overview/map.vue'
  import GetPieOption from '../../../assets/js/chartOptions/pieOption'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import GetDoubleBarOption from '../../../assets/js/chartOptions/doubleBarOption'
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
        stationOption:{},
        contrastOption:{},
        pieOption:{},
        areaOption:{},
        equipCount:0,
        integraCount:0,
        mapShow:false,
        pieShow:false,
        cityCode:'',
        locationLevelStr:'',
        year:dateData.endyear,
        markerData:[],
        perStas:'',
        cityEquipCount:0,
      }
    },
    components: {
      doublebar1,
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
      show:function (e) {
        if(e.componentType === "series") {
          this.initMap();
          this.mapShow = true;
        }
      },
      close:function(){
        this.mapShow = false;
      },
      showPie:function (e) {
        if(e.componentType === "series") {
          this.year = dateData.xData[e.dataIndex];
          this.initPie();
          this.pieShow = true;
        }
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
            this.initRight();
        }
        this.initLegend();
        this.initArea();
        this.initBar();
        this.initPie();
      },
      initBar:function(){
        //      最近10年全省台站与监测设施关系
        let FirstData = {
          yName:'比值(台站/监测设施)',
          seriesName:'比值',
          data:[],
        };
        let SecondData = {
          yName:'数量(个)',
          seriesName:'监测设施数量',
          data:[],
        };
        this.$http.get('api/HomePage/LastYearsStaEquRelation',{
            procode:this.$store.state.procode,
            citycode:this.cityCode,
            startyear:dateData.startyear,
            endyear:dateData.endyear,
          }).then(res=>{
          FirstData.data = res.data.ratio;
          SecondData.data = res.data.amount;
          this.stationOption = GetDoubleBarOption('最近10年全'+this.locationLevelStr+'台站与监测设施关系',['比值', '监测设施数量'],dateData.xData,FirstData,SecondData,'80px','48px');
        });
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
          for (var i = 0; i < this.pieList.length; i++) {
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
                let temp2 = {
                  itemStyle:{
                    normal:{
                      color:pieChildData[j].color,
                    }
                  }
                };
                pieChildData[j] = Object.assign(pieChildData[j],temp2);
              }
            }
          }
          this.pieOption = GetPieOption(this.year+'年全'+this.locationLevelStr+'监测设施数量统计',this.pieList,pieChildData,[0, 75],[83, 98],['59%', '48%'],true);
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
                break;
              }
            }
            this.areaOption = GetAreaOption(res.data.data);
            this.equipCount = res.data.count;
        });
      },
      initRight:function(){
        //      2017年全省各地市台站和监测设施关系
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
          this.$http.get('api/HomePage/ProEachCityStations',{
                    procode:this.$store.state.procode,
                    year:dateData.endyear,
                  }).then(res=>{
                    let ratio = {
                            name: '工作人员数量',
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
                    this.contrastOption = GetContrastOption(dateData.endyear+'年全省各地市台站数量和监测设施关系',this.$store.state.cityList,list,'工作人员数量');
                  });
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
      stations:function(){
        if(this.equipCount == 0) {
          this.perStas = 0;
        } else {
          this.perStas = (this.$store.state.provinceData.stations/this.equipCount).toFixed(2);
        }
        return this.$store.state.provinceData.stations;
      },
      cityStations:function(){
        return this.$store.state.cityInfo.stations;
      },
      cityPerStas:function(){
        if(this.cityEquipCount == 0) {
          return 0;
        } else {
          return (this.cityStations/this.cityEquipCount).toFixed(2);
        }
      }
    },
  }


</script>
