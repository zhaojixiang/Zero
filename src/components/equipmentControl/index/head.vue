<template>
  <div id="wrapper">
    <!--页头-->
    <div class="header" id="header">
        <div class="h-date">
            <span>{{ year }}年</span>
            <span>{{ month }}月{{ date }}日 {{ houres }}:{{ minutes}}</span>
        </div>
      <router-link to="/">
        <div class="h-title">
            无线电大数据智能挖掘分析平台-{{headerTitle}}
        </div>
      </router-link>
        <div class="h-user">
            <img src="" alt="">
            <span>sdfds@qq.com</span>
            <span style="padding:0 5px;">|</span>
            <span class="logout">退出</span>
        </div>
    </div>
  </div>
</template>
<style>
  #wrapper{
    background: url("../../../assets/image/bigBg.png");
  }
  .header {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    border-bottom:solid 1px #00bbff;
    background-color: rgba(0,0,0,0.2);
    line-height: 60px;
    color: #fff;
  }
  .h-date {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    width: 120px;
    margin: auto 0;
    text-align: center;
  }
  .h-user .h-date {
    font-size: 12px;
  }
  .h-title {
    font-size: 20px;
    color: #4FDAFF;
  }
  .logout {
    color: red;
    cursor:pointer;
  }
</style>
<script>
import { headerTitle } from "assets/js/mixin";
export default {
  name: 'wrapper',
  components: {},
  mixins:[headerTitle],
  data() {
    return {
      year:'',
      month:'',
      date:'',
      minutes:'',
      houres:'',
      seconds:'',
      title:''
    }
  },
  mounted() {
    // setInterval(this.clock,1000);
    this.clock();
  },
  methods:{
    clock() {
      var time=new Date();
      this.year = time.getFullYear()
      this.month = (time.getMonth() + 1).toString().padStart(2,'0')
      this.date = time.getDate().toString().padStart(2,'0')
      this.minutes = time.getMinutes().toString().padStart(2,'0')
      this.houres = time.getHours().toString().padStart(2,'0');
      this.seconds = time.getSeconds().toString().padStart(2,'0')
      setTimeout(this.clock,1000)
    }
  }
}
</script>
