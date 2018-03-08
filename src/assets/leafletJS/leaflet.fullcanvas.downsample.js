var canvasLayer =  L.FullCanvas.extend({
  drawSource:function(dot,color) {
    var ctx = this.getCanvas().getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
});

// export default canvasLayer;
// function extend(context) {
//   return {
//     initialize: function (option) {
//       context.prototype.initialize.call(this, option);
//       // this._margin = option.margin || 6;
//       this._originalLayers = [];
//       this._visibleLayers = [];
//       this._map = [];
//       this.myLayer = new canvasLayer();
//
//     },
//     addLayer: function (layer) {
//       this._originalLayers.push(layer);
//       // console.log(this._originalLayers,'original');
//     },
//     _isInTheBounds(layer) {
//       let bounds = map.getBounds();
//       return bounds.contains(layer.getLatLng())
//     },
//     onAdd: function (map) {
//       if (!this._map) {
//         console.error("please addTo the map first!")
//       }
//       this._map = map;
//       this._dealLayerAndVisiable();
//     },
//     _onZoomEnd: function () {
//       this._dealLayerAndVisiable();
//     },
//     onRemove: function (map) {
//       context.prototype.onRemove.call(this, map);
//     },
//     _dealLayerAndVisiable: function () {
//       this.myLayer.setData(this._originalLayers);
//       this.myLayer.addLayerTo(this._map);
//     },
//   }
// }

L.Layer.DownSample = canvasLayer;
