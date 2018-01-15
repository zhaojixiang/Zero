<!--合法违规及异常信号统计-->
<template>
    <el-container class="errSumWrapper">
        <el-header height='30' class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
                合法、违规及异常信号统计
            </span>
        </el-header>
        <el-main class="spectra">
            <spectra :option="spectraBarOption" :setting="{width:'800px',height:'225px'}"/>
        </el-main>
    </el-container>
</template>
<style>
.errSumWrapper {
  background: #5294d1;
  border: 1px solid #4fdaff;
  width: 800px;
}
.errSumWrapper .headerTitle {
  color: #4fdaff;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.errSumWrapper .headerTitle span img{
  position: relative;
  top: 2px;
}
.errSumWrapper .el-main{
  padding: 0px;
}
</style>
<script>
import spectra from "components/stationManage/spectraBar";
import * as Global_ from "assets/js/global";
export default {
  props: ["spectraBarOption"],
  data() {
    return {
      icon_right_arrow: Global_.right_arrow
    };
  },
  components: {
    spectra
  }
};
</script>
