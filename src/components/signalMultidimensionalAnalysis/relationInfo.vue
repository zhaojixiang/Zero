<!--频率38.5MHz相关信息-->
<template>
<div class='relationInfo'>
  <h3 class='headerTitle'>
            频率38.5MHz相关信息
            <i class="fa fa-times" aria-hidden="true" @click="close"></i>
        </h3>
  <section class="unit_info">
    <el-row :gutter="20">
      <el-col class="subTitle">
        单位信息
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="col_flex">
        名称：{{ freqInfo.name }}
      </el-col>
      <el-col :span="12" class="col_flex">
        启用日期： {{freqInfo.date}}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="col_flex">
        发射功率： {{freqInfo.power}}
      </el-col>
      <el-col :span="12" class="col_flex">
        台站类别： {{freqInfo.type}}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="col_flex">
        技术体制: {{freqInfo.technology}}
      </el-col>
      <el-col :span="12" class="col_flex">
        覆盖率： {{freqInfo.cover}}
      </el-col>
    </el-row>
  </section>
  <div class='cover_default'>
    <el-row :gutter="20">
      <el-col class="subTitle">
        附近固定站
      </el-col>
    </el-row>
    <el-row :gutter="0" style="marginLeft: 4px">
      <el-col :span="8" class="col_flex" v-for="(item,index) in stationInfo" :key="index">
        <a href="javascript:;" @click="showChannelUse(item)" class="clickable_col">{{ item }}</a>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script>
export default {
  props: {
    stationInfo: {
      type: Array
    },
    freqInfo: {
      type: Object
    }
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    close() {
      this.$emit("closeRelaTionInfo")
    },
    showChannelUse(param) {
      // alert(111)
      console.log(param, '9999');
      this.$emit("showChannelUse")
    }
  }
}
</script>
<style lang="less">
.relationInfo {
    width: 400px;
    height: 230px;
    border: 1px solid #4fdaff;
    box-shadow: 4px 4px 20px #888888;
    background: #fff;
    position: relative;
    .headerTitle {
        color: #fff;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        margin: 0;
        height: 40px;
        line-height: 40px;
        background: #5195d1;
        i {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }
    .unit_info {
        margin-left: 30px;
    }
    .cover_default {
        margin-left: 30px;
        margin-top: 10px;
    }
    .col_flex {
        padding: 10px 10px 0 0;
        color: #686868;
    }
    .subTitle {
        padding-top: 15px;
        color: #686868;
        font-size: 12px;
    }
    .clickable_col {
        text-decoration: underline;
        color: #686868;
    }
}
</style>
