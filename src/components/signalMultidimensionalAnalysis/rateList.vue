
<!--频率列表-->
<template>
<div class='rate_container'>
  <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="height:100%" v-show="!fixedStation">
    <el-tab-pane label="频率列表" name="first" style="height: 100%" v-loading="freqLoading">
      <div v-show="freqShow" style="height: 100%">
        <div class='main-title'>
          <span class='title_item'>频率(MHz)</span>
          <span class='title_item'>带宽(KHz)</span>
          <span class='title_item'>信号覆盖率</span>
          <span class='title_item'>频率性质</span>
        </div>
        <div class='cover_default'>
          <list @details="details" :data='data'></list>
        </div>
        <!-- 分页组件 -->
        <div height='40px' class="footer">
          <el-pagination layout="prev, pager, next" :total="50">
          </el-pagination>
        </div>
      </div>
      <!-- 无数据是显示空盒子 -->
      <div class="" style="font-size:70px;width:100%;text-align:center;color:rgb(136, 136, 136);margin-top:15px" v-show="freqEmpty">
        <i class="fa fa-dropbox" aria-hidden="true"></i>
        <p style="font-size:10px;">没有查询到数据哦~~~</p>
      </div>
    </el-tab-pane>
    <el-tab-pane label="固定站列表" name="second" style="height: 100%" v-loading="fixedLoading">
      <div v-if="fixedStationShow" style="" style="height:100%">
        <el-row :gutter="80" style="line-height:25px;height:25px;color:#686868">
          <el-col :span="14" style="text-align:center">序号</el-col>
          <el-col :span="10" style="">名称</el-col>
        </el-row>
        <el-row @click.native="showOccupancy(item.station.sid,item.station.stationName)" class='fixation' :gutter="80" v-for="(item,index) in fixationData" :key="index">
          <el-col :span="14" style="text-align:center">{{item.station.sid}}</el-col>
          <el-col :span="10">{{item.station.stationName}}</el-col>
        </el-row>
        <!-- 分页组件 -->
        <div height='40px' class="footer">
          <el-pagination layout="prev, pager, next" :total="50">
          </el-pagination>
        </div>
      </div>
      <!-- 无数据是显示空盒子 -->
      <div style="font-size:70px;width:100%;text-align:center;color:rgb(136, 136, 136);margin-top:15px" v-if="fixedStationEmpty">
        <i class="fa fa-dropbox" aria-hidden="true"></i>
        <p style="font-size:10px;">没有查询到数据哦~~~</p>
      </div>
    </el-tab-pane>
  </el-tabs>

  <!-- 单频 -->
  <div class="freqList" v-show="fixedStation" style="height: 100%">
    <!-- <el-tab-pane lable="频率信息" name="first"> -->
      <h3>频率信息</h3>
      <div v-loading="freqInfoLoading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" style="height: 79%">
        <div v-show="freqInfoShow" style="height: 100%">
          <div class='main-title'>
            <span class='title_item'>频率(MHz)</span>
            <span class='title_item'>带宽(KHz)</span>
            <span class='title_item'>信号覆盖率</span>
            <span class='title_item'>频率性质</span>
          </div>
          <div class='cover_default'>
            <list @details="details" :data='signalInfoData'></list>
          </div>
          <!-- 分页组件 -->
          <div height='40px' class="footer">
            <el-pagination layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </div>
        <!-- 无数据是显示空盒子 -->
        <div class="" style="font-size:70px;width:100%;text-align:center;color:rgb(136, 136, 136);margin-top:15px" v-show="freqInfoEmpty">
          <i class="fa fa-dropbox" aria-hidden="true"></i>
          <p style="font-size:10px;">没有查询到数据哦~~~</p>
        </div>
      </div>
    <!-- </el-tab-pane> -->
  </div>
  <!-- <div class="">
    <div height='30' class='headerTitle'>
      <span>
          <img :src="icon_right_arrow" alt="right icon">
          频率列表
          </span>
    </div>
    <div class='main-title'>
      <span class='title_item'>频率(MHz)</span>
      <span class='title_item'>带宽(KHz)</span>
      <span class='title_item'>信号覆盖率</span>
      <span class='title_item'>频率性质</span>
    </div>
    <div class='cover_default'>
      <list @details="details" :data='data'></list>
    </div>
  </div> -->
</div>
</template>
<script>
import List from "base/listDetail";
export default {
  data() {
    return {
      activeName2: 'first',
      activeName1: 'first'
    }
  },
  components: {
    List
  },
  props: {
    data: {
      type: Array
    },
    fixationData: {
      type: Array
    },
    signalInfoData: {
      type: Array
    },
    fixedStation: {
      type: Boolean
    },
    freqEmpty: {
      type: Boolean,
      default: false
    },
    freqShow: {
      type: Boolean,
      default: false
    },
    fixedStationEmpty: {
      type: Boolean,
      default: false
    },
    freqInfoShow: {
      type: Boolean,
      default: false
    },
    freqInfoEmpty: {
      type: Boolean,
      default: false
    },
    fixedStationShow: {
      type: Boolean,
      default: false
    },
    freqLoading: {
      type: Boolean,
      default: false
    },
    fixedLoading: {
      type: Boolean,
      default: false
    },
    freqInfoLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    handleClick(tab, event) {
      // if (tab.name === "second") {
      this.$emit('showFixedStation', tab.name)
      // }else{
      // this.$emit('showFreqList')
      // }
    },
    minus() {
      this.$emit("minus")
    },
    details(param) {
      // console.log(param,'22222');
      this.$emit("details", param)
    },
    showOccupancy(num, name) {
      // console.log(num,name,'===========');
      this.$emit('showOccupancy', num, name)
    }
  }
};
</script>
<style lang="less">
.rate_container {
    border: 1px solid #4fdaff;
    box-shadow: 4px 4px 20px #888888;
    background: #fff;
    height: 270px;
    width: 450px;
    position: relative;
    .freqList {
      h3{
        padding-left: 21px;
        font-weight: normal;
        color: #2774A5;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        margin: 0;
      }
    }
    .minus {
        position: absolute;
        right: 16px;
        cursor: pointer;
        color: #2774A5;
        font-size: 16px;
        top: 11px;
        z-index: 1000;
    }
    .fixation {
        line-height: 25px;
        height: 25px;
        color: #686868;
        &:hover {
            cursor: pointer;
            background: rgba(240, 240, 240, 0.78);
        }
    }
    .headerTitle {
        color: #686868;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: solid 1px #c7c7c7;
    }
    .main-title {
        width: 97%;
        display: flex;
        color: #686868;
        padding: 0.5em 10px;
    }
    .title_item {
        width: 25%;
        text-align: center;
    }
    .footer {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev,
    .el-pagination button.disabled {
        color: #686868;
    }
    .el-pager,
    .el-pager li,
    .el-pager li.active,
    .el-pagination .btn-next,
    .el-pagination .btn-prev,
    .el-pagination button.disabled {
        background: transparent;
    }
    .el-pager li {
        font-size: 12px;
        color: #686868;
    }
    .el-pager li:hover {
        color: #28a0f2;
    }
    .el-pager li.active {
        color: #28a0f2;
    }
    .el-tabs__content {
        height: 79.5%;
    }
    ::-webkit-scrollbar {
        display: none;
    }
}
</style>
