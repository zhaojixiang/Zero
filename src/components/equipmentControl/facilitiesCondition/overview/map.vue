<template>
  <div class="max">
    <chart :options="option" @click="click" id =myChart :style="{width: '500px', height: '600px'}"></chart>
  </div>
</template>

<style scoped>
  .max{
    height: 600px;
  }
  #mapAlert{
    width: 200px;
    height: 200px;
    background: rgba(76, 162, 240, 0.7);
    position: relative;
  }
</style>

<script>
export default {
    props:['option'],
    data: function () {
      return {
      }
    },
    methods:{
      click: function(e){
        if(e.componentType === "series") {
          this.$store.state.locationLevel = 1;
          this.$store.state.currentLocation = {
            code:e.data.code,
            name:e.data.name,
            value:e.data.code,
            latitude:e.data.value[1],
            longitude:e.data.value[0],
          };
        }
        this.$emit('select',e);
      }
    }
  }
</script>
