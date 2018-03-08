<template>
  <div class="filtrate">
    <!--筛选-->
    <div class="top">
      <div class="toptext">
        <span class="title">筛选</span>
        <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
      </div>
      <div class="bottom" style="font-size:10px;margin:0 20px 0 27px">
        <div class="block">
          <span class="demonstration">开始时间 : </span>
          <el-date-picker
            v-model="value1"
            :type="dateType"
            size="mini"
            value-format="yyyy-MM-dd"
            name="startTime"
            placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">结束时间 : </span>
          <el-date-picker
            v-model="value2"
            :type="dateType"
            size="mini"
            value-format="yyyy-MM-dd"
            name="endTime"
            placeholder="结束时间">
          </el-date-picker>
        </div>
      </div>

    </div>
    <!--执行分析-->
    <el-button type="primary" size="mini" @click="submit" class="button">
      执行分析
    </el-button>
  </div>
</template>
<style scoped>
  .filtrate{
    width: 500px;
    border: solid 1px #33ccff;
    background: #FEFFFF;
    font-size: 14px;
  }
  .filtrate .bottom{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    color: #7E7F80;
    font-size: 14px;
    padding: 0 10px;
    /* margin-left: 36px; */
  }
  .filtrate .toptext{
    margin-top: 10px;
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    color: #2774A5;
    font-size: 14px;
  }
  .title {
    text-indent: 23px;
    display: inline-block;
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
    color: #fff;
    text-align: center;
    /* height: 40px; */
    width: 30%;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    border: none;
    background: #66A7D0;
    margin-bottom: 10px;
  }
  .filtrate .el-input--prefix .el-input__inner{
    background: #ECEDEE !important;
    width: 130px;
     border: none;
     color: #919293;
  }
  .filtrate .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 140px;
  }
  .filtrate .el-radio__input.is-checked+.el-radio__label{
    color: #919293;
  }
  .filtrate .el-input--suffix .el-input__inner {
    padding-right: 2px;
  }
  .minus {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .i-minus {
    width: 20px;
    text-align: center;
  }
</style>
<script>
  export default {
    props:{
      'dateType':{
        type:String,
        default:'date',
      },
    },
    data () {
      return {
        value: '',
        radio: '1',
        value1: '',
        value2: ''
      }
    },
    validators:{
      value1:function(value){
        return Validator.value(value).required();
      },
      value2:function(value){
        return Validator.value(value).required();
      },
    },
    methods:{
      minus:function(){
        this.$emit('filtrate-minus');
      },
      submit:function(){
        this.$validate().then(success=>{
          if(!success){
            this.$message.warning("请先选择日期");
            return;
          }
          this.$emit('submit',{
            startTime:this.value1,
            endTime:this.value2,
          })
        });
      },
    }
  }
</script>
