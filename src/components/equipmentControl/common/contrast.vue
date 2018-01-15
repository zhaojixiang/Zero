<template>
    <chart :options="contrastOption" :style="setting"></chart>
</template>
<style scoped>
</style>
<script>
  export default {
    props:['setting', 'contrastOption'],
    data () {
      return {
      }
    }
  }
</script>
