<!-- 频谱评估基站分析 -->
<template>
	<section id="filtrates">
		<nav1></nav1>
		<section class="container">
			<div class="side-span">
				<span @click="checkNow(fadeChange(['stationAnalyse','filter']),'filter_')" style="height: 60px">筛选</span>
				<span @click="checkNow(fadeChange(['stationAnalyse','allStation']),'allStation_')" style="height: 60px" v-show="sideBar_allStation">基站</span>
				<span @click="checkNow(fadeChange(['stationAnalyse','operator']),'operator_')" style="height: 80px;" v-show="sideBar_operator">运营商</span>
				<span @click="checkNow(fadeChange(['stationAnalyse','tech']),'tech_')" style="height: 90px;" v-show="sideBar_tech">技术体制</span>
				<span @click="checkNow(fadeChange(['stationAnalyse','other']),'other_')" style="height: 90px;" v-show="sideBar_other">其他统计</span>
			</div>
			<map1 class="map" ref="map"></map1>
			<!-- 筛选 时间选择 -->
			<vue-draggable-resizable v-show="fade.stationAnalyse.filter_" :class="[fade.stationAnalyse.filter?fadeInCss:fadeOutCss]" :resizable="false" :x="45" :y="5" :z='1000'>
				<filters @minus="checkNow(fadeChange(['stationAnalyse','filter']),'filter_')" @submits='submits'></filters>
			</vue-draggable-resizable>
			<!-- 基站 表 -->
			<vue-draggable-resizable v-show="fade.stationAnalyse.allStation_" :class="[fade.stationAnalyse.allStation?fadeInCss:fadeOutCss]" :resizable="false" :x="45" :y="150" :z='1000'>
				<all-station class="allStation" ref='all_station' @tabChange='tabChange' :allStationInfo='tempStationInfo' :stationInfoLoading='stationInfoLoading' @minus="checkNow(fadeChange(['stationAnalyse','allStation']),'allStation_')" @standardChange='standardChange' @operatorChange='operatorChange' @stationPageChange='stationPageChange' @exceptionChange='exceptionChange'/>
			</vue-draggable-resizable>
			<!-- 运营商 -饼状图1 -->
			<vue-draggable-resizable v-show="fade.stationAnalyse.operator_" :resizable="false" :x="700" :y="4" :z='1000'>
				<pie-occupy @minus="checkNow(fadeChange(['stationAnalyse','operator']),'operator_')" :pieLoading='pieOperatorLoading' :PieOccupyEmpty='PieOperatorEmpty' :option='pieOperatorOption' :title="operatorTitle" :class="['pieOccupy',fade.stationAnalyse.operator?zoomInCss:zoomOutCss]" :setting="{width:'400px',height:'200px'}" />
			</vue-draggable-resizable>
			<!-- 技术体制 -饼状图2 -->
			<vue-draggable-resizable v-show="fade.stationAnalyse.tech_" :class="['pieOccupy',fade.stationAnalyse.tech?zoomInCss:zoomOutCss]" :resizable="false" :x="700" :y="262" :z='1000'>
				<pie-occupy @minus="checkNow(fadeChange(['stationAnalyse','tech']),'tech_')" :pieLoading='pieTechOccupyLoading' :PieOccupyEmpty='PieTechEmpty' :option='pieTechOption' :title="techSysTitle" :setting="{width:'400px',height:'200px'}" />
			</vue-draggable-resizable>
			<!-- 其他统计 柱状图套三 -->
			<vue-draggable-resizable v-show="fade.stationAnalyse.other_" ref="otherSum" :class="[fade.stationAnalyse.other?zoomInCss:zoomOutCss]" @activated='footerMove' :resizable="false" :x="45" :y="596" :z='1000'>
				<section class="barSection">
					<div class="other-top">
						<span class="other-title">其他统计</span>
						<span class="minus" @click="checkNow(fadeChange(['stationAnalyse','other']),'other_')">
							<i class="el-icon-minus i-minus"></i>
						</span>
					</div>
					<div class="other-charts">
						<!-- 技术体制占频带宽 -->
						<other-sum :rateCover='techOccupyBand' :barLoading='barTechOccupyBandLoading' :isEmpty='barTechOccupyBandEmpty' />
						<!-- 运营商各种技术体制占频统计 -->
						<other-sum :rateCover='techOccupySum' :barLoading='barTechOccupySumLoading' :isEmpty='barTechOccupySumEmpty' />
						<!-- 运营商基站数量统计 -->
						<other-sum :rateCover='stationCount' :barLoading='barStationCountLoading' :isEmpty='barStationCountEmpty' />
					</div>
				</section>
			</vue-draggable-resizable>
		</section>
	</section>
</template>
<script>
import Nav1 from "components/equipmentControl/common/Nav1";
import Filters from 'components/baseStationAnalysis/filtrates';
import AllStation from "components/baseStationAnalysis/allStationInfo";
import PieOccupy from "components/baseStationAnalysis/pieOccupy";
import OtherSum from "components/baseStationAnalysis/otherSumCount";
import Map1 from 'components/equipmentControl/facilitiesCondition/overview/leaflet.vue'
import VueDraggableResizable from 'components/common/draggable'
import GetRatioPieOption from "assets/js/chartOptions/ratioPieOption";
import normalizeBarOption from "assets/js/chartOptions/barOption";
import { menuShowMixin, animateMixin } from "assets/js/mixin";
export default {
	mixins: [menuShowMixin, animateMixin],
	data() {
		return {
			// 全部基站信息
			allStation: {
				stationInfo:[],
				paramter:{
					pageIndex:1,
				},
				stationTotalCount:0, // 所有基站-总条数
				stationInfoEmpty: false, // 所有基站 - 空值缺省图
			}, 
			// 正常基站信息
			normalStation:{
				stationInfo:[],				
				paramter:{
					pageIndex:1,
				},				
				stationTotalCount:0, // 正常基站-总条数
				stationInfoEmpty:false, // 正常基站 - 空值缺省图
			} ,
			// 异常基站信息
			errorStation:{
				stationInfo:[],
				paramter:{
					pageIndex:1,
					abnormalType:'all'
				},
				stationTotalCount:0, // 异常基站-总条数
				stationInfoEmpty:false, // 异常基站 - 空值缺省图
			},
			// 未登记基站信息
			unregStation:{
				stationInfo:[],
				paramter:{
					pageIndex:1,					
				},			
				stationTotalCount:0, // 未登记基站-总条数						
				stationInfoEmpty:false, // 未登记基站 - 空值缺省图	
			},
			// 临时参数对象
			tempParamter:{
				standard:'2G3G4G',
				operatorName:'移动电信联通',
			},
			graphParam:{},
			tempStationInfo:{}, // 临时对象
			currentTab:'所有基站',// 在切换 Tab 的时候暂存当前属于哪一个基站
			color:['#c23531','#2f4554', '#61a0a8'], // 色柱 颜色数组
			pieOperatorOption: {}, // 运营商 - 饼状图
			pieTechOption: {}, // 技术体制 - 饼状图
			techOccupyBand: {}, // 运营商 技术体制占频带宽
			stationCount: {}, // 运营商基站数量统计
			techOccupySum: {}, // 运营商各种技术体制占比
			operatorTitle: '运营商占频统计',
			techSysTitle: '技术体质占频统计',
			PieOperatorEmpty: false, // 饼状图 - 运营商缺省图
			PieTechEmpty: false, // 饼状图 - 技术体制缺省图	
			barTechOccupyBandEmpty: false, // 柱状图 - 技术体制占频带宽缺省			
			barTechOccupySumEmpty: false, // 柱状图 - 运营商各种技术体制占频统计				
			barStationCountEmpty: false, // 柱状图 - 运营商基站数量统计								
			sideBar_allStation: false, // 基站-侧边栏
			sideBar_operator: false, // 运营商-侧边栏
			sideBar_tech: false, // 技术体制-侧边栏
			sideBar_other: false,	 // 其他统计-侧边栏
			stationInfoLoading: false, // 基站 - 加载中
			pieOperatorLoading: false, // 饼状图 - 运营商占频统计 - 加载中
			pieTechOccupyLoading: false, // 饼状图 - 技术体制占比 - 加载中
			barTechOccupyBandLoading: false, // 柱状图 - 技术体制占频带宽 - 加载中
			barTechOccupySumLoading: false, // 柱状图 - 技术体制占频统计 - 加载中
			barStationCountLoading: false // 柱状图 - 运营商 基站数量 - 加载中
		}
	},
	watch: {
		// 基站
		'fade.stationAnalyse.allStation_'(val) {
			if (val) {
				switch (this.$refs.all_station.activeTabs) {
					case 'FIRST':
						console.log(1);
						break;
					case 'SECOND':
						console.log(2);
						break;
					case 'THIRD':
						console.log(3);
						break;
					case 'FOURTH':
						console.log(4);
						break;
					default:
						break;
				}
			}
			// console.log(val,)
		},
		// 运营商占频统计 - 饼状图
		'fade.stationAnalyse.operator_'(val) {
			if (val && !Object.keys(this.pieOperatorOption).length) {
				this._getPieOperatorInfo();
			}
		},
		// 技术体制占比 - 饼状图
		'fade.stationAnalyse.tech_'(val) {
			if (val && !Object.keys(this.pieTechOption).length) {
				// console.log('watch')
				this._getPieTechInfo();
			}
		},
		// 其他统计
		'fade.stationAnalyse.other_'(val) {
			if (val && !Object.keys(this.techOccupyBand).length) {
				this.barTechOccupyBandLoading = true;
				this._getTechnologyOccupyBandwidth();
			}
			if (val && !Object.keys(this.techOccupySum).length) {
				this.barTechOccupySumLoading = true;
				this._getOperatorTechnologyOccupyFreq();
			}
			if (val && !Object.keys(this.stationCount).length) {
				this.barStationCountLoading = true;
				this._getOperatorStationAmount();		
			}
		}
	},
	methods: {
		// 将 点击需要 隐藏的组件 的 附标记 更改，以确保 vue-VueDraggableResizable 被移除
		checkNow(callback, target) {
			callback;
			// 由显示变为隐藏需要有一个缓冲时间做动画
			if (this.fade.stationAnalyse[target]) {
				this.$nextTick(() => {
					setTimeout(() => {
						this.fade.stationAnalyse[target] = false;
					}, 600);
				})
			} else {
				// 由隐藏变为显示则立即执行
				this.fade.stationAnalyse[target] = true;
			}
		},
		// 显示所有的 dragger
		pageInit() {
			// 将所有的 dragger 显示
			this.fade.stationAnalyse.allStation_ = this.fade.stationAnalyse.operator_ = this.fade.stationAnalyse.tech_ = this.fade.stationAnalyse.other_ = true;
			// 将所有 加载中 复原
			this.stationInfoLoading = this.pieOperatorLoading = this.pieTechOccupyLoading = this.barTechOccupyBandLoading = this.barTechOccupySumLoading = this.barStationCountLoading = false;
			// 将所有侧边栏 显示/隐藏 置为显示
			this.sideBar_allStation = this.sideBar_operator = this.sideBar_tech = this.sideBar_other = true;
			// 默认清空所有已有数据
			  // 基站信息数组清空
			this.allStation.stationInfo.length = this.normalStation.stationInfo.length = this.errorStation.stationInfo.length = this.unregStation.stationInfo.length = 0;
				// 总条数
			this.allStation.stationTotalCount = this.normalStation.stationTotalCount = this.errorStation.stationTotalCount = this.unregStation.stationTotalCount = 0;
				// 是否缺省空值
			this.allStation.stationInfoEmpty = this.normalStation.stationInfoEmpty = this.errorStation.stationInfoEmpty = this.unregStation.stationInfoEmpty = false;
			this.pieOperatorOption = this.pieTechOption = this.techOccupyBand = this.stationCount = this.techOccupySum = {};
			// 将所有的 dragger 里的模块显示
			this.fadeChange(['stationAnalyse','allStation'],true);
			this.fadeChange(['stationAnalyse','operator'],true);
			this.fadeChange(['stationAnalyse','tech'],true);
			this.fadeChange(['stationAnalyse','other'],true);
			// 初始化请求数据
			this.barStationCountLoading = this.barTechOccupySumLoading = this.barTechOccupyBandLoading = true;
			this._getOperatorStationAmount();		
			this._getOperatorTechnologyOccupyFreq();
			this._getTechnologyOccupyBandwidth();
		},
		// 筛选时间进行分析
		submits(val) {
			this.graphParam = Object.assign({},{
				cid: this.$const.CID,
				StartTime: val[0],
				StopTime: val[1]
			})
			this.tempParamter = Object.assign({},this.graphParam,this.tempParamter,{
				pageSize:this.$const.pageSize
			});
			this.pageInit();
			// 初始化各自的参数对象
			this.allStation.paramter = Object.assign({},this.tempParamter,this.allStation.paramter);
			this.normalStation.paramter = Object.assign({},this.tempParamter,this.normalStation.paramter);
			this.errorStation.paramter = Object.assign({},this.tempParamter,this.errorStation.paramter);
			this.unregStation.paramter = Object.assign({},this.tempParamter,this.unregStation.paramter);		
			this._getAllStationInfo();
		},
		// tab 栏切换 请求新数据
		tabChange(val) {
			// console.log(val);
			this.currentTab = val;
			switch (val) {
				case '所有基站':
					if (!this.allStation.stationInfo.length) this._getAllStationInfo();
					this.tempStationInfo = this.allStation;
					break;
				case '正常基站':
					if (!this.normalStation.stationInfo.length) this._getNormalStationInfo();
					this.tempStationInfo = this.normalStation;
					break;
				case '异常基站':
					if (!this.errorStation.stationInfo.length) this._getErrorStationInfo();
					this.tempStationInfo = this.errorStation;
					break;
				case '未登记基站':
					if (!this.unregStation.stationInfo.length) this._getUnregStationInfo();
					this.tempStationInfo = this.unregStation;
					break;
				default:
					break;
			}
		},
		footerMove() {
			console.log(this.$refs.otherSum.zIndex)
		},
		// 切换 运营商
		operatorChange(val) {
			this.optionChange('operatorName',val);
		},
		// 切换信号制式
		standardChange(val) {
			this.optionChange('standard',val);
		},
		// 页面切换
		stationPageChange(val) {
			this.optionChange('pageIndex',val);
		},
		// 异常基站-异常类型改变
		exceptionChange(val) {
			this.errorStation.paramter.abnormalType = val;
			this._getErrorStationInfo();
		},
		// 页面切换 选项改变 然后根据 tab名 请求新的数据
		optionChange(val1,val2) {
			switch (this.currentTab) {
				case '所有基站':
					this.allStation.paramter[val1] = val2;
					this._getAllStationInfo();
					break;
				case '正常基站':
					this.normalStation.paramter[val1] = val2;
					this._getNormalStationInfo();
					break;
				case '异常基站':
					this.errorStation.paramter[val1] = val2;
					this._getErrorStationInfo();
					break;
				case '未登记基站':
					this.unregStation.paramter[val1] = val2;
					this._getUnregStationInfo();
					break;
				default:
					break;
			}
			console.log(this.allStation.paramter);
		},
		// 获取所有台站信息
		_getAllStationInfo() {
			this.stationInfoLoading = true;
			this.allStation.stationInfoEmpty = false;			
			this.allStation.stationInfo.length = 0;
			console.log(this.allStation.paramter)
			// let param = Object.assign({},this.allStation.paramter);
			this.$api.stationAnalyse.GetAllStationInfo(this.allStation.paramter).then(res => {
				let { success,data,msg } = res;
				this.stationInfoLoading = false;			
				if (success) {
					this.allStation.stationTotalCount = data.totalCount;
					if (data.currentPageObjects.length) {
						data.currentPageObjects.forEach(item => {
							this.allStation.stationInfo.push({
								desc: item.lon.toFixed(5),
								date: item.lat.toFixed(5),
								power: Number(item.freq).toFixed(2),
								signalNature: item.param,
								station_analyse: true,
								mark: "4"
							});
						});
					} else {
						this.allStation.stationInfoEmpty = true;
					}
				} else {
					this.$message.warning('所有基站信息获取： ',msg);
					this.allStation.stationInfoEmpty = true;
				}
				this.tempStationInfo = this.allStation;				
			})
		},
		// 获取 正常基站信息
		_getNormalStationInfo() {
			this.stationInfoLoading = true;
			this.normalStation.stationInfoEmpty = false;			
			this.normalStation.stationInfo.length = 0;			
			// let param = Object.assign({},this.tempParamter);
			this.$api.stationAnalyse.getNormalStationInfo(this.normalStation.paramter).then(res => {
				this.stationInfoLoading = false;
				let { success,data,msg } = res;
				if (success) {
					this.normalStation.stationTotalCount = data.totalCount;
					if (data.currentPageObjects.length) {
						data.currentPageObjects.forEach(item => {
							this.normalStation.stationInfo.push({
								desc: item.lon.toFixed(5),
								date: item.lat.toFixed(5),
								power: Number(item.freq).toFixed(2),
								signalNature: item.param,
								station_analyse: true,
								mark: "4"
							});
						});
					} else {
						this.normalStation.stationInfoEmpty = true;
					}
				} else {
					this.$message.warning('正常基站信息获取： ',msg);
					this.normalStation.stationInfoEmpty = true;
				}	
			})
		},
		// 获取 异常基站信息
		_getErrorStationInfo() {
			this.stationInfoLoading = true;
			this.errorStation.stationInfoEmpty = false;
			this.errorStation.stationInfo.length = 0;
			// let param = Object.assign({},this.paramter,this.tempParamter);
			this.$api.stationAnalyse.getErrorStationInfo(this.errorStation.paramter).then(res => {
				this.stationInfoLoading = false;
				let { success,data,msg } = res;
				if (success) {
					this.errorStation.stationTotalCount = data.totalCount;						
					if (data.currentPageObjects.length) {
						data.currentPageObjects.forEach(item => {
							this.errorStation.stationInfo.push({
								desc: item.lon.toFixed(5),
								date: item.lat.toFixed(5),
								power: Number(item.freq).toFixed(2),
								signalNature: item.param,
								station_analyse: true,
								mark: "4"
							});
						});
					} else {
						this.errorStation.stationInfoEmpty = true;
					}
				} else {
					this.$message.warning('异常基站信息获取： ',msg);
					this.errorStation.stationInfoEmpty = true;
				}
				this.tempStationInfo = this.errorStation;				
			})
		},
		// 获取 未登记基站信息
		_getUnregStationInfo() {
			this.stationInfoLoading = true;	
			this.unregStation.stationInfoEmpty = false;			
			this.unregStation.stationInfo.length = 0;				
			// let param = Object.assign({},this.paramter,this.tempParamter);
			this.$api.stationAnalyse.getUnregStationInfo(this.unregStation.paramter).then(res => {
				this.stationInfoLoading = false;
				let { success,data,msg } = res;
				if (success) {
					this.unregStation.stationTotalCount = data.totalCount;					
					if (data.currentPageObjects.length) {
						data.currentPageObjects.forEach(item => {
							this.unregStation.stationInfo.push({
								desc: item.lon.toFixed(5),
								date: item.lat.toFixed(5),
								power: Number(item.freq).toFixed(2),
								signalNature: item.param,
								station_analyse: true,
								mark: "4"
							});
						});
					} else {
						this.unregStation.stationInfoEmpty = true;
					}
				} else {
					this.$message.warning('未登记基站信息获取： ',msg);
					this.unregStation.stationInfoEmpty = true;
				}
				this.tempStationInfo = this.unregStation;				
			})
		},
		// 获取运营商占频统计 - 饼状图
		_getPieOperatorInfo() {
			this.pieOperatorLoading = true;
			this.$api.stationAnalyse.GetOperatorOccupyFreq(this.graphParam).then(res => {
				this.pieOperatorLoading = false;
				let { data, success, msg } = res;
				if (success) {
					if (typeof data === 'object' && data !== null) {
						let key_data = Object.keys(data);
						let value_data = Object.values(data);
						if (value_data.length) {
							let val_data = [];
							value_data.forEach((item, index) => {
								val_data.push({
									value: (item * 100).toFixed(2),
									name: key_data[index]
								});
							});
							//信号使用情况比例
							this.pieOperatorOption = GetRatioPieOption({
								key_data,
								value_data: val_data,
								title: "运营商占频统计",
								xAxis_color: '#818181',
								series_name: '运营商',
								series_label_formatter: '{b} :\n{c}%  ',
								tooltip_formatter: '{a} <br/>{b} : {c}%'
							});
						} else {
							this.PieOperatorEmpty = true;
						}
					} else {
						this.PieOperatorEmpty = true;
					}
				} else {
					this.$message.error(msg);
				}
			});
		},
		// 获取技术体制占频统计 - 饼状图
		_getPieTechInfo() {
			this.pieTechOccupyLoading = true;
			this.$api.stationAnalyse.GetTechnologyOccupyFreq(this.graphParam).then(res => {
				this.pieTechOccupyLoading = false;
				let { data, success, msg } = res;
				if (success) {
					if (typeof data === 'object' && data !== null) {
						let key_data = Object.keys(data);
						let value_data = Object.values(data);
						if (value_data.length) {
							let val_data = [];
							value_data.forEach((item, index) => {
								val_data.push({
									value: (item * 100).toFixed(2),
									name: key_data[index]
								});
							});
							//信号使用情况比例
							this.pieTechOption = GetRatioPieOption({
								key_data,
								value_data: val_data,
								title: "技术体制占频统计",
								xAxis_color: '#818181',
								series_name: '技术体制',
								series_label_formatter: '{b} :\n{c}%  ',
								tooltip_formatter: '{a} <br/>{b} : {c}%'
							});
						} else {
							this.PieTechEmpty = true;
						}
					} else {
						this.PieTechEmpty = true;
					}
				} else {
					this.$message.error(msg);
				}
			});
		},
		// 技术体制占频带宽 - 柱状图
		_getTechnologyOccupyBandwidth() {
			this.$api.stationAnalyse.GetTechnologyOccupyBandwidth(this.graphParam).then(res => {
				this.barTechOccupyBandLoading = false;
				let { success, data, msg } = res;
				if (success) {
					if (typeof data === 'object' && data !== null) {
						let key_data = Object.keys(data);
						let value_data = Object.values(data);
						if (value_data.length) {
							// value_data = value_data.map(item => (item*100).toFixed(2))
							//信号使用情况比例
							this.techOccupyBand = normalizeBarOption({
								xAxis_data: key_data,
								series_data: value_data,
								title: "技术体制占频统计",
								series_color: ['#2d57dc'],
								font_color: '#88898A',
								yAxis_color: '#88898A',
								item_color: '#fefefe',
								yAxis_name: '占频(MHz)',
								xAxis_name: '(技术体制占频带宽)'
							});
						} else {
							this.barTechOccupyBandEmpty = true;
						}
					} else {
						this.barTechOccupyBandEmpty = true;
					}
					// console.log(this.techOccupyBand)
				} else {
					this.$message.error(msg);
				}
			})
		},
		// 运营商各种技术体制占频统计 - 柱状图
		_getOperatorTechnologyOccupyFreq() {
			this.$api.stationAnalyse.GetOperatorTechnologyOccupyFreq(this.graphParam).then(res => {
				this.barTechOccupySumLoading = false;
				let { success,data,msg } = res;
				if (success) {
					if (typeof data === 'object' && data !== null) {
						let key_data = Object.keys(data); // 移动 电信 联通
						let value_data = Object.values(data); // 对象数组
						if (value_data.length) {
							let obj = {}; // 指数组																					
							value_data.forEach((item,index) => {
								let item_key = Object.keys(item); // gsm cmda 
								let item_val = Object.values(item); // 值
								if (item_key.length) {
									item_key.forEach((it,idx) => {
										obj[[key_data[index] + '|' + item_key[idx]]] = {
											value:item_val[idx],
											itemStyle:{
												normal:{
													color:this.color[index]
												}
											}
										}
									});
								} else {
									this.barTechOccupySumEmpty = true;
								}
							});
							let key_dt = Object.keys(obj);
							let val_dt = Object.values(obj);
							this.techOccupySum = normalizeBarOption({
								xAxis_data: key_dt,
								series_data: val_dt,
								skew:true,
								title: "技术体制占频统计",
								series_color: ['#2d57dc'],
								font_color: '#88898A',
								yAxis_color: '#88898A',
								item_color: '#fefefe',
								yAxis_name: '占频(MHz)',
								xAxis_name: '(技术体制占频带宽)'
							});
						} else {
							this.barTechOccupySumEmpty = true;
						}
					} else {
						this.barTechOccupySumEmpty = true;
					}
				} else {
					this.$message.warning(msg);
				}
			});
		},
		// 运营商基站数量统计 - 柱状图
		_getOperatorStationAmount() {
			this.$api.stationAnalyse.GetOperatorStationAmount(this.graphParam).then(res => {
				this.barStationCountLoading = false;
				let { success,data,msg } = res;
				if (success) {
					if (typeof data === 'object' && data !== null) {
						if (typeof data.disResult && data.disResult !== null) {
							let key_data = Object.keys(data.dicResult); // 移动 电信 联通
							let value_data = Object.values(data.dicResult); // 对象数组
							if (value_data.length) {
								let obj = {}; // 指数组							
								value_data.forEach((item,index) => {
									let item_key = Object.keys(item); // gsm cmda 
									let item_val = Object.values(item); // 值
									if (item_key.length) {
										item_key.forEach((it,idx) => {
											obj[[key_data[index] + '|' + item_key[idx]]] = {
												value:item_val[idx],
												itemStyle:{
													normal:{
														color:this.color[index]
													}
												}
											}
										})
									}
									
								});
								let key_dt = Object.keys(obj);
								let val_dt = Object.values(obj);			
								// console.log(val_dt)
								this.stationCount = normalizeBarOption({
									xAxis_data: key_dt,
									series_data: val_dt,
									skew:true,
									title: "技术体制占频统计",
									series_color: ['#2d57dc'],
									font_color: '#88898A',
									yAxis_color: '#88898A',
									item_color: '#fefefe',
									yAxis_name: '基站数量(个)',
									xAxis_name: `运营商基站数量统计(${data.stationAmount})`
								});
							} else {
								this.barStationCountEmpty = true;			
							}
						} else {
							this.barStationCountEmpty = true;
						}
					} else {
						this.barStationCountEmpty = true;
					}
				} else {
					this.$message.warning(msg);					
				}
			})
			
		}
	},
	components: {
		AllStation,
		PieOccupy,
		OtherSum,
		Nav1,
		VueDraggableResizable,
		Map1,
		Filters
	}
};
</script>
<style scoped lang='less'>
@backgorundColor: #fefefe;
@borderColor: #4fdaff;
#filtrates {
	.container {
		width: 100%;
		margin: auto;
		position: relative;
		.side-span {
			position: absolute;
			z-index: 1001;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			span {
				width: 20px;
				background: #2f74a1;
				display: inline-block;
				text-align: center;
				padding: 0 10px;
				-webkit-writing-mode: vertical-lr;
				writing-mode: vertical-lr;
				letter-spacing: 5px;
				cursor: pointer;
				border-top: solid 1px @backgorundColor;
			}
		}
		.map {
			min-height: 900px;
		}
		.allStation {
			/* position: absolute; */
			border: 1px solid @borderColor;
			top: 10px;
			left: 20px;
			height: 440px;
			width: 460px;
			overflow: hidden;
			box-sizing: border-box;
			background-color: @backgorundColor;
		}
		.pieOccupy {
			border: 1px solid @borderColor;
			background: @backgorundColor;
		}
		.barSection {
			width: 100%;
			box-sizing: border-box;
			border: 1px solid @borderColor;
			background: @backgorundColor;
			.other-top {
				height: 30px;
				padding-left: 14px;
				background: url("../../assets/image/doubleArrows.png") no-repeat;
				background-position: 14px;
				color: #56e5ff;
				font-size: 14px;
				line-height: 30px;
				border-bottom: solid 1px #8F9091;
				.other-title {
					margin-left: 23px;
				}
			}
			.other-charts {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
			}
		}
	}
}
</style>
