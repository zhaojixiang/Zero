<template>
  <chart @click="select" :options="option" id =myChart1 :style="setting"></chart>
</template>

<style scoped>
  #myChart1{
  }
</style>

<script>
  export default {
    props:['setting','option'],
    data: function () {
      return {
      }
    },
    methods:{
      select:function(e){
        this.$emit('select',e);
      }
    },
  }
</script>
