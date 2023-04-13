import gradio as gr


def text_analysis(text):
    html = """
<head>
  <title>A</title>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js"></script>
</head>

<body>
  <div id="main" style="width: 600px;height:400px;"></div>
  <script>
    var myChart = echarts.init(document.getElementById("main"));

    var option;
    const symbolSize = 20;
    const data = [
      [40, -10],
      [-30, -5],
      [-76.5, 20],
      [-63.5, 40],
      [-22.1, 50]
    ];
    option = {
      title: {
        text: "Try Dragging these Points",
        left: "center"
      },
      tooltip: {
        triggerOn: "none",
        formatter: function (params) {
          return (
            "X: " +
            params.data[0].toFixed(2) +
            "<br>Y: " +
            params.data[1].toFixed(2)
          );
        }
      },
      grid: {
        top: "8%",
        bottom: "12%"
      },
      xAxis: {
        min: -100,
        max: 70,
        type: "value",
        axisLine: { onZero: false }
      },
      yAxis: {
        min: -30,
        max: 60,
        type: "value",
        axisLine: { onZero: false }
      },
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: 0,
          filterMode: "none"
        },
        {
          type: "slider",
          yAxisIndex: 0,
          filterMode: "none"
        },
        {
          type: "inside",
          xAxisIndex: 0,
          filterMode: "none"
        },
        {
          type: "inside",
          yAxisIndex: 0,
          filterMode: "none"
        }
      ],
      series: [
        {
          id: "a",
          type: "line",
          smooth: true,
          symbolSize: symbolSize,
          data: data
        }
      ]
    };
    setTimeout(function () {
      // Add shadow circles (which is not visible) to enable drag.
      myChart.setOption({
        graphic: data.map(function (item, dataIndex) {
          return {
            type: "circle",
            position: myChart.convertToPixel("grid", item),
            shape: {
              cx: 0,
              cy: 0,
              r: symbolSize / 2
            },
            invisible: true,
            draggable: true,
            ondrag: function (dx, dy) {
              onPointDragging(dataIndex, [this.x, this.y]);
            },
            onmousemove: function () {
              showTooltip(dataIndex);
            },
            onmouseout: function () {
              hideTooltip(dataIndex);
            },
            z: 100
          };
        })
      });
    }, 0);
    window.addEventListener("resize", updatePosition);
    myChart.on("dataZoom", updatePosition);
    function updatePosition() {
      myChart.setOption({
        graphic: data.map(function (item, dataIndex) {
          return {
            position: myChart.convertToPixel("grid", item)
          };
        })
      });
    }
    function showTooltip(dataIndex) {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: dataIndex
      });
    }
    function hideTooltip(dataIndex) {
      myChart.dispatchAction({
        type: "hideTip"
      });
    }
    function onPointDragging(dataIndex, pos) {
      data[dataIndex] = myChart.convertFromPixel("grid", pos);
      // Update data
      myChart.setOption({
        series: [
          {
            id: "a",
            data: data
          }
        ]
      });
    }

    myChart.setOption(option);



  </script>
</body>
"""
    return f"""<iframe style="width: 100%; height: 480px" srcdoc='{html}'></iframe>"""


demo = gr.Interface(
    text_analysis,
    gr.Textbox(placeholder="Enter sentence here..."),
    "html",
    examples=[
        ["What a beautiful morning for a walk!"],
        ["It was the best of times, it was the worst of times."],
    ],
)

demo.launch()
