const dataPre = {
  connector: {
    type: 'hierarchy',
  },
  transform: {
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapSliceDice',
    as: ['x', 'y'],
  },
};
const dataView = ['nodes', nodes => {
  return nodes.map(node => ({
    ...node,
    startFreq:node.data.freq,
    endFreq:node.data.endFreq,
    legend:node.data.legend != undefined ? node.data.legend : {color: '#eee'},
  }));
}];
const itemTpl = `<li data-index={index} ><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/></li>`;
const color = ['legend', (legend) => {
  return legend.color;
}];
const style = {
  lineWidth: 1,
  stroke: '#fff',
};
const tooltip = ['legend*freq', (legend, freq) => {
  return {
    name: legend.zh,
    value: freq,
    color: legend.color
  };
}];
const label = ['label', {
  offset: 0,
  textStyle: {
    textAlign: 'center',
    textBaseline: 'middle',
  },
  formatter(text, item, index) {
    return '';
  },
  htmlTemplate: (text, item, index) => {
    let label = '';
    let str = '';
    if (item.point.data.label != undefined) {
      label = '<div class="g2-lab">' + '<i class="fa ' + item.point.data.label + ' fa-1" aria-hidden="true"></i>' + '</div>';
    }
    if (item.point.data.span != undefined) {
      str = '<div class="g2-str">' + item.point.data.span + '</div>';
    }
    return '<div class="g2-str-box">' + str + label + '</div>'
  }
}];
const guideStyle  = {
  fill: '#fff', // 文本颜色
  fontSize: '12', // 文本大小
  // fontWeight: 'bold', // 文本粗细
  rotate: -90 // 旋转角度
};
export {dataPre,dataView,itemTpl,color,style,tooltip,label,guideStyle};
