<template>
  <div class="change" >
    <el-checkbox-group @change="change" v-model="checkboxGroup1" size="medium">
      <el-checkbox-button :label="1" :key="1"><img :src="iconTwo" alt=""> 信道频谱地图</el-checkbox-button>
      <el-checkbox-button :label="2" :key="2"><img :src="iconOne" alt=""> 信道能量轨迹</el-checkbox-button>
      <el-checkbox-button :label="3" :key="3"><img :src="iconThree" alt=""> 信道网格优化占用度</el-checkbox-button>
    </el-checkbox-group>
    <!--<el-checkbox-group v-model="checkboxGroup2" >-->
      <!--<el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>-->
    <!--</el-checkbox-group>-->
    <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">-->
      <!--<el-tab-pane name="first"><span slot="label"><img src="../../assets/image/tabIcon2.png" alt=""> 信道频谱地图</span>-->

        <!--<div class="spectra" v-if="select">-->
          <!--<i class="fa fa-times"></i>-->
          <!--<spectra :option="spectraBarOption" :setting="{width:'98%',height:'200px'}"/>-->
        <!--</div>-->

        <!--<el-row v-else="select1" :gutter="20" class='clear_bottom_margin20 clear_bottom'>-->
            <!--<el-col :span="24">-->
                <!--<span class="bottom_right" @click.stop='openHours'>-->
                    <!--{{openHour?'收起小时用度':'展开小时用度'}}-->
                    <!--<i :class="[openHour?'el-icon-arrow-up':'el-icon-arrow-down','el-icon&#45;&#45;right']"></i>-->
                <!--</span>-->
                <!--<div class="alert">-->
                  <!--<bar-graph class="barGraph" :rateCover='transactionBarData' :width='width' height='300px'/>-->
                  <!--<high-charts height='450px' :data='highchartData' v-if='openHour'/>-->
                <!--</div>-->
            <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-tab-pane>-->

      <!--<el-tab-pane name="second"><span slot="label"><img src="../../assets/image/tabIcon1.png" alt=""> 信道能量轨迹</span>-->

      <!--</el-tab-pane>-->

      <!--<el-tab-pane name="third"><span slot="label"><img src="../../assets/image/tabIcon3.png" alt=""> 信道网格优化占用度</span>-->
        <!--<div class="longbar" v-if="select">-->
          <!--<i class="fa fa-times"></i>-->
          <!--<occupyBar :option="occupyBarOption" :setting="{width: '1000px', height: '200px'}"/>-->
        <!--</div>-->

        <!--<div class="spectrogram" v-else="select1">-->
          <!--<h3>频谱图</h3>-->
          <!--<i class="fa fa-times" aria-hidden="true"></i>-->
          <!--<div class="chart">-->

          <!--</div>-->
        <!--</div>-->
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>
</template>
<style>
  .change {
  }
  .change .el-checkbox-button__inner{
    background: #217db9;
    color: #ffffff;
  }
  .change .el-checkbox-button:first-child .el-checkbox-button__inner{
    border-bottom: none;
  }
  /*.change .el-tabs__item{*/
    /*background: #217db9;*/
    /*color: #ffffff;*/
  /*}*/
  /*.change .el-tabs__item.is-active{*/
    /*color: #fdff35;*/
  /*}*/
  /*.change .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{*/
    /*border-bottom-color: #217db9;*/
  /*}*/
  /*.change .el-tabs__content{*/
    /*width: 100%;*/
    /*position: absolute;*/
    /*top: 860px;*/
    /*left: 0px;*/
  /*}*/
  /*.change .el-tabs--card>.el-tabs__header{*/
    /*border-bottom: none;*/
  /*}*/
  .change .spectra{
     background: #5294d1;
   }
  .change .spectra i,.change .longbar i{
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .change img{
    position: relative;
    top: 3px;
  }
  .change .longbar{
    background: #5294d1;
  }
  .change .alert{
    background: rgba(0, 0, 0, 0.88);
  }
  .change .bottom_right{
    position: absolute;
    right: 5em;
    top: 1em;
    color: yellow;
    text-align: right;
    cursor: pointer;
    z-index: 1000;
  }
  .change .spectrogram{
    width: 600px;
    height: 330px;
    background: #5294d1;
    position: relative;
  }
  .change .spectrogram h3{
    border-bottom: solid 1px #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: normal;
    margin: 0;
  }
  .change .spectrogram .chart{
    background: #293855;
    width: 96%;
    margin: 0 auto;
    height: 280px;
  }
  .change .spectrogram i{
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fff;
    cursor: pointer;
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
  import * as Global_ from 'assets/js/global'

  export default {
    data () {
      return {
        checkboxGroup1:[],
        datas: [],
        activeName2: '',
        tabPosition: 'top',
        openHour: false,
        width: '100%',
        barOption:{},
        highchartData: {},
        transactionBarData: {},
        iconOne:Global_.tabIcon1,
        iconTwo:Global_.tabIcon2,
        iconThree:Global_.tabIcon3
      }
    },
    props:[
      'select',
      'select1'
    ],
    components:{
      // occupyBar,
      // BarGraph,
      // HighCharts
    },
    mounted () {
      this.$http.get("api/GetChannelUsed").then(res => {
        // console.log(res.data.data1);
        // console.log(res.data.data2);

        this.transactionBarData = normalizeBarOption({
          title: "信道占用度",
          series_data: res.data.data1,
          xAxis_data: [],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
        this.highchartData = highchartOption({
          title: "",
          series_data: res.data.data2,
          xAxis_data: [],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
      });


//      this.$http.get('api/GetBar').then(res=>{
//        console.log(res.data);
//        this.datas = res.data;
//        console.log(this.datas);
//        this.barOption= getBarOption('88-108MHz频段占用度变化趋势', this.datas, [], [], ['#fffa6b']);
//      });
    },
    methods:{
      openHours() {
        this.openHour = !this.openHour;
        // console.log("Open Hours Use");
      },
      change(event){
        // console.log(event);
        // 频谱地图
        if(event.includes(1)){
          this.$emit('frequencyMap',true);
        }else{
          this.$emit('frequencyMap',false);
        }
        // 网格占用度
        if(event.includes(2)){
          this.$emit('energyCircle',true);
        }else{
          this.$emit('energyCircle',false);
        }
        // 能量轨迹
        if(event.includes(3)){
          this.$emit('energyRetangle',true);
        }else{
          this.$emit('energyRetangle',false);
        }
      }
      // handleClick(tab, event) {
      //  // console.log(event.currentTarget.children[0].innerText);
      //  if (event.currentTarget.children[0].innerText === ' 信道能量轨迹'){
      //    this.$emit('energy');
      //  }else if(event.currentTarget.children[0].innerText === ' 信道频谱地图'){
      //    this.$emit('frequencyMap');
      //  }
      // }
    }
  }
</script>
