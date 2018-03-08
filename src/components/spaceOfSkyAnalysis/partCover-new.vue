<!--频段占用度 信号覆盖率-->
<template>
    <div class='partCover'>
        <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="频段占用度" name="first">
            <el-main class='cover_default'>
                <bar-graph :width='width' :height='height' :rateCover='ratePartCover'></bar-graph>
                <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
            </el-main>
          </el-tab-pane>
          <el-tab-pane label="信号覆盖率" name="second">
            <el-main class='cover_default'>
                <bar-graph :width='width' :height='height' :rateCover='ratePartCover'></bar-graph>
                <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
            </el-main>
          </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
import BarGraph from 'base/barGraph'
export default {
    props:['ratePartCover','rateCover'],
    data() {
        return {
            // title_click:false,
            width:'400px',
            height:'210px',
            activeName2: 'first'
        }
    },
    computed:{
        // icon_right_arrow() {
        //     return this.$const.right_arrow
        // },
        // right_title() {
        //     return this.title_click?'频段占用度':'信号覆盖率'
        // },
        // main_title() {
        //     return this.title_click?'信号覆盖率':'频段占用度'
        // }
    },
    methods:{
        // 点击右侧标题文字触发冒泡
        // changeShow() {
        //   this.title_click = !this.title_click
        //   this.$emit('change',this.main_title)
        // },
        handleClick(tab) {
          this.$emit("getBarOptions",tab.label)
          // console.log(tab.label,'0000000');
        },
        minus(){
          this.$emit("minus")
        }
    },
    components:{
        BarGraph
    }
}
</script>
<style>
.partCover {
  height: 470px;
  width: 450px;
  border: 1px solid #4fdaff;
  background: #fff;
  position: relative;
}
.partCover .minus{
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  top: 8px;
  right: 15px;
  color: #2a74a4;
  z-index: 1000;
}
.partCover .headerTitle {
  height: 40px;
  line-height: 40px;
  color: #4fdaff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.partCover .cover_default {
  margin-left: 28px;
  padding: 0px;
  /* padding: 0 1em; */
}
.partCover .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border-radius: 0px;
  border-top: none;
}
/* .partCover .right_main_top { */
  /* top: -20px;
  left: 20px;
  position: relative; */
/* } */
/* .partCover .headerTitle .right_click_title{
    margin-right: 30px;
    color:yellow;
    text-decoration: underline;
    cursor: pointer;
} */
</style>
