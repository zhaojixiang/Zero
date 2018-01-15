<template>
  <div>
    <chart :options="option" id="myChart9" :style="{width: '400px', height: '280px'}"></chart>
  </div>
</template>

<style scoped>
</style>

<script>
  export default {
    props:['option'],
    data () {
      return {
      }
    },
    mounted(){
    }
  }
</script>
