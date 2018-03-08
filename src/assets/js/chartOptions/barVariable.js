import * as echarts from 'echarts'
export default function({
	dataAxis = [],
	data = [],
	title = '',
	yAxis_name = '',
	yAxis_color = '#fefefe',
	xAxis_name='',
	xAxis_color = '#fefefe',
	legend_data = [],
	series_name='',
	tooltip_formatter="{b}MHz 覆盖率 : {c}"
} = {}) {
  var yMax = 120;
  // var dataShadow = [];
  // for (var i = 0; i < data.length; i++) {
  //     dataShadow.push(yMax);
  // }
  return {
    title: {
		text: title,
		textStyle: {
			color: '#56e5ff',
			fontWeight: 'normal',
			fontSize: 14
		},
		x: 200,
		// y: 10,
		bottom: 0,
		// subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    legend:{
		type:'plain',
		left:'10%',
		top:'10%',
		data:legend_data,
		textStyle:{
			color: '#8F9091'
		}
    },
    xAxis: {
		name: xAxis_name,
		nameLocation: 'center',
		nameTextStyle: {
			color: xAxis_color
		},
		data: dataAxis,
		nameGap:20,
		axisLabel: {
			// inside: true,
			textStyle: {
			color: xAxis_color
			}
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		z: 10
    },
    yAxis: {
		name: yAxis_name,
		nameLocation: 'center',
		nameGap: 25,
		nameTextStyle: {
			color: yAxis_color
		},
		axisLine: {
			show: true
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: xAxis_color
			}
		}
    },
    dataZoom: [{
      	type: 'inside'
    }],
    toolbox: {
		show: true,
		feature: {

		}
    },
    tooltip: {
		trigger: 'axis',
		formatter: tooltip_formatter,
		axisPointer: {
			type: 'shadow',
			label: {
				show: true
			}
		}
    },
    series: [
		{ // For shadow
			type: 'bar',
			itemStyle: {
				normal: {
					color: 'rgba(0,0,0,0.05)'
				}
			},
			barGap: '-100%',
			barCategoryGap: '40%',
			// data: dataShadow,
			animation: false
		},
		{
			type: 'bar',
			name:series_name,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
						offset: 0,
						color: '#ff8c34'
						},
						{
						offset: 0.5,
						color: '#ff8c34'
						},
						{
						offset: 1,
						color: '#ff8c34'
						}
					]
					)
				},
				emphasis: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
							offset: 0,
							color: '#2378f7'
							},
							{
							offset: 0.7,
							color: '#2378f7'
							},
							{
							offset: 1,
							color: '#83bff6'
							}
						]
					)
				}
			},
			data: data
		}
    ]
  };
}
