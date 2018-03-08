<template>
  <section :style="{width,height:'260px'}" v-loading='barLoading'>
    <bar-graph :width='width' :height='height' :rateCover='rateCover' v-if="Object.keys(rateCover).length"></bar-graph>
    <section v-if='isEmpty' class="box_container">
        <i class="iconfont icon-box-empty icon_box_empty"></i>
        <p style="color:#ccc;">暂时没有数据～</p>
    </section>
  </section>
</template>
<style lang="less" scoped>
</style>
<script>
import BarGraph from 'base/barGraph'
export default {
    data() {
       return {
            width:'400px',
            height:'260px'
       }
    },
    props:['rateCover','barLoading','isEmpty'],
    components:{
        BarGraph
    }
}
</script>


