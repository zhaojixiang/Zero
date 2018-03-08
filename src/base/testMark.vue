<template>
    <section>
        <!-- <chart ref="chart" :options="rateCover" id="myChart000" :style="{width, height}">
        </chart> -->
        
        <!-- <el-button @click.native='click' type='success'>clickMe</el-button> -->
    </section>
</template>
<style scoped>

</style>

<script>
import * as Data from 'assets/json/budget'
import echarts from 'echarts'
export default {
    data() {
        return {
            width: '800px',
            height: '700px',
            rateCover: {}
        }
    },
    mounted() {
        this._getRateCover()
    },
    methods: {
        _getRateCover() {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                calculable: true,
                legend: {
                    data: ['Budget 2011', 'Budget 2012'],
                    itemGap: 5
                },
                grid: {
                    top: '12%',
                    left: '1%',
                    right: '10%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: Data.names
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Budget (million USD)',
                        axisLabel: {
                            formatter: function(a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a / 1000)
                                    : '';
                            }
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        start: 94,
                        end: 100
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 30,
                        height: '80%',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                series: [
                    {
                        name: 'Budget 2011',
                        type: 'bar',
                        data: Data.budget2011List
                    },
                    {
                        name: 'Budget 2012',
                        type: 'bar',
                        data: Data.budget2012List
                    }
                ]
            };
            this.rateCover = option;
        },
        click() {
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
                seriesIndex: 0,
                // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: 116,
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
