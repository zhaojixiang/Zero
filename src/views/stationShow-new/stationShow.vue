<template>
  <div id="stationShow">
    <nav1 :stationShowTop="true"/>
    <div class="container">
      <div class="side-span">
          <span @click="fadeChange(['stationShow','refer'])" style="height: 120px">相关查询</span>
          <span @click="fadeChange(['stationShow','stationInfo'])" style="height: 120px;">台站信息</span>
      </div>
      <!-- 地图 -->
      <map1 class="map" ref="map"/>
      <!-- 相关查询 -->
      <refer v-on:start="start" :class="['refer',fade.stationShow.refer?fadeInCss:fadeOutCss]">
        <span slot="zjx" @click="fadeChange(['stationShow','refer'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
      </refer>

      <!-- 分页 -->
      <VueDraggableResizable :class="[fade.stationShow.stationInfo?zoomInCss:zoomOutCss]" :resizable="false" :x="40" :y="132" :z="fade.stationShow.stationInf?1000:0">
        <stationInfo id="stationInfo" @currentPage='get'>
          <span slot="zjx" @click="fadeChange(['stationShow','stationInfo'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
        </stationInfo>
      </VueDraggableResizable>
    </div>
  </div>
</template>
<style scoped>
  #stationShow .container {
    width: 100%;
    height: 100%;
    margin: auto;
    /* margin-top: 20px; */
    position: relative;
  }
  #stationShow {
    color: #676767;
    /* height: 1200px; */
  }
  #stationShow .map {
    min-height: 900px;
    z-index: 999;
  }
  #stationShow .minus {
    position: absolute;
    right: 16px;
    cursor: pointer;
    color: #2774A5;
    font-size: 16px;
    top: 11px;
  }

  #stationShow .refer {
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 1000;
  }
  #stationShow #stationInfo{
    position: absolute;
    top: 112px;
    left: 0;
    /* z-index:1000; */
  }
#stationShow .side-span {
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  #stationShow .side-span span {
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
#stationShow .el-input--suffix .el-input__inner {
    padding-right: 0;
  }

</style>
<script>
  import {menuShowMixin,animateMixin} from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import refer from 'components/stationShow/refer.vue'
  import stationInfo from 'components/stationShow/stationInfo.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
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
        pageData: {}
      }
    },
    components: {
      nav1,
      refer,
      stationInfo,
      map1,
      VueDraggableResizable
    },
    mixins: [menuShowMixin,animateMixin],
    mounted() {
    },
    methods: {
      initMarker(data){
        this.$refs.map.stationMarker(data);
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
        this.pageIndex = 1
        let a = params.GetBusiness;
        let r1 = a.split('-')[0]
        let r2 = a.split('-')[1]
        //结束频率
        let d = parseFloat(r2)
        this.fEnd = d;
        // 开始频率
        let c
        if (r1.split(')')[1] == undefined) {
          c = parseFloat(r1)
        } else {
          c = parseFloat(r1.split(')')[1])
        }
        this.fBegin = c
        // 台站类别
        let t = params.type;
        this.type = t;
        // 技术体制
        let s = params.technology;
        this.technology = s;
        console.log(this.fBegin, this.fEnd, this.type, this.technology)

        this.marker();
        this.page();
        this.submit();
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
        }
        this.$api.stationShow.GetDisPlayStation(params).then(res => {
          res.data.forEach((item) => {
            this.markerData.push({
              'longitude': item.lon,
              'latitude': item.lat,
              'stations': item.statins
            })
            // console.log(this.markerData);
          })
          this.$refs.map.stationMarker(this.markerData);
          // console.log(this.markerData,'2222222222222')
        })
      },
      submit(){
        this.fadeChange(['stationShow','refer'],true);
        this.fadeChange(['stationShow','stationInfo'],true);
      }
    }
  }
</script>
