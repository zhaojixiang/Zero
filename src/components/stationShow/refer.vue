<template>
  <div class="refer">
    <!--相关查询-->
    <div class="top">
      <div class="toptext">
        相关查询
      </div>
    </div>
    <el-form :style="{marginLeft:'35px'}" :inline="true">
      <!--业务频段-->
      <div class="select">
        <el-form-item label="业务频段 :">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <!--技术体制-->
      <div class="select">
        <el-form-item label="技术体制 :">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <!--台站类别-->
      <div class="select">
        <el-form-item label="台站类别 :">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </div>
      <!--台站性质-->
      <div class="select">
        <el-form-item label="台站性质 :">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </div>
    </el-form>

    <!--执行分析-->
    <button class="button">
      执行分析
    </button>
  </div>
</template>
<style>
  .refer{
    /*width: 500px;*/
  }
  .refer .top{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }
  .refer .toptext{
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    text-indent: 23px;
    color: #56e5ff;
    font-size: 14px;
  }
  .refer .el-form-item{
    margin-bottom: 10px;
  }
  .refer .el-form-item__label{
    color: #a7c9e9;
    font-size: 10px;
  }
  .refer .select{
    float: left;
  }
  .refer select{
    background-color: #3c78af;
    width: 200px;
    height: 30px;
    border: none;
    color: #ffffff;
    font-size: 12px;
  }
  .refer .button{
    font-size: 16px;
    color: #a7c9e9;
    text-align: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    border-top: solid 1px #33cdfe;
    border-bottom: none;
    border-left: none;
    border-right: none;
    background: #3c78af;
  }
  .refer .select .el-input__inner{
    background: #3c78af;
    border-color: #68a6df;
    width: 140px;
    height: 30px;
    color: #ffffff;
    font-size: 12px;
  }


</style>
<script>
  export default {
    data () {
      return {
        isShow: true,
//        选择频段
        options: [{
          value: '选项1',
          label: '88-108MHz 广播'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        radio: '1',
        value1: '',
        value2: ''
      }
    },
    methods:{
      change:function () {
        this.isShow=!this.isShow;
      }
    }
  }
</script>
