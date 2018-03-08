<!--自由仿真分析-->
<template>
  <div class='freeAnalysis'>
    <div class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            自由仿真分析
        </span>
      <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>

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
export default {
  data() {
    return {
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
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    starts() {
    //   console.log("Do analysis right now!",this.formData);
        this.$emit('starts',this.formData)
    },
    minus(){
      this.$emit('minus');
    }
  }
};
</script>
<style>
.freeAnalysis {
  height: 286px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: #FEFEFE;
}
.freeAnalysis .headerTitle {
  color: #4fdaff;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 14px;
  border-bottom: solid 1px #dfe4ed;

}
.freeAnalysis .cover_default1 {
  color: #88898A;
  position: relative;
}
.freeAnalysis .cover_default1 .lable{
  display: inline-block;
  min-width: 70px;
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
  color: #88898A;
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
  background-color: #EBECED;
  color: #88898A;
  width: 95px;
}
.freeAnalysis .el-input{
  width: 95px;
  background-color: #EBECED;
}
.freeAnalysis .cover_default1 .el-form-item__label {
  font-size: 10px;
}

  .freeAnalysis .cover_default1 .el-input-number--mini .el-input-number__decrease,.freeAnalysis .el-input-number--mini .el-input-number__increase{
    background-color: #EBECED;
  }
  .freeAnalysis .cover_default1 .el-input-number--mini{
    width: 95px;
  }
  .freeAnalysis .cover_default1 .el-input-number__decrease,.el-input-number__increase{
      border:none;
      color:#88898A;
  }
  ::-webkit-scrollbar {
  display: none;
}
</style>
