<template>
  <div class="hello">
    <people/>
  </div>
</template>

<style scoped>
  .hello {
    color: #fff;
  }
</style>

<script>
  import people from './people1.vue'
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {},
    components: {people}
  }
</script>
