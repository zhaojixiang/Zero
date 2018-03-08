<!-- 频域空域 -->
<template>
    <section class="sky">
        <!-- 头部导航 -->
        <nav1></nav1>
        <section class="content">
            <el-row :gutter="20">
                <el-col :span="8" class="left">
                  <!-- 相关分析 -->
                    <relation @do_analysis='do_analysis'></relation>
                    <!-- 频率占用度 -->
                    <keep-alive>
                        <!-- 频段占用度 -->
                        <part-cover @change='change' :ratePartCover='ratePartCover' :rateCover='rateCover'></part-cover>
                    </keep-alive>
                </el-col>
                <el-col :span="16">
                    <section style="position:relative;">
                        <!-- 地图控件 -->
                        <leaflet style='height:755px;'></leaflet>
                        <vue-draggable-resizable :resizable="false" :z="999" :x='10' :y='440'>
                            <!-- 合法 违规及异常信号统计 -->
                            <err-sum :spectraBarOption='spectraBarOption'></err-sum>
                        </vue-draggable-resizable>
                    </section>
                </el-col>
            </el-row>
        </section>
    </section>
</template>
<script>
import Nav1 from "components/equipmentControl/common/Nav1";
import Relation from 'components/spaceOfSkyAnalysis/relationAnalysis'
import PartCover from 'components/spaceOfSkyAnalysis/partCover'
import ErrSum from 'components/spaceOfSkyAnalysis/errSignalSum'
import Leaflet from "components/equipmentControl/facilitiesCondition/overview/leaflet"
import VueDraggableResizable from 'vue-draggable-resizable'
import normalizeBarOption from "assets/js/chartOptions/barOption"
import GetSpectraBarOption from 'assets/js/chartOptions/spectraBarOption'
import { menuShowMixin } from "assets/js/mixin";

export default {
    mixins:[menuShowMixin],
    components:{
        Relation,
        PartCover,
        ErrSum,
        Nav1,
        Leaflet,
        VueDraggableResizable
    },
    data() {
        return {
            rateCover:{},
            ratePartCover:{},
            spectraBarOption:{}
        }
    },
    methods:{
        // 相关分析-执行分析
        do_analysis(val) {
            // console.log(val)
            // alert('执行提交')
            this.$message({
                type:'warning',
                message:'先别提交，程序没做完呢'
            })
        },
        // 频段占用度 信号覆盖率 切换
        change(val) {
            // console.log(val)
            if(val === '信号覆盖率') {
                this._getRateCover()
            }else {
                this._getPartCover()
            }
        },
        // 初始化数据
        initPageData() {
            this._getPartCover()
            this._getErrSignalSum()
        },
        // 频率覆盖率
        _getRateCover() {
            this.$http.get("api/GetRateCover").then(res=>{
                this.ratePartCover = normalizeBarOption({
                    title: "信号覆盖率",
                    series_data: res.data,
                    xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                    title_offset: "0px",
                    title_top: "left",
                    series_color: ["#ff8b35"],
                    title_color: "#4fdaff",
                    legend_data: ["频率覆盖率"]
                });
                this.rateCover = normalizeBarOption({
                    title: "信号覆盖率时间分布图",
                    series_data: res.data,
                    xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                    title_offset: "0px",
                    title_top: "left",
                    series_color: ["#ff8b35"],
                    title_color: "#4fdaff"
                });
            })
        },
        // 频段占用度
        _getPartCover() {
             this.$http.get("api/GetRatePartCover").then(res=>{
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
                this.rateCover = normalizeBarOption({
                    title: "频段占用度时间分布图",
                    series_data: res.data,
                    xAxis_data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
                    title_offset: "0px",
                    title_top: "left",
                    series_color: ["#ff8b35"],
                    title_color: "#4fdaff"
                });
             })
        },
        // 合法、违规及异常信号统计
        _getErrSignalSum() {
            this.spectraBarOption= GetSpectraBarOption()
        }
    },
    created() {
        this.initPageData()
    }
}
</script>
<style scoped>
.sky .content{
  width: 98%;
  margin: 10px auto;
}
.sky .left{
  height: 755px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
