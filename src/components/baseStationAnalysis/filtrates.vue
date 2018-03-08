<template>
	<div class="filter">
		<h3><img :src="icon_right_arrow" alt="right icon" /> 筛选</h3>
		<span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
		<div class="block">
			<span class="demonstration" style="color:#686868">选择日期 : </span>
			<el-date-picker v-model="date_range" type="daterange" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
			</el-date-picker>
		</div>
		<div class="button">
			<el-button type="primary" size="mini" @click='submit'>执行分析</el-button>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      	date_range: ''
    }
  },
  computed:{
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    minus() {
      	this.$emit('minus');
	},
	submit() {
		if(!this.date_range) {
			this.$message.warning('请选择时间')
		} else {
			this.$emit('submits',this.date_range)	
		}
	}
  }
}
</script>

<style lang='less'>
.filter {
	background: #fff;
	border: solid 1px  #4fdaff;
	position: relative;
	h3 {
		margin: 0;
		height: 30px;
		line-height: 30px;
		border-bottom: solid 1px #c7c7c7;
		color: #2a74a2;
		font-weight: normal;
		font-size: 14px;
		padding-left: 15px;
	}
	.minus {
		position: absolute;
		top: 4px;
		right: 16px;
		cursor: pointer;
	}
	.block {
		margin: 15px 15px 10px;
	}
	.button {
		/* width: 100%; */
		text-align: center;
		margin-bottom: 5px;
	}
	.el-button{
		width: 32%;
	}
	.el-button--primary{
		background: #64a6d1;
	}
}
</style>
