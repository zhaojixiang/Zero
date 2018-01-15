<template>
  <div id="slider">
    <carousel class="index-carousel" :navigationClickTargetSize="8" :autoplay="true" :minSwipeDistance="40"
              :autoplayTimeout="4000" :scrollPerPage="true" :speed="2000" paginationActiveColor="#fff"
              :navigationEnabled="true" navigationPrevLabel="<i style='font-size:20px;color:#fff' class='el-icon-arrow-left'></i>"
              navigationNextLabel="<i style='font-size:20px;color:#fff' class='el-icon-arrow-right'></i>"
              :paginationEnabled="false" :perPage="1" :paginationSize="10" :loop="true">
      <slide v-for="(v,index) in list" :key="index">
        <div class="title">{{v.name}}</div>
        <ul>
          <li v-for="(item,index) in v.data" :key="index" v-if="index < 3"><img :src="'/static/img/icon'+(index+1)+'.png'">{{item.name}}&emsp; 密度值：{{item.value}}个/百平方公里</li>
        </ul>
      </slide>
    </carousel>
  </div>

</template>

<script>
  import {Carousel, Slide} from 'vue-carousel'
  import {dateData} from '../../../assets/js/public'
  export default {
    data () {
      return {
        list:[],
        title:'固定站密度',
      }
    },
    mounted() {
      this.$http.get('api/HomePage/EquDensity',{
        procode:this.$store.state.procode,
        year:dateData.endyear,
      }).then(res=>{
        this.list = res.data;
      });
    },
    components: {Carousel, Slide}
  }
</script>

<style scoped>
  ul {
    /*padding-left: 20%;*/
  }
  #slider {
    width: 300px;
  }
  .index-carousel{
    width: 300px;
  }
  li {
    list-style: none;
    line-height: 50px;
    text-align: left;
  }

  img {
    padding-right: 20px;
    position: relative;
    top: 5px;
  }

  .title {
    /*padding-left: 12%;*/
    font-size: 14px;
    color: #E9F246;
    text-align: center;
  }
#slider carousel{
  color: #fff !important;
}
  a.VueCarousel-navigation-prev{
    color: #fff !important;
  }

</style>
