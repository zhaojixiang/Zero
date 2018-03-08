<template>
<div class="stationShow">
  <nav1 :stationShowTop="true" />
  <div class="content">
    <div class="left">
      <refer class="refer" @start="start" />
      <stationInfo ref="stationInfo" class="page" @currentPage='get' />
    </div>
    <div class="right">
      <map1 ref="map" @stationInfoAlertList="stationInfoAlertList" />
      <stationTab @energyCircle="energyMap" @frequencyMap="frequencyMap" class="stationTab" />
    </div>
  </div>
</div>
</template>
<style scoped>
.stationShow .refer {
  background: rgba(0, 0, 0, 0.2);
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

.stationShow .page {
  background: rgba(0, 0, 0, 0.2);
  border: solid 1px #33cdfe;
}

.stationShow .stationTab {
  z-index: 1000;
  position: absolute;
  top: 20px;
  left: 50px;
}

.modal-info {
  width: 400px;
  height: 600px;
  z-index: 1001;

}
</style>
<script>
import {
  menuShowMixin
} from "assets/js/mixin";
import nav1 from 'components/equipmentControl/common/Nav1.vue'
import refer from 'components/stationShow/refer.vue'
import stationInfo from 'components/stationShow/stationInfo.vue'
import map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
import stationTab from 'components/stationShow/stationTab.vue'
import grid from 'assets/json/geo.json'

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
  mixins: [menuShowMixin],
  components: {
    nav1,
    refer,
    stationInfo,
    map1,
    stationTab
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
    stationInfoAlertList() {
      // alert(111)
      // console.log(this.markerData, '00000000000000000000');
    }
  },
}
</script>
