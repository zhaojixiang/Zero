<template>
  <div class="max2">
    <span class="triangle"></span>
    <span @click="close" class="close"><i class="el-icon-close"></i></span>
    <!-- <img src="../../../assets/image/close.png" @click="close" > -->
    <h3>{{relTitle}}</h3>
    <div class="list">
      <ul>
        <li v-for="(d,index) in relData">
          <template v-if="index < 3">
            <img :src="'/static/img/icon'+(index+1)+'.png'" > {{d.name}} 密度值 : {{d.value}}/平方公里
          </template>
          <template v-else>
            <span>{{ index+1 }} </span> {{d.name}} 密度值 : {{d.value}}/平方公里
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  ul,li,h3{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h3{
    color: #e8f04d;
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    margin : 20px auto 10px;
  }
  ul{
    width: 500px;
    height: 400px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
  }
  span{
    margin-right: 10px;
    display: inline-block;
  }
  li{
    height:30px;
    line-height:30px;
    margin-left: 40px;
  }
  .max2{
    display: block;
    width: 500px;
    background: #5294d1;
  }
  .max2>img{
    position: relative;
    top: 0;
    right: -487px;
    cursor: pointer;
  }
  .list{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .triangle{
    display: inline-block;
    border-top: 18px solid transparent;
    border-right: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-left: 18px solid #5294d1;
    position: absolute;
    top: 48%;
    right: -46px;
  }
  img
  {
    position: relative;
    top: 4px;
  }
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    margin-right: 0px;
    cursor: pointer;
  }
</style>

<script>
  export default {
    props:['title','data'],
    data () {
      return {
        relTitle:'',
        relData:'',
      }
    },
    mounted () {
    },
    methods: {
      close: function () {
        $('.max2').fadeOut(500);
      }
    },
    watch:{
      "title":function(val){
        this.relTitle = val;
      },
      "data":function(val){
        this.relData = val;
      },
    },
  }
</script>
