<template>
  <div id="app">
    <!--页头-->
    <header1/>
    <router-view/>
  </div>
</template>
<style>
  a {
    text-decoration: none;
  }
  #app{
    background: url("assets/image/bigBg.png");
  }
  p {
    margin: 0;
    padding: 0;
  }
  html {
    font-size:10px
  }
  body {
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .el-menu--horizontal .el-submenu .el-submenu__title{
      height: 40px;
      line-height: 40px;
  }
  .leaf-alert .leaflet-popup-content-wrapper, .leaflet-popup-tip {
    background: rgba(58,158,246,0.8) !important;
  }
  .ivu-loading-bar {
    position: absolute;
    top: 0px;
    width: 100%;
  }
  .g2-lab {
    margin-top: -5px;
    text-align: center;
    font-size: 6px;
  }
  .g2-str {
    font-size: 8px;
    transform: rotate(-90deg);
    -ms-transform: rotate(-90deg); /* Internet Explorer */
    -moz-transform: rotate(-90deg); /* Firefox */
    -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
    -o-transform: rotate(-90deg); /* Opera */
  }
</style>
<script>
import header1 from './components/equipmentControl/index/head.vue'
export default {
  name: 'app',
  components: {header1},
  mounted() {
  //   if(this.$store.state.cityList.length == 0) {
  //   this.$http.get('api/EquipSurvey/GetCitys',{
  //     procode:this.$const.procode,
  //   }).then(res=>{
  //     this.$store.state.cityList = res.data;
  //     sessionStorage.cityList = res.data;
  //     console.log(sessionStorage.cityList);
  //   });
  // }
  }
}
</script>
