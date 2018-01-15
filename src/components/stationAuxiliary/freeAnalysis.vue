<!--自由仿真分析-->
<template>
  <div class='freeAnalysis'>
    <div class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            自由仿真分析
        </span>
    </div>
    <el-main class='cover_default1'>
        <el-form :inline="true" v-model="formData">
          <section style="margin: 5px 10px 10px 32px;">
            <el-row>
                <el-col :span="12">
                      <span class="lable">频率(MHz):</span>
                        <el-input size="mini"
                            :maxlength='10'
                            placeholder="请输入频率"
                            v-model="formData.rate">
                        </el-input>
                </el-col>
                <el-col :span="12" class="column_right">
                      <span class="lable">功率(W):</span>
                      <el-input-number size="mini" v-model="formData.power"></el-input-number>
                </el-col>
            </el-row>
            <el-row style="margin: 20px 0;">
                <el-col :span="12">
                      <span class="lable">灵敏度(dBm):</span>
                      <el-input-number size="mini" v-model="formData.sensitivity"></el-input-number>
                </el-col>
                <el-col :span="12" class="column_right">
                      <span class="lable">发射增益(dB):</span>
                      <el-input-number size="mini" v-model="formData.out_increass"></el-input-number>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                      <span class="lable">接收增益(dB):</span>
                            <el-input-number size="mini" v-model="formData.in_increass"></el-input-number>
                </el-col>
                <el-col :span="12" class="column_right">
                      <span class="lable">发射高度(米):</span>
                      <el-input-number size="mini" v-model="formData.out_height"></el-input-number>
                </el-col>
            </el-row>
            <el-row style="margin:20px 0 30px 0;">
                <el-col :span="12">
                      <span class="lable">接收高度(米):</span>
                      <el-input-number size="mini" v-model="formData.in_height"></el-input-number>
                </el-col>
            </el-row>
          </section>
          <el-button @click="starts" type="primary" size='medium'>开始仿真</el-button>
        </el-form>
    </el-main>
  </div>
</template>
<script>
import * as Global_ from "assets/js/global";

export default {
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
      formData:{
          rate:'',
          power:'',
          sensitivity:'',
          out_increass:'',
          in_increass:'',
          out_height:'',
          in_height:''
      }
    };
  },
  methods: {
    starts() {
    //   console.log("Do analysis right now!",this.formData);
        this.$emit('starts',this.formData)
    }
  }
};
</script>
<style>
.freeAnalysis {
  height: 286px;
  overflow: hidden;
  border: 1px solid #4fdaff;
    background: rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}
.freeAnalysis .headerTitle {
  color: #4fdaff;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 14px;
}
.freeAnalysis .cover_default1 {
  color: #fff;
  position: relative;
}
.freeAnalysis .cover_default1 .lable{
  display: inline-block;
  min-width: 70px;
  color: #b7dbfd;
}
.freeAnalysis .el-main {
  padding: 0;
}
.freeAnalysis .timeTitle {
  margin: 5px 10px;
}

.freeAnalysis .column_right{
    text-align: right;
}
.freeAnalysis .cover_default1 .el-form-item {
  margin-bottom: 0;
}
.freeAnalysis .cover_default1 .el-form-item__label {
  color: #fff;
}
.freeAnalysis .cover_default1 .el-button--medium {
  width: 100%;
  margin: 0;
  border-radius: 0;
  border-color: #33ccff transparent transparent transparent;
  background-color: #2b73a2;
  height: 39px;
  font-size: 18px;
  /* position: absolute; */
  /* bottom: 0; */
}
.freeAnalysis .cover_default1 .el-input__inner {
  background-color: #3c78af;
  color: #fff;
  width: 95px;
  border-color: #67a3dc;
}
.freeAnalysis .el-input{
  width: 95px;
}
.freeAnalysis .cover_default1 .el-form-item__label {
  font-size: 10px;
}

  .freeAnalysis .cover_default1 .el-input-number--mini .el-input-number__decrease,.freeAnalysis .el-input-number--mini .el-input-number__increase{
      background-color: #3c78af;
  }
  .freeAnalysis .cover_default1 .el-input-number--mini{
    width: 95px;
  }
  .freeAnalysis .cover_default1 .el-input-number__decrease,.el-input-number__increase{
      border:none;
      color:#fff;
  }
  ::-webkit-scrollbar {
  display: none;
}
</style>
