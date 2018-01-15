<template>
  <chart :options="rateCover" id="myChart9" :style="{width: width, height: height}">
  </chart>
</template>
<style scoped>
</style>

<script>
  export default {
    props:{
      rateCover:{
        type:Object
      },
      width:{
        type:String
      },
      height:{
        type:String,
        default:'180px'
      }
    }
  }
</script>
