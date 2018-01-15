<!-- 频谱评估基站分析 -->
<template>
    <section id="filtrates">
        <nav1></nav1>
        <section class="container">
            <map1 ref="map"></map1>
            <section class="filtratesLeft">
              <vue-draggable-resizable :style="{width:'32%'}" :resizable="false" :x="10" :y="10" :z="999">
                  <all-station :allStationInfo='all_station_info' class="allStation"></all-station>
              </vue-draggable-resizable>
              <vue-draggable-resizable :style="{width:'30%'}" :resizable="false" :y="10" :z="999">
                  <pie-occupy :option='ratioPieOption' :title="operatorTitle"  class="pieOccupy" :setting="{width:'100%',height:'270px'}" ></pie-occupy>
              </vue-draggable-resizable>
              <vue-draggable-resizable :style="{width:'30%'}" :resizable="false" :y="10" :z="999">
                  <pie-occupy :option='ratioPieOption' :title="techSysTitle"  class="pieOccupy2" :setting="{width:'100%',height:'270px'}"></pie-occupy>
              </vue-draggable-resizable>
          </section>

            <vue-draggable-resizable :style="{width:'98%'}"  ref="otherSum" @activated='footerMove' :resizable="false" :x="10" :y="10" :z="999">
                <section class="barSection">
                    <!-- 技术体制占频带宽 -->
                    <other-sum :rateCover='rateCover'></other-sum>
                    <!-- 运营商各种技术体制占频统计 -->
                    <other-sum :rateCover='singleRate'></other-sum>
                    <other-sum :rateCover='rateCover1'></other-sum>
                </section>
            </vue-draggable-resizable>
        </section>
    </section>
</template>
<script>
import Nav1 from "components/equipmentControl/common/Nav1";
import AllStation from "components/baseStationAnalysis/allStationInfo";
import PieOccupy from "components/baseStationAnalysis/pieOccupy";
import OtherSum from "components/baseStationAnalysis/otherSumCount";
import Map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import GetRatioPieOption from "assets/js/chartOptions/ratioPieOption";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import { menuShowMixin } from "assets/js/mixin";

export default {
  mixins:[menuShowMixin],
  data() {
    return {
      all_station_info: [],
      ratioPieOption: {},
      rateCover: {},
      rateCover1:{},
      singleRate:{},
      operatorTitle:'运营商占频统计',
      techSysTitle:'技术体质占频统计'
    };
  },
  methods: {
    initPagesData() {
      this._getAllStationInfo();
      this._getPieOperatorInfo();
      this._otherSumInfo()
    },
    footerMove() {
        console.log(this.$refs.otherSum.zIndex)
        // this.$refs.otherSum.zIndex = 9999
    },
    // 获取所有台站信息
    _getAllStationInfo() {
      this.$http.get("api/GetAllStationInfoList").then(res => {
        res.data.data.forEach(item => {
          this.all_station_info.push({
            station_name: item.station_name,
            operator: item.operator,
            tech_sys: item.tech_sys,
            standard: item.standard,
            launch_date: item.launch_date,
            rate_range: item.rate_range,
            mark: "6"
          });
        });
      });
    },
    // 获取运营商占频比率
    _getPieOperatorInfo() {
      this.ratioPieOption = GetRatioPieOption();
    },
    // 其他统计
    _otherSumInfo() {
      this._getOtherSumInfo().then(values=>{
        this.rateCover = normalizeBarOption({
            title: "运营商各种技术体制占频统计",
            series_data: values[0].data,
            xAxis_data:['GSM','CDMA','TD-SCDMA','GSM','CDMA','TD-SCDMA','GSM','CDMA','TD-SCDMA'],
            title_offset: "0px",
            title_top: "left",
            series_color: ["#ff8b35"],
            title_color: "#4fdaff",
            legend_data: ["移动", "电信","联通"]
        });
        this.rateCover1 = normalizeBarOption({
            title: "运营商各种技术体制占频统计",
            series_data: values[1].data,
            xAxis_data:['GSM','CDMA','TD-SCDMA','GSM','CDMA','TD-SCDMA','GSM','CDMA','TD-SCDMA'],
            title_offset: "0px",
            title_top: "left",
            series_color: ["#ff8b35"],
            title_color: "#4fdaff",
            legend_data: ["移动", "电信","联通"]
        });
        this.singleRate = normalizeBarOption({
            title: "频段占用度",
            series_data: values[2].data,
            xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
            title_offset: "0px",
            title_top: "left",
            series_color: ["#ff8b35"],
            title_color: "#4fdaff",
            legend_data: ["频段占用度"]
        });
      });
    },
    // 其他统计
    _getOtherSumInfo() {
        return Promise.all([
            this.$http.get("api/GetOtherInfo"),
            this.$http.get("api/GetOtherInfo"),
            this.$http.get("api/GetRatePartCover")
        ]);
    }
  },
  created() {
    this.initPagesData();
  },
  components: {
    AllStation,
    PieOccupy,
    OtherSum,
    Nav1,
    VueDraggableResizable,
    Map1
  }
};
</script>
<style scoped>
#filtrates{
  color: #ffffff;
  height: 1140px;
}
#filtrates .container {
  width: 100%;
  height:1100px;
  margin:auto;
  /* margin-top: 20px; */
  position: relative;
}
#filtrates .allStation {
  /* position: absolute; */
  top: 10px;
  left: 20px;
  width: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.68);
}
.pieOccupy,.pieOccupy2{
    width: 100%;
    border:1px solid #4fdaff;
    position: absolute;
    z-index: 999;
    background: rgba(0,0,0,0.68);
 }
 .pieOccupy{
     left:548px;
 }
.pieOccupy2{
    left: 1054px;
}
.filtratesLeft{
  width: 98%;
}
#filtrates .container .barSection{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid #4fdaff;
    width: 100%;
    position: absolute;
    top: 419px;
    z-index: 999;
    background: rgba(0,0,0,0.68);
}
</style>
