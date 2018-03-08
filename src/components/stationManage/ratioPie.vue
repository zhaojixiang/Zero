<template>
    <chart class="ratio" :options="option" :style="setting"></chart>
</template>
<style scoped>
  .ratio {
    color: #8F9091;
  }
</style>
<script>
  export default {
    props: ['option','setting']
  }
</script>
