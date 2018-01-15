import Highcharts from 'highcharts'
export default function ( {title='',series_data=[],xAxis_data=[],title_offset='center',title_top='10px',title_color='#fff',series_color=['#4BC9E7', '#0EF355', '#C56272', '#DFB22D', '#B951E8'],legend_data=['比值']} = {}) {
    return {
        chart: {
            type: "heatmap",
            marginTop: 40,
            marginBottom: 40
        },
        title: {
            text: ""
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        yAxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            opposite: true
        },
        colorAxis: {
            min: 0,
            minColor: "#FFFFFF",
            maxColor: Highcharts.getOptions().colors[0]
        },
        legend: {
            align: "left",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 25,
            symbolHeight: 320
        },
        tooltip: {
            formatter: function () {
                return (
                    "<b>" +
                    this.series.xAxis.categories[this.point.x] +
                    "</b> sold <br><b>" +
                    this.point.value +
                    "</b> items on <br><b>" +
                    this.series.yAxis.categories[this.point.y] +
                    "</b>"
                );
            }
        },
        series: [
            {
                name: "信道占用度",
                borderWidth: 1,
                data: series_data,
                dataLabels: {
                    enabled: true,
                    color: "black",
                    style: {
                        textShadow: "none"
                    }
                },
                maxPointWidth: 20
            }
        ]
    }
}
