<template>
  <!--主要内容盒子-->
  <div class="content">
    <!--左边内容-->
    <div class="left">
      <!--最近十年全省GDP与监测设施关系-->
      <linebar1 id="leftline" :lineOption="gdpLineOption" :barOption="gdpBarOption" :setting="{width: '400px', height: '325px'}" />

      <p>最近十年全省GDP与监测设施关系</p>
      <ul>
        <li><span :style="{background:'#54d7e3'}"></span>固定站</li>
        <li><span :style="{background:'#0fff47'}"></span>一定监测设施</li>
        <li><span :style="{background:'#c56272'}"></span>可搬移监测设备</li>
        <li><span :style="{background:'#ffae00'}"></span>便携设备</li>
        <li><span :style="{background:'#c050e7'}"></span> 管制设备</li>
        <li><span :style="{background:'#ff0200'}"></span> GDP</li>
      </ul>
    </div>
    <!--中间内容-->
    <div class="center" @click="show">
      <map1/>
      <div class="mapbg">监测设施总数：<span>500个</span>，工作人员总数 : 50人，每个工作人员分配10个监测设施</div>
      <div class="remark">备注 : 地图上的数字代表该市工作人员数量（万）</div>
    </div>
    <!--右边内容-->
    <div class="right">
      <contrast class="city" :contrastOption="contrastOption" :setting="{width:'400px',height:'600px'}"/>
    </div>
    <div id="map">
      <map2/>
    </div>
  </div>
</template>
<style scoped>
  .content {
    position: relative;
    width: 90%;
    height: 600px;
    margin: 20px auto 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  /*左边内容*/
  .left{
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    width: 400px;
    display: flex;
    flex-direction: column;
  }
  .left p{
    position: relative;
    top: -455px;
    left: 60px;
    font-size: 18px;
  }
  ul{
    position: relative;
    top: -446px;
    left: 10px;
    padding: 0;
    margin: 0;
  }
  li{
    float: left;
    width: 100px;
    list-style: none;
  }
  .left span{
    display: inline-block;
    height: 12px;
    width: 12px;
    background: #3388ff;
  }
  #leftline{
    padding-top: 40px;
  }

  /*中间内容*/
  .center{
    width: 40%;
  }
  .mapbg{
    color: #e8f04d;
    font-size: 18px;
    padding-left: 40px;
    height: 73px;
    line-height: 36px;
    width: 360px;
    position: relative;
    top: -585px;
    left: 103px;
    background: url("../../../assets/image/mapbg.png");
    background-size: cover;
    z-index: 99;
  }
  .remark{
    color: #e8f04d;
    position: relative;
    top: -90px;
    left: 185px;
  }
  .right {
    width: 400px;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    height: 600px;
  }
  .city {
    padding: 10px 0 0 0;
  }
  #map{
    height: 605px;
    width: 940px;
    background: rgba(0,0,0,0.5);
    border: solid 2px blanchedalmond;
    position: absolute;
    top: 0px;
    right: 0%;
    display: none;
    z-index: 98;
  }
</style>
<script>
  import linebar1 from '../../../components/equipmentControl/index/linebar1.vue'
  import city from '../../../components/equipmentControl/facilitiesCondition/overview/city.vue'
  import map1 from '../../../components/equipmentControl/facilitiesCondition/overview/map.vue'
  import GetPieOption from '../../../assets/js/chartOptions/pieOption'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
  import GetLineOption from '../../../assets/js/chartOptions/lineOption'
  import GetLinearBarOption from '../../../assets/js/chartOptions/linearBarOption'
  import contrast from '../../../components/equipmentControl/common/contrast.vue'
  import GetContrastOption from '../../../assets/js/chartOptions/contrastOption'

  export default {
    data() {
      return {
        linearLineOption:{},
        linearBarOption:{},
        gdpLineOption:{},
        gdpBarOption:{},
        contrastOption:{}
      }
    },
    components: {
      linebar1,
      city,
      map1,
      map2,
      contrast
    },

    mounted() {
      let xData = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
      this.$http.get('api/GetGDPList').then(res=>{
        let list = res.data;
        for (var i = 0; i < list.line.length; i++) {
          let temp = {
            type: 'line',
            itemStyle:{
              normal:{
                color:list.line[i].color,
              },
            },
          }
          list.line[i] = Object.assign(list.line[i],temp);
        }
        this.gdpLineOption = GetLineOption('',['GDP'],xData,list.line);
        this.gdpBarOption = GetLinearBarOption(xData,list.bar);
      });
//      2017年全省各地市GDP和监测设施关系
      let myData = ['深圳','广州','珠海','汕头','佛山','韶关','湛江','肇庆','江门','茂名','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'];
      this.contrastOption = GetContrastOption('2017年全省各地市GDP和监测设施关系',myData);
    },
    methods:{
      show:function () {
        let map = document.getElementById('map');
        if(map.style.display == 'none'){
          map.style.display = 'block';
        }else{
          map.style.display = 'none';
        }
      }
    }}


</script>
