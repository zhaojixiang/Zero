<template>
  <div class="stationShow">
    <nav1 :stationShowTop="true" />
    <div class="container">
      <!--<change @energyCircle="energyMap" @frequencyMap="frequencyMap" :show="show" class="tabbar"/>-->
      <div class="side-span">
        <span @click="fadeChange(['stationShow','inquire'])" style="height: 60px">查询</span>
        <span v-show="submitted" @click="fadeChange(['stationShow','info'])" style="height: 120px;">台站信息</span>
      </div>
      <map1 class="map" ref="map" @stationInfoAlertList="stationInfoAlertList" />
      <refer @minus="fadeChange(['stationShow','inquire'])" :class="['refer',fade.stationShow.inquire?fadeInCss:fadeOutCss]" @start="start" />
      <VueDraggableResizable v-show="submitted" :resizable="false" :x="40" :y="263" :z="fade.stationShow.info?1000:0">
        <stationInfo @minus="fadeChange(['stationShow','info'])" ref="stationInfo" :class="['stationInfo',fade.stationShow.info?zoomInCss:zoomOutCss]" @currentPage='get' />
      </VueDraggableResizable>
    </div>
  </div>
</template>
<style scoped>
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
  .stationShow .refer {
    background: #FEFEFE;
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 1000;
    border: solid 1px #33cdfe;
  }

  .stationShow .content {
    width: 98%;
    margin: 10px auto 0;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .stationShow .left {
    width: 35%;
    height: 806px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
  }

  .stationShow .right {
    width: 64%;
    height: 806px;
    position: relative;
  }

  .stationShow .stationInfo {
    background: #FEFEFE;
    border: solid 1px #33cdfe;
  }

  .stationShow .tabbar {
    width: 40%;
    position: absolute;
    z-index: 1000;
    top: 2px;
    left: 33%;
  }

  .modal-info {
    width: 400px;
    height: 600px;
    z-index: 1001;

  }
</style>
<script>
  import {
    menuShowMixin,animateMixin
  } from "assets/js/mixin";
  import nav1 from 'components/equipmentControl/common/Nav1.vue'
  import refer from 'components/stationShow/refer.vue'
  import stationInfo from 'components/stationShow/stationInfo.vue'
  import map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import change from '../../components/stationManage/change.vue'

  import grid from 'assets/json/geo.json'
  import VueDraggableResizable from 'components/common/draggable'

  export default {
    data() {
      return {
        fBegin: -1,
        fEnd: -1,
        type: '',
        technology: '',
        pageIndex: 1,
        pageSize: 10,
        markerData: [],
        pageData: {},
        show:[true,true,false],
        submitted:false,
      }
    },
    mounted() {
      // let params={
      //   cid: 1200,
      //   fBegin: this.fBegin,
      //   fEnd: this.fEnd,
      //   pageSize: 1,
      //   pageIndex: 1
      // }
      // this.$api.stationShow.GetStation(params).then(res=>{
      //   console.log(res.data)
      // })

      // this.$http.get('api/EquipSurvey/EquList').then(res=>{
      //       console.log(res.data);
      //   });

    },
    mixins: [menuShowMixin,animateMixin],
    components: {
      nav1,
      refer,
      stationInfo,
      map1,
      change,
      VueDraggableResizable
    },
    methods: {
      frequencyMap(show) {
        this.$refs.map.frequencyMap(grid, show);
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
      get(pageIndex, pageSize) {
        // console.log(data,'111111111')
        // console.log(data.pageIndex,data.pageSize,'8888888888888888')
        this.pageIndex = pageIndex
        this.pageSize = pageSize
        this.page();
        // alert(222)
      },
      start(params) {
        this.pageIndex = 1;
        //结束频率
        this.fEnd = params.business.stopFreq;
        // 开始频率
        this.fBegin = params.business.startFreq;
        // 台站类别
        this.type = params.type.value;
        // 技术体制
        this.technology = params.technology.value;
        this.fadeChange(['stationShow','info']);
        this.marker();
        this.page();
        this.submitted = true;
      },
      // 分页
      page() {
        let params = {
          cid: 1200,
          fBegin: this.fBegin,
          fEnd: this.fEnd,
          type: this.type,
          technology: this.technology,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
        this.$api.stationShow.GetStation(params).then(res => {
          this.pageData = res.data
          this.$refs.stationInfo.change(this.pageData,this.pageIndex);
        })
      },
      // 获取marker数据
      marker() {
        let params = {
          cid: 1200,
          fBegin: this.fBegin,
          fEnd: this.fEnd,
          type: this.type,
          technology: this.technology
        };
        this.markerData = [];
        this.$api.stationShow.GetDisPlayStation(params).then(res => {
          res.data.forEach((item) => {
            this.markerData.push({
              'longitude': item.lon,
              'latitude': item.lat,
              'stations': item.statins
            })
            // console.log(this.markerData);
          })
          this.$refs.map.stationMarker(this.markerData,true);
          // console.log(this.markerData,'2222222222222')
        })
      },
      stationInfoAlertList() {
        // alert(111)
        // console.log(this.markerData, '00000000000000000000');
      },
    },
  }
</script>
