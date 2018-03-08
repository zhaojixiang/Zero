<template>
  <div class="menu-box">
    <div class="submenu" @click="unfold" v-show="provinceShow">
      <span class="location"></span>
      <span slot="title" id="address" >{{currentLocation.name}}</span>
      <span class="arrow"></span>
    </div>
    <el-menu :default-active="active" v-on:select="select" class="el-menu-demo" text-color="#fff" active-text-color="#fff" background-color="#2771AC" mode="horizontal" :router="true">
        <!-- <el-menu-item index="8" class="submenu">
          <span slot="title" id="address" @click="unfold">广东省</span>
        </el-menu-item> -->
        <div class="menu">
          <el-menu-item class="left" index="0" v-show="menuShow" :route="{name:'EquipmentIndex'}">首页</el-menu-item>
          <el-menu-item index="1" v-show="menuShow" :route="{name:'Situation1'}">监测设施概况</el-menu-item>
          <!-- <el-submenu index="1"  class="el-menu-sub" text-color="#fff" active-text-color="#fff" mode="horizontal" :router="true">
              <template slot="title">我的工作台</template>
              <el-menu-item class="left" index="1" :route="{name:'Situation1'}">总览</el-menu-item>
              <el-menu-item index="2" :route="{name:'Situation2'}">集成商</el-menu-item>
              <el-menu-item index="3" :route="{name:'Situation3'}">设备制造商</el-menu-item>
          </el-submenu> -->
          <el-menu-item index="2" :route="{name:'Gdp'}" v-show='menuShow'>GDP与监测设施关系</el-menu-item>
          <el-menu-item index="3" :route="{name:'People'}" v-show='menuShow'>人口与监测设施关系</el-menu-item>
          <el-menu-item index="4" :route="{name:'Area'}" v-show='menuShow'>面积与监测设施关系</el-menu-item>
          <el-menu-item index="5" :route="{name:'Num'}" v-show='menuShow'>台站数量与监测设施关系</el-menu-item>
          <el-menu-item index="6" :route="{name:'Worker'}" v-show='menuShow'>工作人员数量与监测设施关系</el-menu-item>
        </div>
        <!-- 台站显示 -->
        <!-- <span class="stationShowTop" v-show="stationShowTop">广州是共查询到台站 {{stationNumber[0]}} 个</span> -->
        <!-- 数据回放 -->
        <!-- <span class="dataReplayTop" v-show="dataReplayTop">您当前查询的是 {{stationNumber[0]}} 频段的数据</span> -->
        <span @click.stop="exportList" class='export_right' v-show='!menuShow&&exportListShow'>导出列表</span>
    </el-menu>
    <div v-show="navBarTitleShow" class="navBarTitle">
      {{navBarTitle}}
    </div>
    <div id="fold" v-show="listShow">
      <!-- <div id="trigon"></div> -->
      <div class="city-list">
        <span @click="chooseCity(-1)" :style="province==currentLocation.name?'color:red':''">全省</span>
        <span v-for="(c,index) in cityList" :key="index" :style="c==currentLocation.name?'color:red':''" @click="chooseCity(index)">{{ c }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .location {
    height: 20px;
    margin: auto 0;
    display: block;
    line-height: 40px;
    width: 15px;
    background: url('../../../assets/image/location-icon.png');
    background-size: 14px;
    background-repeat: no-repeat;
  }
  .menu-box .el-menu--horizontal{
    border-bottom: 2px solid #4cb8e1;
  }
  .arrow {
    height: 8px;
    margin-left: 5px;
    margin: auto 0;
    display: block;
    width: 10px;
    background: url('../../../assets/image/arrow.png');
    background-size: 10px;
    background-repeat: no-repeat;
  }
  .container {
    width: 80%;
  }
  /* .el-menu[data-v-8f3eb8c2]{
    padding-left: 20px;
    margin-top: 11px;
    position: relative;
    z-index: 100;
    border-bottom: solid 3px #41a8e3;
  } */
  .el-menu div{
    width: 100%;
    margin:0 auto;
  }
  .el-menu--horizontal .el-menu-item, .el-submenu__title{
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }
  .left{
    margin-left: 8%;
  }
  .export_right,.right_occupy{
    position: absolute;
    text-align: right;
    text-decoration: underline;
    color: #fff !important;
    cursor: pointer;
    bottom: 1em;
  }
  .stationShowTop,.dataReplayTop{
    position: absolute;
    left: 46%;
    top: 15px;
    color: #fff;
  }
  .export_right{
    right: 5em;
  }
  .right_occupy{
    right: 15rem;
  }
  .menu,.submenu {
    height: 40px;
  }
  .submenu {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 40px;
    line-height: 40px;
    top: 60px;
    left: 20px;
    z-index: 10;
    font-size: 15px;
    cursor: pointer;
    color:#fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #fold{
    /*width: 300px;*/
    background: #ebf5fe;
    border:solid 2px #3c78af;
    position: absolute;
    z-index: 2000;
    margin-left: 30px;
  }
  .city-list{
    width: 300px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #5e8cbb;
    font-size: 16px;

    border-bottom: dashed 1px #d6d6d6;
    margin-left: 20px;
    margin-right: 20px;
  }
  .city-list span{
    padding: 7px 10px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  #trigon{
    border: 13px;
    z-index: 200;
    border-color: transparent transparent #ebf5fe transparent;
    border-style: solid;
    width: 0;
    height: 0;
    position: relative;
    top: -25px;
    left: 29px;
  }
  .navBarTitle {
    width: 100%;
    position: absolute;
    top: 70px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        listShow:false,
        cityList:this.$store.state.cityList,
        province:this.$store.state.province,
        stationNumber: []
      }
    },
    props:{
      showTitle: {
        type: Boolean,
        default: false
      },
      stationShowTop:{
        type: Boolean,
        default: false
      },
      navBarTitleShow:{
        type: Boolean,
        default: false
      },
      navBarTitle:{
        type:String,
        default:'',
      },
      dataReplayTop:{
        type: Boolean,
        default: false
      },
      exportListShow:{
        type: Boolean,
        default: true
      },
      provinceShow:{
        trpe: Boolean,
        default: true
      }
    },
    mounted(){
      if(this.$route.meta.active != undefined) {
        this.$store.state.equipment.active = this.$route.meta.active;
      }
      if(this.$store.state.equipment.active == '1') {
        this.$store.state.equipment.subMenuShow = true;
      } else {
        this.$store.state.equipment.subMenuShow = false;
      }
      // 台站显示页面台站数量
      if(this.stationShowTop){
        let params = {
          cid: this.$const.CID_
        }
        this.$api.stationShow.GetCityTotalCount(params).then(res=>{
          this.stationNumber.push(res.data)
        })
      }
    },
    methods: {
      unfold: function () {
        // $('#fold').toggle();
        this.listShow = !this.listShow;
      },
      select:function(index) {
        this.$store.state.equipment.active = index;
        if(index === '1') {
          this.$store.state.equipment.subMenuShow = true;
          this.$store.state.equipment.subActive = '1';
        } else {
          this.$store.state.equipment.subMenuShow = false;
        }
      },
      chooseCity:function(index) {
        let city = '';
        //选择省
        if(index == -1) {
          city = {code:this.$store.state.procode,name:this.$store.state.province,latitude:23.08,longitude:113.14};
          this.$store.state.locationLevel = 0;
        } else {
          city = this.$store.state.cityData[index];
          console.log(city,'city');
          city.code = city.value;
          this.$store.state.locationLevel = 1;
        }
        this.$store.state.currentLocation = city;
        this.unfold();
        // console.log('route',this.$route.name);
      },
      exportList() {
        this.$emit('export');
      },
    },
    computed:{
      active:function(){
        return this.$store.state.equipment.active;
      },
      currentLocation:function(){
        return this.$store.state.currentLocation;
      },
      ...mapGetters([
        'menuShow'
      ])
    },
  }
</script>
