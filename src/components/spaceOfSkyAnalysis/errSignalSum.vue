<!--合法违规及异常信号统计-->
<template>
    <div class="errSumWrapper">
      <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
        <div class='headerTitle'>
            <span>
                <img :src="icon_right_arrow" alt="right icon">
                合法、违规及异常信号统计
            </span>
        </div>
        <el-main class="spectra">
            <spectra :option="spectraBarOption" :setting="{width:'1000px',height:'225px'}"/>
        </el-main>
    </div>
</template>
<style>
.errSumWrapper {
  background: #fff;
  border: 1px solid #4fdaff;
  width: 1000px;
}
.errSumWrapper .minus{
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  top: 6px;
  right: 15px;
  color: #2a74a4;
  z-index: 1000;
}
.errSumWrapper .headerTitle {
  color: #2d6f9c;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  border-bottom: solid 1px #c6c6c6;
  /* position: absolute;
  top: 5px;
  left: 5px; */
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
export default {
  props: ["spectraBarOption"],
  components: {
    spectra
  },
  computed:{
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    minus(){
      this.$emit("minus")
    }
  }
};
</script>
