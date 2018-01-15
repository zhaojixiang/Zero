<template id="highcharts">
    <section id="container"  :style="{'height':'400px','width':'800px'}"></section>
</template>

<script type="text/ecmascript-6">
import Highcharts from 'highcharts'
import nomarlize from "assets/js/chartOptions/highchartLineOption";
export default {
  // props:['data'],
  data() {
    return {
        data:{}
    };
  },
  methods: {
    initData() {
        var n = 500000,
        data = getData(n);
        this.data = nomarlize(data)
        Highcharts.chart('container',this.data)
    }
  },
  mounted() {
      this.initData()
  },
  components: {}
};

function getData(n) {
  var arr = [],
    i,
    a,
    b,
    c,
    spike;
  for (i = 0; i < n; i++) {
    if (i % 100 === 0) {
      a = 2 * Math.random();
    }
    if (i % 100 === 0) {
      b = 2 * Math.random();
    }
    if (i % 100 === 0) {
      c = 2 * Math.random();
    }
    if (i % 100 === 0) {
      spike = 2 * Math.random();
    } else {
      spike = 0;
    }
    arr.push([i, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
  }
  return arr;
}
</script>

<style>
#container {
  height: 230px;
}
</style>
