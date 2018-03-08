<template>
  <div id="app">
    <!--页头-->
    <header1/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<style lang='less'>
  @import './assets/css/mixin.less';
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
    /*background: rgba(58,158,246,0.8) !important;*/
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
  .station-marker-label{
    position: absolute;
    top: 8px;
    left: 12px;
    color: green;
    display: block;
    width: 30px;
    line-height: 15px;
  }
  .side-span {
    position: absolute;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  .side-span span {
    width: 20px;
    background: #2F74A1;
    display: inline-block;
    text-align: center;
    padding: 0 10px;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
    letter-spacing: 5px;
    cursor: pointer;
    border-top: solid 1px #fff;
    color: #ffffff;
  }
  .minus {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .i-minus {
    width: 20px;
    text-align: center;
    color:#6192B4 !important;
  }
  .form-err {
    border: solid 1px red;
  }
  .change .el-checkbox__label {
    width: 120px;
    text-align: left;
  }
  .change .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .data-reply .el-slider__runway {
     margin:0 !important;
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
