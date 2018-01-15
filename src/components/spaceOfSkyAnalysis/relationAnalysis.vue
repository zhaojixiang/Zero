<!--相关分析-->
<template>
  <el-container class='RAcontainer'>
    <el-header height='30' class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span>
    </el-header>
    <el-main class='cover_default1'>
        <el-form :inline="true" :model="form_data">
            <section>
                <el-row :gutter="0">
                    <el-col :style="{padding:'0'}">
                        <el-form-item label-width='70px' label="选择频段 :">
                            <el-select v-model="form_data.value" size="mini" placeholder="请选择">
                                <el-option
                                    v-for="item in form_data.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0" class="clear_bottom_20">
                     <el-col>
                        <el-form-item label-width='100px' label="显示在册台站 :">
                            <el-checkbox v-model="form_data.isShowStation"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </section>
            <span class="headerTitle timeTitle">
                时间范围
            </span >
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item label-width='52px' label="开始日期 :">
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
                    <el-form-item label-width='52px' label="结束日期 :">
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
    <el-button @click="do_analysis" type="primary" size='medium'>执行分析</el-button>
  </el-container>
</template>
<script>
import * as Global_ from 'assets/js/global'

export default {
  data() {
    return {
      icon_right_arrow: Global_.right_arrow,
      form_data:{
        isShowStation:true,
        start_date:'',
        value:'88-108MHz FM 广播',
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
        ],
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
.RAcontainer .headerTitle {
  color: #4fdaff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  height:30px;
  line-height: 30px;
}
.RAcontainer .cover_default1 {
  color: #fff;
  /* position:relative; */
  margin-left: 36px;
}
.RAcontainer .el-main{
    padding: 0;
}
.RAcontainer .timeTitle{
    /* margin: 5px 10px; */
}
.RAcontainer {
  height: 260px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.5em 0 0 0;
}
.RAcontainer .el-form-item__label{
    color:#fff;
}
.RAcontainer .clear_bottom_20{
    margin-bottom: 0;
    padding-bottom: 0;
}
.el-form-item__label{
  text-align: left;
}
.RAcontainer .el-button--medium{
    width: 100%;
    margin: 0;
    border-radius: 0;
    border:1px solid #33ccff;
    /* background-color: #2b73a2; */
    height: 39px;
    font-size: 18px;
    /* position: absolute; */
    /* bottom: 0; */
}
.el-header{
  padding: 0px;
  margin-left: 14px;
}
.RAcontainer .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
}
.RAcontainer .el-input__inner{
    background-color: #3c78af;
    color: #fff;
}
.RAcontainer .el-form-item__label{
    font-size: 10px;
}
.RAcontainer .el-form--inline .el-form-item__content{
    width:160px;
}
.el-form--inline .el-form-item{
  margin-bottom: 10px;
}
::-webkit-scrollbar {
  display: none;
}
.RAcontainer .el-form-item__label{
  padding: 0px;
}
</style>
