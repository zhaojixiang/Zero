<!-- 相关分析 -->
<template>
  <div class='auxiliary'>
    <div class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span>
        <el-radio-group style="line-height:50px;height:40px;" v-model="radio">
            <el-radio :label="1" style='color:#fff;'>选择频段</el-radio>
            <el-radio :label="2" style='color:#fff;'>自定义频段</el-radio>
        </el-radio-group>
    </div>
    <el-main class='cover_default2' :model='form_data'>
        <el-form :inline="true">
            <section v-if="radio==1" style="margin-left:32px;" class="inner_input">
                <el-form-item label="选择频段 :">
                    <el-select v-model="value" size="mini" placeholder="请选择">
                        <el-option
                            v-for="item in form_data.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </section>
            <section v-else style="margin-left:32px;"  class="inner_input rightInput">
               <el-row :gutter="20" style="margin: 0;">
                    <el-col :span="12" style="padding:0;">
                        <el-form-item label="开始频率">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.start_rate">MHz
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="padding:0;">
                        <el-form-item label="结束频率">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.end_rate">
                                MHz
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>
          <el-button @click="do_analysis" type="primary" size='medium'>执行分析</el-button>
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
      radio: 1,
      value: [],
      form_data:{
        start_rate: "88",
        end_rate: "108",
        value:'',
        options:[
          {
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
          }
        ]
      }
    };
  },
  methods: {
    do_analysis() {
      // console.log("Do analysis right now!");
      this.$emit('doAnalysis',this.form_data)
    }
  }
};
</script>
<style>
.auxiliary {
  height: 160px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  /* margin: 0.5em 0 0.5em 0.5em; */
}
.auxiliary .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
}
.auxiliary .cover_default2 {
  color: #fff;
}
.auxiliary .cover_default2 .inner_input{
    margin: 10px 0;
}
.auxiliary .el-main {
  padding: 0;
}
.auxiliary .timeTitle {
  margin: 5px 10px;
}
.auxiliary .cover_default2 .el-form-item__label {
  font-size: 10px;
  color: #b7dbfd;
}
.auxiliary .cover_default2 .el-button--medium {
  width: 100%;
  margin: 0;
  border-radius: 0;
  border-color: #33ccff transparent transparent transparent;
  background-color: #2b73a2;
  height: 39px;
  font-size: 18px;
}
.auxiliary .cover_default2 .el-input__inner {
  background-color: #3c78af;
  color: #fff;
  border-color: #67a3dc;
  /* width: 95px; */
}
.auxiliary .el-radio__input.is-checked+.el-radio__label{
  color: #fff;
}
.auxiliary .el-popper[x-placement^=bottom] .popper__arrow{
  left: 68% !important;
}

 /* .auxiliary .cover_default2 .el-input--prefix .el-input__inner{
    background: #3c78af !important;
    width: 95px;
  } */
  .auxiliary .cover_default2 .rightInput .el-input__inner,.auxiliary .rightInput .el-form--inline .el-form-item__content{
    width: 95px;
  }

  /* .auxiliary .rightInput .el-form--inline .el-form-item__content,.auxiliary .rightInput .el-input-number--mini{
    width: 95px;
  } */
</style>
