<template>
  <div class="filtrate">
    <!--筛选-->
    <div class="top">
      <div class="toptext">
        筛选
      </div>
      <div class="bottom">
        <div class="block">
          <span class="demonstration">开始时间 : </span>
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            placeholder="2017年10月1日">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">结束时间 : </span>
          <el-date-picker
            v-model="value2"
            type="date"
            size="mini"
            placeholder="2017年12月25日">
          </el-date-picker>
        </div>
      </div>

    </div>
    <!--执行分析-->
    <button class="button">
      执行分析
    </button>
  </div>
</template>
<style>
  .filtrate{
    width: 500px;
    border: solid 1px #33ccff;
    background: rgba(0,0,0,0.88);
  }
  .filtrate .bottom{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    color: #a7c9e9;
    font-size: 14px;
    padding: 0 10px;
    /* margin-left: 36px; */
  }
  .filtrate .toptext{
    margin-top: 10px;
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }
  .filtrate  .time div{
    height: 30px;
    line-height: 30px;
  }
  .filtrate .time div:nth-of-type(1){
    color: #56e5ff;
  }
  .filtrate .time input{
    width: 130px;
    background: #3c78af;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    border: none;
  }
  .filtrate .button{
    font-size: 16px;
    color: #a7c9e9;
    text-align: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-top: solid 1px #33ccff;
    border-bottom: none;
    border-left: none;
    border-right: none;
    background: #3c78af;
  }
  .filtrate .el-input--prefix .el-input__inner{
    background: #3c78af !important;
    width: 150px;
     border: none;
     color: #ffffff;
  }
  .filtrate .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 164px;
  }
  .filtrate .el-radio__input.is-checked+.el-radio__label{
    color: #ffffff;
  }
</style>
<script>
  export default {
    data () {
      return {
        value: '',
        radio: '1',
        value1: '',
        value2: ''
      }
    },
    methods:{
    }
  }
</script>
