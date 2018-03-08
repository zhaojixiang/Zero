<template>
  <el-checkbox-group class="change" v-model="checkboxGroup" size="medium">
      <el-checkbox-button @change="click(1)" v-if="show[0]" :label="1" :key="1"><img :src="iconTwo" alt=""> 频谱地图</el-checkbox-button>
      <el-checkbox-button @change="click(2)" v-if="show[1]" :label="2" :key="2"><img :src="iconOne" alt=""> 能量轨迹</el-checkbox-button>
      <el-checkbox-button @change="click(3)" v-if="show[2]" v-show="isSingle" :label="3" :key="3"><img :src="iconThree" alt=""> 网格化占用度</el-checkbox-button>
  </el-checkbox-group>
</template>
<style>
  .el-checkbox-group {
    text-align: center;
  }
  .change {
    text-align: center;
  }
  .change .el-checkbox-button__inner{
    background: #217db9;
    color: #ffffff;
    padding: 9px 20px 11px;
  }
  .change img{
    position: relative;
    top: 3px;
  }
  .change .el-checkbox-button:first-child .el-checkbox-button__inner,.change .el-checkbox-button:last-child .el-checkbox-button__inner{
    border-radius: 0px;
  }
</style>
<script>
  export default {
    data () {
      return {
        frequencyMap:false,
        energyCircle:false,
        energyRetangle:false,
        checkboxGroup:[]
      }
    },
    computed: {
      iconOne() {
        return this.$const.tabIcon1
      },
      iconTwo() {
        return this.$const.tabIcon2
      },
      iconThree() {
        return this.$const.tabIcon3
      }
    },
    props:{
      show:{
        type:Array,
        default:()=>{
          return [true,true,true];
        }
      },
      isSingle:{
        type:Boolean
      }
    },
    methods:{
      click(index){
        switch (index){
          case 1:
            if (this.checkboxGroup.includes(index)) {
              this.frequencyMap = true;
            } else {
              this.frequencyMap = false;
            }
            console.log('index: ',this.frequencyMap)
            this.$emit('frequencyMap',this.frequencyMap);
            break;
          case 2:
            if (this.checkboxGroup.includes(index)) {
                this.energyCircle = true;
            } else {
              this.energyCircle = false;
            }
            this.$emit('energyCircle',this.energyCircle);
            break;
          case 3:
            if (this.checkboxGroup.includes(index)) {
                this.energyRetangle = true;
            } else {
              this.energyRetangle = false;
            }
            this.$emit('energyRetangle',this.energyRetangle);
            break;
        }
      },
    }
  }
</script>
