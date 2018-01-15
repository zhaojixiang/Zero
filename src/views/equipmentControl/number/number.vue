<template>
  <div class="hello">
    <number1/>
  </div>
</template>

<style scoped>
  .hello {
    color: #fff;
  }
</style>

<script>
  import number1 from './number1.vue'
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {},
    components: {number1}
  }
</script>
