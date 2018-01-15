<template>
  <div class="stationShow">
    <nav1/>
    <div class="content">
      <div class="left">
        <refer class="refer"/>
        <stationInfo class="page"/>
      </div>
      <div class="right">
        <map1/>
        <stationTab class="stationTab"/>
      </div>
    </div>
  </div>
</template>
<style>
.stationShow .refer{
  background: rgba(0,0,0,0.2);
  border: solid 1px #33cdfe;
}
.stationShow .content{
  width: 96%;
  margin: 20px auto 0;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
  .stationShow .left{
    width: 35%;
    height: 820px;
    display: flex;flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
  }
.stationShow .right{
  width: 63%;
  height: 820px;
  position: relative;
}
  .stationShow .page{
    background: rgba(0,0,0,0.2);
    border: solid 1px #33cdfe;
  }
  .stationShow .stationTab{
    z-index: 1000;
    position: absolute;
    top: 20px;
    left: 50px;
  }
</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from 'components/equipmentControl/common/Nav1.vue'
  import refer from 'components/stationShow/refer.vue'
  import stationInfo from 'components/stationShow/stationInfo.vue'
  import map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import stationTab from 'components/stationShow/stationTab.vue'
  export default {
    data(){
      return{

      }
    },
    mounted(){
      // this.$http.get('api/EquipSurvey/EquList').then(res=>{
      //       console.log(res.data);
      //   });
    },

    mixins: [menuShowMixin],
    components:{
      nav1,
      refer,
      stationInfo,
      map1,
      stationTab
    }
  }
</script>
