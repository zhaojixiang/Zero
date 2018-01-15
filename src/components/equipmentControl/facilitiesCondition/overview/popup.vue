<template>
    <div id="basic">
      <p class="title">基本信息</p>
      <div class="bottom">
        <img class="left" src="../../../../assets/image/leafletimg.png">
        <ul class="right">
          <li>站名 : 成都零点监测站{{ test }}</li>
          <li>厂家 : <span>成都零点科技有限公司</span></li>
          <li>型号 : A1</li>
          <li>类型 : 固定站</li>
          <li>负责人 : 陈先生</li>
          <li>建设时间 : 2017.11.10</li>
          <router-link :to="{name:'WorkAnalyze'}"><li>详情</li></router-link>
        </ul>
      </div>
    </div>
</template>
<style scoped>
  ul{
    padding: 0px;
  }
  #basic{
    background: transparent;
    position: relative;
    z-index: 2000;
    width: 300px;
    color: #fff;
  }
  .title{
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    text-align: center;
    border-bottom: 1px solid #fff;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
  }
  .left{
    width: 110px;
    height: 150px;
    barder: 1px solid pink;
  }
  .left img {
    width: 110px;
    height: 150px;
  }
  .right{
    list-style: none;
  }
  .right li{
    height: 20px;
    line-height: 20px;
    margin-right: 15px;
  }
  .right li span {
    color: #fdff35;
    text-decoration: underline;
  }
  .right li:last-child{
    text-align: right;
    text-decoration: underline;
    color: #fdff35;
    cursor: pointer;
  }
  .leaflet-container a.leaflet-popup-close-button{
    color: #ffffff;
  }
</style>
<script>
  export  default {
    props:["test"],
    data(){
      return {

      }
    },
  }
</script>
