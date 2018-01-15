<template>
  <chart :options="option" id="myChart9" :style="{width: '400px', height: '600px'}">
  </chart>
</template>

<style scoped>
</style>

<script>
  export default {
    name: 'hello',
    props:['option'],
    data () {
      return {

      }
    }
  }
</script>
