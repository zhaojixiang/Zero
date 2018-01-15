  var a = {
        chart: {
          type: "heatmap",
          marginTop: 40,
          marginBottom: 40
        },
        title: {
          text: ""
        },
        xAxis: {
          labels:{
            enabled:false
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
          formatter: function() {
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
            name: "Sales per employee",
            borderWidth: 1,
            data:this.propData,
            dataLabels: {
              enabled: true,
              color: "black",
              style: {
                textShadow: "none"
              }
            },
            maxPointWidth:20
          }
        ]
      }