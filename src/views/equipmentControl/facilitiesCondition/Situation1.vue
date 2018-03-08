<template>
<!--主要内容盒子-->
<div class="content" :hide="currentLocation">
  <!--左边内容-->
  <div class="left">
    <!--2017年全省监测设施数量统计饼图-->
    <div class="cake">
      <pie :option="pieOption" :data="pieList" :setting="{width: '400px', height: '260px'}" class="all"/>
    </div>
    <!--最近十年全省监测设施数量统计 柱状图-->
    <div class="province">
      <province :option="multiBarOption"/>
    </div>
  </div>
  <!--中间内容-->
  <div class="r-box" v-if="!mapShow">
    <div class="center" >
      <areaProvince :option="areaOption" v-on:select="show"/>
      <div class="mapbg">监测设施总数：<span>{{countAll}}个</span></div>
      <div class="remark">备注 : 地图上的数字代表该市设施数量（个）</div>
    </div>
    <!--右边内容-->
    <div class="right">
        <city :option="cityOption" class="city"/>
    </div>
  </div>
  <div id="map2" class="r-box" v-if="mapShow">
    <div class="areabg"><p>监测设施总数：<span>{{equipCount}}个</span></p></div>
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
<script>
  import pie from '../../../components/equipmentControl/index/pie.vue'
  import province from '../../../components/equipmentControl/facilitiesCondition/overview/province.vue'
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import areaProvince from '../../../components/equipmentControl/facilitiesCondition/overview/map.vue'
  import GetPieOption from '../../../assets/js/chartOptions/pieOption'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
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
        multiBarOption: {},
        cityOption: {},
        areaOption:{},
        countAll:0,
        mapShow:false,
        markerData:[],
        locationLevelStr:'',
        cityCode:"",
        equipCount:[],
      }
    },
    components: {
      pie,
      province,
      city,
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
        }
        this.initPie();
        this.initMultiBar();
        this.initArea();
        this.initCity();
        this.initLegend();
      },
      initMap:function(){
        this.$http.get('api/EquipSurvey/EquList',{
            procode:this.$store.state.procode,
            citycode:this.$store.state.currentLocation.code,
            year:dateData.endyear,
          }).then(res=>{
              console.info('========',res.data)
              this.$refs.map.initMarker(res.data);
          });
      },
      initPie:function(){
        /*
         *全省监测设施数量统计
         */
        this.$http.get('api/HomePage/ProvEquCountStatistics',{
            procode:this.$store.state.procode,
            citycode:this.cityCode,
            year:dateData.endyear,
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
          this.pieOption = GetPieOption(dateData.endyear+'年全'+this.locationLevelStr+'监测设施数量统计',this.pieList,pieChildData,[0, 55],[65, 75],['70%', '60%'],false);
          });
          /*****************/
      },
      initMultiBar:function(){
        this.$http.get('api/EquipSurvey/LastyearsEquStatistics',{
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
          this.multiBarOption = GetMultiBarOption('最近10年全'+this.locationLevelStr+'监测设施数量统计', dateData.xData, list);
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
                this.equipCount = data[i].data;
              }
            }
            this.areaOption = GetAreaOption(res.data.data);
            this.countAll = res.data.count;
        });
        /*****************/
      },
      initCity:function(){
        this.$http.get('api/EquipSurvey/AllCitiesEquStatistics',{
          procode:this.$store.state.procode,
          year:dateData.endyear,
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
          this.cityOption = GetCityOption(dateData.endyear+'年全省各地市监测设施数量统计', this.$store.state.cityList, list);
        });
      },
  },
  computed:{
    currentLocation:function(){
      this.cityCode = '';
      this.init();
      return this.$store.state.currentLocation;
    },
  },
  mounted() {
      // this.init();
      this.$store.state.equipment.subActive = '1';
  }
}
</script>
<style scoped>
  .mapbg , .areabg {
    line-height: 70px;
  }
  .content {
    position: relative;
    width: 90%;
    height: 600px;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
/*左边内容*/

.cake {
  height: 280px;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 1px #00bbff;
}
.province{
  margin-top: 27px;
}

/*中间内容*/
.center{
  /*width: 60%;*/
}
.r-box {
  width: 68%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.right {
  width: 400px;
  /*float: right;*/
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 1px #00bbff;
  height: 600px;
}

.left {
  /*width: 30%;*/
  display: flex;
  flex-direction: column;
}

.city {
    /*padding: 10px 0 0 0;*/
  }
  .remark{
    color: #e8f04d;
    position: relative;
    top: -90px;
    left: 145px;
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
