<template>
    <el-container class="PieOccupy">
        <el-header class='headerTitle'>
             <span>
                <img :src="icon_right_arrow" alt="right icon">
            {{title}}</span>
          <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
        </el-header>
        <section style="padding:10px;width:400px;height:200px;" v-loading='pieLoading'>
            <p-chart :option="option" :style="setting" v-if="Object.keys(option).length"></p-chart>
            <section v-if='PieOccupyEmpty' class="box_container">
                <i class="iconfont icon-box-empty icon_box_empty"></i>
                <p style="color:#ccc;">暂时没有数据～</p>
            </section>
        </section>
    </el-container>
</template>
<script>
import PChart from 'components/stationManage/occupyBar'
export default {
    props:['setting', 'option','title','PieOccupyEmpty','pieLoading'],
    computed: {
        icon_right_arrow() {
            return this.$const.right_arrow
        }
    },
    components:{
        PChart
    },
  methods:{
      minus(){
        this.$emit('minus');
      },
  },
}
</script>
<style scoped lang='less'>
.PieOccupy {
    .headerTitle {
        height: 30px !important;
        color: #4fdaff;
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        border-bottom: solid 1px #919293;
    }
}
</style>
