<!-- 总览 -->
<template>
  <section class="over_container">
    <div class="over_title">
      <img :src="icon_right_arrow" alt="right icon">
      <slot name='overview_title'></slot>
    </div>
    <div class="main_container">
      <section v-loading="PieLoading" :style="{width:'380px',height}">
        <ratio-pie :option='ratioPieOption' :setting="{width:'380px',height}" v-if="Object.keys(ratioPieOption).length"></ratio-pie>
        <section v-if='pieMoveEmpty' class="box_container">
          <i class="iconfont icon-box-empty icon_box_empty"></i>
          <p style="color:#ccc;">网格化频段占用度覆盖率,暂时没有数据～</p>
        </section>
      </section>
      <section v-loading="BarLoading" :style="{width:BarLoading?'380px':width,height}">
        <bar-graph ref='bar' :currentFreq='currentFreq' :valueData='valueData' :keyData='keyData' :width='width' :height='height' :rateCover='rateCover' v-if="Object.keys(rateCover).length"></bar-graph>
        <section v-if='barMoveEmpty' class="box_container">
          <i class="iconfont icon-box-empty icon_box_empty"></i>
          <p style="color:#ccc;">信号覆盖率,暂时没有数据～</p>
        </section>
      </section>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import RatioPie from "components/stationManage/ratioPie.vue"
import BarGraph from "base/barVariable"
export default {
  props: ["ratioPieOption", "rateCover","barMoveEmpty","pieMoveEmpty" , "valueData", "keyData", "PieLoading", "BarLoading","currentFreq"],
  data() {
    return {
      width: "510px",
      height: "280px",
      isClickDown: false
    };
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  components: {
    RatioPie,
    BarGraph
  }
};
</script>

<style scoped lang='less'>
.over_container {
	position: relative;
    width: 100%;
    min-height: 260px;
    border: 1px solid #4fdaff;
    padding: 10px;
    box-sizing: border-box;
	overflow: hidden;
    .over_title {
		color: #4fdaff;
	}
	.main_container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
}
</style>
