var ROOT_PATH = 'https://echarts.apache.org/examples';

var chartDom = document.getElementById('echartsDemo0');
var lesChart = echarts.init(chartDom, 'dark');
var lesOption;

lesChart.showLoading();
$.ajax({
   url: "/chart/les.json",
   dataType: "json",
   success: function(graph) {
  lesChart.hideLoading();
  graph.nodes.forEach(function (node) {
    node.label = {
      show: node.symbolSize > 30
    };
  });
  lesOption = {
    backgroundColor: 'transparent',
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  };
  lesChart.setOption(lesOption);
},
   error: function(jqXHR, textStatus, errorThrown) {
      console.log("发生错误：" + textStatus, errorThrown);
   }
});
lesOption && lesChart.setOption(lesOption);
