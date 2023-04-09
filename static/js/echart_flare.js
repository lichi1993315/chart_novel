
var chartDom = document.getElementById('echartsDemo1');
var flareChart = echarts.init(chartDom, 'dark');
var flareOption;

$.ajax({
   url: "/chart/flare.json",
   dataType: "json",
   success: function(data) {
  flareChart.hideLoading();
  flareChart.setOption(
    (flareOption = {
              backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          left: '2%',
          right: '2%',
          top: '8%',
          bottom: '20%',
          symbol: 'emptyCircle',
          orient: 'vertical',
          expandAndCollapse: true,
          label: {
            position: 'top',
            rotate: -90,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          animationDurationUpdate: 750
        }
      ]
    })
  );
   },
   error: function(jqXHR, textStatus, errorThrown) {
      console.log("发生错误：" + textStatus, errorThrown);
   }
});


flareOption && flareChart.setOption(flareOption);
