<template>
  <chart :options="option" id="myChart3" :style="setting" @click="select">
  </chart>
</template>
<style scoped>
</style>
<script>
  export default {
    props:['setting','option'],
    data () {
      return {
      }
    },
    methods:{
      select:function(e){
        this.$emit('select',e);
      }
    }
  }
</script>
