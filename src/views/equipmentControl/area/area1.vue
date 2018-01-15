<template>
  <!--主要内容盒子-->
  <div class="content" :hide="currentLocation">
    <!--左边内容-->
    <div class="left">
      <!--2017年全省设备密度-->

      <bar class="bar" :setting="{width: '400px', height: '570px'}" :option="barOption"/>
      <p>{{ year }}年全省设备密度</p>
      <ul>
        <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
      </ul>
    </div>
    <!--中间内容-->
    <div class="r-box">
      <div class="center" @click="show">
        <areaProvince :option="areaOption" v-on:select="show"/>
        <div class="mapbg"><p>监测设施总数：<span>{{equipCount}}个</span>，全省总面积：{{ measurment }}平方公里，每个站的面积是{{  perStaMeasurment }}平方公里</p></div>
        <div class="remark">备注 : 地图上的数字代表该市设施数量（个）</div>
      </div>
      <!--右边内容-->
      <div class="right">
        <list/>
      </div>
    </div>
    <div class="barbox" v-if="mapShow">
      <p>{{ currentLocation.name }}市设备密度</p>
      <p>监测设施总数:{{cityEquipCount}}个，全市总面积: {{ cityMeasurment }}平方公里，每个站的面积是{{ cityPerStaMeasurment }}平方公里</p>
      <ul>
        <li v-for="l in legend"><span :style="{background:l.value}"></span> {{ l.name}}</li>
      </ul>
      <bar class="bar" :setting="{width: '600px', height: '350px'}" :option="cityBarOption"/>
      <span @click="close" class="close"><i class="el-icon-close"></i></span>
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
.left {
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 1px #00bbff;
  width: 400px;
}
.left p {
  position: relative;
  top: -595px;
  left: 115px;
  font-size: 18px;
}
.left ul {
  position: relative;
  top: -586px;
  left: 10px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.left li {
  width: 100px;
  list-style: none;
}
.left span {
  display: inline-block;
  height: 12px;
  width: 12px;
  background: #3388ff;
  position: relative;
  top: 1px;
}
.left .bar {
  margin-top: 40px;
}
#alert {
  z-index: 101;
  top: -536px;
  left: 100px;
  height: 350px;
  width: 550px;
  background: #5294d1;
  border: solid 1px #0078a8;
  position: relative;
}
#close {
  position: absolute;
  top: 0px;
  right: 0px;
  color: #ff3b2b;
  cursor: pointer;
}
/*中间内容*/
/*.center{*/
/*!*width: 40%;*!*/
/*}*/
.remark {
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
  background-color: rgba(0, 0, 0, 0.2);
  border: solid 1px #00bbff;
  height: 600px;
}
.barbox {
  height: 400px;
  width: 600px;
  background: #5294d1;
  position: absolute;
  top: 90px;
  right: 0%;
  z-index: 98;
}
.barbox ul {
  position: relative;
  left: 74px;
  padding: 0;
  margin: 0;
}
.barbox li {
  margin-right: 25px;
  float: left;
  list-style: none;
}
.barbox span {
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-right: 10px;
}
.barbox p {
  color: #fdff35;
}
.barbox .bar {
  position: relative;
  top: -30px;
}
.barbox p:nth-of-type(1) {
  font-size: 16px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.barbox p:nth-of-type(2) {
  text-indent: 30px;
  font-size: 14px;
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
  cursor: pointer;
}
</style>
<script>
import bar from "../../../components/equipmentControl/index/bar.vue";
import pie from "../../../components/equipmentControl/index/pie.vue";
import list from "../../../components/equipmentControl/area/list.vue";
import city from "../../../components/equipmentControl/facilitiesCondition/overview/city.vue";
import areaProvince from "../../../components/equipmentControl/facilitiesCondition/overview/map.vue";
import GetPieOption from "../../../assets/js/chartOptions/pieOption";
import map2 from "../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue";
import GetBarOption from "../../../assets/js/chartOptions/barOption";
import GetAreaOption from "../../../assets/js/chartOptions/areaOption";
import { dateData } from "../../../assets/js/public";
import {getFacilityType} from "../../../assets/js/mixin"
export default {
  mixins:[getFacilityType],
  data() {
    return {
      pieList: [],
      barOption: {},
      pieOption: {},
      areaOption: {},
      equipCount: 0,
      integraCount: 0,
      mapShow: false,
      pieShow: false,
      equipCount: 0,
      year: dateData.endyear,
      cityCode: "",
      locationLevelStr: "",
      cityBarOption: {},
      perStaMeasurment: "",
      cityEquipCount: 0
    };
  },
  components: {
    bar,
    city,
    areaProvince,
    map2,
    pie,
    list
  },

  mounted() {
    // this.init();
  },
  methods: {
    show: function(e) {
      if (e.componentType === "series") {
        this.mapShow = true;
        this.initCityBar();
      }
    },
    close: function() {
      this.mapShow = false;
    },
    init: function() {
      this.initLegend();
      this.initJudge();
      this.initCityBar();
      this.initBar();
      this.initArea();
    },
    initJudge: function() {
      //如果是市级
      if (this.$store.state.locationLevel === 1) {
        this.mapShow = true;
        this.locationLevelStr = "市";
        this.cityCode = this.$store.state.currentLocation.code;
      } else {
        this.mapShow = false;
        this.locationLevelStr = "省";
        this.cityCode = "";
        // this.initRight();
      }
    },
    initBar: function() {
      //      全省设备密度
      this.$http
        .get("api/HomePage/MeasurementEquRela", {
          procode: this.$store.state.procode,
          citycode: "",
          year: this.year
        })
        .then(res => {
          let colorList = [],xAxis_data = [],series_data=[];
          for (var i = 0; i < res.data.length; i++) {
            colorList.push(res.data[i].color);
            xAxis_data.push(res.data[i].name);
            series_data.push(res.data[i].value);
          }
          this.barOption = GetBarOption({
            series_data: series_data,
            series_color: colorList,
            xAxis_data:xAxis_data,
            legend_data:['密度(个/百平方公里)'],
            legend_show:false,
          });
        });
    },
    initCityBar: function() {
      //      全省/市监测设施数量统计
      this.$http
        .get("api/HomePage/MeasurementEquRela", {
          procode: this.$store.state.procode,
          citycode:
            this.$store.state.locationLevel === 1
              ? this.$store.state.currentLocation.value
              : "",
          year: this.year
        })
        .then(res => {
          let colorList = [],series_data = [],xAxis_data = [];
          for (var i = 0; i < res.data.length; i++) {
            colorList.push(res.data[i].color);
            series_data.push(res.data[i].value)
            xAxis_data.push(res.data[i].name)
          }
          this.cityBarOption = GetBarOption({
                      title:'',
                      series_data:series_data,
                      series_color:colorList,
                      xAxis_data:xAxis_data,
                      legend_data:['密度(个/百平方公里)'],
                      legend_show:false,});
        });
    },
    initArea: function() {
      this.$http
        .get("api/EquipSurvey/ProEachCityEquInfo", {
          procode: this.$store.state.procode,
          year: dateData.endyear
        })
        .then(res => {
          let data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            data[i].value = data[i].data;
            if (data[i].code == this.cityCode) {
              this.cityEquipCount = data[i].data;
            }
          }
          this.areaOption = GetAreaOption(res.data.data);
          this.equipCount = res.data.count;
        });
    }
  },
  computed: {
    currentLocation: function() {
      this.init();
      return this.$store.state.currentLocation;
    },
    measurment: function() {
      if (this.equipCount == 0) {
        this.perStaMeasurment = 0;
      } else {
        this.perStaMeasurment = (this.$store.state.provinceData.measurment /
          this.equipCount
        ).toFixed(2);
      }
      return this.$store.state.provinceData.measurment;
    },
    cityPerStaMeasurment: function() {
      if (this.cityEquipCount == 0) {
        return 0;
      } else {
        return (this.cityMeasurment / this.cityEquipCount).toFixed(2);
      }
    },
    cityMeasurment: function() {
      return this.$store.state.cityInfo.measurment;
    }
  }
};
</script>
