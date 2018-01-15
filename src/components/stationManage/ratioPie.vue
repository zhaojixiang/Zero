<template>
    <chart :options="option" :style="setting"></chart>
</template>
<style scoped>
</style>
<script>
  export default {
    props: ['option','data','setting'],
    data: function() {
      return {
      }
    }
  }
</script>
