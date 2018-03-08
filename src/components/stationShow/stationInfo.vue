<template>
<div class="stationInfo">
  <div class="top">
    <div class="toptext">
      <img src="../../assets/image/doubleArrows.png"/>
      台站信息
    </div>
    <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
  </div>
  <!--台站信息-->
  <div class="stationList">
    <el-row>
      <el-col :span="10" style="text-align:center">中心频率</el-col>
      <el-col :span="14" style="padding-left:32px">台站名称</el-col>
    </el-row>
    <el-row class="stationListContent" v-for="(info,index) in currentPageContent" :key="index" @click="details(info)">
      <el-col :span="10" style="text-align:center">{{info.centerFreq}}</el-col>
      <el-col :span="14" style="padding-left:32px">{{info.name}}</el-col>
    </el-row>
  </div>
  <!--分页-->
  <div class="block">
    <div class="block1">
      <el-pagination @current-change="page1" :current-page="pageIndex" layout="prev, pager, next" :page-size="pageSize" :total="total">
      </el-pagination>
    </div>
  </div>

</div>
</template>

<style scoped>
.stationInfo {
  width: 400px;
  height: 450px;
  position: relative;
  background: #fff;
  border: solid 1px #36caff;
}

/*标题*/

.stationInfo .top {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #8F9091;
  height: 40px;
  line-height: 40px;
}

.stationInfo .toptext {
  width: 100%;
  background-position: left;
  text-indent: 23px;
  color: #2c72a6;
  font-size: 14px;
}

/*台站信息*/

.stationInfo .stationList {
  color: #7F8081;
  width: 98%;
  margin: 0 auto;
  padding-bottom: 30px;
}

.stationInfo .stationList .el-row {
  height: 30px;
  line-height: 30px;
}

.stationInfo .stationList .stationListContent:hover {
  background: rgba(225, 225, 225, 0.3);
  cursor: pointer;
}

/*分页*/

.block {
  width: 100%;
  position: absolute;
  bottom: 0px;
}

.block1 {
  width: 40%;
  /* width: 100%; */
  margin: 0 auto;
  /* margin-left: 25%; */
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
  color: #88898A;
}

.block1 .el-pager li.active {
  color: #88898A;
}


.block1 [class*=" el-icon-"],
[class^=el-icon-] {
  color: #88898A;
}

.datails .el-button {
  padding: 0px;
}

.el-popover {
  border: none;
  padding: 0px;
  color: #686868;
  width: 325px;
}
</style>
<script>
import station from 'components/dataReplay/StationInformation.vue'

export default {
  data() {
    return {
      datas: [],
      isShow: true,
      disabled: false,
      infos: [],
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      currentPageContent: []
    }
  },
  props: {
    replayShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    page1: function(index) {
      this.pageIndex = index;
      this.$emit('currentPage', this.pageIndex, this.pageSize)
    },
    change(pageData, pageIndex) {
      // console.log(pageData.totalCount,pageData.currentPageObjects,'000');
      this.total = pageData.totalCount
      this.currentPageContent = pageData.currentPageObjects
      this.pageIndex = pageIndex
    },
    minus(){
      this.$emit('minus');
    },
    // details(info){
    //   console.log(info,'-----------');
    // }
  },
  components: {
    station
  },
  mounted() {}

}
</script>
