<template>
  <div class="equipment" :hide="currentLocation">
    <div>
      <equipNav1/>
    </div>
    <div>
      <nav2/>
    </div>
    <router-view/>
  </div>
</template>

<style>
    .legend {
      color: #FFFFFF !important;
      line-height: 18px !important;
    }
    .equipment {
      color: #fff;
    }
    .leaf-alert {
      z-index: 1999;
    }
    .leaf-alert ul{
      padding: 0px;
    }
    .leaf-alert #basic{
      background: transparent;
      position: relative;
      z-index: 2000;
      width: 300px;
      color: #fff;
    }
    .leaf-alert .title{
      height: 45px;
      line-height: 45px;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid #fff;
    }
    .leaf-alert .bottom{
      display: flex;
      justify-content: space-between;
    }
    .leaf-alert .left{
      width: 110px;
      height: 150px;
      barder: 1px solid pink;
    }
    .leaf-alert .left img {
      width: 110px;
      height: 150px;
    }
    .leaf-alert .right{
      list-style: none;
    }
    .leaf-alert .right li{
      height: 20px;
      line-height: 20px;
      margin-right: 15px;
    }
    .leaf-alert .right li span {
      /* color: #fdff35; */
      text-decoration: underline;
    }
    /* .leaf-alert .right li {
      text-align: right;
    } */
    .leaf-alert .info {
      text-align: right;
      display: block;
    }
    .leaf-alert .right a {
      text-decoration: underline;
      color: #fdff35;
      cursor: pointer;
    }
    .leaf-alert .leaflet-container a.leaflet-popup-close-button{
      color: #ffffff;
    }
    .map-legend {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1000;
      width: 120px;
      height: 200px;
      background-color: #5294d1;
    }
    .map-ul {
      padding: 0 10px;
      text-align: left;
    }
    .map-ul li {
      width: 100px;
      list-style: none;
      padding: 10px 0;
      color: #e8f04d;
      text-decoration: underline;
    }
    .map-ul span {
        display: inline-block;
        height: 12px;
        width: 12px;
        background: #3388ff;
        position: relative;
        top: 1px;
    }
    .areabg{
      color: #e8f04d;
      font-size: 14px;
      padding-left: 40px;
      height: 76px;
      line-height: 35px;
      width: 380px;
      position: absolute;
      top: 0px;;
      left: 100px;;
      background: url("../../../assets/image/mapbg.png");
      background-size: cover;
      z-index: 1000;
    }
    .areabg p {
      width: 340px;
    }
    .mapbg{
      color: #e8f04d;
      font-size: 14px;
      padding-left: 40px;
      height: 76px;
      line-height: 30px;
      width: 360px;
      position: relative;
      top: -585px;
      left: 103px;
      background: url("../../../assets/image/mapbg.png");
      background-size: cover;
      z-index: 99;
    }
    .mapbg p{
      padding-top: 8px;
    }
</style>

<script>
  import equipNav1 from '../../../components/equipmentControl/common/Nav1.vue'
  import nav2 from '../../../components/equipmentControl/common/Nav2.vue'
  import {dateData} from '../../../assets/js/public'
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$http.get('api/HomePage/StatisticsData',{
        procode:this.$store.state.procode,
        year:dateData.endyear,
        citycode:'',
      }).then(res=>{
        this.$store.state.provinceData = res.data;
      });
    },
    methods: {
      initCityData:function(){
        this.$http.get('api/HomePage/StatisticsData',{
          procode:this.$store.state.procode,
          year:dateData.endyear,
          citycode:this.$store.state.currentLocation.code,
        }).then(res=>{
          this.$store.state.cityInfo = res.data;
        });
      },
    },
    components: {equipNav1, nav2},
    computed:{
      currentLocation:function(){
        if(this.$store.state.locationLevel == 1){
          this.initCityData();
        }
        return this.$store.state.currentLocation;
      },

    },
  }
</script>
