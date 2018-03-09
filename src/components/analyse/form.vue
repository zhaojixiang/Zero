<template>
	<section id="AForm">
		<!-- 选择频段 -->
		<el-form :rules="choose_rules" ref="chooseBand" :inline="true" :model="form_data.chooseBand" v-if="name==='选择频段'">
			<el-form-item label-width='100px' label="业务频段:" prop="value">
				<el-select v-model="form_data.chooseBand.value" size='mini' placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
					</el-option>
				</el-select>
			</el-form-item>
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="时间范围:" prop="date_range">
					<el-date-picker v-model="form_data.chooseBand.date_range" type="daterange" value-format="yyyy-MM-dd" :clearable='false' size="mini" format="yyyy 年 MM 月 dd 日" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2017-10-01">
					</el-date-picker>
				</el-form-item>
			</el-row>
		</el-form>
		<!-- 自定义频段  -->
		<el-form class="customFrom" :rules="custom_rules" ref="customBand" :inline="true" :model="form_data.customBand" v-else-if="name==='自定义频段'">
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="开始频率(MHz):" prop="start_freq">
					<el-input size="mini" v-model="form_data.customBand.start_freq">
					</el-input>
				</el-form-item>
				<el-form-item label-width='100px' label="结束频率(MHz):" prop="stop_freq">
					<el-input size="mini" v-model="form_data.customBand.stop_freq">
					</el-input>
				</el-form-item>
			</el-row>
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="频段步进:" prop="step">
					<el-input size="mini" v-model="form_data.customBand.step">
					</el-input>
				</el-form-item>
			</el-row>
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="信号门限(dBuv):" prop="signal">
					<el-input size="mini" v-model="form_data.customBand.signal">
					</el-input>
				</el-form-item>
				<el-form-item class="customRadio">
					<el-radio-group v-model="form_data.customBand.checked" style="color:#fff;">
						<el-radio :label="true">自动门限</el-radio>
						<el-radio :label="false">直线门限</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-row>
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="时间范围:" prop="date_range">
					<el-date-picker v-model="form_data.customBand.date_range" type="daterange" :clearable='false' size="mini" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" default-value="2017-10-01">
					</el-date-picker>
				</el-form-item>
			</el-row>
		</el-form>
		<!-- 单频数据 -->
		<el-form :inline="true" :model="form_data" v-if="name==='频谱带宽'">
			<el-row :gutter="20">
				<el-form-item label-width='100px' label="中心频率:">
					<el-input size="mini">
					</el-input>
				</el-form-item>
				<el-form-item label-width='100px' label="频谱带宽:">
					<el-input size="mini">
					</el-input>
				</el-form-item>
			</el-row>
			<el-row :gutter="20">
				<el-col class="headerTitle">时间范围</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12" style="padding-left:0px;padding-right:0px;">
					<el-form-item label-width='80px' label="开始日期:">
						<el-date-picker v-model="form_data.start_date" :clearable='false' type="date" size="mini" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12" style="padding-left:0px;padding-right:0px;">
					<el-form-item label-width='80px' label="结束日期:">
						<el-date-picker v-model="form_data.end_date" :clearable='false' type="date" size="mini" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- 频段 -->
		<el-form :rules="data_replay_rules" class="frequencyBand" :inline="true" :model="dataReply" v-if="name==='频段'">
			<!-- <section class="radioForm"> -->
			<el-row>
					<el-radio-group @change="change" v-model="dataReply.radio">
						<el-radio label="1" :style="{color:'#fff',textColor:'#fff',display:'block',paddingLeft:'0px',marginLeft:'20px'}">业务频段
							<el-form-item prop="business_freq">
							<!-- 业务频率 -->
							<el-select style="margin-left:38px" :disabled="disabled" class="select" v-model="dataReply.business_freq" placeholder="请选择">
								<el-option v-for="(item,index) in business" :key="index" :label="item.remark" :value="index">
								</el-option>
							</el-select>
						</el-form-item>
						</el-radio>
						<el-radio label="2" :style="{color:'#fff',textColor:'#fff',display:'block',paddingLeft:'0px',marginLeft:'20px'}">自定义频率</el-radio>
					</el-radio-group>
			</el-row>

			<!-- 自定义频率 -->
			<el-row :gutter="20" class="custom">
				<el-form-item prop="start_freq" label-width='100px' label="开始频率(MHz):">
					<el-input class="form-control" v-model="dataReply.start_freq" :disabled="!disabled" size="mini">
					</el-input>
				</el-form-item>
				<el-form-item prop="stop_freq" label-width='100px' label="结束频率(MHz):">
					<el-input class="form-control" v-model="dataReply.stop_freq" :disabled="!disabled" size="mini">
					</el-input>
				</el-form-item>
			</el-row>
			<!-- </section> -->
			<!--<el-row :gutter="20" style="padding-left:42px;">-->
				<!--<el-col class="headerTitle">时间范围</el-col>-->
			<!--</el-row>-->
			<el-row :gutter="20">
        <el-form-item label-width='120px' label="时间范围:" prop="date_range" style="marginLeft:-13px">
          <el-date-picker v-model="dataReply.date_range" type="daterange" value-format="yyyy-MM-dd" :clearable='false' size="mini" format="yyyy 年 MM 月 dd 日" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2017-10-01">
          </el-date-picker>
        </el-form-item>
				<!--<el-col :span="12" style="padding-left:0px;padding-right:0px;">-->
					<!--<el-form-item label-width='100px' label="开始日期:">-->
						<!--<el-date-picker v-model="dataReply.start_date" :clearable='false' type="date" size="mini" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日">-->
						<!--</el-date-picker>-->
					<!--</el-form-item>-->
				<!--</el-col>-->
				<!--<el-col :span="12" style="padding-left:0px;padding-right:0px;">-->
					<!--<el-form-item label-width='100px' label="结束日期:">-->
						<!--<el-date-picker v-model="dataReply.end_date" :clearable='false' type="date" size="mini" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy年MM月dd日">-->
						<!--</el-date-picker>-->
					<!--</el-form-item>-->
				<!--</el-col>-->
			</el-row>
		</el-form>
		<!-- 单频 -->
		<el-form class="singleFreq" :rules="data_replay_rules" ref="single" :inline="true" :model="dataReply" v-if="name==='单频'">
			<!-- 自定义频率 -->
			<el-row :gutter="20" class="custom" style="margin-left:0;margin-right:0;">
				<el-form-item prop="center_freq" label-width='100px' label="中心频率(MHz):">
					<el-input v-model="dataReply.center_freq" size="mini">
					</el-input>
				</el-form-item>
				<el-form-item prop="band_width" label-width='100px' label="带宽(KHz):">
					<el-input v-model="dataReply.band_width" size="mini">
					</el-input>
				</el-form-item>
			</el-row>
			<el-row :gutter="20" style="margin-left:0;margin-right:0;">
				<el-form-item label-width='100px' label="信号门限(dBuv):" prop="signal">
					<el-input size="mini" v-model="dataReply.signal">
					</el-input>
				</el-form-item>
				<el-form-item style="">
					<el-radio-group v-model="dataReply.checked" style="color:#fff;">
						<el-radio :label="true">自动门限</el-radio>
						<el-radio :label="false">直线门限</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-row>
			<!-- </section> -->
			<el-row :gutter="20" style="margin-left:-4px;margin-top:10px">
				<el-form-item label-width='100px' label="时间范围:" prop="date_range">
					<el-date-picker v-model="dataReply.date_range" type="daterange" value-format="yyyy-MM-dd" :clearable='false'
									size="mini" format="yyyy 年 MM 月 dd 日" start-placeholder="开始日期" end-placeholder="结束日期"
									default-value="2017-10-01">
					</el-date-picker>
				</el-form-item>
			</el-row>
		</el-form>
		<section style="display:flex;justify-content:center;width:100%;">
			<el-button class="btn" size="mini" style="margin-bottom:5px;width:50%;" @click="doAnalysis" type="primary">执行分析</el-button>
		</section>
	</section>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			disabled: false,
			radio: "1",
			option: [
				{
					value: "选项1",
					label: "黄金糕"
				},
				{
					value: "选项2",
					label: "双皮奶"
				},
				{
					value: "选项3",
					label: "蚵仔煎"
				},
				{
					value: "选项4",
					label: "龙须面"
				},
				{
					value: "选项5",
					label: "北京烤鸭"
				}
			],
			// business: [],
			value: "",
			form_data: {
				chooseBand: {
					date_range: "",
					value: "88MHz-108MHz 广播"
				},
				customBand: {
					date_range: "",
					checked: true,
					start_freq: "",
					stop_freq: "",
					signal: "",
					step: ""
				}
			},
			choose_rules:{
				value: [
					{ required: true, message: '请选择频段', trigger: 'blur' }
				],
				date_range: [
					{ required: true, message: '请选择时间', trigger: 'change' }
				]
			},
			custom_rules:{
				start_freq: [
					{ required: true, message: '请输入开始频率', trigger: 'blur' }
				],
				stop_freq: [
					{ required: true, message: '请输入结束频率', trigger: 'blur' }
				],
				step: [
					{ required: true, message: '请输入频率步进', trigger: 'blur' }
				],
				signal: [
					{ required: true, message: '请输入信号门限', trigger: 'blur' }
				],
				date_range: [
					{ required: true, message: '请选择时间', trigger: 'change' }
				]
			},
			data_replay_rules:{
				date_range: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				],
				start_freq: [
					{ required: true, message: '请输入开始频率', trigger: 'blur' }
				],
				stop_freq: [
					{ required: true, message: '请输入结束频率', trigger: 'blur' }
				],
				business_freq: [
					{ required: true, message: '请输入业务频率', trigger: 'blur' }
				],
				center_freq: [
					{ required: true, message: '请输入中心频率', trigger: 'blur' }
				],
				band_width: [
					{ required: true, message: '请输入带宽', trigger: 'blur' }
				],
				signal: [
					{ required: true, message: '请输入信号门限', trigger: 'blur' }
				]
			},
			dataReply: {
				start_freq: "",
				stop_freq: "",
				radio: "1",
				band_width: "",
				business_freq: "",
				center_freq: "",
				date_range:"",
				signal:'',
				checked:true
			}
		};
	},
	validators: {
		"dataReply.radio,dataReply.business_freq,dataReply.start_freq,dataReply.stop_freq": function(
			radio,
			business_freq,
			start_freq,
			stop_freq
		) {
			if (radio == "1") {
				return Validator.value(business_freq).required();
			} else {
				return Validator.value(start_freq)
					.value(stop_freq)
					.required();
			}
		}
	},
	watch: {
		singleData(val) {
			if (Object.keys(val).length) {
				// this.dataReply = val;
				console.log(val)
				this.dataReply.center_freq = val.startFreq;
				this.dataReply.band_width = val.stepFreq;
				// this.dataReply.date_range = [val.StartTime,val.StopTime];
				this.dataReply.date_range = val.date_range?val.date_range:[val.StartTime,val.StopTime];
			}
		}
	},
	props: ["options", "name","singleData","business"],
	mounted() {
		// this._getBusiness();
	},
	methods: {
		// 执行分析
		doAnalysis() {
			if (this.name == '自定义频段') {
				this.$refs['customBand'].validate((valid) => {
					if (valid) {
						sessionStorage.setItem('businessInfomation',JSON.stringify(this.form_data.customBand));
						this.$emit("Analyse");
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			}
			else if (this.name == '选择频段') {
				this.$refs['chooseBand'].validate((valid) => {
					if (valid) {
						sessionStorage.setItem('businessInfomation',JSON.stringify(this.form_data.chooseBand));
						this.$emit("Analyse");
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			}
			else if(this.name == "频段") {
				if (this.dataReply.radio == "1") {
					if (this.dataReply.business_freq) {
						this.dataReply.start_freq = this.business[this.dataReply.business_freq].startFreq;
						this.dataReply.stop_freq = this.business[this.dataReply.business_freq].stopFreq;
						this.dataReply.step = this.business[this.dataReply.business_freq].step;
						this.$emit("submit", this.dataReply);
					} else {
						this.$message.warning("还没有填完哦~")
					}
				}
         	}
			else if(this.name == "单频") {
				this.$refs['single'].validate((valid) => {
					if (valid) {
						this.dataReply.start_freq = this.dataReply.center_freq;
						this.dataReply.stop_freq = this.dataReply.center_freq;
						this.dataReply.step = this.dataReply.band_width;
						this.$emit("submit", this.dataReply);
					} else {
						this.$message.warning("还没有填完哦~")
						return false;
					}
				});
          	}
		},
		change(index) {
			if (index == 1) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		},
		// _getBusiness() {
		// 	this.$api.dataReply.getBusiness().then(res => {
		// 		this.business = res.data.businesInfos;
		// 	});
		// }
	}
};
</script>

<style lang='less'>
@font_color:#6c6c6c;
#AForm {
	position: relative;
	.headerTitle {
		color: @font_color;
	}
	.frequencyBand {
		.custom {
			// margin-top: 0px;
			margin-left: 25px !important;
		}
		.el-radio {
			height: 40px;
			line-height: 40px;
			padding-left: 18px;
		}
		.el-input__inner {
			height: 30px !important;
		}

		// .select {
		// 	position: absolute;
		// 	top: 5px;
		// 	left: 115px;
    //   width: 200px;
		// }
	}
	.customFrom{
		.el-input{
			width: 80%;
		}
		.customRadio{
			margin-left: 20px;
		}
	}
	.singleFreq{
		.el-input{
			width: 80%;
		}
	}
	// .el-form--inline{
	// 	.el-form-item{
	// 		margin-right: 0px;
	// 	}
	// }
	.el-input{
		font-size: 12px;
	}

}
.el-range-editor--mini {
	.el-input__inner{
		width: 90%;
	}
}
.el-input--prefix {
	.el-input__inner {
		padding-left: 20px;
	}
}
.el-input--suffix  {
	.el-input__inner {
		padding-right: 0;
	}
}
.el-input__prefix {
	left: 0;
}
.el-form-item__label {
	color: @font_color;
	padding-right: 3px;
	font-size: 10px;
}
.el-form-item {
	margin-left: 0px;
}
.el-radio__label {
	font-size: 10px;
  color:#818181!important;
}
</style>
