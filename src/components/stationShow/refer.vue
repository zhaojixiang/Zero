<template>
  <div class="refer">
    <!--相关查询-->
    <div class="top">
      <div class="toptext">
        <span class="title">相关查询</span>
      </div>
      <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>

    </div>
    <el-form :inline="true">
      <!--业务频段-->
      <section :style="{marginLeft:'35px'}">
        <div class="select">
          <el-form-item label="业务频段 :">
            <el-select v-show="!value0" @change="GetData"  size="large" v-model="value0" placeholder="请选择">
              <el-option v-for="(item,index) in Business" :key="index" :label="item.remark" :value="item">
              </el-option>
            </el-select>
            <el-tag disable-transitions v-show="!!value0" @close="clear(0)" size="large" :key="0" closable>{{value0?value0.remark:''}}</el-tag>
          </el-form-item>
        </div>
        <!--台站类别-->
        <div class="select">
          <el-form-item label="台站类别 :">
            <el-select v-show="!value2" size="large" v-model="value2" placeholder="请选择">
              <el-option v-for="(item,index) in StationTypes" :key="index" :label="item.name" :value="item">
              </el-option>
            </el-select>
            <el-tag disable-transitions v-show="!!value2" @close="clear(2)" size="large" :key="2" closable>{{value2?value2.name:''}}</el-tag>
          </el-form-item>
        </div>
        <!--技术体制-->
        <div class="select">
          <el-form-item label="技术体制 :">
            <el-select v-show="!value1" size="large" v-model="value1" placeholder="请选择">
              <el-option v-for="(item,index) in TechnologyTypes" :key="index" :label="item.name" :value="item">
              </el-option>
            </el-select>
            <el-tag disable-transitions v-show="!!value1" @close="clear(1)" size="large" :key="1" closable>{{value1?value1.name:''}}</el-tag>
          </el-form-item>
        </div>
      </section>
      <el-button type="primary" class="submit" @click="start">执行分析</el-button>
    </el-form>
  </div>
</template>
<style>
  .refer {
    width: 400px;
    background: #FEFEFE;
  }

  .refer .top {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #8F9091;
  }

  .title {
    text-indent: 23px;
    display: inline-block;
  }

  .refer .toptext {
    margin-left: 14px;
    background: url("../../assets/image/doubleArrows.png") no-repeat;
    background-position: left;
    color: #56e5ff;
    font-size: 14px;
  }

  .refer .el-form-item {
    margin-bottom: 10px;
  }

  .refer .el-form-item__label {
    color: #88898A;
    font-size: 10px;
  }

  .submit {
    display: block;
    width: 30% !important;
    margin: 10px auto;
  }

  .refer .select {
    /* float: left; */
  }

  .refer select {
    background-color: #3c78af;
    /*width: 200px;*/
    height: 30px;
    border: none;
    color: #ffffff;
    font-size: 12px;
  }

  .refer .select .el-input__inner {
    background: #EBECED;
    border-color: #EBECED;
    width: 240px;
    height: 30px;
    color: #88898A;
    font-size: 12px;
  }

  .refer .el-button--primary {
    width: 100%;
    background: #3c78af;
    border-color: #33cdfe transparent transparent transparent;
    color: #b2e0ff;
  }

  .refer .el-button {
    border-radius: none;
  }
</style>
<script>
  import {
    CID_
  } from 'assets/js/global.constant'

  export default {
    data() {
      return {
        isShow: true,
        Business: [],
        StationTypes: [],
        TechnologyTypes: [],
        value0: null,
        radio: '1',
        value1: null,
        value2: null
      }
    },
    mounted() {
      // 获取业务频段
      this.GetBusiness();
    },
    methods: {
      change: function () {
        this.isShow = !this.isShow;
      },
      GetBusiness() {
        // 获取业务频段
        this.$api.stationShow.GetBusiness().then(res => {
          this.Business = res.data;
        })
      },
      GetData(item){
        if(!item) {
          return;
        }
        let param = {
          // cid:this.$store.state.currentLocation.value,
          cid:120000,
          fBegin:item.startFreq,
          fEnd:item.stopFreq,
        };
        let p1 = param;
        let p2 = param;
        p1.technology = '';
        this.GetStationTypes(p1);
        p2.type = '';
        this.GetTechnologyTypes(p2);
      },
      GetStationTypes(param) {
        // 台站类型
        this.$api.stationShow.GetStationTypes(param).then(res => {
          this.StationTypes = res.data;
        })
      },
      GetTechnologyTypes(param) {
        // 技术体制
        this.$api.stationShow.GetTechnologyTypes(param).then(res => {
          // console.log('技术体制',res.data)
          this.TechnologyTypes = res.data;
        })
      },
      start() {
        if(!this.value0||!this.value1||!this.value2){
          this.$message.error('请先设置参数');
        }
        let param = {
          'business': this.value0,
          'type': this.value2,
          'technology': this.value1,
        };
        this.$emit('start', param)
      },
      minus() {
        this.$emit('minus');
      },
      clear(i){
        switch (i){
          case 0:
            this.value0 = null;
            break;
          case 1:
            this.value1 = null;
            break;
          case 2:
            this.value2 = null;
            break;
        }
      },

    }
  }
</script>
