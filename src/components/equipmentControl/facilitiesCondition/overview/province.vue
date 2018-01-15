<template>
  <chart :options="option" id="myChart8" :style="{width: '400px', height: '300px'}">
  </chart>
</template>

<style scoped>
  #myChart8{
    border:solid 1px #00bbff;
  }
</style>

<script>
  export default {
    name: 'hello',
    props:['option'],
    data () {
      return {

      }
    },
    mounted(){
    }
  }
</script>
