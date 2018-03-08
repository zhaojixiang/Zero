<template>
     <!--两列-->
     <el-tabs v-model='activeName' class="paging" type="card" @tab-click="handleClick">
        <el-tab-pane label='频率列表' name="FIRST" class="tab_pane">
            <!--已存在的记录-->
           <section style="min-height:300px;" v-loading="freqListLoading" element-loading-text="数据加载中">
				<section v-if="freqList.length">
					<table class="list1">
						<tr>
							<th>频率(MHz)</th>
							<th>宽带(KHz)</th>
							<th>信号覆盖率</th>
							<th>频率性质</th>
						</tr>
						<tr v-for="(item,index) in freqList" :key="index" @click="freqListClick(item)">
							<td class="freq_list">{{item.rate}}</td>
							<td class="freq_list">{{item.band_width}}</td>
							<td class="freq_list">{{item.rate_cover}}</td>
							<td class="freq_list">{{item.natrue}}</td>
						</tr>
					</table>
					<el-pagination
						@current-change="freqListCurrentChange"
						:current-page.sync="freqListCurrentPage"
						:page-size="pageSize"
						:small="true"
						class="pagerBtm"
						layout="prev, pager, next"
						:total="freqListTotalCount">
					</el-pagination>
				</section>
				<section v-if='freqListEmpty' class="box_container">
					<i class="iconfont icon-box-empty icon_box_empty"></i>
					<p style="color:#ccc;">频率列表,暂时没有数据～</p>
				</section>
           </section>
        </el-tab-pane>
        <el-tab-pane label="信道使用情况" name="SECOND" class="tab_pane">
			<section style="min-height:300px;" element-loading-text="数据加载中" v-loading="channelUseLoading">
				<section v-if="tabData.length">
					<tab :fromAna='fromAna' :channelCount='channelCount' @currentClick='currentClick' :channelColors='channelColors' :nearlyStaions='nearlyStaions' :tabData='tabData' class="tab_style"></tab>
				</section>
				<section v-if='channelOccupyEmpty' class="box_container">
					<i class="iconfont icon-box-empty icon_box_empty"></i>
					<p style="color:#ccc;">信道使用情况,暂时没有数据～</p>
				</section>
			</section>
        </el-tab-pane>
        <el-tab-pane label="固定站列表" name="THIRD" class="tab_pane">
			<section style="min-height:300px;" element-loading-text="数据加载中" v-loading="fixedStationLoading">
				<section v-if="stationList.length">
				<el-row :gutter="20" style="margin-left:0;">
					<el-col :span="12" class="col_text p_title">固定站名称</el-col>
					<el-col :span="12" class="col_text">
						<section class="column2_right">
							<p class="p_text p_title1">频段占用度</p>
							<p class="p_text p_title1">站信息</p>
						</section>
					</el-col>
				</el-row>
				<el-row class="station_row" :gutter="10" v-for="(item,index) in stationList" :key="index">
					<el-col :span="12" class="col_text">
						<p class="station_name">{{item.station_name}}</p>
					</el-col>
					<el-col :span="12" class="col_text">
						<section class="column2_right">
							<p class="p_text">{{item.part_cover}}</p>
							<el-button type="text" class="p_text" style="cursor:pointer;" @click="searchCurrentStation(item,index)">查看</el-button>
						</section>
					</el-col>
				</el-row>
				<el-pagination
					@current-change="stationListCurrentChange"
					:current-page.sync="stationListCurrentPage"
					:page-size="pageSize"
					:small="true"
					class="pagerBtm"
					layout="prev, pager, next"
					:total="stationListTotalCount">
				</el-pagination>
				</section>
				<section v-if='fixedStationEmpty' class="box_container">
				<i class="iconfont icon-box-empty icon_box_empty"></i>
				<p style="color:#ccc;">固定站列表,暂时没有数据～</p>
				</section>
			</section>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped lang='less'>
@border_color:#5294d1;
@font_color:#6c6c6c;
.paging {
	width: 100%;
	height: 100%;
	background-color: #fefefe;
	// position: relative;
	.tab_pane{
		min-height:200px;
		.station_row {
			&:hover{
				background: rgba(240, 240, 240, 0.78);
				cursor: pointer;  
			}
		}
		.list1 {
			width: 100%;
			font-size: 12px;
			border-collapse:collapse;
			tr {
				height: 25px;
    			line-height: 25px;
				th {
					font-weight: normal;
    				color: @font_color;
				}
				&:hover{
					background: rgba(240, 240, 240, 0.78);    
				}
			}
			td {
				text-align: center;
				
			}
			.freq_list{
				color: @font_color;
				text-decoration: none;
			}
		}
		.pagerBtm {
      		text-align: center;
			margin-top: 20px;
		}
		.tab_style {
			margin-top: 10px;
		}
		.col_text {
			text-align: left;
			/* padding-bottom: 10px; */
			color: @font_color;
			.station_name{
				padding: 12px 30px;
				height: 12px;
				line-height: 1;
			}
			.column2_right {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				.p_text {
					width: 75px;
					text-align: center;
				}
				.p_title1 {
					color: @font_color;
				}
			}
		}
		.p_title {
			color: @font_color;
		}
	}
	.el-button--text {
		font-size: 12px;
		color: @font_color;
	}
	.el-popper[x-placement^="top"]{
		.popper__arrow::after{
			border-top-color: @border_color;
		}
	}
	.el-popper[x-placement^="bottom"]{
		.popper__arrow::after{
			border-top-color: @border_color;
		}
	}
}
</style>
<script>
import Tab from "components/analyse/tab";
export default {
  data() {
    return {
      disabled: false,
      activeName:'FIRST',
      fromAna:false,
      freqListCurrentPage:1, // 频率列表-当前页
      stationListCurrentPage:1 // 固定站列表-当前页
    };
  },
  props: {
    freqListEmpty:{
      type:Boolean,
      default:false
    },
    fixedStationEmpty:{
      type:Boolean,
      default:false
    },
    channelOccupyEmpty:{
      type:Boolean,
      default:false
    },
    nearlyStaions:{
        type:Array
    },
    tabData:{
        type:Array
    },
    channelColors:{
      type:Object,
      default:function () {
        return {}
      }
    },
    replayShow: {
      type: Boolean,
      default: true
    },
    stationList: {
      type: Array
    },
    pagingdata: {
      type: Array
    },
    pagingTitle: {
      type: String
    },
    channelUseLoading:{
      type:Boolean,
      default:false
    },
    fixedStationLoading:{
      type:Boolean,
      default:false
    },
    freqListLoading:{
      type:Boolean,
      default:false
    },
    freqList:{
      type:Array
    },
    freqListTotalCount:{
      type:Number
    },
    channelCount:{
      type:Number
	},
	stationListTotalCount:{
		type:Number
	},
	pageSize:{
		type:Number
	}
  },
  methods: {
    // 频率列表页切换
    freqListCurrentChange(val) {
      this.$emit('freqListCurrentChange',val);
    },
    // 固定站列表页切换
    stationListCurrentChange(val) {
      this.$emit('stationListCurrentChange',val);
    },
    currentClick(item) {
      this.$emit('currentClick',item)
    },
    // 点击 tab 切换组件
    handleClick(tab) {
        this.name = tab.label
        this.$emit('tabChange',tab.label)
    },
    // 向父组件发送消息 查看当前基站信息
    searchCurrentStation(item) {
      this.$emit("searchCurrent", item);
    },
    tabCheck(val) {
      this.$emit("tabCheck", val);
	},
	// 频率列表点击
	freqListClick(item) {
		console.log(item);
		this.$emit('moveToSingle',item);
	}
  },
  components: {
    Tab
  },
};
</script>
