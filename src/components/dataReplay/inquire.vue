<template>
  <div class="inquire">
    <!--相关查询-->
    <div class="top">
      <div class="toptext">
        相关查询
      </div>
      <div class="topradio" >
        <el-radio-group v-model="radio" @change="change">
          <el-radio label="1" :style="{color:'#fff',textColor:'#fff'}">选择频段</el-radio>
          <el-radio label="2" :style="{color:'#fff',textColor:'#fff'}">自定义频段</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!--选择频段-->
    <div class="select" v-show="isShow">
      选择频段 :
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="scope" v-show="!isShow">
      <p>开始频率（MHz）: <input type="number"></p><p> 结束频率（MHz）: <input type="number"></p>
    </div>
    <!--时间范围-->
    <div class="time">
      <div>时间范围</div>
      <div class="block">
        <span class="demonstration">开始日期 :</span>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          format="yyyy年MM月dd日"
          placeholder="2017年10月1日">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">结束日期 :</span>
        <el-date-picker
          v-model="value2"
          type="date"
          size="mini"
          format="yyyy年MM月dd日"
          placeholder="2017年12月25日">
        </el-date-picker>
      </div>
    </div>
    <!--执行分析-->
    <button class="button">
      执行分析
    </button>
  </div>
</template>
<style>
  .inquire{
    /*width: 500px;*/
  }
  .inquire .top{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }
  .inquire .toptext{
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }
  .inquire .topradio{
    margin-right: 12px;
  }
  .inquire .topradio .is-checked{
    color: #000;
  }
  .inquire .select{
    color: #a7c9e9;
    font-size: 12px;
    margin-left: 36px;
    margin-bottom: 20px;
  }
  .inquire select{
    background-color: #3c78af;
    width: 200px;
    height: 30px;
    border: none;
    color: #ffffff;
    font-size: 12px;
  }
  .inquire .scope {
    height: 30px;
    color: #b7dbfd;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    margin-left: 36px;
    margin-bottom: 20px;
  }
  .inquire .scope input{
    height: 28px;
    line-height: 28px;
    border: none;
    background-color: #3c78af;
    width: 80px;
    border-radius: 4px;
    color: #ffffff;
    text-indent: 10px;
  }
  .inquire .scope p:nth-of-type(2){
    margin-left: 10px;
  }
  .inquire .time{
    color: #a7c9e9;
    font-size: 12px;
    margin-left: 36px;
    margin-bottom: 15px;
  }
  .inquire .time div{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .inquire .time div:nth-of-type(1){
    color: #56e5ff;
  }
  .inquire .time input{
    width: 140px;
    background: #3c78af;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    border: none;
  }
  .inquire .button{
    font-size: 16px;
    color: #a7c9e9;
    text-align: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-top: solid 1px #3388ff;
    border-bottom: none;
    border-left: none;
    border-right: none;
    background: #3c78af;
  }
  .inquire .select .el-input__inner{
    background: #3c78af;
    border: none;
    width: 200px;
    height: 30px;
    color: #ffffff;
    font-size: 12px;
  }
  .time .el-input--prefix .el-input__inner{
    background: #3c78af !important;
    width: 150px;
  }
  .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 158px;
  }
  .time .block{
    float: left;
    margin-bottom: 20px;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color: #ffffff;
  }
  .el-radio__inner{
    background: #225c92;
  }
  .el-radio__input.is-checked .el-radio__inner{
    background: #225c92;
  }


</style>
<script>
  export default {
    data () {
      return {
        isShow: true,
//        选择频段
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        radio: '1',
        value1: '',
        value2: ''
      }
    },
    methods:{
      change:function () {
        this.isShow=!this.isShow;
      }
    }
  }
</script>
