<template>
	<section id="containerss" :style="{'height':height}">
		<div class="figure-rain">
			<div class="rain-head">
				<div class="rain-title">{{channelHighchatTitle}}</div>
				<el-form :inline="true" class="rain-date">
					<label>日期筛选：</label>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-select @change='changeRainYear' class="rain-date-pick" size="small" v-model="rainYear" placeholder="选择年">
								<el-option :value="item" :key="index" :label='item' v-for="(item,index) in year_period"></el-option>
							</el-select>
						</el-col>
						<el-col :span="8">
							<el-select @change='changeRainMonth' class="rain-date-pick" size="small" v-model="rainMonth" placeholder="选择月">
								<el-option :value="item" :key="index" :label="item" v-for="(item,index) in month_period"></el-option>
							</el-select>
						</el-col>
						<el-col :span="8">
							<el-select @change='changeRainDay' class="rain-date-pick" size="small" v-model="rainDay" placeholder="选择日">
								<el-option :value="item" :key="index" :label="item" v-for="(item,index) in day_period"></el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<highcharts @click.native="itemClick" id="chart" :options="highchartData" ref="highcharts"></highcharts>
		<!-- <highcharts @click.native="itemClick" id="chart" :options="highchartData" ref="highcharts"></highcharts> -->
	</section>
</template>
<script>
export default {
	props: {
		highchartData: {
			type: Object
		},
		height: {
			type: String,
			default: "400px"
		},
		channelHighchatTitle: {
			type: String
		},
		timePeriod: {
			type: Object
		}
	},
	data() {
		return {
			changeTime: "",
			rainDay: '',
			rainYear: '',
			rainMonth: ''
		};
	},
	computed: {
		activeName: {
			get() {
				return ''
			},
			set() {
				return ''
			}
		},
		year_period() {
			if (!this.timePeriod) return []
			if (Object.getOwnPropertyNames(this.timePeriod).length) return Object.keys(this.timePeriod)
		},
		month_period() {
			if (!this.year_period) return []
			if (this.year_period.length && this.rainYear) return Object.keys(this.timePeriod[this.rainYear ? this.rainYear : this.year_period[0]])
		},
		day_period() {
			if (!this.month_period) return []
			if (this.month_period.length && this.rainYear && this.rainMonth) return this.timePeriod[this.rainYear ? this.rainYear : this.year_period[0]][this.rainMonth ? this.rainMonth : this.month_period[0]]
		}
	},
  watch:{
    timePeriod:function(val){
      if(val){
        let year= Object.keys(val)[0];
        this.rainYear = year;
        let temp = val[year];
        let month = Object.keys(temp)[0];
        this.rainMonth = month;
        let day = temp[month][0];
        this.rainDay = day;
        let date = `${year}-${month}-${day}`;
        this.$emit('channelDateChange',date);
      }
    }
  },
	methods: {
		handleClick(tab) {
			this.changeTime = tab.name;
			this.$emit("tabCheck", this.activeName);
		},
		changeRainYear() {
			this.rainMonth = '';
			this.rainDay = '';
		},
		changeRainMonth() {
			this.rainDay = '';
		},
		changeRainDay() {
			// console.log('===========',this.rainYear + '-' + this.rainMonth + '-' + this.rainDay)
			let date = `${this.rainYear}-${this.rainMonth}-${this.rainDay}`
			this.$emit('channelDateChange', date)
		},
		itemClick(item, val) {

		}
	}
};
</script>

<style lang='less'>
#containerss {
	height: 230px;
	.figure-rain {
		/* border: solid 1px #33ccff; */
		background: #feffff;
		width: 100%;
		box-sizing: border-box;
		color: #686868;
		.rain-head {
			height: 80px;
			margin: 0 auto;
			.rain-title {
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 16px;
				border-bottom: solid 1px #c6c6c6;
			}
			.rain-date {
				width: 80%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				height: 40px;
				margin: 0 auto;
				line-height: 40px;
				.rain-date-pick {
					width: 100px;
					margin: 0 10px;
				}
			}
		}
	}
}
</style>
