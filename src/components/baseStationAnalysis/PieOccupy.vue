<template>
    <el-container class="PieOccupy">
        <el-header class='headerTitle'>
             <span>
                <img :src="icon_right_arrow" alt="right icon">
            {{title}}</span>
        </el-header>
        <p-chart :option="option" :style="setting"></p-chart>
    </el-container>
</template>
<script>
import PChart from 'components/stationManage/occupyBar'
import * as Global_ from "assets/js/global";

export default {
    props:['setting', 'option','title'],
    data() {
        return {
            icon_right_arrow:Global_.right_arrow,
        }
    },
    components:{
        PChart
    }
}
</script>
<style>
.PieOccupy .headerTitle {
  color: #4fdaff;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
</style>
