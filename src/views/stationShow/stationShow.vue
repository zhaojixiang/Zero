<template>
  <div class="stationShow">
    <nav1/>
    <div class="content">
      <div class="left">
        <refer class="refer"/>
        <stationInfo class="page"/>
      </div>
      <div class="right">
        <map1 ref="map"/>
        <stationTab @energyCircle="energyCircle1" @frequencyMap="frequencyMap1" class="stationTab"/>
      </div>
    </div>
  </div>
</template>
<style>
  .stationShow .refer {
    background: rgba(0, 0, 0, 0.2);
    border: solid 1px #33cdfe;
  }

  .stationShow .content {
    width: 96%;
    margin: 20px auto 0;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .stationShow .left {
    width: 35%;
    height: 820px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
  }

  .stationShow .right {
    width: 63%;
    height: 820px;
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
</style>
<script>
  import {menuShowMixin} from "assets/js/mixin";
  import nav1 from 'components/equipmentControl/common/Nav1.vue'
  import refer from 'components/stationShow/refer.vue'
  import stationInfo from 'components/stationShow/stationInfo.vue'
  import map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import stationTab from 'components/stationShow/stationTab.vue'
  import grid from 'assets/json/geo.json'
  export default {
    data() {
      return {}
    },
    mounted() {
      // this.$http.get('api/EquipSurvey/EquList').then(res=>{
      //       console.log(res.data);
      //   });
      this.stationMarker();
    },
    methods:{
      frequencyMap1: function (param) {
        this.$refs.map.frequencyMap(grid, param);
      },
      energyCircle1: function (param) {
          this.$http.get('apiGetMapPie222').then(res => {
            this.$refs.map.energyCircle(res.data,param)
          })
      }
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
      stationMarker() {
        let data = [{
          "code": "44160021120001",
          "longitude": 114.6858333,
          "latitude": 23.7525
        }, {"code": "44160021140003", "longitude": 114.7333333, "latitude": 23.79333333}, {
          "code": "44160021140005",
          "longitude": 114.9311111,
          "latitude": 24.43888889
        }, {"code": "44160021140007", "longitude": 115.1738889, "latitude": 23.63555556}, {
          "code": "44160021140002",
          "longitude": 114.6672222,
          "latitude": 23.64944444
        }, {"code": "44160021140004", "longitude": 114.4858333, "latitude": 24.36388889}, {
          "code": "44160021140006",
          "longitude": 115.3172222,
          "latitude": 24.34527778
        }];
        this.$refs.map.stationMarker(data);
      },
    },
  }
</script>
