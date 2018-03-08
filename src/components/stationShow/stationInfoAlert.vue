<template>
<div class="stationInfoAlert">
  <!--<transition name="slide-fade">-->
    <div class="stationInfoAlertLeft" v-show="!inputShow">
      <h3>频率信息</h3>
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th>台站名称</th>
              <th>中心频率(MHz)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in stationInfoAlertData" :key="index" @click="stationDetail(item)">
              <td>{{item.name}}</td>
              <td>{{item.centerFreq}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <!--</transition>-->
  <!-- 详细信息 -->
  <!--<transition name="slide-fade">-->
    <div class="stationInfoAlertLeft" v-show="inputShow">
      <h3>台站信息</h3>
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th>台站名称</th>
              <th>中心频率(MHz)</th>
              <th>开始时间</th>
              <th>lanuchPower</th>
              <th>bw</th>
              <th>height</th>
              <th>mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{Detail.name}}</td>
              <td>{{Detail.centerFreq}}</td>
              <td>{{Detail.startTime}}</td>
              <td>{{Detail.lanuchPower}}</td>
              <td>{{Detail.bw}}</td>
              <td>{{Detail.height}}</td>
              <td>{{Detail.mode}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit" :loading="loading">返回</el-button>
      </div>
    </div>
  <!--</transition>-->
  <!-- 编辑 -->
  <!-- <transition name="slide-fade"> -->
    <!-- <el-form class="stationInfoAlertRight" v-model="stationForm" v-show="inputShow"> -->
      <!-- <h3>台站显示</h3>
    <div class="clear">
      <p class="float">台站名称 : <el-input v-model="stationForm.name" placeholder="请输入内容"></el-input></p>
      <p class="float">台站类别 : <el-input v-model="stationForm.type" placeholder="请输入内容"></el-input></p>
      <p class="float">设台时间 : <el-input v-model="stationForm.time" placeholder="请输入内容"></el-input></p>
    </div> -->
      <!-- <h3>频率信息</h3> -->
      <!-- <div class="tab"> -->
        <!-- <table> -->
          <!-- <thead>
            <tr>
              <th>台站名称</th>
              <th>中心频率(MHz)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </td>
              <td>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </td>
            </tr>
          </tbody>
        </table> -->
        <!-- <div class="block">
          <el-pagination layout="prev, pager, next" :total="50">
          </el-pagination>
        </div> -->
      <!-- </div>
      <el-button type="primary" @click="submit" :loading="loading">提交</el-button> -->
      <!-- <h3 style="color: #fff72f;border-bottom:none;cursor:pointer" @click="submit">提交</h3> -->
    <!-- </el-form> -->
  <!-- </transition> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      inputShow: false,
      input: '',
      alertList: [],
      Detail: {},
      stationList: {
        name: '广州广播电台',
        center: 88.5,
        band: 200
      },
      stationForm: {
        name: '',
        type: '',
        time: '',
        center: -1,
        band: -1,
        power: -1,
        way: ''
      },
      loading: false
    }
  },
  props: [
    'stationInfoAlertData'
  ],
  methods: {
    change() {
      this.inputShow = !this.inputShow;
      this.stationForm = this.stationList;
    },
    submit() {
        this.loading = false;
        this.stationList = this.stationForm;
        this.inputShow = !this.inputShow
    },
    stationDetail(params){
      let param = {
        guid: params.guid
      }
      this.$api.stationShow.GetDetailInfo(param).then(res=>{
        this.Detail = res.data
      })
      this.inputShow = !this.inputShow
    }
  },
  mounted() {}
}
</script>

<style scoped>
.stationInfoAlert {
  background: #FEFEFE;
  color: #8F9091;
  min-height: 200px;
}

.leaflet-popup-content {
  margin: 0;
}

.stationInfoAlert h3 {
  text-align: center;
  font-weight: normal;
  border-bottom: 1px solid #fff;
  margin: 0;
  padding: 8px 0;
}

.leaflet-popup-content p {
  margin: 10px 0;
}

.stationInfoAlert .float {
  float: left;
  width: 50%;
}

.stationInfoAlert .clear {
  overflow: hidden;
  /* width: 90%; */
  border-bottom: 1px solid #fff;
  margin: 0 auto;
  padding: 0 10px;
}

.stationInfoAlert table {
  width: 100%;
  text-align: center;
  max-height: 150px;
  padding: 5px 10px 30px;
}

.stationInfoAlert table thead th {
  font-weight: normal;
}

.stationInfoAlert table tbody tr {
  height: 20px;
  line-height: 20px;
}

.stationInfoAlert .tab {
  border-bottom: 1px solid #fff;
  position: relative;
}

.stationInfoAlert .tab .block {
  position: absolute;
  left: 18%;
  bottom: 0;
}

.stationInfoAlert .el-pagination button.disabled,
.stationInfoAlert .el-dialog,
.stationInfoAlert .el-pager li {
  background: transparent;
  color: #fff;
}

.stationInfoAlert .el-pager li.active {
  color: #fff72f;
}

.stationInfoAlert .el-icon-arrow-left:before,
.stationInfoAlert .el-icon-arrow-right:before {
  color: #fff;
}

.stationInfoAlert .el-input__inner {
  /* width: 120px; */
  height: 25px;
  background-color: #2b6ca7;
  font-size: 10px;
  color: #fff;
}

.stationInfoAlert .el-input {
  width: 67%;
}

.stationInfoAlertRight {
  position: absolute;
  top: 0px;
}

.stationInfoAlert .el-button--primary {
  width: 100%;
}

.stationInfoAlert .slide-fade-enter-active {
  transition: all .3s ease;
}

.stationInfoAlert .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.stationInfoAlert .slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.stationInfoAlertLeft .tab table {
  border-collapse: collapse;
}

.stationInfoAlertLeft .tab tbody tr:hover {
  background: rgba(225, 225, 225, 0.3);
  cursor: pointer;
}
  .submit {
    display: block;
    width: 30% !important;
    margin: 10px auto 5px auto;
  }
</style>
