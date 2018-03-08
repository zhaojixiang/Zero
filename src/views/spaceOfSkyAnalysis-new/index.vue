<template>
  <div id="spaceOfSkyAnalysis">
    <nav1 :spaceOfSkyAnalysisTop="true"/>
    <div class="container">
      <div class="side-span">
          <span @click="fadeChange(['spaceOfSkyAnalysis','relation'])" style="height: 120px">相关查询</span>
          <span @click="fadeChange(['spaceOfSkyAnalysis','partCover'])" style="height: 120px;">台站信息</span>
      </div>
      <!-- 地图 -->
      <map1 class="map" ref="map"/>
      <!-- 相关查询 -->
      <relation @do_analysis="fadeChange(['spaceOfSkyAnalysis','errSum'])" @minus="fadeChange(['spaceOfSkyAnalysis','relation'])" :class="['relation',fade.spaceOfSkyAnalysis.relation?fadeInCss:fadeOutCss]"/>

      <!-- 频段占用度，信号覆盖率 -->
      <VueDraggableResizable :class="[fade.spaceOfSkyAnalysis.partCover?zoomInCss:zoomOutCss]" :resizable="false" :x="40" :y="266" :z="fade.spaceOfSkyAnalysis.partCover?1000:0">
        <part-cover @getBarOptions="getBarOptions" @minus="fadeChange(['spaceOfSkyAnalysis','partCover'])" :ratePartCover='ratePartCover' :rateCover='rateCover'></part-cover>
      </VueDraggableResizable>

      <!-- 合法 违规及异常信号统计 -->
      <vue-draggable-resizable :resizable="false" :x='520' :y='480' :z="fade.spaceOfSkyAnalysis.errSum?1000:0">
          <err-sum @minus="fadeChange(['spaceOfSkyAnalysis','errSum'])" :spectraBarOption='spectraBarOption' :class="[fade.spaceOfSkyAnalysis.errSum?fadeInCss:fadeOutCss]"></err-sum>
      </vue-draggable-resizable>
    </div>
  </div>
</template>
<style scoped>
  #spaceOfSkyAnalysis .container {
    width: 100%;
    height: 100%;
    margin: auto;
    /* margin-top: 20px; */
    position: relative;
  }
  #spaceOfSkyAnalysis {
    color: #676767;
    /* height: 1200px; */
  }
  #spaceOfSkyAnalysis .map {
    min-height: 900px;
    z-index: 999;
  }
  #spaceOfSkyAnalysis .minus {
    position: absolute;
    right: 16px;
    cursor: pointer;
    color: #2774A5;
    font-size: 16px;
    top: 11px;
  }

  #spaceOfSkyAnalysis .relation {
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 1000;
  }
  #spaceOfSkyAnalysis #stationInfo{
    position: absolute;
    top: 112px;
    left: 0;
    /* z-index:1000; */
  }
#spaceOfSkyAnalysis .side-span {
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  #spaceOfSkyAnalysis .side-span span {
    color: #fff;
    width: 20px;
    background: #2F74A1;
    display: inline-block;
    text-align: center;
    padding: 0 10px;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
    letter-spacing: 5px;
    cursor: pointer;
    border-top: solid 1px #fff
  }
#spaceOfSkyAnalysis .el-input--suffix .el-input__inner {
    padding-right: 0;
  }

</style>
<script>
  import {menuShowMixin,animateMixin} from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import relation from 'components/spaceOfSkyAnalysis/relationAnalysis'
  import PartCover from 'components/spaceOfSkyAnalysis/partCover-new'
  import normalizeBarOption from "assets/js/chartOptions/barOption"
  import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
  import ErrSum from 'components/spaceOfSkyAnalysis/errSignalSum'

  // import stationInfo from 'components/spaceOfSkyAnalysis/stationInfo.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import VueDraggableResizable from 'components/common/draggable'
  export default {
    data() {
      return {
        rateCover:{},
        ratePartCover:{},
        spectraBarOption:{}
      }
    },
    components: {
      nav1,
      relation,
      PartCover,
      VueDraggableResizable,
      map1,
      VueDraggableResizable,
      ErrSum
    },
    mixins: [menuShowMixin,animateMixin],
    mounted() {
      this.initPageData()
    },
    methods: {
      // 相关分析-执行分析
      do_analysis(val) {
          // this.$message({
          //     type:'warning',
          //     message:'先别提交，程序没做完呢'
          // })
      },
      // 频段占用度 信号覆盖率 切换
      getBarOptions(val) {
          // console.log(val)
          if(val === '信号覆盖率') {
              this._getRateCover()
          }else {
              this._getPartCover()
          }
      },
      // 初始化数据
      initPageData() {
          this._getPartCover()
          this._getErrSignalSum()
      },
      // 频率覆盖率
      _getRateCover() {
          this.$http.get("api/GetRateCover").then(res=>{
              this.ratePartCover = normalizeBarOption({
                  title: "信号覆盖率",
                  series_data: res.data,
                  xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                  title_offset: "0px",
                  title_top: "left",
                  series_color: ["#ff8b35"],
                  title_color: "#4fdaff",
                  legend_data: ["频率覆盖率"],
                  font_color: "#6a6a6a"
              });
              this.rateCover = normalizeBarOption({
                  title: "信号覆盖率时间分布图",
                  series_data: res.data,
                  xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                  title_offset: "0px",
                  title_top: "left",
                  series_color: ["#ff8b35"],
                  title_color: "#4fdaff",
                  font_color: "#6a6a6a"
              });
          })
      },
      // 频段占用度
      _getPartCover() {
           this.$http.get("api/GetRatePartCover").then(res=>{
              this.ratePartCover = normalizeBarOption({
                  title: "频段占用度",
                  series_data: res.data,
                  xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                  title_offset: "0px",
                  title_top: "left",
                  series_color: ["#ff8b35"],
                  title_color: "#4fdaff",
                  legend_data: ["频段占用度"],
                  font_color: "#6a6a6a"
              });
              this.rateCover = normalizeBarOption({
                  title: "频段占用度时间分布图",
                  series_data: res.data,
                  xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                  title_offset: "0px",
                  title_top: "left",
                  series_color: ["#ff8b35"],
                  title_color: "#4fdaff",
                  font_color: "#6a6a6a"
              });
           })
      },
      // 合法、违规及异常信号统计
      _getErrSignalSum() {
          this.spectraBarOption= GetSpectraBarOption()
      }
    }
  }
</script>
