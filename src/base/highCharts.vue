<template id="highcharts">
    <section id="container" :style="{'height':height}"></section>
</template>
<script>
import Highcharts from "highcharts";
export default {
  props: {
    data: {
      type: Object
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  methods: {
    _initHeatmap(Highcharts) {
      (function(H) {
        var Series = H.Series,
          each = H.each;
        Series.prototype.getContext = function() {
          if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute("width", this.chart.chartWidth);
            this.canvas.setAttribute("height", this.chart.chartHeight);
            this.image = this.chart.renderer
              .image("", 0, 0, this.chart.chartWidth, this.chart.chartHeight)
              .add(this.group);
            this.ctx = this.canvas.getContext("2d");
          }
          return this.ctx;
        };
        Series.prototype.canvasToSVG = function() {
          this.image.attr({ href: this.canvas.toDataURL("image/png") });
        };
        H.wrap(H.seriesTypes.heatmap.prototype, "drawPoints", function() {
          var ctx = this.getContext();
          if (ctx) {
            // draw the columns
            each(this.points, function(point) {
              var plotY = point.plotY,
                shapeArgs,
                pointAttr;
              if (plotY !== undefined && !isNaN(plotY) && point.y !== null) {
                shapeArgs = point.shapeArgs;
                pointAttr =
                  (point.pointAttr && point.pointAttr[""]) ||
                  point.series.pointAttribs(point);
                ctx.fillStyle = pointAttr.fill;
                ctx.fillRect(
                  shapeArgs.x,
                  shapeArgs.y,
                  shapeArgs.width,
                  shapeArgs.height
                );
              }
            });
            this.canvasToSVG();
          } else {
            this.chart.showLoading(
              "Your browser doesn't support HTML5 canvas, <br>please use a modern browser"
            );
          }
        });
        H.seriesTypes.heatmap.prototype.directTouch = false; // Use k-d-tree
      })(Highcharts);
      Highcharts.chart("container",this.data);
    }
  },
  mounted() {
    console.log('The data from highcharts components: ',this.data)
    console.log('highcharts state:',this.$store.state.highchartHeight)
    this._initHeatmap(Highcharts)
  }
};
</script>

<style>
#container {
  height: 230px;
}
</style>