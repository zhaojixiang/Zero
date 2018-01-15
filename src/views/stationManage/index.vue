<template>
  <section>
    <nav1/>
    <div class="main">
      <div class="legend">
        <ul class="legend-ul">
          <li v-for="item in legend">
            <section class="legend-li" v-if="item.span != undefined || item.icon != undefined">
              <span class="color-block" style="border: solid 1px #fff;width: 20px;height: 15px;text-align: center" v-if="item.icon!=undefined">
                <i :class="'fa fa-1 '+item.icon"></i>
              </span>
              <span class="color-block" style="border: solid 1px #fff;width: 20px;height: 15px;text-align: center" v-else>{{ item.span }}</span>
              <span class="text">{{item.zh}}</span>
            </section>
            <section class="legend-li" v-else>
              <span class="color-block" :style="{background:item.color}"></span>
              <span class="text">{{item.zh}}</span>
            </section>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="box-first">
          <v-chart :force-fit="true" :height="250" :data="data" :data-view="dataView" :data-pre="dataPre" :scale="false" :padding="['18%', '1%', '6%', '1%']">
            <v-tooltip :show-title="false" :item-tpl="itemTpl" />
            <v-polygon :onClick="click" :position="'x*y'" :color="color" :tooltip="tooltip" :v-style="style" :label="label" />
            <v-guide v-for="(n,index) in nodes" :key="index" type="text" :zIndex="1000" :offsetY="0" :top="true" :vStyle="guideStyle" :position="position(n)" :content="n.data.freq"></v-guide>
            <v-guide type="text" :zIndex="1000" :offsetY="0" :top="true" :vStyle="guideStyle" :position="[1,1]" :content="300" />
            <v-guide type="text" :zIndex="1000" :offsetY="10" :top="true" :vStyle="{fill: '#fff',fontSize: '12'}" :position="[0,0]" :content="'30MHz'" />
            <v-guide type="text" :zIndex="1000" :offsetY="10" :offsetX="-60" :top="true" :vStyle="{fill: '#fff',fontSize: '12'}" :position="[1,0]" :content="'300MHz'" />
          </v-chart>
        </div>
        <div class="box-second">
          <v-chart :force-fit="true" :height="300" :data="data2" :data-view="dataView" :data-pre="dataPre" :scale="false" :padding="['10%', '1%', '6%', '1%']">
            <v-tooltip :show-title="false" :item-tpl="itemTpl" />
            <v-polygon :onClick="click" :position="'x*y'" :color="color" :tooltip="tooltip" :v-style="style" :label="label" />
            <v-guide v-for="(n,index) in nodes2" :key="index" type="text" :zIndex="1000" :offsetY="0" :top="true" :vStyle="guideStyle" :position="position(n)" :content="n.data.freq"></v-guide>
            <v-guide type="text" :zIndex="1000" :offsetY="0" :top="true" :vStyle="guideStyle" :position="[1,1]" :content="3000" />
            <v-guide type="text" :zIndex="1000" :offsetY="10" :top="true" :vStyle="{fill: '#fff',fontSize: '12'}" :position="[0,0]" :content="'300MHz'" />
            <v-guide type="text" :zIndex="1000" :offsetY="10" :offsetX="-60" :top="true" :vStyle="{fill: '#fff',fontSize: '12'}" :position="[1,0]" :content="'3GHz'" />
          </v-chart>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
    .legend-ul {
      list-style: none;
      color: #ffffff;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .legend-li {
      display: flex;
      flex-direction: row;
      width: 150px;
      padding: 5px 0;
    }
    .color-block {
      display: inline-block;
      margin:auto 5px auto 0;
      /*margin-right: 5px;*/
      line-height: 17px;
      width: 10px;
      height: 10px;
    }
    .main{
      width: 98%;
      margin: auto;
    }
    .legend {
      margin-top: 20px;
      height: 100px;
      border:solid 1px #1E9FFF;
    }

</style>
<script>
  import { menuShowMixin } from "assets/js/mixin";
  import nav1 from '../../components/equipmentControl/common/Nav1.vue'
  import DataSet from '@antv/data-set'
  import {dataPre,dataView,itemTpl,color,style,tooltip,label,guideStyle} from '../../assets/js/chartOptions/frequencyAllocationOption'
  let LEGEND = {
    METEOROLOGICAL_AIDS: {
      zh: '气象辅助',
      en: 'METEOROLOGICAL AIDS',
      color: '#DDECFB'
    },
    AERONAUTICAL_RADIO_NAVIGATION: {
      zh: '航空无线电导航',
      en: 'AERONAUTICAL RADIONAVIGATION',
      color: "#997670"
    },
    RADIO_LOCATION: {
      zh: '无线电定位',
      en: 'RADIOLOCATION',
      color: "#E3AD28"
    },
    BROADCASTING: {
      zh: '广播',
      en: 'BROADCASTING',
      color: '#74AF41'
    },
    MARITIME_MOBILE: {
      zh: "水上移动",
      en: "MARITIME MOBILE",
      color: "#DEDCA3",
    },
    MOBILE: {
      zh: '移动',
      en: 'MOBILE',
      color: '#C1498A'
    },
    LAND_MOBILE: {
      zh: '陆地移动',
      en: "LAND MOBILE",
      color: '#83BAA1'
    },
    FIXED: {
      zh: '固定',
      en: 'FIXED',
      color: '#E6C4D8'
    },
    RADIO_ASTRONOMY: {
      zh: '射电天文',
      en: 'RADIO ASTRONOMY',
      color: '#BA2B1F',
    },
    AERONAUTICAL_MOBILE: {
      zh: '航空移动',
      en: 'AERONAUTICAL MOBILE',
      color: "#6BAFE8"
    },
    RADIO_NAVIGATION: {
      zh: '无线电导航',
      en: 'RADIO NAVIGATION',
      color: '#315699'
    },
    SPACE_RESEARCH: {
      zh: '空间研究',
      en: 'SPACE RESEARCH',
      color: '#E0A986'
    },
    MARITIME_RADIO_NAVIGATION: {
      zh: '水上无线电导航',
      en: 'MARITIME RADIO NAVIGATION',
      color: '#407048'
    },
    SPACE_OPERATION: {
      zh: '空间操作',
      en: 'SPACE_OPERATION',
      color: '#FAF63A'
    },
    AMATEUR: {
      zh: '业余',
      en: 'AMATEUR',
      color: "#D0DFC1"
    },
    STAND_FREQUENCY_AND_TIME_SIGNAL: {
      zh: '标准频率和时间信号',
      en: 'STAND FREQUENCY AND TIME SIGNAL',
      color: '#758E9B'
    },
    METEOROLOGICAL_SATELLITE: {
      zh: '卫星气象',
      en: 'METEOROLOGICAL-SATELLITE',
      color: '#742157'
    },
    EARTH_EXPLORATION_SATELLITE: {
      zh: '卫星地球探测',
      en: 'EARTH EXPLORATION-SATELLITE',
      color: '#7B7FAF'
    },
    INTER_SATELLITE: {
      zh: '卫星间',
      en: 'INTER-SATELLITE',
      color: '#CFCFCF'
    },
    RADIO_DETERMINATION_SATELLITE: {
      zh: '卫星无线电测定',
      en: 'RADIO DETERMINATION-SATELLITE',
      color: "#838283"
    },
    SATELLITE: {
      zh: '卫星',
      en: 'SATELLITE',
      span: 'S',
    },
    EXCEPT_AERO_MOBILE_R: {
      zh: '航空移动(R)除外',
      en: 'EXCEPT AERO MOBILE(R)',
      span: 'AR',
    },
    EXCEPT_AERO_MOBILE: {
      zh: '航空移动除外',
      en: 'EXCEPT AERO MOBILE',
      span: 'A',
    },
    EXCEPT_AERO_MOBILE_SATELLITE: {
      zh: '航空移动除外',
      en: 'EXCEPT AERO MOBILE-SATELLITE',
      span: 'SA',
    },
    SKY_TO_LAND: {
      zh:'空对地',
      icon: 'fa-long-arrow-down'
    },
    LAND_TO_SKY: {
      zh:'地对空',
      icon: 'fa-long-arrow-up'
    },
    SKY_TO_SKY: {
      zh:'空对空',
      icon: 'fa-long-arrow-right'
    },

  };
  const data = {
    children: [
      {
        freq: 30,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 30.005,
        children: [
          {value: 10, legend: LEGEND.SPACE_RESEARCH},
          {value: 10, legend: LEGEND.MOBILE},
          {value: 10, legend: LEGEND.FIXED},
          {value: 10, legend: LEGEND.SPACE_OPERATION},
        ],
      },
      {
        freq: 30.01,
        value: 0,
        children: [
          {value: 200, legend: LEGEND.MOBILE},
          {value: 200, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 37.5,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 38.25,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 39.986,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 40.02,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 40.98,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 41.015,
        children: [
          {value: 80, legend: LEGEND.MOBILE},
          {value: 80, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 44,
        children: [
          {value: 50, legend: LEGEND.MOBILE},
          {value: 50, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 47,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 48.5,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        value: 0,
        freq: 50,
        children: [
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.AMATEUR},
          {value: 40, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        value: 0,
        freq: 54,
        children: [
          {value: 120, legend: LEGEND.MOBILE},
          {value: 120, legend: LEGEND.FIXED},
          {value: 120, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        value: 0,
        freq: 64.5,
        children: [
          {value: 25, legend: LEGEND.BROADCASTING},
          {value: 25, legend: LEGEND.RADIO_LOCATION},
          {value: 25, legend: LEGEND.MOBILE},
          {value: 25, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 68,
        children: [
          {value: 70, legend: LEGEND.RADIO_LOCATION},
          {value: 70, legend: LEGEND.BROADCASTING},
          {value: 70, legend: LEGEND.MOBILE},
          {value: 70, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 72.5,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 74.6,
        value: 40,
        legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION
      },
      {
        freq: 74.8,
        value: 40,
        legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION
      },
      {
        freq: 75.2,
        value: 40,
        legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION
      },
      {
        freq: 75.4,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 76,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 84,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 87,
        value: 0,
        children: [
          {value: 120, legend: LEGEND.RADIO_LOCATION},
          {value: 120, legend: LEGEND.MOBILE},
          {value: 120, legend: LEGEND.FIXED},
          {value: 120, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 108,
        value: 200, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION
      },
      {
        freq: 117.975,
        value: 250, legend: LEGEND.AERONAUTICAL_MOBILE
      },
      {
        freq: 137,
        value: 0,
        children: [
          {value: 10, legend: LEGEND.MOBILE, span: 'AR'},
          {value: 10, legend: LEGEND.FIXED},
          {value: 10, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.MOBILE, span: 'S', label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.METEOROLOGICAL_SATELLITE, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 137.025,
        value: 0,
        children: [
          {value: 10, legend: LEGEND.MOBILE, span: LEGEND.SATELLITE.span, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.MOBILE, span: LEGEND.EXCEPT_AERO_MOBILE_R.span},
          {value: 10, legend: LEGEND.FIXED},
          {value: 10, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.METEOROLOGICAL_SATELLITE, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 137.175,
        value: 0,
        children: [
          {value: 10, legend: LEGEND.MOBILE, span: LEGEND.EXCEPT_AERO_MOBILE_R.span},
          {value: 10, legend: LEGEND.FIXED},
          {value: 10, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.MOBILE, label: LEGEND.SKY_TO_LAND.icon, span: LEGEND.SATELLITE.span},
          {value: 10, legend: LEGEND.METEOROLOGICAL_SATELLITE, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 137.825,
        value: 0,
        children: [
          {value: 10, legend: LEGEND.MOBILE, label: LEGEND.SKY_TO_LAND.icon, span: LEGEND.SATELLITE.span},
          {value: 10, legend: LEGEND.MOBILE, span: LEGEND.EXCEPT_AERO_MOBILE_R.span},
          {value: 10, legend: LEGEND.FIXED},
          {value: 10, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.METEOROLOGICAL_SATELLITE, label: LEGEND.SKY_TO_LAND.icon},
          {value: 10, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 138,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 143.6,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 143.65,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 144,
        value: 0,
        children: [
          {value: 15, legend: LEGEND.AERONAUTICAL_MOBILE, span: 'OR'},
          {value: 15, legend: LEGEND.RADIO_LOCATION},
          {value: 15, legend: LEGEND.AMATEUR, span: LEGEND.SATELLITE.span},
          {value: 15, legend: LEGEND.AMATEUR},
        ],
      },
      {
        freq: 146,
        value: 0,
        children: [
          {value: 15, legend: LEGEND.RADIO_LOCATION},
          {value: 15, legend: LEGEND.MOBILE},
          {value: 15, legend: LEGEND.FIXED},
          {value: 15, legend: LEGEND.AMATEUR},
        ],
      },
      {
        freq: 148,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE, label: LEGEND.LAND_TO_SKY.icon, span: LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 149.9,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_NAVIGATION, span: LEGEND.SATELLITE.span},
          {value: 30, legend: LEGEND.MOBILE, label: LEGEND.LAND_TO_SKY.icon, span: LEGEND.SATELLITE.span},
        ],
      },
      {
        freq: 150.05,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 156,
        value: 60, legend: LEGEND.MARITIME_MOBILE
      },
      {
        freq: 156.7625,
        value: 60, legend: LEGEND.MARITIME_MOBILE
      },
      {
        freq: 156.8375,
        value: 60, legend: LEGEND.MARITIME_MOBILE
      },
      {
        freq: 157.45,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.LAND_MOBILE},
          {value: 30, legend: LEGEND.MARITIME_MOBILE},
        ],
      },
      {
        freq: 160.6,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.LAND_MOBILE},
          {value: 30, legend: LEGEND.MARITIME_MOBILE},
        ],
      },
      {
        freq: 160.975,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 161.475,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.LAND_MOBILE},
          {value: 30, legend: LEGEND.MARITIME_MOBILE},
        ],
      },
      {
        freq: 162.05,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 167,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 174,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
          {value: 40, legend: LEGEND.SPACE_RESEARCH, label: LEGEND.SKY_TO_LAND.icon},
          {value: 40, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 184,
        value: 0,
        children: [
          {value: 100, legend: LEGEND.RADIO_LOCATION},
          {value: 100, legend: LEGEND.MOBILE},
          {value: 100, legend: LEGEND.FIXED},
          {value: 100, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 216,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 223,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 225,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 230,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 235,
        value: 0,
        children: [
          {value: 80, legend: LEGEND.RADIO_LOCATION},
          {value: 80, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 267,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 272,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_MOBILE},
          {value: 20, legend: LEGEND.SPACE_OPERATION, label: LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 273,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 279,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 281,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.RADIO_LOCATION},
          {value: 60, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
    ]
  };
  const data2 = {
    children: [
      {
        freq: 300,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.RADIO_LOCATION},
          {value: 60, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 312,
        children: [
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 315,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 322,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 30, legend: LEGEND.AERONAUTICAL_MOBILE},
        ],
      },
      {
        freq: 328.6,
        value: 0,
        children: [
          {value: 80, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 335.4,
        value: 0,
        children: [
          {value: 50, legend: LEGEND.RADIO_LOCATION},
          {value: 50, legend: LEGEND.MOBILE,span:LEGEND.SATELLITE.span},
          {value: 50, legend: LEGEND.MOBILE},
          {value: 50, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 387,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.SATELLITE.span,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 390,
        value: 0,
        children: [
          {value: 25, legend: LEGEND.RADIO_LOCATION},
          {value: 25, legend: LEGEND.MOBILE,span:LEGEND.SATELLITE.span},
          {value: 25, legend: LEGEND.MOBILE},
          {value: 25, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 399.9,
        children: [
          {value: 40, legend: LEGEND.RADIO_NAVIGATION,span:LEGEND.SATELLITE.span},
          {value: 40, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        value: 0,
        freq: 400.05,
        children: [
          {value: 120, legend: LEGEND.STAND_FREQUENCY_AND_TIME_SIGNAL,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        value: 0,
        freq: 400.15,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        value: 0,
        freq: 401,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
          {value: 20, legend: LEGEND.METEOROLOGICAL_AIDS},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
        ],
      },
      {
        value: 0,
        freq: 402,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
          {value: 20, legend: LEGEND.METEOROLOGICAL_AIDS},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
        ],
      },
      {
        value: 0,
        freq: 403,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        value: 0,
        freq: 406,
        children: [
          {value: 120, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        value: 0,
        freq: 406.1,
        children: [
          {value: 40, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 40, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        value: 0,
        freq: 410,
        children: [
          {value: 40, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_SKY.icon},
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 420,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 425,
        value: 0,
        children:[
          {value:30,legend:LEGEND.RADIO_LOCATION,},
          {value:30,legend:LEGEND.AERONAUTICAL_RADIO_NAVIGATION}
        ],
      },
      {
        freq: 430,
        value: 0,
        children:[
          {value:20,legend:LEGEND.AMATEUR,},
          {value:20,legend:LEGEND.AERONAUTICAL_RADIO_NAVIGATION,},
          {value:20,legend:LEGEND.RADIO_LOCATION}
        ],
      },
      {
        freq: 440,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 450,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 455,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 456,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 459,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 460,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.METEOROLOGICAL_SATELLITE},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 470,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 485,
        value: 0,
        children: [
          {value: 140, legend: LEGEND.RADIO_LOCATION},
          {value: 140, legend: LEGEND.MOBILE},
          {value: 140, legend: LEGEND.FIXED},
          {value: 140, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 566,
        value: 0,
        children: [
          {value: 80, legend: LEGEND.RADIO_NAVIGATION},
          {value: 80, legend: LEGEND.RADIO_LOCATION},
          {value: 80, legend: LEGEND.MOBILE},
          {value: 80, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 606,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 20, legend: LEGEND.RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 610,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 30, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 614,
        value: 0,
        children: [
          {value: 280, legend: LEGEND.MOBILE, label: LEGEND.SKY_TO_LAND.icon},
          {value: 280, legend: LEGEND.FIXED, label: LEGEND.SKY_TO_LAND.icon},
          {value: 280, legend: LEGEND.BROADCASTING},
        ],
      },
      {
        freq: 798,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.BROADCASTING},
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 806,
        value: 0,
        children: [
          {value: 160, legend: LEGEND.RADIO_LOCATION},
          {value: 160, legend: LEGEND.MOBILE},
          {value: 160, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 960,
        value: 720,
        legend:LEGEND.AERONAUTICAL_RADIO_NAVIGATION,
      },
      {
        freq: 1215,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.RADIO_NAVIGATION, span: LEGEND.SATELLITE.span,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
        ],
      },
      {
        freq: 1240,
        value: 0,
        children: [
          {value: 15, legend: LEGEND.AMATEUR},
          {value: 15, legend: LEGEND.MOBILE},
          {value: 15, legend: LEGEND.FIXED},
          {value: 15, legend: LEGEND.RADIO_NAVIGATION},
          {value: 15, legend: LEGEND.SPACE_RESEARCH},
          {value: 15, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 15, legend: LEGEND.RADIO_NAVIGATION, span: LEGEND.SATELLITE.span,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 15, legend: LEGEND.RADIO_LOCATION},
        ],
      },
      {
        freq: 1260,
        value: 0,
        children: [
          {value: 15, legend: LEGEND.AMATEUR},
          {value: 15, legend: LEGEND.MOBILE},
          {value: 15, legend: LEGEND.FIXED},
          {value: 15, legend: LEGEND.RADIO_NAVIGATION},
          {value: 15, legend: LEGEND.SPACE_RESEARCH},
          {value: 15, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 15, legend: LEGEND.RADIO_NAVIGATION, span: LEGEND.SATELLITE.span,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 15, legend: LEGEND.RADIO_LOCATION},
        ],
      },
      {
        freq: 1300,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.RADIO_LOCATION},
          {value: 60, legend: LEGEND.RADIO_NAVIGATION, span: LEGEND.SATELLITE.span,label:LEGEND.LAND_TO_SKY.icon},
          {value: 60, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 1350,
        value: 180,
        legend:LEGEND.RADIO_LOCATION
      },
      {
        freq: 1400,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.SPACE_RESEARCH},
          {value: 60, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 60, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
        ],
      },
      {
        freq: 1427,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.SPACE_OPERATION,label:LEGEND.LAND_TO_SKY.icon},
        ],
      },
      {
        freq: 1429,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_LOCATION},
          {value: 40, legend: LEGEND.MOBILE},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 1452,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.BROADCASTING,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.BROADCASTING},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 1492,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.BROADCASTING},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 1525,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 1530,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 1533,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 1535,
        value: 0,
        children: [
          {value: 80, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 80, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 1544,
        value: 320,
        legend: LEGEND.MOBILE,
        label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span
      },
      {
        freq: 1559,
        value: 0,
        children: [
          {value: 80, legend: LEGEND.RADIO_NAVIGATION,label:LEGEND.SKY_TO_SKY.icon,span:LEGEND.SATELLITE.span,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 80, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 1610,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.RADIO_DETERMINATION_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
          {value: 40, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 40, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        freq: 1610.6,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_DETERMINATION_SATELLITE,label:LEGEND.LAND_TO_SKY.icon},
          {value: 30, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 30, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 30, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        freq: 1613.8,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.RADIO_DETERMINATION_SATELLITE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
        ],
      },
      {
        freq: 1626.5,
        value: 320,
        legend: LEGEND.MOBILE,
        label:LEGEND.LAND_TO_SKY.icon,
        span:LEGEND.SATELLITE.span
      },
      {
        freq: 1660,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 60, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon, span:LEGEND.SATELLITE.span},
        ],
      },
      {
        freq: 1660.5,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
        ],
      },
      {
        freq: 1668.4,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED},
          {value: 20, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        freq: 1670,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        freq: 1675,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 30, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        freq: 1690,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 60, legend: LEGEND.METEOROLOGICAL_AIDS},
        ],
      },
      {
        freq: 1700,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 40, legend: LEGEND.METEOROLOGICAL_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 40, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 1710,
        value: 0,
        children: [
          {value: 240, legend: LEGEND.FIXED},
          {value: 240, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 1930,
        value: 0,
        children: [
          {value: 120, legend: LEGEND.FIXED},
          {value: 120, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 1980,
        value: 0,
        children: [
          {value: 120, legend: LEGEND.FIXED},
          {value: 120, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 120, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 2010,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 2025,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.EARTH_EXPLORATION_SATELLITE,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 2110,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.LAND_TO_SKY.icon},
          {value: 40, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 2120,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 2170,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.FIXED},
          {value: 60, legend: LEGEND.MOBILE,span:LEGEND.SATELLITE.span,label:LEGEND.SKY_TO_LAND.icon},
          {value: 60, legend: LEGEND.MOBILE},
        ],
      },
      {
        freq: 2200,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
          {value: 30, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.EARTH_EXPLORATION_SATELLITE,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
          {value: 30, legend: LEGEND.SPACE_OPERATION,label:LEGEND.SKY_TO_SKY.icon,label2:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 2290,
        value: 0,
        children: [
          {value: 40, legend: LEGEND.FIXED},
          {value: 40, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 40, legend: LEGEND.SPACE_RESEARCH,label:LEGEND.SKY_TO_LAND.icon},
        ],
      },
      {
        freq: 2300,
        value: 0,
        children: [
          {value: 120, legend: LEGEND.AMATEUR},
          {value: 120, legend: LEGEND.RADIO_LOCATION},
          {value: 120, legend: LEGEND.MOBILE},
          {value: 120, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2450,
        value: 0,
        children: [
          {value: 30, legend: LEGEND.RADIO_LOCATION},
          {value: 30, legend: LEGEND.MOBILE},
          {value: 30, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2483.5,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_DETERMINATION_SATELLITE,label:LEGEND.SKY_TO_LAND.icon},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2500,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.FIXED,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2520,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.BROADCASTING,label:LEGEND.SKY_TO_LAND.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.BROADCASTING,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2535,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.RADIO_LOCATION},
          {value: 60, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 60, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2655,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.BROADCASTING,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.FIXED,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2670,
        value: 0,
        children: [
          {value: 20, legend: LEGEND.SPACE_RESEARCH},
          {value: 20, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 20, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
          {value: 20, legend: LEGEND.MOBILE,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.MOBILE,span:LEGEND.EXCEPT_AERO_MOBILE.span},
          {value: 20, legend: LEGEND.RADIO_LOCATION},
          {value: 20, legend: LEGEND.FIXED,label:LEGEND.LAND_TO_SKY.icon,span:LEGEND.SATELLITE.span},
          {value: 20, legend: LEGEND.FIXED},
        ],
      },
      {
        freq: 2690,
        value: 0,
        children: [
          {value: 60, legend: LEGEND.SPACE_RESEARCH},
          {value: 60, legend: LEGEND.RADIO_ASTRONOMY},
          {value: 60, legend: LEGEND.EARTH_EXPLORATION_SATELLITE},
        ],
      },
      {
        freq: 2700,
        value: 0,
        children: [
          {value: 240, legend: LEGEND.RADIO_LOCATION},
          {value: 240, legend: LEGEND.AERONAUTICAL_RADIO_NAVIGATION},
        ],
      },
      {
        freq: 2900,
        value: 0,
        children: [
          {value: 120, legend: LEGEND.RADIO_LOCATION},
          {value: 120, legend: LEGEND.RADIO_NAVIGATION},
        ],
      },
    ]
  };
  const dv = new DataSet.View();
  const dv2 = new DataSet.View();
  dv.source(data, {
    type: 'hierarchy',
  }).transform({
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapSliceDice',
    as: ['x', 'y'],
  });
  dv2.source(data, {
    type: 'hierarchy',
  }).transform({
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapSliceDice',
    as: ['x', 'y'],
  });
  const nodes = dv.getAllNodes();
  const nodes2 = dv.getAllNodes();
  nodes.map(node => {
    node.value = node.data.value;
    node.legend = node.data.legend != undefined ? node.data.legend : {color: '#eee'};
    return node;
  });
  nodes2.map(node => {
    node.value = node.data.value;
    node.legend = node.data.legend != undefined ? node.data.legend : {color: '#eee'};
    return node;
  });
  const position = function (n) {
    return [n.x[0],1];
  };

  export default {
    mixins: [menuShowMixin],
    components:{nav1},
    data(){
      return {
        legend:LEGEND,
        options:null,
        nodes,
        nodes2,
        data,
        data2,
        dataPre,
        dataView,
        color,
        style,
        tooltip,
        label,
        itemTpl,
        guideStyle,
        position,
      }
    },
    created(){
    },
    mounted(){
      // for (let item in LEGEND) {
      //   console.log(item,LEGEND[item]);
      // }
    },
    methods:{
      click:function(e) {
        this.$router.push({name:'StationManageShow'});
        console.log(e);
      }
    },

  }
</script>
