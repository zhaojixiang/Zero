<template>
  <div id="filtrate">
    <nav1 :showTitle="true" @occupy="occupy1"/>
    <div class="container">
      <!-- 地图 -->
      <map1 ref="map" @showSpectra0="showSpectra1"/>
      <!-- 切换 -->
      <change @energy="energy1" @frequencyMap="frequencyMap1" class="tabbar" :select="select"/>
      <!-- 筛选表单 -->
      <VueDraggableResizable :resizable="true" :x="20" :y="50" :z="999" :parent="true">
        <filtrate class="flitrate"/>
      </VueDraggableResizable>
      <!-- 信号使用情况饼图 -->
      <VueDraggableResizable :resizable="false" :x="20" :y="180" :z="999" :parent="true">
        <div class="pie">
          <ratioPie :option="ratioPieOption" :setting="{width:'500px',height:'300px'}"/>
          <img src="../../assets/image/doubleArrows.png" alt="">
        </div>
      </VueDraggableResizable>
      <!-- 信道使用情况表 -->
      <VueDraggableResizable :resizable="false" :z="999" :parent="true">
        <tab class="table"/>
      </VueDraggableResizable>
      <!-- 频段占用度变化趋势黄色柱状图 -->
      <VueDraggableResizable>
        <div v-show="showOccupy" class="occupyBar">
          <i @click="occupy1" class="fa fa-times" aria-hidden="true"></i>
          <occupyBar :option="occupyBarOption" :setting="{width: '1000px', height: '200px'}"/>
        </div>
      </VueDraggableResizable>
      <!-- 台站信息柱状图 -->
      <VueDraggableResizable>
        <div class="spectra" v-show="showSpectra">
          <i class="fa fa-times" @click="showSpectra1" aria-hidden="true"></i>
          <spectra :option="spectraBarOption" :setting="{width:'1000px',height:'200px'}"/>
        </div>
      </VueDraggableResizable>

      <!-- <div class="left">
        <filtrate class="flitrate"/>
        <div class="pie">
          <ratioPie :option="ratioPieOption" :setting="{width:'500px',height:'300px'}"/>
          <img src="../../assets/image/doubleArrows.png" alt="">
        </div>
        <tab class="table"/>
      </div> -->
      <!-- <div class="right">

      </div> -->
    </div>
  </div>
</template>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    margin: auto;
    /* margin-top: 20px; */
    position: relative;
  }

  #filtrate {
    color: #ffffff;
    height: 1200px;
  }

  #filtrate .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .flitrate {
    /* position: absolute; */
    top: 70px;
    left: 50px;
    z-index: 2000;
  }

  .filBox {
    width: 90%;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .pie {
    border: solid 1px #33ccff;
    background: rgba(0, 0, 0, 0.88);
    /* position: absolute; */
    width: 500px;
    top: 200px;
    left: 50px;
    z-index: 999;
  }

  .pie img {
    position: absolute;
    top: 17px;
    left: 13px;
  }

  .table {
    padding: 0 10px;
    position: absolute;
    top: 490px;
    left: 20px;
    z-index: 999;
    border: solid 1px #33ccff;
    background: rgba(0, 0, 0, 0.88);
  }

  .tabbar {
    width: 40%;
    position: absolute;
    z-index: 1000;
    top: 2px;
    left: 20px;
  }

  .occupyBar, .spectra {
    position: absolute;
    bottom: -847px;
    left: 22px;
    z-index: 1000;
    background-color: #5294d1;
  }

  .occupyBar i, .spectra i {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    z-index: 1200;
  }

</style>
<script>
  import {menuShowMixin} from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import filtrate from '../../components/stationManage/filtrate.vue'
  import ratioPie from '../../components/stationManage/ratioPie.vue'
  import GetRatioPieOption from 'assets/js/chartOptions/ratioPieOption'
  import tab from '../../components/stationManage/tab.vue'
  import change from '../../components/stationManage/change.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import VueDraggableResizable from 'vue-draggable-resizable'
  import occupyBar from 'components/stationManage/occupyBar.vue'
  import GetOccupyBarOption from 'assets/js/chartOptions/occupyBarOption'
  import spectra from 'components/stationManage/spectraBar.vue'
  import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'

  import grid from 'assets/json/geo'

  export default {
    data() {
      return {
        showOccupy: false,
        showSpectra: false,
        select: true,
        ratioPieOption: {},
        occupyBarOption: {},
        spectraBarOption: {}

      }
    },
    components: {
      nav1,
      filtrate,
      ratioPie,
      tab,
      map1,
      change,
      spectra,
      occupyBar,
      VueDraggableResizable
    },
    mixins: [menuShowMixin],
    mounted() {
//信号使用情况比例
      this.ratioPieOption = GetRatioPieOption();
      this.occupyBarOption = GetOccupyBarOption();
      this.spectraBarOption = GetSpectraBarOption();

    },
    methods: {
      energy1: function (param) {
        if (param) {
          this.$http.get('apiGetMap111').then(res => {
            this.$refs.map.energyRetangle(res.data);
          });
        } else {
          this.$refs.map.energyRetangle([], false);
        }
      },
      frequencyMap1: function (param) {
        console.log('11');
        console.time('a');
        this.$refs.map.frequencyMap(grid, param);
        console.timeEnd('a');
      },
      occupy1() {
        this.showOccupy = !this.showOccupy;
      },
      showSpectra1() {
        this.showSpectra = !this.showSpectra
        // alert(222);
      }
    }
  }
</script>
