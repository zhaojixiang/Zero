<template>
  <section class="out_wrap">
    <el-container class="container">
      <el-header height='30' class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span>
      </el-header>
      <el-main>
        <el-form :inline="true" :model="form_data" style="padding:10px;">
          <el-row :gutter="20">
            <el-form-item label-width='65px' label="业务频段:" style="margin-left:10px;">
              <el-select v-model="form_data.value" size='mini' placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col class="headerTitle">时间范围</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label-width='65px' label="开始日期:">
                    <el-date-picker
                        v-model="form_data.start_date"
                        :clearable='false'
                        type="date"
                        size="mini"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        format="yyyy年MM月dd日">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12" style="paddingLeft:0px;">
              <el-form-item label-width='65px' label="结束日期:">
                  <el-date-picker
                      v-model="form_data.end_date"
                      :clearable='false'
                      type="date"
                      size="mini"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      format="yyyy年MM月dd日">
                  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <el-button class="btn" @click="doAnalysis" type="primary" size='medium'>执行分析</el-button>
    </el-container>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  props:["options"],
  data() {
    return {
      form_data: {
        start_date: new Date(new Date().getTime()-3.1536e10).Format('yyyy-MM-dd'),
        end_date: new Date().Format('yyyy-MM-dd'),
        value: "88MHz-108MHz 广播"
      }
    };
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    doAnalysis() {
      sessionStorage.setItem('business',JSON.stringify(this.form_data))
      this.$emit('Analyse')
    }
  }
};
</script>

<style scoped>
.out_wrap {
  width: inherit;
}
.out_wrap .el-form-item__label {
  color:#818181!important;
}
.out_wrap .el-form-item__label {
  font-size: 10px !important;
}
.out_wrap .container {
  /* height: 200px; */
  overflow: hidden;
  border: 1px solid #4fdaff;
  padding: 0.5em 0 0 0;
}
.out_wrap .container,.out_wrap .el-main {
  padding: 10px 0 0 0;
  margin-left: 0;
  margin-right: 0;
}
.out_wrap .container .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
}
.out_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner,.el-input--mini,.el-input--suffix{
  /*width: 150px;*/
}
.out_wrap .container .btn{
  width: 100%;
  border-radius: 0;

}
::-webkit-scrollbar {
  display: none;
}
</style>
