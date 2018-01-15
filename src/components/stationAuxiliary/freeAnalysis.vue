<!--自由仿真分析-->
<template>
  <el-container class='container'>
    <el-header height='30' class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            自由仿真分析
        </span>
    </el-header>
    <el-main class='cover_default1'>
        <el-form :inline="true" v-model="formData">
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width='90px' label="频率(MHz):">
                        <el-input size="mini"
                            :maxlength='10'
                            placeholder="请输入频率"
                            v-model="formData.rate">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="column_right">
                    <el-form-item label="功率(W):">
                            <el-input-number size="mini" v-model="formData.power"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width='90px' label="灵敏度(dBm):">
                            <el-input-number size="mini" v-model="formData.sensitivity"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="column_right">
                    <el-form-item label="发射增益(dB):">
                            <el-input-number size="mini" v-model="formData.out_increass"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width='90px' label="接收增益(dB):">
                            <el-input-number size="mini" v-model="formData.in_increass"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="column_right">
                    <el-form-item label="发射高度(米):">
                            <el-input-number size="mini" v-model="formData.out_height"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width='90px' label="接收高度(米):">
                            <el-input-number size="mini" v-model="formData.in_height"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button @click="starts" type="primary" size='medium'>开始仿真</el-button>
        </el-form>
    </el-main>
  </el-container>
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
.headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
}
.cover_default1 {
  color: #fff;
  position: relative;
}
.el-main {
  padding: 0;
}
.timeTitle {
  margin: 5px 10px;
}
.container {
  height: 230px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.5em 0 0 0;
}
.column_right{
    text-align: right;
}
.cover_default1 .el-form-item {
  margin-bottom: 0;
}
.cover_default1 .el-form-item__label {
  color: #fff;
}
.cover_default1 .el-button--medium {
  width: 100%;
  margin: 0;
  border-radius: 0;
  border: 1px solid #33ccff;
  /* background-color: #2b73a2; */
  height: 39px;
  font-size: 18px;
  position: absolute;
  bottom: 0;
}
.cover_default1 .el-input__inner {
  background-color: #3c78af;
  color: #fff;
}
.cover_default1 .el-form-item__label {
  font-size: 10px;
}
.cover_default1 .el-form--inline .el-form-item__content {
  width: 90px;
}
 .cover_default1 .el-input--prefix .el-input__inner{
    background: #3c78af !important;
    width: 120px;
  }
  .cover_default1 .el-form--inline .el-form-item__content,.el-input-number--mini{
      width: 120px;
  }
  .cover_default1 .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
      background-color: #3c78af;
  }
  .cover_default1 .el-input-number__decrease,.el-input-number__increase{
      border:none;
      color:#fff;
  }
  ::-webkit-scrollbar {
  display: none;
}
</style>

