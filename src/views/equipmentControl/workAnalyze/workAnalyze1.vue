<template>
  <!--主要内容盒子-->
  <div class="content">
    <!--上面部分内容-->
    <div class="top">
      <!--左边内容-->
      <div class="left">
        <!--饼图-->
        <analyzePie/>
        <!--轮播-->
        <slider1 class="slider1"/>
      </div>
      <!--中间内容-->
      <div class="center">
        <map2/>
        <div class="check">
          <input type="checkbox">监测范围
          <input type="checkbox">频谱地图
        </div>
        <div class="mapbg">
          <p>建站时间 : 2017/8/7 累计运行时间 : 7200小时</p>
          <p>本次开始时间 : 2017/10/17 8:00 本次运行时间 : 7200小时</p>
        </div>
      </div>
      <!--右边内容-->
      <div>
        <div class="right">
          <div>
            <span>>>相关工作</span>
            <span>
            <input type="radio" name="pin">频段
            <input type="radio" name="pin">频点
          </span>
          </div>
          <div>
            <p>开始频率 : <input type="text"></p>
            <p>结束频率 : <input type="text"></p>
          </div>
          <div>频段步进 : <input type="text"></div>
          <div>事件范围 : <input type="date">至<input type="date"></div>
          <div>执行分析</div>
        </div>
        <p class="analyzeBar">
          <analyzeBar/>
          <a>详情</a>
        </p>
      </div>

    </div>
    <!--下面内容-->
    <div class="bottom">
      <div class="bleft">
        <p>>>当前报警</p>
        <table>
          <tr>
            <th>时间</th>
            <th>级别</th>
            <th>内容</th>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
        </table>
      </div>
      <div class="bleft">
        <p>>>最近报警</p>
        <table>
          <tr>
            <th>时间</th>
            <th>级别</th>
            <th>内容</th>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
          <tr>
            <td>2017-10-01</td>
            <td>严重</td>
            <td>导致系统无法读取到文件最新格式，不能解析该文本内容，你可以通过修改系统设置来解决。</td>
          </tr>
        </table>
      </div>



    </div>
  </div>
</template>
<style scoped>
  .bottom{
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
  .bottom p{
    height: 50px;
    line-height: 50px;
    text-indent: 10px;
    color: #56e5ff;
    font-size: 16px;
    font-weight: bold;
  }
  .bottom .bleft{
    width: 49%;
    color: #fff;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
  }
  table{
    width: 96%;
    margin: 0 auto 40px;
  }
  table th{
    color: #a8cbed;
    text-align: center;
  }
  table td{
    text-align: center;
  }
  table tr{
    white-space:nowrap;
  }
  .content {
    position: relative;
    width: 98%;
    height: 600px;
    margin: 20px auto 0px;
    padding-bottom: 20px;
  }
  .top{
    display: flex;
    justify-content: space-between;
  }
  .slider1{
    margin-left: 35px;
  }
  /*左边内容*/
  .left{
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    width: 400px;
  }






  /*中间内容*/
.center{
  width: 700px;
  height: 568px;
  border:solid 1px #0078A8;
  position: relative;
}
.center .check{
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  color: #fff;
  width: 250px;
  height: 35px;
  line-height: 35px;
  background: rgba(63,142,193,0.8);
  position: absolute;
  bottom: 0;
  right: 0;
  z-index:2000;
}
  .center .check input{
    vertical-align: -2px;
    margin-right: 2px;
    width: 14px;
    background: #ffffff;
  }
/*右边内容*/
  .right {
    padding-top: 4px;
    width: 400px;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
    /*height: 600px;*/
  }
  .right div{
    height: 40px;
    line-height: 40px;
  }
  .right div:first-child input{
    width: 20px;
    vertical-align: -5px;
    margin-right: 2px;
  }
  .right div:first-child{
    display: flex;
    justify-content: space-between;
    width:94%;
    margin:0 auto;
  }
.right div:first-child span{
  color: #56e5ff;
  font-size: 16px;
  font-weight: bold;
}
  .right div:first-child lable{
    color: #fff;
    font-size: 14px;
  }
  .right div:nth-of-type(2){
    display: flex;
    justify-content: space-between;
  }
  .right div:nth-of-type(3),.right div:nth-of-type(2),.right div:nth-of-type(4){
    color: #b7dbfd;
    font-size: 12px;
    width:84%;
    margin:0 auto;
  }
  .right div:nth-of-type(4) input{
    width: 120px;
    color: #ffffff;
  }
  .right div:nth-of-type(4){
    margin-bottom: 15px;
  }
  .right div:nth-of-type(5){
    font-size: 16px;
    color: #b7dbfd;
    text-align: center;
    border-top:solid 1px #2fc3ff;
    background: #2b73a2;
  }
  .right input{
    border: none;
    width: 100px;
    height: 20px;
    background: #3c78af;
    color: #fff;
  }
  .analyzeBar{
    margin-top: 25px;
    background-color: rgba(0,0,0,0.2);
    border:solid 1px #00bbff;
  }
  .analyzeBar a{
    color: #fdff35;
    position: relative;
    top: -282px;
    right: -365px;
    text-decoration: underline;
  }
  .mapbg{
    color: #e8f04d;
    font-size: 14px;
    padding-left: 40px;
    height: 80px;
    line-height: 30px;
    width: 58%;
    position: relative;
    top: -544px;
    left: 85px;
    background: url("../../../assets/image/mapbg.png");
    background-size: cover;
    z-index: 1199;
  }
  .mapbg p:first-child{
    padding-top: 10px;
  }

  /*.city {*/
  /*padding: 10px 0 0 0;*/
  /*}*/
  /*#map2{*/
    /*display: flex;*/
    /*height: 600px;*/
    /*width: 65%;*/
    /*background: rgba(0,0,0,0.5);*/
    /*border: solid 1px blanchedalmond;*/
    /*position: absolute;*/
    /*top: 0px;*/
    /*right: 0%;*/
    /*z-index: 98;*/
    /*margin-left: 40px;*/
  /*}*/
  .close {
    display: block;
    width: 30px;
    height: 20px;
    z-index: 1000;
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
    font-size: 24px;
  }
</style>
<script>
  import analyzePie from '../../../components/equipmentControl/workAnalyze/analyzePie.vue'
  import slider1 from '../../../components/equipmentControl/workAnalyze/slider1.vue'
  import analyzeBar from '../../../components/equipmentControl/workAnalyze/analyzeBar.vue'
  import map2 from '../../../components/equipmentControl/facilitiesCondition/overview/leaflet.vue'

  export default {
    data() {
      return {
      }
    },
    components: {
      analyzePie,
      map2,
      slider1,
      analyzeBar
    },

    methods:{
    }
  }


</script>
