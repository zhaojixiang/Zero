<!--频段占用度-->
<template>
  <el-container class='partRightContainer'>
        <el-header class='headerTitle' style="height:30px;line-height:30px;">
            <span>
                <img :src="icon_right_arrow" alt="right icon">
           频段占用度</span>
        </el-header>
        <el-main class='cover_default'>
            <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
        </el-main>
    </el-container>
</template>
<script>
import BarGraph from 'base/barGraph'
import normalizeBarOption from 'assets/js/chartOptions/barOption'
import * as Global_ from 'assets/js/global'
export default {
  data() {
      return {
          icon_right_arrow:Global_.right_arrow,
          height:'280px',
          width:'100%'
      }
  },
  props:{
     rateCover:{
         type:Object
     }
  },
  components:{
      BarGraph
  }
}
</script>
<style>
.partRightContainer .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.partRightContainer {
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
}
.partRightContainer .cover_default {
  padding: 0 1em;
}
/* .partRightContainer .right_main_top {
  top: -20px;
  position: relative;
} */
</style>
