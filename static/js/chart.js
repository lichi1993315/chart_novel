let symbolSize = 20;
let pos_data = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
];
var myChart = echarts.init(document.getElementById('single_chart'));
myChart.setOption({
  tooltip: {
    triggerOn: 'none',
    formatter: function(params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br />Y: ' +
        params.data[1].toFixed(2)
      );
    }
  },
  xAxis: { min: 0, max: 9, type: 'value', axisLine: { onZero: false }, splitNumber:10},
  yAxis: { min: -5, max: 5, type: 'value', axisLine: { onZero: false }, splitNumber:10},
  series: [
    { id: 'a', type: 'line', smooth: true, symbolSize: symbolSize, data: pos_data }
  ],
});
myChart.setOption({
  graphic: echarts.util.map(pos_data, function(item, dataIndex) {
    return {
      type: 'circle',
      position: myChart.convertToPixel('grid', item),
      shape: { r: symbolSize / 2 },
      invisible: true,
      draggable: true,
      ondrag: echarts.util.curry(onPointDragging, dataIndex),
      onmousemove: echarts.util.curry(showTooltip, dataIndex),
      onmouseout: echarts.util.curry(hideTooltip, dataIndex),
      z: 100
    };
  })
});
window.addEventListener('resize', function() {
  myChart.setOption({
    graphic: echarts.util.map(pos_data, function(item, dataIndex) {
      return { position: myChart.convertToPixel('grid', item) };
    })
  });
});
function showTooltip(dataIndex) {
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}
function hideTooltip(dataIndex) {
  myChart.dispatchAction({ type: 'hideTip' });
}

function changeEcharts(){
    myChart.setOption({
    series: [
      {
        id: 'a',
        data: pos_data
      }
    ]
  });
}
function onPointDragging(dataIndex, dx, dy) {
  pos_data[dataIndex] = myChart.convertFromPixel('grid', this.position);

  myChart.setOption({
    series: [
      {
        id: 'a',
        data: pos_data
      }
    ]
  });
}
