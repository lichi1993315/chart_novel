import gradio as gr


def text_analysis(text):
    html = """
<head>
  <title>A</title>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js"></script>
</head>

<body>
  <div id="main" style="width: 600px;height:400px;"></div>
  <script>
    var myChart = echarts.init(document.getElementById("main"));

    var option = {
      title: {
        text: "ECharts"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

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
