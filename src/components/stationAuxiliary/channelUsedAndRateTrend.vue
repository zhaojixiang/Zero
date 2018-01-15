<!--信道占用度和功率变化趋势-->
<template>
    <div class='zoneContainer11'>
        <div class='headerTitle'>
            <span>
            <img :src="icon_right_arrow" alt="right icon">
            成都广播电台在10月1日-10月30日的38.5MHz信道占用度和功率变化趋势
            </span>
        </div>
        <div>
            <spectra :option="spectraBarOption" :setting="{width:'100%',height:'250px'}"/>
        </div>
    </div>
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
.zoneContainer11 .headerTitle{
  height: 40px;
  line-height: 40px;
  color: #56e5ff;
  font-size: 14px;
  padding: 0 10px;
}
.zoneContainer11 {
  height: 300px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0, 0, 0, 0.2);
  /* margin: 0.5em 0 .5em .5em; */
  margin: 10px;
}
</style>
