<template>
  <div class="stationTab" >
    <el-checkbox-group @change="change" v-model="checkboxGroup1" size="medium">
      <el-checkbox-button :label="1" :key="1"><img src="../../assets/image/tabIcon2.png" alt=""> 频谱地图</el-checkbox-button>
      <el-checkbox-button :label="2" :key="2"><img src="../../assets/image/tabIcon1.png" alt=""> 能量轨迹</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>
<style>
.stationTab .el-checkbox-button__inner{
      background: #5294d1;
      color: #fff;
  }
</style>
<script>
  export default {
    data () {
      return {
        checkboxGroup1: []
      }
    },
    components:{
    },
    mounted(){
    },
    methods:{
      change(event) {
        if(event.includes(1)){
          this.$emit('frequencyMap',true)
        }else{
          this.$emit('frequencyMap',false)
        }
        if(event.includes(2)){
          this.$emit('energyCircle',true)
        }else{
          this.$emit('energyCircle',false)
        }
      }
    }
  }
</script>
