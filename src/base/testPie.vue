<template>
  <pie :option='option' :setting="setting"></pie>
</template>
<script>
import Pie from 'components/stationManage/ratioPie';
import GetRatioPieOption from "assets/js/chartOptions/ratioPieOption";
export default {
  data() {
    return {
        option:{},
        setting:{
            height:'300px',
            width:'300px'
        }
    }
  },
  methods:{
      _getPieChartData() {
			let param = {
					CID: '34010000',
					BusinessBand: '88MHz-108MHz 广播',
					StartTime: '2016-12-12',
					StopTime: '2017-12-12'
			}
			this.$api.spectrumEvaluation.GetGrid.GetRangeOfGrid(param).then(res => {
				let { data, success } = res;
				if (success) {
					let key_data = Object.keys(data.netOccuyDistributeValue);
					let value_data = Object.values(data.netOccuyDistributeValue);
					if (value_data.length) {
						let val_data = [];
						value_data.forEach((item, index) => {
							val_data.push({
								value: item.toFixed(2),
								name: key_data[index]
							});
						});
						//信号使用情况比例
						this.option = GetRatioPieOption({
							key_data,
							value_data: val_data,
							title: "移动站---网格化频段占用度覆盖率",
							xAxis_color:'#818181'							
                        });
                        // console.log(this.option)
					}
				}
			});
		},
  },
  mounted() {
    this._getPieChartData()
  },
  components:{
      Pie
  }
}
</script>
<style>

</style>


