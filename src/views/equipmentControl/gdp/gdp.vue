<template>
  <div class="hello">
    <gdp/>
  </div>


</template>

<style scoped>
  .hello {
    color: #fff;
  }
</style>

<script>
  import gdp from './gdp1.vue'
  export default {
    name: 'hello',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {},
    components: {gdp}
  }
</script>
