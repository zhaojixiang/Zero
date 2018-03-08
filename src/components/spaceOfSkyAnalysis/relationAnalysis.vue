<!--相关分析-->
<template>
  <div class='RAcontainer'>
    <div class='headerTitle'>
        <span>
            <img :src="icon_right_arrow" alt="right icon">
            相关分析
        </span>
    </div>
    <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
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
            <span class="timeTitle" style="margin-bottom:10px;display:block;font-size:10px">
                时间范围
            </span >
            <el-form-item class="relationTime">
              <div class="block">
                <!-- <span class="demonstration">默认</span> -->
                <el-date-picker
                  v-model="form_data.daterange"
                  type="daterange"
                  size="mini"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>

            </el-form-item>
        </el-form>
    </el-main>
    <el-button @click="do_analysis" type="primary" size='medium'>执行分析</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form_data:{
        isShowStation:true,
        value:'88-108MHz FM 广播',
        daterange: '',
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
  methods:{
      do_analysis() {
        //   console.log(this.form_data)
        this.$emit('do_analysis',this.form_data)
      },
      minus(){
        this.$emit("minus")
      }
  }
};
</script>
<style>
.RAcontainer {
  width: 450px;
  height: 270px;
  border: 1px solid #4fdaff;
  background-color: #fff;
}
.RAcontainer .minus{
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  top: 8px;
  right: 15px;
}
.RAcontainer .headerTitle {
  color: #357095;
  font-size: 14px;
  height:40px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: solid 1px #c6c6c6;
}
.RAcontainer .cover_default1 {
  color: #6a6a6a;
  /* position:relative; */
  margin-left: 32px;
  margin-right: 10px;
}
.RAcontainer .el-main{
    padding: 0;
}
.RAcontainer .timeTitle{
  font-size: 12px;
  color: #6a6a6a;
  padding: 0px;
}
.RAcontainer .el-form-item__label{
    color: #6a6a6a;
}
.RAcontainer .clear_bottom_20{
    margin-bottom: 0;
    padding-bottom: 0;
}
.el-form-item__label{
  text-align: left;
}
.RAcontainer .el-button--medium{
    width: 40%;
    margin-left: 30%;
    /* margin-bottom: 5px; */
    border:1px solid #33ccff;
    background: #64a6d1;
    height: 39px;
    font-size: 18px;
}
.el-header{
  padding: 0px;
  margin-left: 14px;
}
/* .RAcontainer .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 150px;
} */
.RAcontainer .el-input__inner{
    /* background-color: #ebebeb; */
    color: #6a6a6a;
}
.RAcontainer .el-form-item__label{
    font-size: 10px;
}
/* .RAcontainer .el-form--inline .el-form-item__content{
    width:150px;
} */
.el-form--inline .el-form-item{
  margin-bottom: 10px;
}
::-webkit-scrollbar {
  display: none;
}
.RAcontainer .el-form-item__label{
  padding: 0px;
}
.RAcontainer .relationTime{
  margin-bottom: 15px;
  /* display: flex;
  justify-content: space-between; */

}
</style>
