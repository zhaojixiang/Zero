<template>
  <section class="out_wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="#fefefe;font-size:10px;">
        <el-tab-pane :disabled='true' name="1">
            <span slot="label"><img :src="icon_right_arrow" alt="right icon"> 相关分析</span>
            <!-- <forms :name='name' @Analyse='Analyse'></forms> -->
            </el-tab-pane>
        <el-tab-pane label="选择频段" name="2">
            <forms :name="name" @Analyse='Analyse' :options='options'></forms>
        </el-tab-pane>
        <el-tab-pane label="自定义频段" name="3">
            <forms :name='name' @Analyse='Analyse'></forms>
        </el-tab-pane>
        <el-tab-pane label="频谱带宽" v-if="showBand" name="4">
            <forms :name='name'></forms>
        </el-tab-pane>
        <el-tab-pane label="单频" name="5">
            <forms :name='name' :singleData='singleData' @submit='singleSub'></forms>
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
      singleData:{
        type:Object
      }
  },
  data() {
    return {
      name:'选择频段',
      activeName:'2'
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
    // 单频-提交 submit
    singleSub(param) {
      this.$emit('singleSub',param);
    },
    handleClick(tab) {
        // console.log(tab.label)
        this.$emit('formsTabChange',tab);
        this.name = tab.label
    }
  },
  components:{
      Forms
  }
};
</script>

<style lang='less'>
.out_wrap{
  border: solid 1px #33ccff;
	.el-form-item__label {
	/* color:#bcddf7; */
		font-size: 10px !important;
	}
  ::-webkit-scrollbar {
    display: none;
  }
}
.el-tabs--card>.el-tabs__header .el-tabs__nav{
  border-radius: 0px !important;
}

</style>
