<template>
  <div id="filtrate">
    <nav1/>
    <div class="filBox">
      <div class="left">
        <!--筛选-->
        <filtrate class="flitrate"/>
        <!--使用情况比例-->
        <div class="pie">
          <ratioPie :option="ratioPieOption" :setting="{width:'100%',height:'300px'}"/>
          <img src="../../assets/image/doubleArrows.png" alt="">
        </div>
        <tab class="table"/>
        <!--信道使用情况表-->
      </div>
      <div class="right">
        <map1/>
        <change class="change"/>
      </div>
    </div>
  </div>
</template>
<style>
#filtrate{
  /*width: 98%;*/
  color: #ffffff;
}
#filtrate .left{
  width: 35%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#filtrate .flitrate{
  height: 119px;
}
.filBox{
  width: 96%;
  margin: 20px auto 0px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
  .pie{
    border: solid 1px #33ccff;
    background: rgba(0,0,0,0.2);
    position: relative;
    /*width: 500px;*/
  }
  .pie img{
    position: absolute;
    top: 17px;
    left: 13px;
  }
.table{
  border: solid 1px #33ccff;
  background: rgba(0,0,0,0.3);
}
 #filtrate .right {
    width: 63%;
    height: 800px;
    position: relative;
  }
/*#filtrate .right .spe{*/
  /*width: 90%;*/
/*}*/
  .change{
    width: 95%;
    position: absolute;
    z-index: 2000;
    top: 20px;
    left: 50px;
  }
</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import filtrate from '../../components/stationManage/filtrate.vue'
  import ratioPie from '../../components/stationManage/ratioPie.vue'
  import GetRatioPieOption from 'assets/js/chartOptions/ratioPieOption'
  import tab from '../../components/stationManage/tab.vue'
  import change from '../../components/stationManage/change.vue'
  import spectra from '../../components/stationManage/spectraBar.vue'
  import map1 from '../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  export default {
    data(){
      return{
        ratioPieOption: {}
      }
    },
    components:{
      nav1,
      filtrate,
      ratioPie,
      tab,
      map1,
      change,
      spectra
    },
    mixins: [menuShowMixin],
    mounted(){
//信号使用情况比例
      this.ratioPieOption = GetRatioPieOption();
    },
    methods:{
    }
  }
</script>
