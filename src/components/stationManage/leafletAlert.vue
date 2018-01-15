<template>
  <div class="leafletPopup">
    <h3>附近固定站</h3>
    <p @click='show'>成都零点监测站</p>
    <p>南充嘉陵监测站</p>
    <p>成华区卧龙监测站</p>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    show () {
      this.$emit('showSpectra')
    }
  }
}
</script>

<style>
.leafletPopup h3,.leafletPopup p {
  margin: 0;
}
.leafletPopup{
  width: 200px;
  height: 100px;
  background: #5294d1;
}
.leafletPopup h3{
  font-weight: normal;
  color: #fff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #fff;
}
.leafletPopup p{
  color: #fdff35;
  text-align: center;
  text-decoration: underline;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
}
.leaflet-popup-content-wrapper, .leaflet-popup-tip{
  background: #5294d1;
}
</style>
