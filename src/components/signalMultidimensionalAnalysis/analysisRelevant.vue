<!-- 信号多维分析-相关分析 -->
<template>
  <el-container class='analysisRelevant'>
    <el-header height='30' class='headerTitle' style="padding: 0 10px;">
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析</span>
        <span >
            <el-radio v-model="radio" label="1" style='color:#fff;'>频段</el-radio>
            <el-radio v-model="radio" label="2" style='color:#fff;'>频率</el-radio>
        </span>
    </el-header>
    <el-main class='cover_default1'>
        <el-form :inline="true" :model="form_data">
            <section v-if="radio==1">
                <div class="topInput">
                    <div>
                        <span>开始频率(MHz) :</span>
                        <el-input size="mini"
                            :maxlength='10'
                            placeholder="请输入内容"
                            v-model="form_data.start_rate">
                        </el-input>
                    </div>
                    <div style="margin-right:5px;">
                      <span>结束频率(MHz) :</span>
                        <el-input size="mini"
                            :maxlength='10'
                            placeholder="请输入内容"
                            v-model="form_data.end_rate">
                        </el-input>
                    </div>
                </div>
                <div class="autoInput">
                    <div>
                          <span>频段步进(KHz) :</span>
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.part_step">
                            </el-input>
                    </div>
                    <div style="margin-right:75px">
                          <span>自动门限 :</span>
                            <el-checkbox v-model="form_data.auto_door"></el-checkbox>
                    </div>
                </div>
                <div class="dbuvInput">
                    <div>
                          <span>信号门限(dBuv) :</span>
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.signal_door">
                            </el-input>
                    </div>
                </div>
            </section>
            <section v-else>
               <div class="centerInput">
                    <div>
                          <span>中心频率(MHz):</span>
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.center_rate">
                            </el-input>
                    </div>
                    <div>
                          <span>信号带宽(KHz):</span>
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.signal_bandwidth">
                            </el-input>
                    </div>
                </div>
            </section>
            <span class="headerTitle timeTitle">
                时间范围
            </span >
            <div class="time">
                <div>
                      <span>开始日期 :</span>
                        <el-date-picker
                            v-model="form_data.start_date"
                            :clearable='false'
                            type="date"
                            size="mini"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日">
                        </el-date-picker>
                </div>
                <div style="">
                      <span>结束日期 :</span>
                        <el-date-picker
                            v-model="form_data.end_date"
                            :clearable='false'
                            type="date"
                            size="mini"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日">
                        </el-date-picker>
                </div>
            </div>
            <el-button @click="do_analysis" type="primary" size='medium'>执行分析</el-button>
        </el-form>
    </el-main>
  </el-container>
</template>
<script>
import * as Global_ from 'assets/js/global'

export default {
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
      radio: "1",
      form_data:{
        start_rate:'88',
        end_rate:'108',
        part_step:'25',
        signal_door:'3.0',
        center_rate:'88',
        signal_bandwidth:'200',
        auto_door:true,
        start_date:'',
        end_date:''
      }
    };
  },
  methods:{
      do_analysis() {
        //   console.log(this.form_data)
        this.$emit('do_analysis',this.form_data)
      }
  }
};
</script>
<style>
 .analysisRelevant .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
/* 开始频率  结束频率 */
 .analysisRelevant .topInput,.analysisRelevant .dbuvInput,.analysisRelevant .autoInput{
  margin-left:34px;
  justify-content:space-between;
  display:flex;
  height: 40px;
  line-height: 40px;
}
.analysisRelevant .topInput span,.analysisRelevant .dbuvInput span,.analysisRelevant .autoInput div:nth-of-type(1) span{
  display: inline-block;
  min-width: 77px;
  text-align: left;
}

/* 时间 */
.analysisRelevant .time,.analysisRelevant .centerInput{
  margin-left:32px;
  justify-content:space-between;
  display:flex;
  margin-right: 5px;
}
/* 中心频率 */
.analysisRelevant .centerInput{
  height:40px;
  line-height: 40px;
}
 .analysisRelevant .cover_default1 {
  color: #fff;
  position:relative;
}
.analysisRelevant .el-main{
    padding: 0;
}
.analysisRelevant .timeTitle{
    margin: 5px 33px;
}
.analysisRelevant {
  height: 332px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
}
.analysisRelevant .el-form-item__label{
    color:#fff;
    font-size: 10px;
    padding-right: 4px;
}
.analysisRelevant .el-form-item{
    width: 170px;
    margin-bottom: 10px;
}
.analysisRelevant .el-button--medium{
    width: 100%;
    margin: 0;
    border-radius: 0;
    /* border:1px solid #33ccff; */
    background-color: #2b73a2;
    height: 39px;
    font-size: 18px;
    position: absolute;
    bottom: 0;
}
.analysisRelevant .el-button{
  border-color: #33ccff transparent transparent transparent;
}
.analysisRelevant .topInput .el-input,.analysisRelevant .autoInput .el-input,.analysisRelevant .dbuvInput .el-input{
  width:80px;
}
.analysisRelevant .time .el-input{
  width: 72%;
}
.analysisRelevant .centerInput .el-input{
  width: 80px;
}
.analysisRelevant .el-input__inner{
    background-color: #3c78af;
    color: #fff;
    border: solid 1px #67a3dc;
}
.analysisRelevant .el-form--inline .el-form-item__content{
    width:70px;
}
.analysisRelevant .el-form--inline .el-form-item{
  /* margin-left: 25px; */
}
::-webkit-scrollbar {
  display: none;
}
.analysisRelevant .topInput, .analysisRelevant .dbuvInput, .analysisRelevant .autoInput,.analysisRelevant .cover_default1,.analysisRelevant .topInput span, .analysisRelevant .dbuvInput span, .analysisRelevant .autoInput div:nth-of-type(1) span{
  color: #b7dbfd;
}
{
    color: #b7dbfd;
}
</style>
