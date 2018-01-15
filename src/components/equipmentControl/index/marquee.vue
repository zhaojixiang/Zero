<template>
  <div id="app">
    <div class="marquee-wrap" style="width: 300px;"><vue-marquee style="font-size:6px; color: #fdff35;" speed="slow" :content="content" class="two"  :showtwo="false"></vue-marquee></div>
  </div>
</template>
<style scoped>
  vue-marquee span{
    font-size: 16px !important;
  }
</style>
<script>
  import VueMarquee from 'vue-marquee-ho'
  import '../../../assets/css/vue-marquee.min.css'
  export default {
    name: 'app',
   props: ['content'],
    data(){
      return {
      }
    },
    components: {
      'vue-marquee': VueMarquee
    },
    mounted(){
    }
  }
</script>
