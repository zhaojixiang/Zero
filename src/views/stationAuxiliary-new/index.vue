<!-- 台站辅助选址 -->
<template>
<section>
  <!-- 头部导航 -->
  <nav1 @export='exportList'></nav1>
  <div class="container">
    <leaflet class="map" ref="map" />
    <change @energyCircle="energyMap" @frequencyMap="frequencyMap" :show="[true,true,true]" class="tabbar" />
    <!-- <VueDraggableResizeable :resizable="false" :x="1000" :y="0" :z="1000" :drag-handle="'.change-head'">
      <changeNew @energyCircle="energyMap" @frequencyMap="frequencyMap" :show="[true,true,true]" />
    </VueDraggableResizeable> -->
    <div class="side-span">
      <span @click="fadeChange(['stationAuxiliary','relevant'])" style="height: 120px">相关分析</span>
      <span @click="fadeChange(['stationAuxiliary','rate'])" style="height: 120px;">频率使用情况</span>
      <span @click="fadeChange(['stationAuxiliary','analysis'])" style="height: 120px;">自由仿真分析</span>
      <span @click="fadeChange(['stationAuxiliary','channel'])" style="height: 120px;">信道占用度</span>
    </div>
    <!-- 相关分析 -->
    <relevant @minus="fadeChange(['stationAuxiliary','relevant'])" :class="['relevant',fade.stationAuxiliary.relevant?fadeInCss:fadeOutCss]" @doAnalysis="submit" />
    <!-- 已使用频率 -->
    <VueDraggableResizeable :resizable="false" :x="40" :y="136" :z="fade.stationAuxiliary.rate?1000:0">
      <rate-lists style="width: 402px" @itemClick="rateClick" @minus="fadeChange(['stationAuxiliary','rate'])" :class="[fade.stationAuxiliary.rate?zoomInCss:zoomOutCss]" @changeUseRate='changeUseRate' :data='rateListData' />
    </VueDraggableResizeable>
    <!-- 频率相关信息 -->
    <VueDraggableResizeable :resizable="false" :x="500" :y="80" :z="1000">
      <relation-info v-show="relationShow" @close="relationShow=!relationShow" :stationInfo='stationInfo' />
    </VueDraggableResizeable>
    <!-- 自由仿真分析 -->
    <VueDraggableResizeable :resizable="false" :x="970" :y="0" :z="fade.stationAuxiliary.analysis?1000:0">
      <free-analysis @minus="fadeChange(['stationAuxiliary','analysis'])" :class="['analysis',fade.stationAuxiliary.analysis?zoomInCss:zoomOutCss]" />
    </VueDraggableResizeable>
    <!-- 信道占用度 -->
    <VueDraggableResizeable :style="{width:'98%'}" :resizable="false" :x="20" :y="600" :z="fade.stationAuxiliary.channel?1000:0">
      <channel @minus="fadeChange(['stationAuxiliary','channel'])" :class="[fade.stationAuxiliary.channel?zoomInCss:zoomOutCss]" :spectraBarOption='spectraBarOption' />
    </VueDraggableResizeable>
  </div>
</section>
</template>
<script>
import nav1 from "components/equipmentControl/common/Nav1";
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet";
import RelationInfo from "components/stationAuxiliary/relationInfo"
import Relevant from "components/stationAuxiliary/relevant"
import FreeAnalysis from "components/stationAuxiliary/freeAnalysis"
import RateLists from "components/stationAuxiliary/rateLists"
import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
import {
  menuShowMixin,
  animateMixin
} from "assets/js/mixin";
import Channel from 'components/stationAuxiliary/channelUsedAndRateTrend'
import VueDraggableResizeable from 'components/common/draggable'
import change from 'components/stationManage/change.vue'
import changeNew from 'components/stationManage/changeNew.vue'

export default {
  mixins: [menuShowMixin, animateMixin],
  data() {
    return {
      spectraBarOption: {},
      rateListData: [],
      stationInfo: {},
      relationShow: false,
    }
  },
  methods: {
    frequencyMap(show) {
      this.$refs.map.frequencyMap({show});
    },
    energyMap(show) {
      if (show) {
        this.$http.get('apiGetMapPie222').then(res => {
          this.$refs.map.energyCircle(res.data);
        })
      } else {
        this.$refs.map.energyCircle([], false);
      }
    },
    // 导出数据
    exportList() {
      // console.log("export list in signalMultidimensionalAnalysis");
      this.$message({
        type: 'warning',
        message: '暂时不支持导出'
      })
    },
    // 执行分析
    submit(param) {

      // console.log(param);
      this.$message({
        type: 'success',
        message: `Data from son: ${JSON.stringify(param)}`
      })
      this.fadeChange(['stationAuxiliary', 'rate']);
      this.fadeChange(['stationAuxiliary', 'analysis']);
      this.fadeChange(['stationAuxiliary', 'channel']);
    },
    // 开始仿真
    starts(param) {
      console.log(param)
      this.$message({
        type: 'success',
        message: `Data from son: ${JSON.stringify(param)}`
      })
    },
    // 初始化页面数据
    initData() {
      this._getChartData()
      this._getRateUsedListsData()
      this._getCompanyInfo()
    },
    // list 子组件冒泡事件触发
    changeUseRate(param) {
      this.rateListData = []
      if (param) {
        this._getRateUsedListsData()
      } else {
        this._getRateUnusedListsData()
      }
    },
    // 底部 echarts 图表数据初始化
    _getChartData() {
      this.spectraBarOption = GetSpectraBarOption();
      console.log(this.spectraBarOption)
    },
    // 已使用频率 未使用频率数据获取
    _getRateUsedListsData() {
      this.$http.get("api/GetRateList").then(res => {
        res.data.forEach(item => {
          this.rateListData.push({
            desc: item.rate,
            date: item.bandWidth,
            power: `${item.signalCover.toFixed(2)}%`,
            signalNature: item.rateNature,
            mark: '4'
          });
        });
      });
    },
    // 已使用频率 未使用频率数据获取
    _getRateUnusedListsData() {
      this.$http.get("api/GetRateUnusedList").then(res => {
        res.data.forEach(item => {
          this.rateListData.push({
            desc: item.column1,
            date: item.column2,
            power: item.column3,
            mark: '3'
          });
        });
      });
    },
    // 获取台站信息和附近台站
    _getCompanyInfo() {
      this.$http.get("api/GetCompanyInfo").then(res => {
        // console.log(res.data)
        this.stationInfo = res.data
      });
    },
    rateClick(item) {
      console.log(item, 'click');
      this.relationShow = true;
    },
  },
  mounted() {
    this.initData()
  },
  components: {
    nav1,
    Leaflet,
    RelationInfo,
    Relevant,
    FreeAnalysis,
    Channel,
    RateLists,
    VueDraggableResizeable,
    change,
    changeNew
  }
}
</script>
<style scoped>
.clear_bottom_margin20 {
  margin-bottom: 0;
}

.clear_bottom {
  padding-bottom: 0;
}

.container {
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
}

.map {
  min-height: 900px;
  z-index: 999;
}

.relevant {
  position: absolute;
  top: 0;
  left: 40px;
  z-index: 1000;
  width: 400px;
}

.tabbar {
  width: 400px;
  position: absolute;
  z-index: 1000;
  top: 2px;
  left: 50%;
  margin-left: -200px;
}

.analysis {
  width: 400px;
}
</style>
