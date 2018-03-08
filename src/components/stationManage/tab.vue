<template>
  <div class="tab">
    <!--筛选-->
    <div class="top">
      <div class="toptext">
        信道使用情况表
      </div>
      <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
    </div>
    <!-- <div class="legend">
      <ul class="icons_ul">
        <li class="icons">
          <span class="square"></span>合法
        </li>
        <li class="icons">
          <span class="square"></span>违规
        </li>
        <li class="icons">
          <span class="square"></span>非法
        </li>
        <li class="icons">
          <span class="square"></span>未分配
        </li>
        <li class="icons">
          <span class="square"></span>分配未使用
        </li>
      </ul>
    </div>
    <table cellspacing="0">
      <tbody>
      <tr v-for="(item,index) in tabData" :key="index">
        <td class="channel_title">{{ item[0] }}</td>
        <td v-for="(data,idx) in item[1]"
            :class="[data[0].channelTypeEnum==0?'legal':data[0].channelTypeEnum==1?'lawlessness':data[0].channelTypeEnum==2?'illegal':data[0].channelTypeEnum==3?'registeredUnused':'unregisteredUnused','channel_td']" :key="idx">
          <el-popover
            placement="top"
            width="70"
            trigger="click">
            <slot>{{`频率: ${data[0].freq}  信号覆盖率: ${data[0].result.signalCover}%`}}</slot>
            <el-button type="text" slot="reference" :style="{color:'#6c6c6c'}">{{data[0]['amount']}}</el-button>
          </el-popover>
        </td>
      </tr>
      </tbody>
    </table> -->
    <tab :tabData='tabData' @currentClick="click"/>
    <!-- <p>当前选择信道为 : <span>91.6MHz</span></p>
    <div class="remark">
      备注: 共有信道200个，100kb一个信道；信道表格上的数字表示该类型的台站数量
    </div>
    <el-container>
      <el-header height='30' class='headerTitle'>
          <span>当前选择信道附近固定站</span>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="list_data">固定站名称</span>
          </el-col>
          <el-col :span="12" class="list_data1">
            <span class="list_data">数据回放</span>
          </el-col>
        </el-row>
        <el-row :gutter="20"  v-for="(item,index) in nearlyStaions" :key="index" name='itemInfo'>
          <el-col :span="12">
            <span class="list_word">{{item}}</span>
          </el-col>
          <el-col :span="12" class="list_data1">
            <span class="list_word couldCheck">查看</span>
          </el-col>
        </el-row>
      </el-main>
    </el-container> -->
  </div>
</template>
<style scoped>
  .tab {
    min-width: 500px;
    min-height: 500px;
    background: #FEFEFE;
    /*padding: 0 10px;*/
    position: relative;
    border: 1px solid #4fdaff;
  }

  .tab .couldCheck {
    cursor: pointer;
  }

  .icons {
    float: left;
  }

  .tab [name="itemInfo"]:hover {
    background: -webkit-linear-gradient(top, #9ecdf6, #f2faf8);
  }

  .legal {
    background-color: #13c0a5;
  }

  .lawlessness {
    background-color: #e37d62;
  }

  .illegal {
    background-color: #e3b63c;
  }

  .registeredUnused {
    background-color: #1f8ddd;
  }

  .unregisteredUnused {
    background-color: #c0c0c0;
  }

  .square {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 10px;
    background-color: #f40;
  }

  .icons_ul li:nth-child(1) span {
    background-color: #13c0a5;
  }

  .icons_ul li:nth-child(2) span {
    background-color: #e3b63c;
  }

  .icons_ul li:nth-child(3) span {
    background-color: #e37d62;
  }

  .icons_ul li:nth-child(4) span {
    background-color: #1f8ddd;
  }

  .icons_ul li:nth-child(5) span {
    background-color: #c0c0c0;
  }

  .tab .toptext {
    height: 50px;
    line-height: 50px;
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }

  .tab table tr td {
    width: 19px;
    height: 19px;
    padding: 0;
    text-align: center;
    border: solid 1px #6c6c6c;
    cursor: pointer;
  }

  .channel_title, .channel_td {
    color: #6c6c6c;
  }

  .tab .headerTitle {
    color: #4fdaff;
  }

  .tab .list_data {
    margin-top: 10px;
    color: #96b6d6;
  }

  .tab .list_data1 {
    text-align: center;
    margin-top: 5px;
  }

  .tab table {
    width: 80%;
    border-collapse: collapse;
    margin: 20px 0px 20px 70px;
  }

  .tab ul li {
    list-style: none;
    padding: 0px;
    height: 20px;
    line-height: 20px;
    color: #6c6c6c;
  }

  .tab ul {
    position: absolute;
    top: -38px;
    left: 60px;
    padding: 0px;
  }

  .tab p {
    color: #b7dbfd;
    text-align: center;
    margin-top: -15px;
    font-size: 12px;
  }

  .tab .el-button {
    padding: 0px;
  }

  .el-popover {
    background: #5294d1;
    color: #fefefe;
    border: none;
    min-width: 109px;
  }

  .el-popper[x-placement^="top"] .popper__arrow::after {
    border-top-color: #5294d1;
  }

  .el-popper[x-placement^="top"] .popper__arrow {
    border-top-color: #5294d1;
  }

  .tab .minus {
    color: #2d73a2;
    position: absolute;
    right: 10px;
    top: 0;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    cursor: pointer;
  }

  .tab .top {
    border-bottom: solid 1px #7F8081;
  }
</style>
<script>
  import Tab from 'base/tab'

  export default {
    props: ["nearlyStaions", "tabData"],
    methods: {
      minus: function () {
        this.$emit("minus");
      },
      click:function(item){
        this.$emit('currentClick',item)
      },
    },
    components: {
      Tab
    }
  };
</script>
