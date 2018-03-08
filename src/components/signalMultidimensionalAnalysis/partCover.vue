<!--频段占用度-->
<template>
<div class='partRightContainer'>
  <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
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
export default {
  data() {
    return {
      height: '250px',
      width: '700px'
    }
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  props: {
    rateCover: {
      type: Object
    }
  },
  components: {
    BarGraph
  },
  methods:{
    minus(){
      this.$emit("minus")
    }
  }
}
</script>
<style>
.partRightContainer .headerTitle {
  color: #30729d;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 10px;
  position: relative;
  border-bottom: solid 1px #c6c6c6;
}
.partRightContainer .minus {
  position: absolute;
  right: 16px;
  cursor: pointer;
  color: #2774A5;
  font-size: 16px;
  top: 11px;
  z-index: 1000;
}
.partRightContainer {
  width: 100%;
  border: 1px solid #4fdaff;
  background: #fff;
}

.partRightContainer .cover_default {
  margin-left: 28px;
}
</style>
