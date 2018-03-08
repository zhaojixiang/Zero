<!-- 相关分析 -->
<template>
  <div class='auxiliary'>
    <div class='headerTitle'>
        <!-- <span style="margin-right: 10px">
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span> -->
      <el-tabs v-model="radio" type="card" @tab-click="handleClick" style="height: 40px;">
        <el-tab-pane name="1" :disabled="true">
          <span slot="label"><img :src="icon_right_arrow" alt="right icon"> 相关分析</span>
        </el-tab-pane>
        <el-tab-pane label="选择频段" name="2"></el-tab-pane>
        <el-tab-pane label="自定义频段" name="3"></el-tab-pane>
      </el-tabs>
      <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
    </div>
    <el-main class='cover_default2' :model='form_data'>
        <el-form :inline="true">
            <section v-if="radio==2" style="margin-left:32px;" class="inner_input">
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
        </el-form>
        <div class="relevantBtn">
          <el-button @click="doAnalysis" type="primary" size='mini'>执行分析</el-button>
        </div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '2',
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
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    doAnalysis() {
      // console.log("Do analysis right now!");
      this.$emit('doAnalysis',this.form_data)
    },
    handleClick(item){
    },
    minus(){
      this.$emit('minus')
    },
  }
};
</script>
<style>
.auxiliary {
  height: 135px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: #FEFEFE;
  position: relative;
}
.auxiliary .headerTitle {
  color: #4fdaff;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.minus{
  position: absolute;
  top: 0px;
  right: 14px;
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
  color: #88898A;
}
.auxiliary .cover_default2 .el-button--mini {
  width: 30%;
  background-color: #64a6d1;
}
.auxiliary .cover_default2 .el-input__inner {
  color: #88898A;
}
.auxiliary .el-radio__input.is-checked+.el-radio__label{
  color: #88898A;
}
.auxiliary .el-popper[x-placement^=bottom] .popper__arrow{
  left: 68% !important;
}
.el-form-item{
  margin: 0px;
}
  .auxiliary .cover_default2 .rightInput .el-input__inner,.auxiliary .rightInput .el-form--inline .el-form-item__content{
    width: 95px;
  }
.el-tabs__item.is-disabled{
  color: #25769e;
}
.el-tabs__item{
  color: #686868;
}
.relevantBtn{
  width: 100%;
  text-align: center;
}
</style>
