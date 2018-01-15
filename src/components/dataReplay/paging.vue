<template>
  <div class="paging">
     <!--两列-->
    <div v-show="columns===2">
      <div class="top">
        <div class="toptext">
          固定站列表
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="12" class="col_text p_title">固定站名称</el-col>
        <el-col :span="12" class="col_text">
          <section class="column2_right">
            <p class="p_text p_title">频段占用度</p>
            <p class="p_text p_title">数据回放</p>            
          </section>
        </el-col>
      </el-row>                           
      <el-row :gutter="10" v-for="(item,index) in data" :key="index">
        <el-col :span="12" class="col_text">
          {{item.station_name}}
        </el-col>
        <el-col :span="12" class="col_text">
          <section class="column2_right">
            <p class="p_text">{{item.part_cover}}</p>
              <el-popover
                placement="right"
                width="1100"
                trigger="click"
                @hide='popoverHide'
                @show='popoverShow'>
                <channel-use :transactionBarData='transactionBarData' :highchartData='highchartData' :width='channelWidth'></channel-use>
                <el-button type="text" slot="reference" class="p_text" style="cursor:pointer;">查看</el-button>
              </el-popover>
          </section>
        </el-col>        
      </el-row>
    </div>
    <!--三列-->
    <div v-show="columns===3">
      <div class="top">
        <div class="toptext">
          已存在记录
        </div>
      </div>
      <!--已存在的记录-->
      <table class="list">
        <tr v-for="(da,index) in data" :key="index">
          <td >{{da.name}}</td>
          <td v-show="replayShow"><router-link :to="{name:'Details'}" :style="{color:'#fdff35'}" >数据回放</router-link></td>
          <td class="datails">
            <!-- <el-popover
            placement="top"
            width="336px">
            <station/>
            <el-button type="text" :style="{color:'#fdff35',textDecoration:'underline',fintSize:'12px'}">站详情</el-button>
            </el-popover> -->
          </td>
        </tr>
      </table>
    </div>

    <!--四列-->
    <div v-show="columns===4">
      <div class="top">
        <div class="toptext">
          {{mainTitle}}
        </div>
      </div>
      <!--已存在的记录-->
      <table class="list1">
        <tr>
          <th>频率(MHz)</th>
          <th>宽带(KHz)</th>
          <th>信号覆盖率</th>
          <th>频率性质</th>
        </tr>
        <tr v-for="(item,index) in data" :key="index">
          <td >{{item.rate}}</td>
          <td >{{item.band_width}}</td>
          <td :style="{color:'#fff',textDecoration:'none'}">{{item.rate_cover}}</td>
          <td>{{item.natrue}}</td>
        </tr>
      </table>
    </div>
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
.column2_right {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.col_text {
  text-align: center;
  /* padding-bottom: 10px; */
  color: #f9eef7;
}
.p_text {
  width: 100px;
}
.p_title {
  color: #bcddf7;
}
.paging {
  width: 100%;
  height: 100%;
  position: relative;
}
.paging .top {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.paging .toptext {
  margin-left: 14px;
  background: url("../../assets/image/doubleArrows.png") no-repeat;
  background-position: left;
  text-indent: 23px;
  color: #56e5ff;
  font-size: 14px;
}
.paging .list,
.paging .list1 {
  width: 100%;
  font-size: 12px;
}
.paging .list tr td:nth-of-type(1) {
  text-indent: 30px;
}
.paging .list tr {
  height: 26px;
  line-height: 26px;
}
.paging .list tr td:nth-of-type(2),
td:nth-of-type(3) {
  color: #fdff35;
  text-decoration: underline;
  font-size: 12px;
}
/*四列*/
.paging .list1 td {
  text-align: center;
}
.paging .list1 tr th {
  font-weight: normal;
  color: #b7dbfd;
}
.paging .list1 tr {
  height: 25px;
  line-height: 25px;
}
.block1 {
  margin-left: 25%;
  position: absolute;
  bottom: 0px;
}
.block1 .el-pagination button.disabled,
.block1 .el-pager li,
.block1 .el-pager li.active,
.block1 .el-pager,
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: transparent;
}
.block1 .el-pager li {
  color: #ffffff;
}
.block1 .el-pager li.active {
  color: #fdff35;
}
.block1 [class*=" el-icon-"],
[class^="el-icon-"] {
  color: #ffffff;
}
.paging .datails {
  cursor: pointer;
}
.paging .datails .el-button {
  padding: 0px;
}
.paging .el-button--text {
  font-size: 12px;
}
/* .el-popover {
  border: none;
  padding: 0px;
  color: #ffffff;
  width: 325px;
} */
.paging .el-popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: #5294d1;
}
.paging .el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #5294d1;
}
</style>
<script>
import station from "components/dataReplay/StationInformation.vue";
import ChannelUse from "components/signalMultidimensionalAnalysis/channelUse";
import { hightchartHeight } from "assets/js/mixin";

export default {
  mixins: [hightchartHeight],
  data() {
    return {
      disabled: false,
      channelWidth:'1000px'
    };
  },
  props: {
    replayShow: {
      type: Boolean,
      default: true
    },
    mainTitle: {
      type: String
    },
    transactionBarData: {
      type: Object
    },
    highchartData: {
      type: Object
    },
    data: {
      type: Array
    },
    columns: {
      type: Number
    }
  },
  methods: {
    page: function() {},
    showTest(){
        console.log('show');
    },
    popoverHide() {
      this.setHighchartHeight(false)
      console.info('popover hide state:',this.$store.state.highchartHeight)      
    },
    popoverShow() {
      console.info('popover show')
    }
  },
  components: {
    station,
    ChannelUse
  },
  mounted() {}
};
</script>
