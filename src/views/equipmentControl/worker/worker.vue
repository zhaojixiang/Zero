<template>
  <div class="hello">
    <worker1/>
  </div>


</template>

<style scoped>
  .hello {
    color: #fff;
  }
</style>

<script>
  import worker1 from './worker1.vue'
  export default {
    name: 'hello',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {},
    components: {worker1}
  }
</script>
