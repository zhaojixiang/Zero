<!--频段占用度-->
<template>
  <div class='partRightContainer'>
        <div class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
           频段占用度</span>
        </div>
        <div class='cover_default'>
            <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
        </div>
    </div>
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
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 10px;
}
.partRightContainer {
  width: 100%;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
}
.partRightContainer .cover_default {
  margin-left: 28px;
}
</style>
