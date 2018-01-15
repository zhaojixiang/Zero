<template>
  <div class="tab">
    <!--筛选-->
    <div class="top">
      <div class="toptext">
        信道使用情况表
      </div>
    </div>
    <section>
      <ul class="icons_ul" style="position: relative;top: -15px;left:70px;">
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
          <span class="square"></span>登记未使用
        </li>
        <li class="icons">
          <span class="square"></span>未登记未使用
        </li>
      </ul>
    </section>
    <table cellspacing="0">
      <tbody>
        <tr v-for="item in title" :key="item">
            <td v-for="(data,index) in tabData" :style="{background:data.color}" @click="show" :key="index">
              <el-popover
                placement="top"
                width="70"
                trigger="click"
                content="频率: 91.6MHz 信号覆盖率: 80%">
                <el-button type="text" slot="reference" :style="{color:'#fff'}">{{data.value}}</el-button>
              </el-popover>
            </td>  
        </tr>
      </tbody>
    </table>
    <ul>
      <li v-for="(item,index) in title" :key="index">{{item}}</li>
    </ul>
    <p>当前选择信道为 : <span>91.6MHz</span></p>
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
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="list_data">成都零点固定站</span>
          </el-col>
          <el-col :span="12" class="list_data1">
            <span class="list_data">查看</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="list_data">天府大道第一固定站</span>
          </el-col>
          <el-col :span="12" class="list_data1">
            <span class="list_data">查看</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="list_data">高新区固定站</span>
          </el-col>
          <el-col :span="12" class="list_data1">
            <span class="list_data">查看</span>
          </el-col>  
        </el-row>        
      </el-main>
    </el-container>
  </div>
</template>
<style>
  .tab{
    min-width: 480px;
    /*padding: 0 10px;*/
    position: relative;
    /* border: 1px solid #4fdaff; */
  }
  .icons{
    float: left;
  }
  .square{
    width:10px;
    height: 10px;
    display: inline-block;
    margin:0 10px;
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
  .tab .toptext{
    height: 50px;
    line-height: 50px;
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }
  .tab table tr td{
  /*width: 19px;*/
  height: 19px;
  padding: 0;
  text-align: center;
  border:solid 1px #ffffff;
  }
  .tab .headerTitle{
      color: #4fdaff;
  }
  .tab .list_data{
    margin-top: 10px;
    color:#dddfe6;
  }
  .tab .list_data1 {
    text-align: center;
    margin-top:5px;
  }
  .tab table{
    width: 80%;
    border-collapse: collapse;
    margin: 20px 0px 20px 70px;
  }
  .tab ul li{
    list-style: none;
    padding: 0px;
    height: 20px;
    line-height: 20px;
  }
  .tab ul{
    position: absolute;
    top: 56px;
    left: 14px;
    padding: 0px;
  }
  .tab p{
    color: #b7dbfd;
    text-align: center;
    margin-top: -15px;
    font-size: 12px;
  }
  .tab .remark{
    color: #fdff35;
    font-size: 12px;
    width: 330px;
    margin: 10px auto;
  }
 .tab .el-button{
    padding: 0px;
  }
  .el-popover{
    background: #5294d1;
    color: #ffffff;
    border:none;
    min-width: 109px;
  }
  .el-popper[x-placement^=top] .popper__arrow::after{
    border-top-color: #5294d1;
  }
  .el-popper[x-placement^=top] .popper__arrow{
    border-top-color: #5294d1;
  }
</style>
<script>
  export default {
    data () {
      return {
        title:[],
        tabData:[]
      }
    },
    methods:{
      show:function (e) {
//        console.log(e.currentTarget);
//        let td = document.getElementsByTagName('td');
//        td.style.boxShadow='none';
//        console.log(td);
//        e.currentTarget.style.boxShadow='0px 0px 15px #000';
      }
    },
    mounted() {
      this.$http.get("api/GetTab").then(res=>{
//        console.log(res.data);
        this.tabData = res.data.data;
        // console.log('tabData:',this.tabData)
        this.title=res.data.title;
       console.log('title:',res.data.title);
      })
    }
  }
</script>
