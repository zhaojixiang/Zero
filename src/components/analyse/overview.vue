<!-- 总览 -->
<template>
    <section class="over_container" :style="{'height':overHeight}">
        <el-container>
            <el-header height='30' class='headerTitle'>
                <span>
                    <img :src="icon_right_arrow" alt="right icon">
                    总览
                </span>
            </el-header>
            <el-main class="main_container">
                <ratioPie :option='ratioPieOption' class="pieOccupy" :setting="{width:'400px',height:'270px'}" ></ratioPie>
                <bar-graph :valueData='valueData' :keyData='keyData' :width='width' :height='height' :rateCover='rateCover'></bar-graph>
            </el-main>
        </el-container>
        <div class="dot" @mousedown="mouseDown" @mousemove="mousemoving" @mouseup="mouseUp" @mouseout="mouseUp"></div>                                    
    </section>
</template>

<script type="text/ecmascript-6">
import RatioPie from "components/stationManage/ratioPie.vue"
import BarGraph from "base/barVariable"
import * as Global_ from "assets/js/global"
export default {
  props: ["ratioPieOption", "rateCover","valueData","keyData"],
  data() {
    return {
      width: "600px",
      height: "270px",
      overHeight:'300px',
      icon_right_arrow: Global_.right_arrow,
      isClickDown:false
    };
  },
  methods:{
      mouseDown(e=event) {
        this.isClickDown = true
      },
      mousemoving(e=event) {
          let nodes = e.target
          if(!this.isClickDown) return
        //   console.log('on moving',e.clientY-120)
          nodes.style.top = `${e.clientY-120}px`
          this.overHeight = `${e.clientY-130}px`
          if(e.clientY-120<=210) {
            nodes.style.top = '210px'
            this.overHeight = '200px'            
          }
      },
      mouseUp() {
        //   console.log('mouseUp')
          this.isClickDown = false
      }
  },
  components: {
    RatioPie,
    BarGraph
  }
};
</script>

<style scoped>
.over_container {
  position: relative;
  min-height: 200px;
}
.over_container .main_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.el-main{
    padding: 0;
}
.dot {
    width:20px;
    height: 10px;
    background-color: #33cdfc;
    position: absolute;
    left: 50%;
    bottom:-5px;
}
.over_container {
  background: #5294d1;
  border: 1px solid #4fdaff;
  width: 96%;
  padding: 10px;
  overflow: hidden;
}
.over_container .headerTitle {
  color: #4fdaff;
}
</style>
