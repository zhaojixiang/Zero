<template>
<div :style="setting">
  <chart :options="option" id="myChart" :style="setting"></chart>
  <ul class="legend">
    <template v-for="item in data">
      <li><span class="block" :style="{'background-color':item.color}"></span><span>{{item.name}}（{{item.value}}个）</span></li>
      <li v-if="item.childs!=undefined" v-for="child in item.childs"><span class="block block-child" :style="{background:child.color}"></span><span>{{child.name}}（{{child.value}}个）</span></li>
    </template>
  </ul>
</div>
</template>
<style scoped>
li {
  padding: 2px;
  font-size: 8px;
  list-style: none;
  text-align: left;
}

.max .legend li:nth-of-type(2),
.max .legend li:nth-of-type(3),
.max .legend li:nth-of-type(4) {
  padding-left: 25px;
}

.legend {
  width: 160px;
  position: relative;
  top: -85%;
  left: -5%;
}
#myChart {

}
.block {
  display: inline-block;
  margin-right: 7px;
  width: 8px;
  height: 8px;
}
.block-child {
  margin-left: 16px;
}
</style>

<script>
export default {
  props: ['option','data','setting','child'],
  data: function() {
    return {

    }
  },
  mounted() {

  },
  methods:{
    // getChildData:function(){
    //   for (var i = 0; i < this.data.length; i++) {
    //     if(this.data[i].child != undefined) {
    //       return this.data[i].child;
    //     }
    //   }
    // },
  },
}
</script>
