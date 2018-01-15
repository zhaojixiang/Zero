<!-- 重大活动辅助 -->
<template>
    <section class="activities">
        <nav1 @export='exportList'></nav1>
        <section style="width:98%; margin:0 auto;">


        <el-row :gutter="20" class="clear_bottom_margin20" style="margin-top:10px">
            <el-col :span="7">
              <section class="leftContent">
                <el-container class='zoneContainer'>
                    <el-header height='30' class='headerTitle'>
                        <span>
                            <img :src="icon_right_arrow" alt="right icon">
                            活动保障</span>
                        <span class='addNew' @click="addNewAct">+新增</span>
                    </el-header>
                    <el-main class='cover_default'>
                        <activities :data='activitiesData' @deleteItem='deleteAct'></activities>
                    </el-main>
                </el-container>
                <!-- 区域选择 -->
                <el-container class='zoneContainer'>
                    <el-header height='30' class='headerTitle'>
                        <span><img :src="icon_right_arrow" alt="right icon">
                        区域选择</span>
                        <span class='addNew' @click="addNewZone">+新增</span>
                    </el-header>
                    <el-main class='cover_default'>
                        <zones-choice :isClick='true' :zonesData='zonesData' @deleteItem='deleteZone' @edit_rate='edit_rate' @edit_part='edit_part'></zones-choice>
                    </el-main>
                </el-container>
                <!-- 异常信号提取 -->
                <el-container class='zoneContainer'>
                    <el-header height='30' class='headerTitle'>
                        <span>
                          <img :src="icon_right_arrow" alt="right icon">
                        异常信号提取
                        </span>
                    </el-header>
                    <el-row class='main-title'>
                        <el-col :span="8" class='title_item'>频率(MHz)</el-col>
                        <el-col :span="8" class='title_item'>带宽(KHz)</el-col>
                        <el-col :span="8" class='title_item'>功率(dPμV)</el-col>
                    </el-row>
                    <el-main class='cover_default'>
                        <!-- 异常信号提取-列表数据 -->
                        <error-signl :errorInfo='errorInfo'></error-signl>
                    </el-main>
                </el-container>
              </section>
            </el-col>
            <el-col :span="10">
                <leaflet style='height:552px;'></leaflet>
            </el-col>
            <el-col :span="7">
              <section class="rightContent">
                <el-container class='right_container'>
                    <el-header class='headerTitle' style="height:40px;line-height:40px">
                        <span>
                            <img :src="icon_right_arrow" alt="right icon">
                        频率覆盖率及频段占用度
                        </span>
                        <span >
                          <el-radio-group v-model="radio">
                            <el-radio :label="1" style='color:#fff;font-size:12px'>活动前最近30天</el-radio>
                            <el-radio :label="2" style='color:#fff;font-size:12px; margin-left:10px;'>活动期间</el-radio>
                          </el-radio-group>
                        </span>
                    </el-header>
                    <el-main class='cover_default right_main_top'>
                      <!-- 频率覆盖率 -->
                        <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
                        <!-- 频段占用度 -->
                        <bar-graph :width='width' :height='height' style="position:relative;top:-3em;" :rateCover='ratePartCover'></bar-graph>
                    </el-main>
                </el-container>
                <el-container style='position:relative;top:-78px;border-top:none;height:140px;' class='zoneContainer'>
                    <el-header height='30' class='headerTitle'>
                        <span>信号提取</span>
                    </el-header>
                    <el-row class='main-title'>
                        <el-col :span="8" class='title_item'>频率(MHz)</el-col>
                        <el-col :span="8" class='title_item'>带宽(KHz)</el-col>
                        <el-col :span="8" class='title_item'>功率(dPμV)</el-col>
                    </el-row>
                <!-- 信号提取 列表数据 -->
                    <el-main style="padding:0 20px;">
                        <signl-get :info='infoData'></signl-get>
                    </el-main>
                </el-container>
              </section>
            </el-col>
        </el-row>
        <el-row class='clear_bottom_margin20 clear_bottom'>
            <el-col :span="24">
                <span class="bottom_right" @click='openHours'>
                    {{openHour?'收起小时用度':'展开小时用度'}}
                    <i :class="[openHour?'el-icon-arrow-up':'el-icon-arrow-down','el-icon--right']"></i>
                </span>
                <!-- 信道占用度 柱状图 -->
                <bar-graph :rateCover='transactionBarData' :width='width' height='300px'></bar-graph>
                <!-- 热力图 -->
                <highcharts height='450px' :data='highchartData' v-if='openHour'></highcharts>
            </el-col>
        </el-row>
        <!-- 弹框效果 -->
        <el-dialog
          :title='edit_addNew.newTitle'
          :visible.sync="dialog_show"
          :width="dialog_width"
          :close-on-click-modal='false'
          :center='true'
          @close='dialog_close'
          >
          <!-- 新增活动 -->
          <section v-if="edit_addNew.addNewAct_" class="dialog_class" :style="{marginLeft:edit_addNew.leftMargin}">
            <el-form :model="form_Act_data" :inline="true">
                <el-form-item :label="form_Act_data.label_name">
                  <el-input v-model="form_Act_data.actName"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="form_Act_data.start_time"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker
                    v-model="form_Act_data.end_time"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日">
                  </el-date-picker>
                </el-form-item>
            </el-form>
          </section>
          <!-- 编辑频率 -->
          <section v-else-if="edit_addNew.edit_rate"  class="dialog_class">
            <list-manage :data='rate_data' :listManage='edit_addNew.list_manage' @dialog_deleteItem='dialog_deleteItem'></list-manage>
            <el-pagination
                style="textAlign:center;"
                small
                layout="prev, pager, next"
                :total="rate_data.length">
            </el-pagination>
          </section>
          <!-- 编辑频段 -->
          <section v-else-if="edit_addNew.edit_part"  class="dialog_class">
            <list-manage :data='part_data' :listManage='edit_addNew.list_manage' @dialog_deleteItem='dialog_deleteItem'></list-manage>
            <el-pagination
                style="textAlign:center;"
                small
                layout="prev, pager, next"
                :total="part_data.length">
            </el-pagination>
          </section>
          <!-- 区域 -->
          <section v-else class="dialog_class">
            zone
          </section>
          <!-- 内联 弹框  -->
          <el-dialog
            width="30%"
            :title="inner_dialog.inner_dialog_title"
            :visible.sync="inner_dialog.innerVisible"
            :center='true'
            append-to-body>
            <!-- 内联弹框 频率新增 -->
            <section style="marginLeft:70px;" v-if="edit_addNew.edit_rate">
              <el-form :model="inner_dialog" :inline='true'>
                <el-form-item label="中心频点(MHz)">
                <el-input v-model="inner_dialog.inner_center_rate"></el-input>
                </el-form-item>
                <el-form-item label="信号带宽(KHz)">
                  <el-input v-model="inner_dialog.inner_signal_part"></el-input>
                </el-form-item>
              </el-form>
            </section>
            <!-- 内联弹框 频段新增 -->
            <section v-else  class="inner_dialog_part">
              <el-form :model="inner_dialog" :inline='true'>
                <el-form-item label="开始频率(MHz)">
                  <el-input v-model="inner_dialog.inner_center_part"></el-input>
                </el-form-item>
                <el-form-item label="结束频率(MHz)">
                  <el-input v-model="inner_dialog.inner_signal_part"></el-input>
                </el-form-item>
                <el-form-item label="频率步进(KHz)">
                  <el-input v-model="inner_dialog.inner_center_part"></el-input>
                </el-form-item>
                <el-form-item label="信号门限(dB)">
                  <el-input v-model="inner_dialog.inner_signal_part"></el-input>
                </el-form-item>
                <el-radio-group v-model="inner_dialog.isAuto">
                  <el-radio :label="1">自动门限</el-radio>
                  <el-radio :label="2">直线门限</el-radio>
                </el-radio-group>
              </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
              <el-button @click="inner_dialog_click_N">取 消</el-button>
              <el-button type="primary" @click="inner_dialog_click_Y">确 认</el-button>
            </span>
          </el-dialog>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_click_N">{{edit_addNew.edit?'关 闭':'取 消'}}</el-button>
            <el-button type="primary" @click="dialog_click_Y">{{edit_addNew.edit?'新 增':'确 认'}}</el-button>
          </span>
        </el-dialog>
      </section>
    </section>
</template>
<script>
import nav1 from "components/equipmentControl/common/Nav1";
import Activities from "components/activitiesSupport/activitiesSupport";
import ErrorSignl from "components/activitiesSupport/errorSignl";
import SignlGet from "components/activitiesSupport/signalGet";
import ZonesChoice from "components/activitiesSupport/zonesChoice";
import BarGraph from "base/barGraph";
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet";
import Highcharts from "base/highCharts";
import ListManage from "views/activitiesSupport/listManage";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import highchartOption from "assets/js/chartOptions/highchartOption";
import { menuShowMixin } from "assets/js/mixin";
import * as Global_ from "assets/js/global";
export default {
  mixins: [menuShowMixin],
  data() {
    return {
      openHour: false,
      edit_addNew: {
        addNewAct_: false,
        edit: false,
        edit_part: false,
        edit_rate: false,
        newTitle: "Music",
        list_manage: "rate_manage",
        leftMargin: "0px",
      },
      form_Act_data: {
        label_name: "活动名称",
        actName: "成都大型会展",
        start_time: "",
        end_time: ""
      },
      inner_dialog: {
        inner_dialog_title: "",
        innerVisible: false,
        inner_center_rate: "",
        inner_signal_part: "",
        isAuto:1
      },
      dialog_show: false,
      icon_right_arrow: Global_.right_arrow,
      radio: 1,
      width: "100%",
      dialog_width: "30%",
      height: "210px",
      highchartData: {},
      transactionBarData: {},
      activitiesData: [],
      zonesData: [],
      errorInfo: [],
      infoData: [],
      rateCover: {},
      ratePartCover: {},
      rate_data: [
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
          {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
          {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        }
      ],
      part_data: [
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
          {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
          {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        },
        {
          start: 80,
          end: 108,
          step: 200,
          door: 69,
          option: "delete"
        }
      ]
    };
  },
  methods: {
    // 新增活动
    addNewAct() {
      // console.log("add new actions");
      this.edit_addNew.newTitle = "新增活动";
      this.dialog_show = true;
      this.edit_addNew.addNewAct_ = true;
      this.dialog_width = "30%";
      this.edit_addNew.leftMargin = "70px";
    },
    // 新增区域
    addNewZone() {
      console.log("add new zones");
    },
    // 编辑频率
    edit_rate(item) {
      // alert('rate clicked')
      this.edit_addNew.newTitle = "频点管理";
      this.dialog_show = true;
      this.edit_addNew.edit_rate = true;
      this.edit_addNew.list_manage = 'rate_manage'
      this.dialog_width = "40%";
      this.edit_addNew.leftMargin = "0px";
      this.edit_addNew.edit = true;
    },
    // 编辑频段
    edit_part(item) {
      // alert('port clicked')
      this.edit_addNew.newTitle = "频段管理";
      this.dialog_show = true;
      this.edit_addNew.edit_part = true;
      this.edit_addNew.list_manage = 'port_manage'
      this.dialog_width = "40%";
      this.edit_addNew.leftMargin = "0px";
      this.edit_addNew.edit = true;
    },
    // 外层对话框 确定按钮事件
    dialog_click_Y() {
      if (this.edit_addNew.edit) {
        if (this.edit_addNew.list_manage === "port_manage") {
          this.edit_addNew.edit_part = true;
          this.inner_dialog.inner_dialog_title = "新增频段";
        } else {
          this.edit_addNew.edit_rate = true;
          this.inner_dialog.inner_dialog_title = "新增频点";
        }
        this.inner_dialog.innerVisible = true;
        return;
      }
      this.dialog_show = false;
      this.$message({
        type: "success",
        message: "新增成功!"
      });
    },
    // 内层对话框 确定按钮事件
    inner_dialog_click_Y() {
      // alert("inner dialog click ensure");
      this.inner_dialog.innerVisible = false;
    },
    // 外层对话框 取消按钮事件
    dialog_click_N() {
      this.dialog_show = false;
      if (this.edit_addNew.edit) {
        return;
      }
      this.$message({
        type: "info",
        message: "已取消新增"
      });
    },
    // 内层对话框 取消按钮事件
    inner_dialog_click_N() {
      // alert("inner dialog click cancel");
      this.inner_dialog.innerVisible = false;
    },
    // 对话框关闭回掉
    dialog_close() {
      // alert('dialog close')
      this.edit_addNew.edit_part = false;
      this.edit_addNew.edit_rate = false;
      this.edit_addNew.addNewAct_ = false;
      this.inner_dialog.innerVisible = false;
    },
    // 删除对话框中 列表数据某一项
    dialog_deleteItem(item) {
      console.log(item);
    },
    // 删除活动列表某一项
    deleteAct(item) {
      this.$confirm("你是否已经确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除区域列表某一项
    deleteZone(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    exportList() {
      console.log("export click");
    },
    // 展开小时用度
    openHours() {
      this.openHour = !this.openHour;
      console.log("Open Hours Use");
    },
    initPagesData() {
      this._getActivitiesLists();
      this._getZonesLists();
      this._getErrorInfo();
      this._getInfoData();
      this._getRateCover();
      this._getRatePrartCover();
      this._getChannelUsed();
    },
    // 头部导航导出数据
    exportList() {
      console.log("export click");
    },
    // 底部 展示隐藏 小时数据详细热力图
    openHours() {
      this.openHour = !this.openHour;
      // console.log("Open Hours Use");
    },
    // 获取活动列表数据
    _getActivitiesLists() {
      this.$http.get("api/GetActivitiesLists").then(res => {
        res.data.forEach(item => {
          this.activitiesData.push({
            desc: item.name,
            date: item.date,
            delete: true,
            mark:'2'
          });
        });
      });
    },
    // 获取区域列表数据
    _getZonesLists() {
      this.$http.get("api/GetZonesLists").then(res => {
        res.data.forEach(item => {
          this.zonesData.push({
            desc: item.name,
            showEdit: item.showEdit,
            delete: true,
            mark:'2'
          });
        });
      });
    },
    // 获取异常信号列表数据
    _getErrorInfo() {
      this.$http.get("api/GetErrorInfo").then(res => {
        res.data.forEach(item => {
          this.errorInfo.push({
            desc: item.rate,
            date: item.bandWidth,
            delete: false,
            power: item.power,
            mark:'3'
          });
        });
      });
    },
    // 获取信号提取列表数据
    _getInfoData() {
      this.$http.get("api/GetInfo").then(res => {
        res.data.forEach(item => {
          this.infoData.push({
            desc: item.rate,
            date: item.bandWidth,
            delete: false,
            power: item.power,
            mark:'3'
          });
        });
      });
    },
    // 获取频率覆盖率列表数据
    _getRateCover() {
      this.$http.get("api/GetRateCover").then(res => {
        this.rateCover = normalizeBarOption({
          title: "频率覆盖率",
          series_data: res.data,
          xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["频率覆盖率"]
        });
      });
    },
    // 获取频段占用度列表数据
    _getRatePrartCover() {
      this.$http.get("api/GetRatePartCover").then(res => {
        this.ratePartCover = normalizeBarOption({
          title: "频段占用度",
          series_data: res.data,
          xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["频段占用度"]
        });
      });
    },
    // 获取信道占用度数据
    _getChannelUsed() {
      this.$http.get("api/GetChannelUsed").then(res => {
        this.transactionBarData = normalizeBarOption({
          title: "信道占用度",
          series_data: res.data.data1,
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
        this.highchartData = highchartOption({
          title: "",
          series_data: res.data.data2,
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#4fdaff",
          legend_data: ["信道占用度"]
        });
      });
    },

  },
  mounted() {
    this.initPagesData();
  },
  components: {
    Activities,
    ErrorSignl,
    SignlGet,
    ZonesChoice,
    BarGraph,
    Highcharts,
    Leaflet,
    nav1,
    ListManage
  }
};
</script>
<style>
/* .el-row {
  margin-bottom: 20px;
} */
.activities .clear_bottom_margin20 {
  margin-bottom: 0;
}
.activities .clear_bottom {
  margin-top: 10px;
  /* margin-bottom: 10px; */
  /* padding-bottom: 10px; */
  border: 1px solid #4fdaff;
  background-color: rgba(0,0,0,0.2);
}
.activities .el-col {
  border-radius: 4px;
}
.activities .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.activities .headerTitle {
  color: #4fdaff;
  display: flex;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  justify-content: space-between;
}
.activities .addNew {
  font-size: 12px;
  color: yellow;
  cursor: pointer;
}
.activities .addNew:hover {
  animation: myfirst 1s linear;
}
.activities .leftContent{
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #4fdaff;
  background-color: rgba(0,0,0,0.2);
}
.activities .zoneContainer {
  height: 15em;
  overflow: hidden;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.5em 0 0 0;
}
.activities .rightContent{
  height: 550px;
  border: 1px solid #4fdaff;
  background-color: rgba(0,0,0,0.2);
}
.activities .right_container {
  /* margin: 0.5em 0 0 0.5em; */
  /* padding: 0.5em 0 0 0; */
}
.activities .right_main_top {
  /* top: -39px;
  position: relative; */
}
.activities .cover_default {
  padding: 0 1em;
}
.activities .main-title {
  /* width: 100%; */
  /* display: flex; */
  color: #fff;
  /* position: relative; */
  padding: 0.5em 2em;
}
.activities .title_item {
  /* width: 30.33%; */
  text-align: center;
}
.activities .right_bottom_list {
  height: 15em;
  overflow: hidden;
}
.activities .clear_bottom_margin20 .bottom_right {
  position: absolute;
  right: 5em;
  top: 1em;
  color: yellow;
  text-align: right;
  cursor: pointer;
  z-index: 99;
}
.activities .el-message-box,
.activities .el-dialog,
.activities .el-dialog--center {
  background-color: #5195d1;
  width: 300px;
  border: none;
}
.activities .el-message-box--center {
  padding-bottom: 20px;
}
.activities .el-button--primary {
  background-color: #fff;
  color: #409eff;
}
.activities .el-message-box__content,
.activities .el-dialog__title,
.activities .el-form-item__label {
  color: #fff;
}
.activities .el-message-box__header,
.activities .el-dialog__header {
  border-bottom: 1px solid #fff;
}
.activities .el-message-box--center .el-message-box__header {
  padding-top: 20px;
}
.activities .el-message-box__headerbtn .el-message-box__close,
.activities .el-message-box__title,.activities .el-radio,.el-radio__input.is-checked+.el-radio__label,
.activities .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-size: 12px;
}
.activities .el-radio__label{
  font-size: 12px;
}
.activities .dialog_class {
  display: flex;
  flex-direction: column;
  justify-content: left;
  /* margin-left: 70px; */
}
.activities .inner_dialog_part .el-form--inline .el-form-item{
  width: 200px;
}
.activities .inner_dialog_part .el-form--inline .el-form-item__content{
  width: 90px;
}
::-webkit-scrollbar {
  display: none;
}
@keyframes myfirst {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}
</style>
