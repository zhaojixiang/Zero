<template>
<div class="index">
  <div class="main">
    <div class="first">
      <!--第一个图表：饼图-->
      <div class="one">
        <router-link :to="{name:'Situation1'}">
          <pie :option="pieOption" :data="pieList" :setting="{width: '360px', height: '240px'}" id="myChart" />
        </router-link>
      </div>
      <!--第二个图表-->
      <div class="two">
        <router-link :to="{name:'Num'}">
          <doublebar1 :option="stationOption" :setting="{width: '440px', height: '240px'}" />
        </router-link>
      </div>
      <!--第三个图表-->
      <div class="three">
        <router-link :to="{name:'Worker'}">
          <doublebar1 :option="peopleNumOption" :setting="{width: '440px', height: '240px'}" />
        </router-link>
      </div>
    </div>
    <div class="second">
      <!--&lt;!&ndash;第四个图表&ndash;&gt;-->
      <div class="four">
        <router-link :to="{name:'Area'}">
          <div>
            <bar :setting="{width: '340px', height: '300px'}" :option="barOption" />
          </div>
        </router-link>
        <div>
          <slider class="slider" />
        </div>
      </div>


      <div class="last">
        <!--&lt;!&ndash;第五组图表&ndash;&gt;-->
        <div class="five">
          <router-link :to="{name:'Gdp'}">
            <linebar1 :lineOption="gdpLineOption" :barOption="gdpBarOption" :setting="{width: '430px', height: '260px'}" />
          </router-link>
          <marquee :content="gdpMarquee" id="marquee2"></marquee>
        </div>
        <!--&lt;!&ndash;第六组图表&ndash;&gt;-->
        <div class="six">
          <router-link :to="{name:'People'}">
            <linebar1 :lineOption="peopleLineOption" :barOption="peopleBarOption" :setting="{width: '430px', height: '260px'}" />
          </router-link>
          <marquee :content="peopleMarquee" id="marquee"></marquee>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
    .first {
      display: flex;
      justify-content: flex-start;
      height: 240px;
    }

    .two {
      width: 440px;
      border-top-left-radius: 2.5em;
      border-bottom-right-radius: 2.5em;
      border: solid 1px #00bbff;
      margin: 0 40px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .three {
      /*border-top-left-radius:2.5em;
        border-bottom-right-radius:2.5em;*/
      border: solid 1px #00bbff;
      margin: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .first .one #myChart {
      background-color: rgba(0, 0, 0, 0.2);
      border: solid 1px #00bbff;
      color: #fff;
      text-decoration: none !important;
    }

    .second {
      display: flex;
      margin-top: 20px;
      justify-content: flex-start;
    }

    .four {
      width: 340px;
      border: solid 1px #00bbff;
      margin: 0;
      padding: 10px 10px;
      height: 440px;
      background-color: rgba(0, 0, 0, 0.2);
      border-top-right-radius: 2.5em;
    }

    .four .slider {
      margin-left: 20px;
      margin-top: -40px;
    }

    .six {
      margin-left: 45px;
    }

    .last {
      display: flex;
      height: 440px;
      width: 920px;
      justify-content: space-between;
      padding: 10px 10px;
      margin-left: 40px;
      background-color: rgba(0, 0, 0, 0.2);
      border: solid 1px #00bbff;
      border-bottom-right-radius: 6em;
    }

    .main {
      /*padding-bottom: 80px;*/
      width: 90%;
      margin: auto;
      padding: 20px 30px 10px 30px;
      min-height: 800px;
    }

    .index {
      width: 100%;
      height: 100%;
      color: white;
      background-size: cover;
      background-repeat: no-repeat;
    }

    #marquee2 {
      width: 280px;
      margin: auto;
      position: relative;
      bottom: 30px;
      right: 30px;
    }

    #marquee {
      width: 280px;
      margin: auto;
      position: relative;
      bottom: 30px;
      right: 30px;
    }
</style>
<script>
import marquee from "../../../components/equipmentControl/index/marquee.vue";
import pie from "../../../components/equipmentControl/index/pie.vue";
import doublebar1 from "../../../components/equipmentControl/index/doublebar1.vue";
import bar from "../../../components/equipmentControl/index/bar.vue";
import slider from "../../../components/equipmentControl/index/slider.vue";
import linebar1 from "../../../components/equipmentControl/index/linebar1.vue";
import GetPieOption from "../../../assets/js/chartOptions/pieOption";
import GetDoubleBarOption from "../../../assets/js/chartOptions/doubleBarOption";
import GetBarOption from "../../../assets/js/chartOptions/barOption";
import GetLineOption from "../../../assets/js/chartOptions/lineOption";
import GetLinearBarOption from "../../../assets/js/chartOptions/linearBarOption";
import { dateData } from "../../../assets/js/public";

export default {
  data() {
    return {
      pieList: [],
      pieOption: {},
      stationOption: {},
      peopleNumOption: {},
      barOption: {},
      linearLineOption: {},
      linearBarOption: {},
      gdpLineOption: {},
      gdpBarOption: {},
      peopleLineOption: {},
      peopleBarOption: {},
      gdpMarquee: "",
      peopleMarquee: ""
    };
  },
  components: {
    pie,
    doublebar1,
    bar,
    slider,
    linebar1,
    marquee
  },
  mounted() {
    this.initPie();
    this.initStation();
    this.initPeopleNum();
    this.initBar();
    this.initGdp();
    this.initPeopleBar();
    this.initMarquee();
  },

  methods: {
    initPie:function(){
      /*
       *全省监测设施数量统计
       */
      this.$http
        .get("api/HomePage/ProvEquCountStatistics", {
          procode: this.$store.state.procode,
          citycode: "",
          year: dateData.endyear,
          type: this.$const.TYPE_ALL
        })
        .then(res => {
          this.pieList = res.data;
          let pieChildData = [];
          for (var i = 0; i < this.pieList.length; i++) {
            let temp = {
              itemStyle: {
                normal: {
                  color: this.pieList[i].color
                }
              }
            };
            this.pieList[i] = Object.assign(this.pieList[i], temp);
            if (this.pieList[i].childs != undefined) {
              pieChildData = this.pieList[i].childs;
              for (var j = 0; j < pieChildData.length; j++) {
                let temp = {
                  itemStyle: {
                    normal: {
                      color: pieChildData[j].color
                    }
                  }
                };
                pieChildData[j] = Object.assign(pieChildData[j], temp);
              }
            }
          }
          this.pieOption = GetPieOption(
            dateData.endyear + "年全省监测设施数量统计",
            this.pieList,
            pieChildData,
            [0, 55],
            [65, 75],
            ["70%", "60%"],
            false
          );
        });
    },
    initStation:function(){
      /*****************/
      let FirstData = {
        yName: "比值(台站/监测设施)",
        seriesName: "比值",
        data: []
      };
      let SecondData = {
        yName: "数量(个)",
        seriesName: "设施数量",
        data: []
      };
      this.$http
        .get("api/HomePage/LastYearsStaEquRelation", {
          procode: this.$store.state.procode,
          startyear: dateData.startyear,
          endyear: dateData.endyear,
          type: this.$const.TYPE_ALL,
          citycode: ""
        })
        .then(res => {
          FirstData.data = res.data.ratio;
          SecondData.data = res.data.amount;
          this.stationOption = GetDoubleBarOption(
            "最近10年全省台站与监测设施关系",
            ["比值", "设施数量"],
            dateData.xData,
            FirstData,
            SecondData,
            "80px",
            "20%"
          );
        });
    },
    initPeopleNum:function(){
      let ThirdData = {
        yName: "比值(台站/监测设施)",
        seriesName: "比值",
        data: [1, 2, 1, 22, 25.6, 76.7, 135.6, 182.2, 32.6, 20.0]
      };
      let FourData = {
        yName: "数量",
        seriesName: "工作人员数量",
        data: [100, 200, 100, 220, 250.6, 760.7, 1305.6, 1820.2, 320.6, 200.0]
      };
      this.$http
        .get("api/HomePage/LastYearsWorkLoadEquRela", {
          procode: this.$store.state.procode,
          startyear: dateData.startyear,
          endyear: dateData.endyear,
          type: this.$const.TYPE_ALL,
          citycode: ""
        })
        .then(res => {
          ThirdData.yName = "比值(人员/监测设施)";
          ThirdData.data = res.data.ratio;
          FourData.data = res.data.amount;
          this.peopleNumOption = GetDoubleBarOption(
            "最近10年全省工作人员数量与监测设施关系",
            ["比值", "工作人员数量"],
            dateData.xData,
            ThirdData,
            FourData,
            "80px",
            "20%"
          );
        });
    },
    initBar:function(){
      this.$http
        .get("api/HomePage/MeasurementEquRela", {
          procode: this.$store.state.procode,
          citycode: "",
          type: this.$const.TYPE_ALL,
          year: dateData.endyear
        })
        .then(res => {
          let colorList = [],series_data = [],xAxis_data=[];
          for (var i = 0; i < res.data.length; i++) {
            colorList.push(res.data[i].color);
            series_data.push(res.data[i].value)
            xAxis_data.push(res.data[i].name)
          }
          this.barOption = GetBarOption({
            title: dateData.endyear + "年全省面积与监测设施密度关系",
            series_data,
            series_color: colorList,
            xAxis_data,
          });
        });
    },
    initGdp:function(){
      this.$http
        .get("api/HomePage/LastDecaGDPEquRela", {
          procode: this.$store.state.procode,
          citycode: "",
          startyear: dateData.startyear,
          endyear: dateData.endyear
        })
        .then(res => {
          let list = res.data;
          for (var i = 0; i < list.ratio.length; i++) {
            let temp = {
              type: "line",
              itemStyle: {
                normal: {
                  color: list.ratio[i].color
                }
              }
            };
            list.ratio[i] = Object.assign(list.ratio[i], temp);
          }
          this.gdpLineOption = GetLineOption(
            "最近10年全省GDP与监测设施关系",
            ["GDP"],
            dateData.xData,
            list.ratio,
            "比值(亿/个)"
          );
          this.gdpBarOption = GetLinearBarOption(dateData.xData, list.amount);
        });
    },
    initPeopleBar:function(){
      this.$http
        .get("api/HomePage/LastDecaPopuEquRela", {
          procode: this.$store.state.procode,
          citycode: "",
          startyear: dateData.startyear,
          endyear: dateData.endyear
        })
        .then(res => {
          let list = res.data;
          for (var i = 0; i < list.ratio.length; i++) {
            let temp = {
              type: "line",
              itemStyle: {
                normal: {
                  color: list.ratio[i].color
                }
              }
            };
            list.ratio[i] = Object.assign(list.ratio[i], temp);
          }
          this.peopleLineOption = GetLineOption(
            "最近10年全省人口与监测设施关系",
            ["人口"],
            dateData.xData,
            list.ratio,
            "比值(万/个)"
          );
          this.peopleBarOption = GetLinearBarOption(dateData.xData, list.amount);
        });
    },
    initMarquee:function(){
      this.$http
        .get("api/HomePage/GDPRatio", {
          procode: this.$store.state.procode,
          year: dateData.endyear
        })
        .then(res => {
          let str = "";
          for (var i = 0; i < res.data.length; i++) {
            str +=
              res.data[i].name + "市GDP比值:" + res.data[i].value + "          ";
          }
          this.gdpMarquee = str;
        });
      this.$http
        .get("api/HomePage/PopuRatio", {
          procode: this.$store.state.procode,
          year: dateData.endyear
        })
        .then(res => {
          let str = "";
          for (var i = 0; i < res.data.length; i++) {
            str += res.data[i].name + "市人口比值:" + res.data[i].value + "          ";
          }
          this.peopleMarquee = str;
        });
    },
  }
};
</script>
