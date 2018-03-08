<template>
<div class="paging" v-loading="pagingLoading" element-loading-background="rgba(0, 0, 0, 0.4)">
  <slot name = 'zjx'></slot>
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
          <el-popover placement="right" width="1100" trigger="click" @hide='popoverHide' @show='popoverShow'>
            <channel-use :timePeriod='timePeriod' :loading='loading' :valueData='valueData' :keyData='keyData' :transactionBarData='transactionBarData' @openHour='openHour' :highchartData='highchartData' :width='channelWidth'></channel-use>
            <el-button type="text" slot="reference" class="p_text" style="cursor:pointer;" @click="searchCurrentStation(item,index)">查看</el-button>
          </el-popover>
        </section>
      </el-col>
    </el-row>
  </div>
  <!--数据回放-->
  <div v-show="columns===3">
    <div class="top">
      <div class="toptext">
        {{pagingTitle}}
      </div>
    </div>
    <!--已存在的记录-->
    <table class="list">
      <tr>
        <td>站名称</td>
        <td>数据回放</td>
        <td>能量轨迹</td>
      </tr>
      <tr v-for="(da,index) in datas" :key="index">
        <td>{{da.name}}</td>
        <td>
          <el-button @click="reply(da)" size="small">查看</el-button>
        </td>
        <td>
          <el-button @click="energyCircle(da)" size="small">查看</el-button>
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
        <td>{{item.rate}}</td>
        <td>{{item.band_width}}</td>
        <td :style="{color:'#686868',textDecoration:'none'}">{{item.rate_cover}}</td>
        <td>{{item.natrue}}</td>
      </tr>
    </table>
  </div>
  <div class="block1">
    <el-pagination @size-change="handleSizeChange" @current-change="page" layout="prev, pager, next" :total="totalCount">
    </el-pagination>
  </div>

</div>
</template>

<style scoped>
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
    color: #2873a7;
    font-size: 14px;
  }

  .paging .list,
  .paging .list1 {
    width: 100%;
    font-size: 12px;
    color: #686868;
  }

  .paging .list tr td:nth-of-type(1) {
    text-indent: 30px;
  }

  .paging .list tr {
    height: 26px;
    line-height: 26px;
  }

  .paging .list tr td:nth-of-type(2) {
    font-size: 12px;
    text-align: center;
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
    width: 100%;
    text-align: center;
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
    color: #696969;
  }

  .block1 .el-pager li.active {
    color: #26a5e3;
  }

  .block1 [class*=" el-icon-"],
  [class^="el-icon-"] {
    color: #686868;
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

export default {
  data() {
    return {
      checked: true,
      disabled: false,
      datas: [],
      channelWidth: '1000px',
      totalCount:1,
      currentPage:1,
    };
  },
  props: {
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
    },
    pagingData: {
      type: Array,
      default:[],
    },
    valueData: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagingLoading: {
      type: Boolean,
      default: false
    },
    pagingTitle: {
      type: String
    },
    keyData: {
      type: Array
    },
    valueData: {
      type: Array
    },
    timePeriod: {
      type: Array
    }
  },
  methods: {
    page(page) {
      this.currentPage = page;
      this.setDatas();
    },
    handleSizeChange() {
      // alert(222)
    },
    showTest() {
      console.log('show');
    },
    // 向父组件发送消息 查看当前基站信息
    searchCurrentStation(item) {
      this.$emit('searchCurrent', item)
    },
    // 向父组件发送消息 查看小时分部
    openHour() {
      this.$emit('openHour')
    },
    tabCheck(val) {
      this.$emit('tabCheck', val)
    },
    setDatas(){
      let offset = (this.currentPage-1)*10;
      if((offset+10)<this.pagingData.length) {
        this.datas = this.pagingData.slice(offset,offset+10);
      } else {
        this.datas = this.pagingData.slice(offset);
      }
    },
    reply(sta){
      this.$emit('reply',sta);
    },
    energyCircle(sta){
      this.$emit('energyCircle',sta)
    },
  },
  components: {
    station,
    ChannelUse
  },
  mounted() {

  },
  watch:{
    pagingData:function(newVal,oldVal){
      this.totalCount = newVal.length;
      this.setDatas();
    },
  },
};
</script>
