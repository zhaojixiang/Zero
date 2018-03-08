<template>
  <section class="out_wrap">
      <el-tabs type="border-card" @tab-click="handleClick" class="tabBack">
        <el-tab-pane :disabled='true'>
            <span slot="label"><img :src="icon_right_arrow" alt="right icon"> 相关分析</span>
            <forms :name='name' @Analyse='Analyse'></forms>
        </el-tab-pane>
        <el-tab-pane label="选择频段">
            <forms :name="name" @Analyse='Analyse'></forms>
        </el-tab-pane>
        <el-tab-pane label="自定义频段">
            <forms :name='name' @Analyse='Analyse'></forms>
        </el-tab-pane>
        <el-tab-pane label="频谱带宽" v-if="showBand">
            <forms :name='name'></forms>
        </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script type="text/ecmascript-6">
import Forms from 'components/analyse/form'
export default {
  props:{
      showBand:{
          type:Boolean,
          default:false
      },
      options:{
          type:Array
      }
  },
  data() {
    return {
      name:'相关分析'
    };
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    Analyse() {
      this.$emit('Analyse')
    },
    handleClick(tab) {
        // console.log(tab.label)
        this.name = tab.label
    }
  },
  components:{
      Forms
  }
};
</script>

<style>
.out_wrap {
  width: inherit;
}
.out_wrap .tabBack{
    background-color: #666b6d;
    opacity: .8;
}
/* .out_wrap .el-form-item__label {
  color:#bcddf7;
} */
.out_wrap .el-form-item__label {
  font-size: 10px !important;
}
.out_wrap {
  /* height: 200px; */
  overflow: hidden;
  border: 1px solid #4fdaff;
}
.out_wrap,.out_wrap .el-main {
  /* padding: 10px 0 0 0; */
  margin-left: 0;
  margin-right: 0;
}
.out_wrap .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
}
/* .out_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner,.el-input--mini,.el-input--suffix{
  width: 150px;
} */
.out_wrap .btn{
  width: 50%;
  display: block;
  margin: 0 auto;
}
::-webkit-scrollbar {
  display: none;
}
</style>
