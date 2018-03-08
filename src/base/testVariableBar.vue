<template>
    <section>
        <chart :options="rateCover" ref="chart" id="myChart009" :style="{width, height}">
        </chart>
        <el-button @click.stop="chartClick">Clock</el-button>
    </section>
</template>
<style scoped>
</style>

<script>
  import echarts from 'echarts'
  import normalizeBarVariable from "assets/js/chartOptions/barVariable";
  export default {
    data() {
        return {
            width:'800px',
            height:'700px',
            rateCover:{}
        }
    },
    mounted() {
        this._getRateCover()
    },
    methods:{
        _getRateCover() {
			let param = {
					CID: '34010000',
					BusinessBand: '88MHz-108MHz 广播',
					StartTime: '2016-12-12',
					StopTime: '2017-12-12'
			}
			this.$api.spectrumEvaluation.GetSignalCover(param).then(res => {
				let { data, success, msg } = res;
				if (success) {
					let key_data = Object.keys(data.freq_covers);
					let value_data = Object.values(data.freq_covers);
					if (value_data.length) {
						this.rateCover = normalizeBarVariable({
							dataAxis: key_data,
							data: value_data,
							title: "移动站---信号覆盖率",
							xAxis_color:'#6c6c6c',
							yAxis_name:'信号覆盖率(%)'
						});
					}
				} else {
					this.$message({
						type: "warning",
						message: msg
					});
				}
			});
		},
        chartClick() {
           this.$refs.chart.dispatchAction({
                type: 'showTip',
                // 屏幕上的 x 坐标
                // x: 100,
                // // 屏幕上的 y 坐标
                // y: 200,
                // 本次显示 tooltip 的位置。只在本次 action 中生效。
                // 缺省则使用 option 中定义的 tooltip 位置。
                // position: [200,100],
                // type: 'showTip',
                // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: 216,
                // 可选，数据名称，在有 dataIndex 的时候忽略
                // name: 'Other',
                // 本次显示 tooltip 的位置。只在本次 action 中生效。
                // 缺省则使用 option 中定义的 tooltip 位置。
                // position: Array.<number>|string|Function,
            })
        }
    }
  }
</script>
