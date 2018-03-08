<!-- 信号多维分析-相关分析 -->
<template>
<div class='analysisRelevant'>
  <span @click="minus" class="minus"><i class="el-icon-minus i-minus"></i></span>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="相关分析" :disabled="true" name="first">
      <span slot="label"><img :src="icon_right_arrow" alt="right icon">
            相关分析</span>
    </el-tab-pane>
    <!-- 自定义频段 -->
    <el-tab-pane label="自定义频段" name="second">
      <el-form :model="form_data.custom" ref="customForm" :rules="customRules">
        <div class="topInput">
          <el-form-item label-width="90px" label="开始频率(MHz) :" prop="startFreq">
            <el-input size="mini" placeholder="请输入内容" v-model="form_data.custom.startFreq"></el-input>
          </el-form-item>

          <el-form-item label-width="90px" label="结束频率(MHz) :" style="margin-right:15px;" prop="stopFreq">
            <el-input size="mini" :maxlength='10' placeholder="请输入内容" v-model="form_data.custom.stopFreq">
            </el-input>
          </el-form-item>
        </div>
        <div class="autoInput">
          <el-form-item label-width="90px" label="频段步进(KHz) :" prop="stepFreq">
            <el-input size="mini" :maxlength='10' placeholder="请输入内容" v-model="form_data.custom.stepFreq">
            </el-input>
          </el-form-item>
        </div>
        <div class="dbuvInput">
          <el-form-item label-width="90px" label="信号门限(dBuv) :" class="dBuv" prop="threshold">
            <el-input size="mini" :maxlength='10' placeholder="请输入内容" v-model="form_data.custom.threshold">
            </el-input>
          </el-form-item>
          <div style="margin-right: 15px;">
            <el-radio-group v-model="form_data.custom.thresholdType">
              <el-radio label="1" style='color:#fff;'>自动门限</el-radio>
              <el-radio label="2" style='color:#fff;marginLeft:42px'>直线门限</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 选择日期 -->
        <el-form-item prop="daterange" style="marginLeft:34px;height:85px">
          <span class="headerTitle timeTitle">
            时间范围
          </span >
          <el-date-picker
          v-model="form_data.custom.daterange"
          type="daterange"
          size="mini"
          format= "yyyy年MM月dd日"
          value-format= "yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- 频率 -->
    <el-tab-pane label="频率" name="third">
      <el-form :model="form_data.frequency" ref="freqFrom" :rules="freqRules">
      <div class="centerInput">
        <el-form-item label-width="90px" label="中心频率(MHz) :" prop="freq">
          <el-input size="mini" :maxlength='10' placeholder="请输入内容" v-model="form_data.frequency.freq">
          </el-input>
        </el-form-item>
        <el-form-item label-width="90px" label="信号带宽(KHz) :" style="margin-right:10px" prop="bandwidth">
          <el-input size="mini" :maxlength='10' placeholder="请输入内容" v-model="form_data.frequency.bandwidth">
          </el-input>
        </el-form-item>
      </div>
        <!-- 选择日期 -->
        <el-form-item prop="daterange" style="marginLeft:34px;height:85px">
          <span class="headerTitle timeTitle">
            时间范围
          </span >
          <el-date-picker
          v-model="form_data.frequency.daterange"
          type="daterange"
          size="mini"
          format= "yyyy年MM月dd日"
          value-format= "yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <div class="time">
    <div class="block">
      <el-form :model="form_data" ref="times" :rules="timeRules">

      </el-form>
          </div>
        </div>
        <div class="relevantButton">
          <!-- <el-form-item> -->
            <el-button @click="do_analysis()" type="primary" size='mini'>执行分析</el-button>
          <!-- </el-form-item> -->
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName2: "second",
      value: '',
      name: '自定义频率',
      ruleForm: {
        region: ''
      },
      form_data: {
        custom: {
          startFreq: '88',
          stopFreq: '108',
          stepFreq: '100',
          threshold: '3',
          thresholdType: "1",
          daterange: ''
        },
        frequency: {
          freq: '88',
          bandwidth: '100',
          daterange: ''
        },
      },
      customRules: {
        startFreq: [{
          required: true,
          message: '请填写频率',
          trigger: 'blur'
        }],
        stopFreq: [{
          required: true,
          message: '请填写频率',
          trigger: 'blur'
        }],
        stepFreq: [{
          required: true,
          message: '请填写频段',
          trigger: 'blur'
        }],
        threshold: [{
          required: true,
          message: '请填写信号门限',
          trigger: 'blur'
        }],
        daterange: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      freqRules: {
        freq: [{
          required: true,
          message: '请填写频率',
          trigger: 'blur'
        }],
        bandwidth: [{
          required: true,
          message: '请填写带宽',
          trigger: 'blur'
        }],
        daterange: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      timeRules: {
        daterange: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods: {
    do_analysis() {
      let data
      if (this.activeName2 == 'second') {
        this.$refs['customForm'].validate((valid) => {
          if (valid) {
            data = this.form_data.custom
            this.$emit('do_analysis', data, this.activeName2)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '还没有填完哦~',
              type: 'warning'
            })
            return false
          }
        })
      } else {
        this.$refs['freqFrom'].validate((valid) => {
          if (valid) {
            data = this.form_data.frequency
            this.$emit('do_analysis', data, this.activeName2)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '还没有填完哦~',
              type: 'warning'
            })
            return false
          }
        })
      }
    },
    handleClick(tab, event) {
      this.form_data.name = tab.lable
    },
    minus() {
      this.$emit("minus")
    }
  }
};
</script>
<style>
.analysisRelevant {
  background: #fff;
  border: solid 1px #31ccff;
  box-shadow: 4px 4px 20px #888888;
  width: 450px;
}

.relevantButton {
  width: 100;
  text-align: center;
}

.analysisRelevant .minus {
  position: absolute;
  right: 16px;
  cursor: pointer;
  color: #2774A5;
  font-size: 16px;
  top: 11px;
  z-index: 1001;
}

.analysisRelevant .headerTitle {
  color: #4fdaff;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

/* 开始频率  结束频率 */

.analysisRelevant .topInput,
.analysisRelevant .dbuvInput,
.analysisRelevant .autoInput {
  margin-left: 32px;
  justify-content: space-between;
  display: flex;
  height: 57px;
  line-height: 40px;
}

.analysisRelevant .topInput span,
.analysisRelevant .dbuvInput>.dBuv span,
.analysisRelevant .autoInput div:nth-of-type(1) span {
  display: inline-block;
  min-width: 90px;
  text-align: left;
}

/* 时间 */

.analysisRelevant .time,
.analysisRelevant .centerInput {
  margin-left: 32px;
  justify-content: space-between;
  display: flex;
  margin-right: 5px;
}

/* 中心频率 */

.analysisRelevant .centerInput {
  height: 57px;
  line-height: 40px;
}

.analysisRelevant .cover_default1 {
  color: #fff;
  position: relative;
}

.analysisRelevant .el-main {
  padding: 0;
}

.analysisRelevant .timeTitle {
  /* margin: 5px 33px; */
  display: block;
  color: #686868;
  font-size: 10px;
}

/* .analysisRelevant {
  height: 332px;
  overflow: hidden;
  border: 1px solid #4fdaff;
  background: rgba(0,0,0,0.2);
} */

.analysisRelevant .el-form-item__label {
  color: #686868;
  text-align: left;
  font-size: 10px;
  padding-right: 4px;
}

.analysisRelevant .el-form-item {
  width: 170px;
  margin-bottom: 10px;
}

.analysisRelevant .el-button--mini {
  width: 38%;
  background-color: #64a6d1;
  margin: 8px 0 5px;
  /* height: 39px; */
  font-size: 16px;
  /* position: absolute;
    bottom: 0; */
}

.analysisRelevant .el-button {
  border-color: #33ccff transparent transparent transparent;
}

.analysisRelevant .topInput .el-input,
.analysisRelevant .autoInput .el-input,
.analysisRelevant .dbuvInput .el-input {
  width: 80px;
}

.analysisRelevant .time .el-input {
  width: 72%;
}

.analysisRelevant .centerInput .el-input {
  width: 80px;
}

.analysisRelevant .el-input__inner {
  /* background-color: #ececec; */
  color: #686868;
  /* border: solid 1px #67a3dc; */
}

.analysisRelevant .el-date-editor .el-range-input {
  /* background-color: #ececec; */
}

.analysisRelevant .el-form--inline .el-form-item__content {
  width: 70px;
}

.analysisRelevant .el-form--inline .el-form-item {
  /* margin-left: 25px; */
}

.analysisRelevant .el-tabs__item.is-disabled {
  color: #2b70aa;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border-radius: 0px;
  border-top: none;
}

::-webkit-scrollbar {
  display: none;
}

.analysisRelevant .topInput,
.analysisRelevant .dbuvInput,
.analysisRelevant .autoInput,
.analysisRelevant .cover_default1,
.analysisRelevant .topInput span,
.analysisRelevant .dbuvInput span,
.analysisRelevant .autoInput div:nth-of-type(1) span {
  color: #686868;
  font-size: 10px;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #686868;
}
</style>
