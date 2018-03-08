<template>
  <div class="change" >
    <div class="change-head">
      <span class="change-title">图层</span>
    </div>
    <div class="content">
      <el-checkbox-group class="change-group" v-model="checkboxGroup" size="medium">
        <el-checkbox v-if="show[0]" :label="1" :key="1">频谱地图</el-checkbox>
        <el-checkbox v-if="show[1]" :label="2" :key="2">能量轨迹</el-checkbox>
        <el-checkbox v-if="show[2]" :label="3" :key="3">网格化占用度</el-checkbox>
        <el-checkbox v-for="(item,index) in mapItems" :label="index+4" :key="index+4">{{ item }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<style scoped>
  .change {
    background: #FEFEFE;
    width: 200px;
    border: 1px solid #4fdaff;
  }
  .change-group {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
  }
  .change-head {
    height: 40px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: 15px;
    border-bottom:solid 1px #dfe4ed ;
  }
  .change-title {
    width: 100%;
    text-indent: 46px;
    display: inline-block;
    line-height: 40px;
    color: #4fdaff;
    font-size: 14px;
  }
</style>
<script>
  import bar from 'components/equipmentControl/index/bar.vue'
  import occupyBar from 'components/stationManage/occupyBar.vue'
  import GetOccupyBarOption from 'assets/js/chartOptions/occupyBarOption'
  import BarGraph from "base/barGraph";
  import HighCharts from "base/highCharts";
  import normalizeBarOption from "assets/js/chartOptions/barOption";
  import getBarOption from 'assets/js/chartOptions/barOption'
  import highchartOption from "assets/js/chartOptions/highchartOption";
  export default {
    data () {
      return {
        checkboxGroup:[],
        datas: [],
        activeName2: '',
        tabPosition: 'top',
        openHour: false,
        width: '100%',
        barOption:{},
        highchartData: {},
        transactionBarData: {},
        mapItems:[
          '88Mhz能量轨迹'
        ],
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
    },
    watch: {
      checkboxGroup(val,oldVal) {
         // 频谱地图
        if(val.includes(1)){
          this.$emit('frequencyMap',true);
        }else if(oldVal.includes(1)){
          this.$emit('frequencyMap',false);
        }
        // 能量轨迹
        if(val.includes(2)){
          this.$emit('energyCircle',true);
        }else if(oldVal.includes(2)){
          this.$emit('energyCircle',false);
        }
        // 网格占用度
        if(val.includes(3)){
          this.$emit('energyRetangle',true);
        }else if(oldVal.includes(3)){
          this.$emit('energyRetangle',false);
        }
      }
    },
    methods:{
      openHours() {
        this.openHour = !this.openHour;
        // console.log("Open Hours Use");
      }
    }
  }
</script>
