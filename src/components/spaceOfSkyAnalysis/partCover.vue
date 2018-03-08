<!--频段占用度 信号覆盖率-->
<template>
    <div class='partCover'>
        <div class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
            {{main_title}}</span>
            <span @click="changeShow" class="right_click_title">{{right_title}}</span>
        </div>

        <el-main class='cover_default right_main_top'>
            <bar-graph :width='width' :height='height' :rateCover='ratePartCover'></bar-graph>
            <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
        </el-main>
    </div>
</template>
<script>
import BarGraph from 'base/barGraph'
export default {
    props:['ratePartCover','rateCover'],
    data() {
        return {
            title_click:false,
            width:'90%',
            height:'210px'
        }
    },
    computed:{
        icon_right_arrow() {
            return this.$const.right_arrow
        },
        right_title() {
            return this.title_click?'频段占用度':'信号覆盖率'
        },
        main_title() {
            return this.title_click?'信号覆盖率':'频段占用度'
        }
    },
    methods:{
        // 点击右侧标题文字触发冒泡
        changeShow() {
            this.title_click = !this.title_click
            this.$emit('change',this.main_title)
        }
    },
    components:{
        BarGraph
    }
}
</script>
<style scoped>
.partCover {
  height: 470px;
  width: 450px;
  border: 1px solid #4fdaff;
  background: #fff;
  /* margin: 0.5em 0 0 0.5em;
  padding: 0.5em 0 0 0; */
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
.partCover .right_main_top {
  /* top: -20px;
  left: 20px;
  position: relative; */
}
.partCover .headerTitle .right_click_title{
    margin-right: 30px;
    color:yellow;
    text-decoration: underline;
    cursor: pointer;
}
</style>
