<!-- 频谱评估分析 新建任务 -->
<template>
<section id="newTask">
  <!-- 头部导航 -->
  <nav1 :navBarTitleShow='true' :navBarTitle='navBarTitle' :exportListShow="false" :provinceShow="false"/>
  <section class="container">
    <!-- 任务名称 选择日期  -->
    <el-form :model="formData" ref="form" :rules="rules" class="topInput">
      <el-form-item label="任务名称:" style="width:18%" prop="taskName">
        <el-input size="mini" v-model="formData.taskName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="选择日期:" style="width:35%" prop="daterange">
        <el-date-picker v-model="formData.daterange" value-format="yyyy-MM-dd" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="省(自治区):" style="width:25%" prop="value">
        <el-select @change="provinceChange" v-model="formData.value" size="mini" placeholder="请选择">
          <el-option v-for="(item,index) in province" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="content">
      <div class="leftContent">
        <h3>城市</h3>
        <el-checkbox-group v-model="checkCity" style="font-size:10px">
          <table style="width:93%;margin:0 15px">
            <tr v-for="(item,index) in city" :key="index" style="height:26px;line-height:26px">
              <td>
                <el-checkbox :label="item.name">{{item.name}}</el-checkbox>
              </td>
              <td :style="{textAlign:'right',cursor:'pointer',color:item.task=='暂无'||item.task=='业务频段0个'?'#686868':'#0693ec'}" @click="details(item.name,item.data)">{{item.task=='业务频段0个'?'暂无':item.task}}</td>
            </tr>
          </table>
        </el-checkbox-group>
      </div>

      <div class="rightContent">
        <h3>业务频段</h3>
        <p class="checkAll">
          <el-checkbox v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
        </p>
        <el-collapse v-model="activeNames" @change="handleChange" style="margin-bottom: 60px">
          <!-- 广播电视 -->
          <el-collapse-item name="1">
            <span style="display:inline-block;marginLeft:20px;" slot="title"><el-checkbox v-model="checkBroadCast" @change="checkBroadCastChange" style="color:##0f95e7">广播电视</el-checkbox></span>
            <el-collapse v-model="activeNames" @change="handleChange">
              <!-- 边境地区 -->
              <el-collapse-item name="3">
                <span style="display:inline-block;marginLeft:44px;" slot="title"><el-checkbox v-model="checkAllBrim" @change="checkAllBrimChange">边境地区</el-checkbox></span>
                <el-row style="marginLeft:44px;">
                  <el-checkbox-group v-model="checkBrim">
                    <el-col v-for="(item,index) in brim" :key="index" :span="8">
                      <el-checkbox :label="item">{{item}}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-row>
              </el-collapse-item>
              <!-- 内陆地区 -->
              <el-collapse-item name="4">
                <span style="display:inline-block;marginLeft:44px;" slot="title"><el-checkbox v-model="checkAllContinent" @change="checkAllContinentChange">内陆地区</el-checkbox></span>
                <el-row style="marginLeft:44px;">
                  <el-checkbox-group v-model="checkContinent">
                    <el-col v-for="(item,index) in continent" :key="index" :span="8">
                      <el-checkbox :label="item">{{item}}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
          <!-- 基站 -->
          <el-collapse-item name="2">
            <span style="display:inline-block;marginLeft:20px;" slot="title"><el-checkbox v-model="checkAllStation" @change="checkAllStationChange" style="color:#0f95e7">基站</el-checkbox></span>
            <el-row style="marginLeft:44px;">
              <el-checkbox-group v-model="checkStation">
                <el-col v-for="(item,index) in station" :key="index" :span="8">
                  <el-checkbox :label="item">{{item}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <!-- 确认按钮 -->
        <div style="text-align:center;position:absolute;bottom:20px;left:50%;marginLeft:-62px">
          <el-button type="primary" size="mini" @click="submit">确认</el-button>
          <el-button @click="clearAll" size="mini">清空</el-button>
        </div>
      </div>
    </div>
    <!-- 详细业务频段弹框 -->
    <el-dialog :modal="false" :visible.sync="dialogTableVisible">
      <span slot="title" style="font-size:14px;display:inline-block;width:100%;text-align:center;color: #fff">{{alertCity}}业务频段</span>
      <el-row style="background:#fff;width:300px">
        <el-col :span="24" v-for="(item,index) in alertFreq" :key="index" style="height:30px;line-height:30px;text-align:center">
          {{item}}
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 提交按钮 -->
    <div style="text-align:center;position:absolute;bottom:20px;left:50%;marginLeft:-62px">
      <el-button type="primary" size="mini" @click="submitTask">提交任务</el-button>
    </div>
  </section>
</section>
</template>

<style lang='less'>
#newTask {
    .container {
        background: #f5f5f5;
        min-height: 610px;
        position: relative;
        padding-bottom: 60px;
        .topInput {
            padding: 10px 0 0 80px;
            display: flex;
            justify-content: flex-start;
            .el-input {
                width: 60%;
            }
            .el-form-item__label {
                font-size: 12px;
            }
        }
        .content {
            padding: 0;
            margin: 0 20px;
            display: flex;
            justify-content: space-between;
            h3 {
                font-size: 12px;
                font-weight: normal;
                text-align: center;
                margin: 0;
                height: 30px;
                line-height: 30px;
                background: #2ba0ea;
                color: #fff;
            }
            .leftContent {
                background: #fff;
                min-height: 300px;
                width: 30%;
                margin-right: 20px;
            }
            .rightContent {
                background: #fff;
                min-height: 500px;
                width: 70%;
                position: relative;
                .checkAll {
                    position: absolute;
                    left: 20px;
                    top: 5px;
                    .el-checkbox__input.is-checked+.el-checkbox__label {
                        color: #fff;
                    }
                    .el-checkbox {
                        color: #fff;
                    }
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        background-color: #fff;
                    }
                    .el-checkbox__inner::after {
                        border: 1px solid #000;
                        border-top: 0;
                        border-left: 0;
                    }
                }
                .el-collapse-item__content {
                    padding: 0;
                }
            }
        }
        .alert {
            max-height: 300px;
            background: #fff;
            border: solid 1px #35ccff;
            position: absolute;
            left: 50%;
            margin-left: -150px;
            top: 180px;
            z-index: 2;
            overflow: auto;
            i {
                position: absolute;
                right: 10px;
                top: 10px;
                color: #fff;
                cursor: pointer;
            }
            h3 {
                font-size: 12px;
                font-weight: normal;
                text-align: center;
                margin: 0;
                height: 30px;
                width: 300px;
                line-height: 30px;
                background: #2ba0ea;
                color: #fff;
            }
        }
    }
    .el-checkbox__label {
        font-size: 12px !important;
    }
    .el-dialog__body{
      max-height: 300px;
      overflow: auto;
      font-size: 12px;
    }
    .el-dialog{
      width: 25%;
    }
    .el-form-item__error {
        margin-left: 70px;
    }
    .el-checkbox-group {
        text-align: left;
    }
    .el-dialog__close{
      color: #fff;
    }
    // ::-webkit-scrollbar {
    //     display: none;
    // }
}
</style>

<script>
import {
  menuShowMixin
} from "assets/js/mixin";
import nav1 from "components/equipmentControl/common/Nav1.vue";
export default {
  data() {
    return {
      formData: {
        taskName: '',
        daterange: '',
        value: ''
      },
      rules: {
        taskName: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        daterange: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        value: [{
          required: true,
          message: '请选择省份',
          trigger: 'blur'
        }]

      },
      navBarTitle: '新建任务',
      checked: true,
      checkCity: [],
      province: [],
      city: [],
      addFreq: '未添加频段任务',
      activeNames: ['1'],
      brim: [],
      continent: [],
      station: [],
      checkAll: false,
      showAlert: false,
      checkAllBrim: false,
      checkAllContinent: false,
      checkAllStation: false,
      checkBroadCast: false,
      checkBrim: [],
      checkContinent: [],
      checkStation: [],
      task: [],
      taskArray: [],
      taskArray1: [],
      alertCity: {},
      alertFreq: [],
      allTaskData: [],
      dialogTableVisible: false
    }
  },
  components: {
    nav1
  },
  mounted() {
    // 加载省份
    this.getProvince()
    // 获取业务频段
    this.businessFreq()
  },
  mixins: [menuShowMixin],
  methods: {
    // 获取省份
    getProvince() {
      let params = {
        taskName: this.formData.taskName,
        StartTime: this.formData.daterange[0],
        StopTime: this.formData.daterange[1]
      }
      this.$api.spectrumEvaluation.GetProvinceList().then(res => {
        let {
          success,
          data,
          message
        } = res
        if (success) {
          if (data) {
            this.province = data
          } else {
            this.$message({
              type: 'warning',
              message: mag
            })
          }
        }
      })
    },
    // 获取城市
    provinceChange(province) {
      this.task=[]
      this.checkCity = []
      this.clearAll()
      let params = {
        provinceName: province
      }
      this.$api.spectrumEvaluation.GetCityList(params).then(res => {
        let {
          success,
          data,
          msg
        } = res
        // console.log(data,'777777777777');
        if (success) {
          if (data) {
            this.city = []
            Object.values(data).forEach((item) => {
              // console.log(item,'88888888888888');
              // if (this.task.length) {
              //   this.task.forEach((datas) => {
              //     this.city.push({
              //       name: item,
              //       task: datas.data==item ? datas.data.length : '暂无'
              //     })
              //     // console.log(datas,'999999999');
              //   })
              // } else {
                this.city.push({
                  name: item,
                  task: '暂无',
                  data: []
                })
              // }
            })
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        }
      })
    },
    // 获取业务频段
    businessFreq() {
      this.$api.spectrumEvaluation.GetBandList().then(res => {
        let {
          success,
          data,
          message
        } = res
        if (success) {
          if (data) {
            this.brim = data['border']
            this.continent = data['inland']
            this.station = data['station']
          } else {
            this.$message({
              type: 'warning',
              message: mag
            })
          }
        }
      })
    },
    // 任务详情
    details(city, task) {
      if (task.length) {
        this.dialogTableVisible = true
        this.alertCity = city
        this.alertFreq = task
      } else {
        this.$message({
          type: 'warning',
          message: '还没有添加任务哦'
        })
      }
    },
    closeAlert() {
      this.showAlert = false
    },
    handleChange(val) {
    //   console.log(val);
    },
    // 全选
    checkAllChange(val) {
      if (val) {
        this.checkBroadCast = true
        this.checkAllStation = true
        this.checkAllStation = true
        this.checkBroadCastChange(true)
        this.checkAllStationChange(true)
      } else {
        this.checkBroadCast = false
        this.checkAllStation = false
        this.checkAllStation = false
        this.checkBroadCastChange(false)
        this.checkAllStationChange(false)
      }
    },
    // 选择广播电视
    checkBroadCastChange(val) {
      if (val) {
        this.checkAllBrim = true
        this.checkAllContinent = true
        this.checkAllBrimChange(true)
        this.checkAllContinentChange(true)
      } else {
        this.checkAllBrim = false
        this.checkAllContinent = false
        this.checkAllBrimChange(false)
        this.checkAllContinentChange(false)
      }
    },
    // 边境地区全选
    checkAllBrimChange(val) {
      // console.log(val,'-------');
      this.brim.forEach((item) => {
        if (val) {
          this.checkBrim.push(item)
        } else {
          this.checkBrim = []
        }
      })
    },
    // 内陆地区全选
    checkAllContinentChange(val) {
      this.continent.forEach((item) => {
        if (val) {
          this.checkContinent.push(item)
        } else {
          this.checkContinent = []
        }
      })
    },
    // 基站全选
    checkAllStationChange(val) {
      this.station.forEach((item) => {
        if (val) {
          this.checkStation.push(item)
          // console.log(this,'\\\\\\\\');
        } else {
          this.checkStation = []
        }
      })
    },
    // 提交单个任务
    submit() {
      console.log(this.checkCity, '99999999');
      if (this.checkCity.length) {
        let b = []
        this.task.forEach((q) => {
          if (b.indexOf(q.name) == -1) {
            b.push(q.name)
          }
        })
        this.taskArray = []
        // this.taskArray 当前选中业务频段
        this.taskArray = this.taskArray.concat(this.checkBrim, this.checkContinent, this.checkStation)
        // this.checkCity 当前选中的城市
        this.checkCity.forEach((item) => {
          // this.task 所有新建的任务
          // 如果this.task中有数据执行下一步
          // console.log(item,'0000');
          if (this.task.length) {
            // console.log(b,item,'11111111');
            if (b.includes(item)) {
              this.task.forEach((datas) => {
                if (item == datas.name) {
                  // alert(222)
                  datas.data.push(...this.taskArray)
                  datas.data = Array.from(new Set(datas.data))
                }
              })
            } else {
              // alert(111)
              this.task.push({
                'name': item,
                'data': this.taskArray
              })
            }
          } else {
            // alert(333)
            this.task.push({
              'name': item,
              'data': this.taskArray
            })
          }
        })
        this.taskArray = []
        // console.log(this.task, '-------')
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择城市'
        })
      }
      // 再次去重
      this.task.forEach((it)=>{
        it.data = Array.from(new Set(it.data))
        // console.log(it.data,'000000');
      })
      this.getAllTaskData()
    },
    // 将task中的数据添加到city中
    getAllTaskData() {
      // console.log(this.city,this.task,'666666666666666');
      this.city.forEach((item) => {
        this.task.forEach((datas) => {
          // console.log(item,'11111111111111');
          // console.log(datas.name==item.name,'========');
          if (item.name == datas.name) {
            item.data = datas.data
            item.task = `业务频段${item.data.length}个`
          }
        })
      })
    },
    // 提交已经添加的任务
    submitTask() {
      console.log(this.task,'000000000000');
      this.$refs['form'].validate((valid) => {
         if (valid) {
           if (this.task.length) {
             this._submit()
           }else{
             this.$message({
               type: 'warning',
               message: '还没有添加任何任务哦'
             })
           }
         } else {
           this.$message({
             type: 'warning',
             message: '还没有填完哦'
           })
           return false;
         }
       })
    },
    _submit(){
      let params = {
        TaskName: this.formData.taskName,
        StartTime: this.formData.daterange[0],
        StopTime: this.formData.daterange[1],
        QuestionTask: this.task,
        ProvinceName: this.formData.value
      }
      this.$api.spectrumEvaluation.NewTask(params).then(res => {
        let {
          success,
          data,
          msg
        } = res
        if (success) {
          if (data) {
            this.$router.back('indexNew')
            // console.log(data,'-------');
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        }else{
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    // 清空
    clearAll() {
      this.checkAll = false
      this.checkAllChange(false)
    }
  }
}
</script>
