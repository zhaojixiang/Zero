<template>
  <div class="station">
    <div>
      <h2>台站信息</h2>
      <!--<i class="fa fa-times"></i>-->
      <table>
        <tr>
          <td>名称 : 成都零点监测站</td>
          <td>启用日期 : 2017.1.01</td>
        </tr>
        <tr>
          <td>台站类别 : 固定站</td>
          <td>发射功率 : 200kb</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
  .station{
    background: #5294d1;
  }
.station h2{
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  border-bottom:  solid 1px #fff;
  height: 50px;
  line-height: 50px;
  width: 325px;
  text-align: center;
}
  .station table{
    width: 90%;
    margin: 0 auto;
  }
  .station table tr{
    height: 30px;
    line-height: 30px;
  }
  .station i{
    position: absolute;
    top: 2px;
    right: 2px;
  }
  .station .arrow{
    display: inline-block;
    border: solid 10px;
    border-color: #5294d1 transparent transparent transparent;
    position: absolute;
    bottom: -20px;
    left: 48%;
  }
</style>
<script>
  export default {
    dara(){
      return{

      }
    }
  }
</script>
