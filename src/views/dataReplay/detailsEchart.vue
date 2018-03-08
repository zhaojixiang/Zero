<template>
  <div class="details">
    <!--导航栏-->
    <nav1/>
    <div class="content">
      <div class="left">
        <paging class="paging2" :replayShow="replayShow" :data="pagingdata" :three="three"/>
      </div>
      <div class="right">
        <chart url="ws://192.168.100.166:31108/api/DataPlayback/GetMsg"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .details{
      color: #f4f5f5;
    }
    .details .content{
      width: 96%;
      margin: 0 auto;
      margin-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
    .details .left{
      width: 35%;
      height: 700px;
    }
    .details .paging2{
      height:100%;
      width: 100%;
      background: rgba(0,0,0,0.2);
      border: 1px solid #3388ff;
    }
    .details .right{
      width: 63%;
      height: 700px;
      position: relative;
    }
    /*.details .right .line{*/
      /*width: 600px;*/
      /*height: 400px;*/
      /*background: #293855;*/
      /*border: 1px solid #3388ff;*/
      /*position: absolute;*/
      /*top: 23%;*/
      /*left: 18%;*/
      /*z-index: 2000;*/
    /*}*/
    .details .right .line h2{
      font-weight: normal;
      height: 45px;
      line-height: 45px;
      text-align: center;
      margin: 0px;
    }
    .details  .right .line p,.right .line h2{
      background: #5294d1;
      border-bottom: solid 1px #fff;
    }
    .details .right .line p{
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
    }
    .details .right .line p span:nth-of-type(1){
      margin-right: 40px;
    }
    .details .right .line i{
      position:absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
    }
</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import paging from '../../components/dataReplay/paging.vue'
  import replayLine from '../../components/dataReplay/replayLine.vue'
  import chart from '../../components/dataReplay/replayEchart'
  import getReplayLineOption from '../../assets/js/chartOptions/replayLineOption'
  export default {
    data () {
      return {
        replayShow: false,
        three:true,
        pagingdata:[],
        markerData: [],
        replayLineOption: {},
        series:[],
        chart:null,
        dataArray:[],
        temp:[],
        maxArray:[],
        minArray:[],
      }
    },
    components: {
      nav1,
      paging,
      replayLine,
      chart
//      station
    },
    created(){
    },
    mounted(){
      // let data = this.mockData(300000);

//      分页
      this.$http.get('apiGetPaging').then(res=>{
        this.pagingdata=res.data.data;
      })
    },
    mixins: [menuShowMixin],
    methods: {
    },

  }
</script>
