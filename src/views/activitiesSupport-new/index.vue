<!-- 重大活动辅助 -->
<template>
<section class="activities">
  <nav1 @export='exportList'></nav1>
  <section class="container">
    <div class="side-menu side_span_left">
      <span @click="fadeChange(['activities','activity'])" style="height: 120px">相关查询</span>
      <span @click="fadeChange(['activities','zonesChoice'])" style="height: 120px;">区域选择</span>
      <span @click="fadeChange(['activities','errorSignl'])" style="height: 120px;">异常信号提取</span>
    </div>
    <div class="side-menu side_span_right">
      <span @click="fadeChange(['activities','barGraph'])" style="height: 250px;">频率覆盖率及频段占用度</span>
      <span @click="fadeChange(['activities','bottomBar'])" style="height: 120px;">信道占用度</span>
    </div>
    <leaflet class="map" ref = "map"></leaflet>
    <!-- 活动保障 -->
    <VueDraggableResizable :class="['activity',fade.activities.activity?zoomInCss:zoomOutCss]" :resizable="false" :x="40" :y="0" :z="1000">
      <div class='headerTitle'>
        <span>
                            <img :src="icon_right_arrow" alt="right icon">
                            活动保障</span>
        <span class='addNew' @click="addNewAct">+新增</span>
      </div>
      <el-main class='cover_default zoneContainer' style="height:140px;marginBottom:5px;width:400px">
        <activities :data='activitiesData' @deleteItem='deleteAct'></activities>
      </el-main>
      <span @click="fadeChange(['activities','activity'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
    </VueDraggableResizable>
    <!-- 区域选择 -->
    <VueDraggableResizable :class="['activity',fade.activities.zonesChoice?zoomInCss:zoomOutCss]" :resizable="false" :x="40" :y="187" :z="1000">
      <div class='headerTitle'>
        <span><img :src="icon_right_arrow" alt="right icon">
                        区域选择</span>
        <span class='addNew' @click="addNewZone">+新增</span>
      </div>
      <el-main class='cover_default zoneContainer' style="height:140px;marginBottom:5px;width:400px;">
        <zones-choice :isClick='true' :zonesData='zonesData' @deleteItem='deleteZone' @edit_rate='edit_rate' @edit_part='edit_part'></zones-choice>
      </el-main>
      <span @click="fadeChange(['activities','zonesChoice'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
    </VueDraggableResizable>
    <!-- 异常信号提取 -->
    <VueDraggableResizable :class="['activity',fade.activities.errorSignl?zoomInCss:zoomOutCss]" :resizable="false" :x="40" :y="374" :z="1000">
      <div class='headerTitle'>
        <span>
          <img :src="icon_right_arrow" alt="right icon">
          异常信号提取
        </span>
      </div>
      <!-- <div class='main-title'> -->
      <el-row class='main-title'>
        <el-col :span="8" class='title_item'>频率(MHz)</el-col>
        <el-col :span="8" class='title_item'>带宽(KHz)</el-col>
        <el-col :span="8" class='title_item'>功率(dPμV)</el-col>
      </el-row>
      <el-main class='cover_default zoneContainer' style="height: 140px;margin-bottom:10px;width:400px;">
        <error-signl :errorInfo='errorInfo'></error-signl>
      </el-main>
      <span @click="fadeChange(['activities','errorSignl'])" class="minus"><i class="el-icon-minus i-minus"></i></span>
    </VueDraggableResizable>

    <!-- 频率覆盖率及频段占用度 -->
    <section :class="['rightContent',fade.activities.barGraph?zoomInCss:zoomOutCss]">
      <div class='right_container'>

          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
           <el-tab-pane :disabled="true" label="频率覆盖率及频段占用度" name="first">
             <span slot="label"><img :src="icon_right_arrow" alt="right icon">
             频率覆盖率及频段占用度</span>
           </el-tab-pane>
           <el-tab-pane label="活动前最近30天" name="second">
             <div class="doubleBar">
               <bar-graph width='480px' :height='height' :rateCover='rateCover'></bar-graph>
               <bar-graph width='480px' :height='height' :rateCover='ratePartCover'></bar-graph>
             </div>
           </el-tab-pane>
           <el-tab-pane label="活动期间" name="third">
             <div class="doubleBar">
               <bar-graph width='480px' :height='height' :rateCover='rateCover'></bar-graph>
               <bar-graph width='480px' :height='height' :rateCover='ratePartCover'></bar-graph>
             </div>
           </el-tab-pane>
         </el-tabs>
          <span @click="fadeChange(['activities','barGraph'])" class="minus"><i class="el-icon-minus i-minus"></i></span>

        <!-- <div class="doubleBar">
          <bar-graph :width='width' :height='height' :rateCover='rateCover'></bar-graph>
          <bar-graph :width='width' :height='height' :rateCover='ratePartCover'></bar-graph>
        </div> -->
      </div>
      <div style='position:relative;top:-10px;height:150px;'>
        <div height='30' class='headerTitle' style="margin-left:21px;border:none">
          <span>信号提取</span>
        </div>
        <!-- <div class='main-title'> -->
        <el-row class='main-title'>
          <el-col :span="8" class='title_item'>频率(MHz)</el-col>
          <el-col :span="8" class='title_item'>带宽(KHz)</el-col>
          <el-col :span="8" class='title_item'>功率(dPμV)</el-col>
        </el-row>
        <el-main class="zoneContainer" style="padding:0 20px;height:80px;">
          <signl-get :info='infoData'></signl-get>
        </el-main>
      </div>
    </section>

    <section :class="['bottomBar',fade.activities.bottomBar?zoomInCss:zoomOutCss]">
      <div class='clear_bottom_margin20 clear_bottom'>
        <span class="bottom_right" @click='openHours'>
            {{openHour?'收起小时用度':'展开小时用度'}}
            <i :class="[openHour?'el-icon-arrow-down':'el-icon-arrow-up','el-icon--right']"></i>
        </span>
        <span class="bottomTitle">
                    <img :src="icon_right_arrow" alt="right icon">
                信道占用度
                </span>
        <bar-graph :rateCover='transactionBarData' width='100%' height='250px'></bar-graph>
        <highcharts height='450px' :data='highchartData' v-if='openHour'></highcharts>
      </div>
      <span @click="fadeChange(['activities','bottomBar'])" class="minus" style="top:22px;"><i class="el-icon-minus i-minus"></i></span>

      <!-- 弹框效果 -->
      <el-dialog :title='edit_addNew.newTitle' :visible.sync="dialog_show" :width="dialog_width" :close-on-click-modal='false' :center='true' @close='dialog_close'>
        <!-- 新增活动 -->
        <section v-if="edit_addNew.addNewAct_" class="dialog_class" :style="{marginLeft:edit_addNew.leftMargin}">
          <el-form :model="form_Act_data" :inline="true">
            <el-form-item :label="form_Act_data.label_name">
              <el-input style="width:219px" v-model="form_Act_data.actName"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker v-model="form_Act_data.start_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="form_Act_data.end_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </section>
        <!-- 编辑频率 -->
        <section v-else-if="edit_addNew.edit_rate" class="dialog_class">
          <list-manage :data='rate_data' :listManage='edit_addNew.list_manage' @dialog_deleteItem='dialog_deleteItem'></list-manage>
          <el-pagination style="textAlign:center;" small layout="prev, pager, next" :total="rate_data.length">
          </el-pagination>
        </section>
        <!-- 编辑频段 -->
        <section v-else-if="edit_addNew.edit_part" class="dialog_class">
          <list-manage :data='part_data' :listManage='edit_addNew.list_manage' @dialog_deleteItem='dialog_deleteItem'></list-manage>
          <el-pagination style="textAlign:center;" small layout="prev, pager, next" :total="part_data.length">
          </el-pagination>
        </section>
        <!-- 区域 -->
        <section v-else class="dialog_class">
          zone
        </section>
        <!-- 内联 弹框  -->
        <el-dialog width="30%" :title="inner_dialog.inner_dialog_title" :visible.sync="inner_dialog.innerVisible" :center='true' append-to-body>
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
          <section v-else class="inner_dialog_part">
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
              <el-button @click="dialog_click_N">{{edit_addNew.edit?'取消':'关 闭'}}</el-button>
              <el-button type="primary" @click="dialog_click_Y">{{edit_addNew.edit?'确 认':'新 增'}}</el-button>
            </span>
      </el-dialog>
    </section>
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
import VueDraggableResizable from 'components/common/draggable'
import {
  menuShowMixin,
  animateMixin
} from "assets/js/mixin";
export default {
  mixins: [menuShowMixin, animateMixin],
  computed: {
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  data() {
    return {
      activeName2: 'second',
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
        isAuto: 1
      },
      dialog_show: false,
      radio: 1,
      width: "100%",
      dialog_width: "30%",
      height: "180px",
      highchartData: {},
      transactionBarData: {},
      activitiesData: [],
      zonesData: [],
      errorInfo: [],
      infoData: [],
      rateCover: {},
      ratePartCover: {},
      rate_data: [{
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
      part_data: [{
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
      this.$refs.map.drawPolygon();
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
            mark: '2'
          });
        });
      });
    },
    // 获取区域列表数据
    _getZonesLists() {
      console.log(1)
      this.$http.get("api/GetZonesLists").then(res => {
        res.data.forEach(item => {
          this.zonesData.push({
            desc: item.name,
            showEdit: item.showEdit,
            delete: true,
            mark: '2'
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
            mark: '3'
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
            mark: '3'
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
          title_color: "#686868",
          legend_data: ["频率覆盖率"],
          font_color: "#686868"
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
          title_color: "#686868",
          legend_data: ["频段占用度"],
          font_color: "#686868"
        });
      });
    },
    // 获取信道占用度数据
    _getChannelUsed() {
      this.$http.get("api/GetChannelUsed").then(res => {
        this.transactionBarData = normalizeBarOption({
          title: "",
          series_data: res.data.data1,
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#686868",
          legend_data: ["信道占用度"],
          legend_right: '82%',
          font_color: "#686868"
        });
        this.highchartData = highchartOption({
          title: "",
          series_data: res.data.data2,
          title_offset: "0px",
          title_top: "left",
          series_color: ["#ff8b35"],
          title_color: "#686868",
          legend_data: ["信道占用度"],
          font_color: "#686868"
        });
      });
    },
    // 频率覆盖率及频段占用度tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    }
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
    ListManage,
    VueDraggableResizable
  }
};
</script>
<style>
/* .el-row {
  margin-bottom: 20px;
} */

.activities .activity {
  background: #fff;
  border: solid 1px #39cdff;
  width: 400px;
}

.activities .container {
  position: relative;
}

.activities .minus {
  position: absolute;
  right: 14px;
  cursor: pointer;
  color: #2774A5;
  font-size: 16px;
  top: 8px;
}

.activities .side-menu {
  z-index: 1001;
  display: flex;
  flex-direction: column;
}
.activities .side_span_left{
    position: absolute;
    top: 0;
    left: 0;
}
.activities .side_span_right{
    position: absolute;
    top: 0;
    right: 0;
}

.activities .side-menu span {
  color: #fff;
  width: 20px;
  background: #2F74A1;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  letter-spacing: 5px;
  cursor: pointer;
  border-top: solid 1px #fff
}
.activities .bottomBar{
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 1002;
}
.activities .map{
  min-height: 875px;
  z-index: 999;
}
.activities .clear_bottom {
  position: relative;
  margin-top: 10px;
  padding-top: 30px;
  /* margin-bottom: 10px; */
  /* padding-bottom: 10px; */
  border: 1px solid #4fdaff;
  background-color: #fff;
}

.activities .el-col {
  border-radius: 4px;
}

.activities .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.activities .headerTitle {
  color: #2c7598;
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 10px 0 20px;
  border-bottom: solid 1px #686868;
}
.activities .radio_right{
  width: 210px;
  position: absolute;
  top: 0px;
  right: 30px;
  text-align: right;
}

.activities .addNew {
  font-size: 12px;
  color: #686868;
  cursor: pointer;
  padding-right: 50px;
}

.activities .addNew:hover {
  /* animation: myfirst 1s linear; */
}

.activities .zoneContainer {
  /* height: 15em; */
  overflow: auto;
  /* margin: 0.5em 0 0.5em 0.5em; */
  /* padding: 0.5em 0 0 0; */
}

.activities .rightContent {
  position: absolute;
  right: 40px;
  top: 0px;
  background: #fff;
  border: 1px solid #4fdaff;
  width: 500px;
  height: 583px;
  z-index: 1000;
}
.activities .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border-radius: 0px;
  border-top: none;
}
.activities .el-tabs__item.is-disabled{
  color: #2b71a5;
}
.activities .right_container {
  /* width: 400px; */
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
  color: #686868;
  /* position: relative; */
  /* padding: 5px 0.5%; */
  /* padding-top:  */
  padding-left: 4px;
  padding-bottom: 5px;
}

.activities .title_item {
  /* width: 30.33%; */
  text-align: center;

}

.activities .doubleBar {
  width: 90%;
  margin-left: 36px;
  margin-top: 20px;
}

.activities .right_bottom_list {
  height: 15em;
  overflow: hidden;
}

.activities .clear_bottom_margin20 .bottom_right {
  position: absolute;
  right: 60px;
  top: 10px;
  color: #686868;
  text-align: right;
  cursor: pointer;
  z-index: 99;
  height: 25px;
  line-height: 25px;
}

.activities .bottomTitle {
  color: #2a75aa;
  font-size: 14px;
  position: absolute;
  top: 10px;
  left: 20px;

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

/* .activities .el-button--primary { */
  /* background-color: #fff; */
  /* color: #409eff; */
/* } */

/* .activities .el-message-box__content,
.activities .el-dialog__title,
.activities .el-form-item__label {
  color: #fff;
} */

.activities .el-message-box__header,
.activities .el-dialog__header {
  border-bottom: 1px solid #fff;
}

.activities .el-message-box--center .el-message-box__header {
  padding-top: 20px;
}

.activities .el-message-box__headerbtn .el-message-box__close,
.activities .el-message-box__title,
.activities .el-radio,
.activities .el-radio__input.is-checked+.el-radio__label,
.activities .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-size: 18px;
}

.activities .el-radio__label {
  font-size: 10px;
  padding-left: 5px;
}

.activities .dialog_class {
  display: flex;
  flex-direction: column;
  justify-content: left;
  /* margin-left: 70px; */
}

.activities .inner_dialog_part .el-form--inline .el-form-item {
  width: 200px;
}

.activities .inner_dialog_part .el-form--inline .el-form-item__content {
  width: 90px;
}
.v-modal{
  z-index: 1001 !important;
}
/* .el-dialog__wrapper{
  z-index: 1001 !important;

} */
.activities .el-dialog--center .el-dialog__header{
  padding: 10px;
}
.activities .el-dialog--center .el-dialog__body,.activities .el-dialog--center .el-dialog__footer{
  background: #fff;
}
.activities .el-message-box__content, .activities .el-form-item__label{
  color: #686868;
}
.activities .el-dialog__title{
  color: #fff;
}
.activities .list_title{
  color: #686868;
}
.activities .el-input__inner{
  background: #ececec;
}
.activities ::-webkit-scrollbar {
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
