<template>
    <div class="navs" v-show="subMenuShow">
      <el-menu v-on:select="select" :default-active="subActive" text-color="#fff" active-text-color="#fff" mode="horizontal" :router="true">
          <el-menu-item class="left" index="1" :route="{name:'Situation1'}">总览</el-menu-item>
          <el-menu-item index="2" :route="{name:'Situation2'}">集成商</el-menu-item>
          <el-menu-item index="3" :route="{name:'Situation3'}">设备制造商</el-menu-item>
      </el-menu>
   </div>
</template>

<style scoped>
  .navs {
    width: 100%;
  }
  .el-menu div{
    width: 90%;
    margin:0 auto;
  }
  .el-menu--horizontal .el-menu-item{
    font-size: 12px;
    height:40px;
    line-height: 40px;
    background-color:transparent;
  }
  .left{
    margin-left: 8%;
  }
  ul li:first-child{
    margin-left: 210px;
  }
  ul li{
    padding:0px 10px;
    background-color:rgba(39,113,172,0.7);
  }
  ul{
    position: relative;
    top: -1px;
    border-top: solid 2px #44ace4;
    border-bottom: none;
    background-color:rgba(39,113,172,0.7);
  }
</style>

<script>
  export default {
    props: [

    ],
    data () {
      return {
      }
    },
    computed:{
      subMenuShow:function(){
        return this.$store.state.equipment.subMenuShow;
      },
      subActive:function(){
        return this.$store.state.equipment.subActive;
      }
    },
    methods:{
      select:function(index){
        this.$store.state.equipment.subActive = index;
      }
    }
  }
</script>
