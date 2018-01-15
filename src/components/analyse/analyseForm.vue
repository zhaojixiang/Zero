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
                  v-for="item in form_data.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
                      format="yyyy年MM月dd日">
                  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <el-button class="btn" @click="do_analysis" type="primary" size='medium'>执行分析</el-button>      
    </el-container>
  </section>
</template>

<script type="text/ecmascript-6">
import * as Global_ from "assets/js/global";

export default {
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
      form_data: {
        start_date: "",
        end_date: "",
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: ""
      }
    };
  },
  methods:{
    do_analysis() {
      this.$message({
        type:'warning',
        message:'暂时不提供分析功能'
      })
    }
  },
  components: {}
};
</script>

<style>
.out_wrap {
  width: inherit;
}
.out_wrap .el-form-item__label {
  color:#bcddf7;
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
.out_wrap .container .el-main {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
.out_wrap .container .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
}
.out_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 150px;
}
.out_wrap .container .btn{
  width: 100%;
  border-radius: 0;

}
::-webkit-scrollbar {
  display: none;
}
</style>
