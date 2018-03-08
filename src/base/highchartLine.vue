<template id="highcharts">
    <highcharts ref="linechart" id="container" :options='options' :style="{height:'400px',width:'800px'}"></highcharts>
</template>

<script>
export default {
  props:['options']
}
</script>

<style>
#container {
  height: 230px;
}
</style>
