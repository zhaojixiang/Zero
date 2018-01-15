<template>
  <div id="slider">
    <div class="title">>>站点运行情况</div>
    <div class="title1">
      <ul>
        <li>站名: 成都零点监测站</li>
        <li>型号: A1</li>
        <li>负责人: 陈先生</li>
      </ul>
      <ul>
        <li>厂家: 成都零点科技有限公司</li>
        <li>类型: 固定站</li>
        <li>建设时间: 2017.11.10</li>
      </ul>
    </div>
    <carousel class="index-carousel" :navigationClickTargetSize="8" :autoplay="true" :minSwipeDistance="40"
              :autoplayTimeout="4000" :scrollPerPage="true" :speed="2000" paginationActiveColor="#fff"
              :navigationEnabled="true" navigationPrevLabel="<i style='font-size:20px;color:#fff' class='el-icon-arrow-left'></i>"
              navigationNextLabel="<i style='font-size:20px;color:#fff' class='el-icon-arrow-right'></i>"
              :paginationEnabled="false" :perPage="1" :paginationSize="10" :loop="true">
      <slide><img :style="{width:'330px'}" src="../../../assets/image/banner.png"></slide>
      <slide><img :style="{width:'330px'}" src="../../../assets/image/banner.png"></slide>
      <slide><img :style="{width:'330px'}" src="../../../assets/image/banner.png"></slide>
      <slide><img :style="{width:'330px'}" src="../../../assets/image/banner.png"></slide>
    </carousel>
  </div>

</template>

<script>
  import {Carousel, Slide} from 'vue-carousel'

  export default {
    data () {
      return {
        list:[],
      }
    },
    mounted() {
    },
    components: {Carousel, Slide}
  }
</script>

<style scoped>
  .title1 ul{
    color: #fff;
    padding: 0;
    margin-right: 30px;
  }
  .title1 ul li{
    list-style: none;
    height: 20px;
    line-height: 20px;
  }
  /*slide{*/
    /*width: 330px;*/
    /*!*height: 50px;*!*/
  /*}*/
  .index-carousel{
    width: 330px;
    height: 150px;
  }

  /*slide img{*/
    /*width: 300px;*/
    /*!*height: 50px;*!*/
  /*}*/

  .title {
    font-size: 16px;
    color: #56e5ff;
    font-weight: bold;
    text-align: left;
    margin-left: -30px;
  }
  .title1{
    display: flex;
    justify-content: flex-start;
  }
#slider carousel{
  color: #fff !important;
}
  a.VueCarousel-navigation-prev{
    color: #fff !important;
  }

</style>
