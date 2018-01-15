<template>
  <!--主要内容盒子-->
  <div class="content" :hide="currentLocation">
    <!--左边内容-->
    <div class="left">
      <!--最近十年全省GDP与监测设施关系-->
      <linebar1 v-on:select="showPie" id="leftline" :lineOption="workLineOption" :barOption="workBarOption" :setting="{width: '400px', height: '320px'}" />

      <p>最近十年全{{ locationLevelStr }}人口和监测设施关系</p>
      <ul class="left-ul">
        <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
        <li><span :style="{background:'#ff0200'}"></span> GDP</li>
      </ul>
      <!--点击图表的弹出框-->
      <div id="alert" v-if="pieShow">
        <pie :option="pieOption" :data="pieList" :setting="{width: '550px', height: '350px'}"/>
        <span @click="closePie" id="close"><i class="el-icon-close"></i></span>
      </div>
    </div>
    <!--中间内容-->
    <div class="r-box" v-if="!mapShow">
      <div class="center" @click="show">
        <areaProvince :option="areaOption" v-on:select="show"/>
        <div class="mapbg"><p>监测设施总数：<span>{{equipCount}}个</span>，工作人员总数 : {{workers}}人，每个工作人员分配{{perStaWorkers}}个监测设施</p></div>
        <div class="remark">备注 : 地图上的数字代表该市工作人员数量（万）</div>
      </div>
      <!--右边内容-->
      <div class="right">
        <contrast class="city" :contrastOption="contrastOption" :setting="{width:'400px',height:'600px'}"/>
      </div>
    </div>
    <div id="map2" class="r-box" v-if="mapShow">
      <div class="areabg"><p>监测设施总数：<span>{{cityEquipCount}}个</span>，工作人员总数 : {{cityWorkers}}人，每个工作人员分配{{cityPerStaWorkers}}个监测设施</p></div>
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
    top: -465px;
    /*left: 28px;*/
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

  /*中间内容*/
  /*.center{*/
    /*width: 40%;*/
  /*}*/
  #alert{
    display: block;
    z-index: 101;
    top: -430px;
    left: 100px;
    height: 350px;
    width: 550px;
    background: #5294d1;
    border: solid 1px #0078A8;
    position: relative;
  }
  #close{
    display: block;
    position: absolute;
    background: transparent;
    top: 0px;
    right: 0px;
    font-size: 12px;
    cursor: pointer;
    /* color: #ff3b2b; */
  }
  .r-box {
    width: 68%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .remark{
    color: #e8f04d;
    position: relative;
    top: -163px;
    left: 145px;
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
    margin-left: 40px;
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
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import pie from '../../../components/equipmentControl/index/pie.vue'
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
        linearLineOption:{},
        linearBarOption:{},
        workLineOption:{},
        workBarOption:{},
        contrastOption:{},
        areaOption:{},
        pieOption:{},
        equipCount:0,
        integraCount:0,
        mapShow:false,
        pieShow:false,
        year:dateData.endyear,
        locationLevelStr:'',
        pieList:[],
        cityCode:'',
        markerData:[],
        perStaWorkers:'',
        cityEquipCount:0,
      }
    },
    components: {
      linebar1,
      city,
      pie,
      areaProvince,
      map2,
      contrast
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
      showPie:function (e) {
        if(e.componentType === "series") {
          this.year = dateData.xData[e.dataIndex];
          this.initPie();
          this.pieShow = true;
        }
      },
      close:function(){
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
            this.initRight();
        }
        this.initLegend();
        this.initArea();
        this.initPie();
        this.initBar();
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
        this.$http.get('api/HomePage/LastDecaWorkersEquRela', {
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
          this.workLineOption = GetLineOption('', ['人口'], dateData.xData, list.ratio, '比值(万/个)');
          this.workBarOption = GetLinearBarOption(dateData.xData, list.amount,'工作人员(万)');
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
          this.$http.get('api/HomePage/ProEachCityWorkers',{
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
                    this.contrastOption = GetContrastOption(dateData.endyear+'年全省各地市工作人员数量和监测设施关系',this.$store.state.cityList,list,'工作人员数量');
                  });
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
    workers:function(){
      if(this.equipCount == 0) {
        this.perStaWorkers = 0;
      } else {
        this.perStaWorkers = (this.$store.state.provinceData.workers/this.equipCount).toFixed(2);
      }
      return this.$store.state.provinceData.workers;
    },
    cityWorkers:function(){
      return this.$store.state.cityInfo.workers;
    },
    cityPerStaWorkers:function(){
      if(this.cityEquipCount == 0){
        return 0;
      } else {
        return (this.cityWorkers/this.cityEquipCount).toFixed(2);
      }
    }
  },
}


</script>
