<template>
  <div class="dataReplay">
    <!--导航栏-->
    <nav1/>
    <div class="content">
      <div class="left">
        <!-- 表单 -->
        <inquire class="inquire"/>
        <!-- 分页 -->
        <paging class="paging1" :pagingTitle="pagingTitle" :columns='3' :pagingdata="pagingdata">
          <span slot='zjx' class="pagingTab" @click="pagingTab1">{{pagingTab}}</span>
        </paging>
      </div>
      <div class="right">
        <!-- 地图 -->
        <leaflet ref="map" :markerData="markerData" @showLine="showLine1"/>
        <div class="line" v-show="isShow">
          <i class="fa fa-times" @click="showLine1"></i>
          <h2>轨迹信息</h2>
          <p><span>监测站ID : 001</span><span>监测站名称 : 成都零点监测站</span></p>
          <replayLine class="replayLine1" :option = "replayLineOption" :setting = "{height:'300px',width:'600px'}"/>
        </div>
        <div class="table">
          <tab @frequencyMap="frequencyMap1" @energy="energy1"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .dataReplay{
    color: #f4f5f5;
    padding-bottom: 10px;
  }
  .dataReplay .content{
    width: 98%;
    margin: 10px auto 0px;
    display: flex;
    justify-content: space-between;
  }
  .dataReplay .left{
    width: 35%;
    height: 837px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .dataReplay .inquire{
    background: rgba(0,0,0,0.2);
    border: 1px solid #3388ff;
    /*margin-bottom: 20px;*/
  }
  .dataReplay .paging1{
    background: rgba(0,0,0,0.2);
    border: 1px solid #3388ff;
    height: 593px;
    position: relative;
  }
  .pagingTab{
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 12px;
    color: #fdff38;
    text-decoration: underline;
    cursor: pointer;
  }
  .dataReplay .content .right{
    width: 64%;
    height: 837px;
    position: relative;
  }
  .dataReplay .right .line{
    width: 600px;
    height: 400px;
    background: #293855;
    border: 1px solid #3388ff;
    position: absolute;
    top: 23%;
    left: 18%;
    z-index: 2000;
  }
  .dataReplay .right .line h2{
    font-weight: normal;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px;
  }
  .dataReplay .right .line p,.right .line h2{
    background: #5294d1;
    border-bottom: solid 1px #fff;
  }
  .dataReplay .right .line p{
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
  }
  .dataReplay .right .line p span:nth-of-type(1){
    margin-right: 40px;
  }
  .dataReplay .right .line i{
    position:absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .dataReplay .right{
    background: #283858;
    height: 837px;
    width: 900px;
  }
  .el-radio-button__inner{
    background-color: #5294d1;
    color: #fff;
    border: none;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    border: none;
    background-color: #5294d1;
  }
  .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner{
    border: none;
    border-radius: 0px;
  }
  .dataReplay .right .table{
    position: absolute;
    top: 17px;
    left: 62px;
    z-index: 1900;
  }
  .dataReplay .right .table img{
    width: 16px;
    height: 16px;
    position: relative;
    top: 3px;
    left: -4px;
  }

</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from 'components/equipmentControl/common/Nav1.vue'
  import inquire from 'components/dataReplay/inquire.vue'
  import paging from 'components/dataReplay/paging.vue'
  import replayLine from 'components/dataReplay/replayLine.vue'
  import getReplayLineOption from 'assets/js/chartOptions/replayLineOption'
  import leaflet from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import tab from 'components/stationShow/stationTab.vue'
  import grid from 'assets/json/geo.json'
  export default {
    data () {
      return {
        isShow: false,
        isReplay: false,
        tabPosition: 'top',
        activeName: 'second',
        three: true,
        markerData: [],
        replayLineOption: {},
        pagingdata:[],
        pagingTitle: '移动站列表',
        pagingTab: '固定站列表'
      }
    },
    mixins: [menuShowMixin],
    components: {
      nav1,
      inquire,
      paging,
      leaflet,
      replayLine,
      tab
    },
    mounted(){
//      加载折线图
      this.replayLineOption=getReplayLineOption();
//      分页
//         this.$http.get('apiGetPaging').then(res=>{
//           this.pagingdata=res.data.data;
// //          console.log(this.pagingdata);
//         })
        this.$http.get('api/GetCompanyInfo').then(res=>{
          // console.log(res.data.station_name
            this.pagingdata = res.data.around_station
            // console.log(this.datas)
        })
    },
    beforeDestroy(){
      this.setMenuShow(true);
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      frequencyMap1(data){
        if(data){
          // alert('成功')
          this.$refs.map.frequencyMap(grid);
        }else{
          // alert('清除频谱地图')
          this.$refs.map.frequencyMap(grid,false);
        }
      },
      energy1 (data) {
        if (data) {
          this.$http.get('apiGetMapPie222').then(res => {
            this.$refs.map.energyCircle(res.data);
            // console.log(this);
          })
        } else {
          this.$refs.map.energyCircle([],false);
        }
      },
      showLine1 () {
        this.isShow = !this.isShow
      },
      pagingTab1(){
        // alert(111)
        if (this.pagingTitle=="移动站列表"&&this.pagingTab=="固定站列表") {
          this.pagingTitle="固定站列表"
          this.pagingTab="移动站列表"
        } else {
          this.pagingTitle="移动站列表"
          this.pagingTab="固定站列表"
        }
      }
    }

  }
</script>
