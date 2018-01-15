<!-- 相关分析 -->
<template>
  <el-container class='container_'>
    <el-header height='30' class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span>
        <el-radio-group v-model="radio">
            <el-radio :label="1" style='color:#fff;'>选择频段</el-radio>
            <el-radio :label="2" style='color:#fff;'>自定义频段</el-radio>
        </el-radio-group>
    </el-header>
    <el-main class='cover_default2' :model='form_data'>
        <el-form :inline="true">
            <section v-if="radio==1" style="margin-left:20px;" class="inner_input">
                <el-form-item label="选择频段">
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
            <section v-else style="margin-left:20px;"  class="inner_input">
               <el-row :gutter="20">
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
  </el-container>
</template>
<script>
import * as Global_ from "assets/js/global";
export default {
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
      radio: 1,
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
.headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.cover_default2 {
  color: #fff;
  position: relative;
}
.cover_default2 .inner_input{
    margin: 20px 0;
}
.el-main {
  padding: 0;
}
.timeTitle {
  margin: 5px 10px;
}
.container_ {
  height: 160px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.5em 0 0 0;
}
.cover_default2 .el-form-item__label {
  font-size: 10px;
  color: #fff;
}
.cover_default2 .el-button--medium {
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
.cover_default2 .el-input__inner {
  background-color: #3c78af;
  color: #fff;
}

.cover_default2 .el-form--inline .el-form-item__content {
  width: 70px;
}
 .cover_default2 .el-input--prefix .el-input__inner{
    background: #3c78af !important;
    width: 95px;
  }
  .cover_default2 .el-form--inline .el-form-item__content{
      width: 95px;
  }
  .cover_default1 .el-form--inline .el-form-item__content, .el-input-number--mini{
    width: 95px;
  }
  .el-form--inline .el-form-item__content, .el-input-number--mini{
    width: 95px;
  }
</style>
