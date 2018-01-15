<template>
  <section>
    <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
  </section>
</template>
<script>
import BarGraph from 'base/barGraph'
export default {
    data() {
       return {
            width:'500px',
            height:'300px'
       }
    },
    props:['rateCover'],
    components:{
        BarGraph
    }
}
</script>
<style>

</style>


