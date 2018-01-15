<!--频谱评估分析-->
<template>
  <div class="analyse">
    <!--导航栏-->
    <nav1/>
    <div class="content">
      <div class="left">
        <!--相关分析-->
        <analyseForm class="analyseForm"/>
        <!--tab和分页-->
        <div class="tab1">
          <tab v-show="!isShow"/>
          <p class="table1" @click="isShow1" v-show="!isShow">频率列表</p>
          <paging :four="four" :data="datas" v-show="isShow"/>
          <p class="table1" @click="isShow1" v-show="isShow">信道使用情况</p>
        </div>
      </div>
      <div class="right">
        <!--地图-->
        <leaflet :markerData="markerData"/>
        <change class="an_change" :select="select"/>
      </div>
    </div>
  </div>
</template>
<style>
  .analyse .content{
    width: 96%;
    margin: 0 auto;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .analyse .content .left{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 35%;
    height: 750px;
  }
  .analyse .left .tab1{
    height: 400px;
    border: solid 1px #33ccff;
    background: rgba(0,0,0,0.3);
    position: relative;
  }
  .analyse .left .table1{
    color: #fdff35;
    font-size: 14px;
    text-decoration: underline;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }
  .analyse .right{
    width: 63%;
    height: 750px;
    position: relative;
  }
  .analyse .an_change{
    width: 100%;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1000;
  }
</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from 'components/equipmentControl/common/Nav1.vue'
  import leaflet from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import analyseForm from 'components/analyse/analyseForm.vue'
  import tab from 'components/stationManage/tab.vue'
  import paging from 'components/dataReplay/paging.vue'
  import change from 'components/stationManage/change.vue'
  import { request } from 'api/api'
  export default {
    data () {
      return {
        markerData: [],
        datas: [],
        four: true,
        isShow:false,
        select:false
      }
    },
    mixins: [menuShowMixin],
    components: {
      nav1,
      leaflet,
      analyseForm,
      tab,
      paging,
      change
    },
    mounted(){
      // this.$http.get("apiGetList").then(res => {
      //   this.datas=res.data.data;
      //   // console.log(this.datas);
      //   console.log(111);
      // });
      this._getRateList()
    },
    methods: {
      isShow1 () {
        this.isShow = !this.isShow;
      },
      _getRateList() {
        let param = {
          CID:'34010000',
          StartTime:'2016-12-12',
          StopTime:'2016-12-12',
          StartFreq:88,
          StopFreq:108,
          StepFreq:100,
          Threshold:3,
          ThresholdType:true
        }
        this.request.spectrumEvaluation.GetSignal(param).then(res=>{
          console.log('=====================')
          console.log(res)
          console.log('=====================')          
        })
      }
    }
  }
</script>
