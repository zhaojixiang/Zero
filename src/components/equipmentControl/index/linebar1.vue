<template>
  <div class="double">
    <chart @click="select" :options="lineOption" id="myChart4" :style="setting"></chart>
    <chart :options="barOption" id="myChart5" :style="setting"></chart>
  </div>
</template>
<style scoped>
  .double {
    height: 430px;
  }
  .double #myChart5 {
    position: relative;
    top: -90px;
  }
  .double #murquee{
    position: relative;
    top: -150px;
    left: 39px;
  }
</style>
<script>
  export default {
    props:['setting','barOption','lineOption'],
    data () {
      return {
      }
    },
    methods:{
      select:function(e) {
        this.$emit('select',e);
      }
    }
  }
</script>
