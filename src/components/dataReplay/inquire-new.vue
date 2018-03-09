<template>
  <section class="out_wrap">
      <slot name = 'zjx'></slot>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="tabBack">
       <el-tab-pane :disabled='true' name="first">
         <span slot="label"><img :src="icon_right_arrow" alt="right icon"> 相关分析</span>
       </el-tab-pane>
       <el-tab-pane label="频段" name="second">
         <forms :business="business" :name="name" @submit='submit'></forms>
       </el-tab-pane>
       <el-tab-pane label="单频" name="third">
         <forms :name="name" @submit='submit'></forms>
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
      },
      business:{
        type:Array
      }
  },
  data() {
    return {
      activeName2: 'second',
      name:'频段'
    };
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    submit(data) {
      if(this.name == '频段') {
        data.type = 1;
      } else {
        //type为2 表示单频
        data.type = 2;
      }
      this.$emit('submit',data)
    },
    handleClick(tab) {
        // console.log(tab.label,'00000000000')
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
  color: #686868;
}
.out_wrap .el-tabs__item.is-disabled{
  color: #1e74a8;
}
.out_wrap .tabBack{
    /* background-color: #fff; */
}
/* .out_wrap .el-form-item__label { */
  /* color:#bcddf7; */
/* } */
.el-radio__label{
  color: #686868;
}
.el-radio__input.is-checked+.el-radio__label{
  color: #686868;
}
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
.out_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner,.el-input--mini,.el-input--suffix{
  /*width: 150px;*/
}
.out_wrap .btn{
  width: 50%;
  display: block;
  margin: 0 auto;
}
.out_wrap .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border-radius: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>
