<!--信道占用度和功率变化趋势-->
<template>     
    <el-container class='zoneContainer11' :style="{'height':'400px'}">
        <el-header height='30' class='headerTitle'>
            <span>
            <img :src="icon_right_arrow" alt="right icon">
            成都广播电台在10月1日-10月30日的38.5MHz信道占用度和功率变化趋势
            </span>
        </el-header>
        <el-main>
            <spectra :option="spectraBarOption" :setting="{width:'98%',height:'300px'}"/>
        </el-main>
    </el-container>
</template>
<script>
import * as Global_ from 'assets/js/global'
import Spectra from "components/stationManage/spectraBar"

export default {
  props:['spectraBarOption'],
  data() {
      return {
          icon_right_arrow:Global_.right_arrow
      }
  },
  components:{
      Spectra
  }
}
</script>
<style>
.zoneContainer11 {
  height: 15em;
  overflow: hidden;
  border: 1px solid #4fdaff;
  margin: 0.5em 0 .5em .5em;
  padding: 0.5em 0 0 0;
}
</style>
