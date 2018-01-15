<template>
  <div class="hello">
    <div class="box1" v-for="(p,i) in rankList">
      <h3>{{ p.name }}</h3>
      <ul>
        <li v-for="(c,index) in p.data" v-if="index < 3"><img :src="'/static/img/icon'+(index+1)+'.png'" > {{c.name}} 密度值 : {{c.value}}/平方公里</li>
      </ul>
      <span @click="show(i)">详细</span>
    </div>
    <detail :title="title" :data="data" id="detail"/>
    <detail1 :title="title" :data="data" id="detail1"/>

  </div>
</template>

<style scoped>
  ul,li,h3{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .hello {
    width: 400px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    color: #fff;
    position: relative;
  }
  h3{
    font-size: 16px;
    font-weight: normal;
    line-height: 48px;
    height: 48px;
  }
  img{
    position: relative;
    top: 4px;
  }
  li{
    line-height: 38px;
    height: 38px;
    font-size: 10px;
  }
  .box1{
    padding: 10px;
    width: 180px;
  }
  span{
    color: #e8f04d;
    display: inline-block;
    text-indent: 22px;
    cursor: pointer;
    text-decoration: underline;
  }
  #detail{
    position: absolute;
    z-index: 102;
    display: none;
  }
  #detail1{
    position: absolute;
    z-index: 102;
    display: none;
  }
</style>

<script>
  import detail from './detail.vue'
  import detail1 from './detail1.vue'
  import {dateData} from '../../../assets/js/public'
  export default {
    data () {
      return {
        rankList:[],
        title:'',
        data:[],
      }
    },
    mounted () {
      this.$http.get('api/HomePage/EquDensity',{
        procode:this.$store.state.procode,
        year:dateData.endyear
      }).then(res=>{
        this.rankList = res.data;
      });
    },
    methods: {
      show:function(i) {
        this.title = this.rankList[i].name;
        this.data = this.rankList[i].data;
        switch (i) {
          case 0:
            $('#detail1').css({'left': '-489px','top': '-57px'}).fadeIn(500).prev().fadeOut(500);
            break;
          case 1:
            $('#detail1').css({'left': '-289px','top': '-57px'}).fadeIn(500).prev().fadeOut(500);
            break;
          case 2:
            $('#detail').css({'left': '-214px','top': '-105px'}).fadeIn(500).next().fadeOut(500);
            break;
          case 3:
            $('#detail1').css({'left': '-289px','top': '142px'}).fadeIn(500).prev().fadeOut(500);
            break;
          case 4:
            $('#detail').css({'left': '-215px','top': '96px'}).fadeIn(500).next().fadeOut(500);
            break;
          default:

        }
      },
    },
    components: {
      detail,
      detail1
    }
  }
</script>
