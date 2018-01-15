<!-- 信号多维分析-相关分析 -->                
<template>
  <el-container class='relevant'>
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
                <el-row :gutter="20" style="margin-left:22px;">
                    <el-col :span="12">
                        <el-form-item label="开始频率(MHz) :">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.start_rate">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label=" 结束频率(MHz) :">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.end_rate">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-left:25px;">
                    <el-col :span="12">
                        <el-form-item label="频段步进(KHz) :">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.part_step">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width='76px' label="自动门限 :">
                            <el-checkbox v-model="form_data.auto_door"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="clear_bottom_20" style="margin-left:30px;">
                    <el-col>
                        <el-form-item label="信号门限(dBuv) :">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.signal_door">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>
            <section v-else>
               <el-row :gutter="20" style="margin-left:22px;">
                    <el-col :span="12">
                        <el-form-item label="中心频率(MHz):">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.center_rate">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="信号带宽(KHz):">
                            <el-input size="mini"
                                :maxlength='10'
                                placeholder="请输入内容"
                                v-model="form_data.signal_bandwidth">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>
            <span class="headerTitle timeTitle">
                时间范围
            </span >
            <el-row style="margin-left:22px;">
                <el-col :span="12">
                    <el-form-item label="开始日期 :">
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
                    <el-form-item label="结束日期 :">
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
 .relevant .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
 .relevant .cover_default1 {
  color: #fff;
  position:relative;
}
.relevant .el-main{
    padding: 0;
}
.relevant .timeTitle{
    margin: 5px 28px;
}
.relevant {
  height: 332px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
  /* margin: 0.5em 0 0.5em 0.5em; */
  /* padding: 0.5em 0 0 0; */
}
.relevant .el-form-item__label{
    color:#fff;
    font-size: 10px;
    padding-right: 4px;
}
.relevant .clear_bottom_20{
    margin-bottom: 0;
    padding-bottom: 0;
}
.relevant .el-form-item{
    width: 170px;
    margin-bottom: 10px;
}
.relevant .el-button--medium{
    width: 100%;
    margin: 0;
    border-radius: 0;
    border:1px solid #33ccff;
    background-color: #2b73a2;
    height: 39px;
    font-size: 18px;
    position: absolute;
    bottom: 0;
}
.relevant .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
}
.relevant .el-input__inner{
    background-color: #3c78af;
    color: #fff;
    border: solid 1px #67a3dc;
}
.relevant .el-form--inline .el-form-item__content{
    width:70px;
}
.relevant .el-form--inline .el-form-item{
  /* margin-left: 25px; */
}
::-webkit-scrollbar {
  display: none;
}
</style>
