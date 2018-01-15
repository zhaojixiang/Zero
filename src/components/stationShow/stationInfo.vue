<template>
  <div class="stationInfo">
    <div class="top">
      <div class="toptext">
        台站信息
      </div>
    </div>
    <!--台站信息-->
   <table class="stationList">
     <tr>
       <th>台站名称</th>
       <th>频率（MHz）</th>
       <th>宽带（KHz）</th>
     </tr>
     <tr v-for="info in infos">
       <td>{{info.name}}</td>
       <td>{{info.num1}}</td>
       <td>{{info.num2}}</td>
     </tr>
   </table>
    <!--分页-->
    <div class="block1" >
      <el-pagination
        @current-change="page"
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .stationInfo{
    /*width: 500px;*/
    height: 600px;
    position: relative;
  }
  /*标题*/
  .stationInfo .top{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }
  .stationInfo .toptext{
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }
  /*台站信息*/
  .stationInfo .stationList{
    width:98%;
    margin:0 auto;
    padding-bottom: 30px;
    border-collapse:collapse;
    border-spacing:0;
    border:none;
  }
  .stationInfo .stationList tr th{
    color: #aacde8;
    font-weight:normal;
  }
  .stationInfo .stationList tr th:nth-of-type(1){
    text-align: left;
  }
  .stationInfo .stationList tr td:nth-of-type(1),.stationInfo .stationList tr th:nth-of-type(1){
    text-indent: 30px;
  }
  .stationInfo .stationList tr td:nth-of-type(2),.stationInfo .stationList tr td:nth-of-type(3){
    color: #ffffff;
    text-decoration: none;
    text-align: center;
  }
  .stationInfo .stationList tr{
    height: 25px;
    line-height: 25px;
    margin: 0px;
    padding: 0;
  }
  .stationInfo .stationList tr:nth-of-type(1):hover{
    background: none;
  }
  .stationInfo .stationList tr:hover{
    background: rgba(225, 225, 225, 0.3);
  }
  /*分页*/
  .block1{
    margin-left: 25%;
    position: absolute;
    bottom: 0px;
  }
  .block1 .el-pagination button.disabled,.block1 .el-pager li,.block1 .el-pager li.active,.block1 .el-pager,.el-pagination .btn-next, .el-pagination .btn-prev{
    background: transparent;
  }
  .block1 .el-pager li{
    color: #ffffff;
  }
  .block1 .el-pager li.active{
    color: #fdff35;
  }
  .block1 [class*=" el-icon-"], [class^=el-icon-]{
    color: #ffffff;
  }
  .datails .el-button{
    padding: 0px;
  }
  .el-popover{
    border: none;
    padding: 0px;
    color: #ffffff;
    width: 325px;
  }

</style>
<script>
  import station from 'components/dataReplay/StationInformation.vue'

  export default {
    data(){
      return{
        datas: [],
        isShow: true,
        disabled: false,
        infos:[]
      }
    },
    props:{
      replayShow: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      page: function () {

      }
    },
    components:{
      station
    },
    mounted () {
      this.$http.get('apiGetInfo').then(res=>{
//        console.log(res.data.data);
        this.infos = res.data.data;
      })
    }

  }
</script>
