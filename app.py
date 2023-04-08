from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    # ECharts line chart data and options
    symbolSize = 20
    data1 = [
        [15, 0],
        [-50, 10],
        [-56.5, 20],
        [-46.5, 30],
        [-22.1, 40]
    ]
    data2 = [
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50],
        [50, 60]
    ]
    data3 = [
        [5, 10],
        [15, 20],
        [25, 30],
        [35, 40],
        [45, 50]
    ]
    tooltip_formatter = """
        X: {b0}<br />
        Y: {c0}
    """
    option1 = {
        "tooltip": {
            "triggerOn": "none",
            "formatter": tooltip_formatter
        },
        "xAxis": {
            "min": -100,
            "max": 80,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "yAxis": {
            "min": -30,
            "max": 60,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "series": [
            {
                "id": "a",
                "type": "line",
                "smooth": True,
                "symbolSize": symbolSize,
                "data": data1
            }
        ]
    }
    option2 = {
        "tooltip": {
            "triggerOn": "none",
            "formatter": tooltip_formatter
        },
        "xAxis": {
            "min": 0,
            "max": 70,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "yAxis": {
            "min": 0,
            "max": 80,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "series": [
            {
                "id": "a",
                "type": "line",
                "smooth": True,
                "symbolSize": symbolSize,
                "data": data2
            }
        ]
    }
    option3 = {
        "tooltip": {
            "triggerOn": "none",
            "formatter": tooltip_formatter
        },
        "xAxis": {
            "min": 0,
            "max": 50,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "yAxis": {
            "min": 0,
            "max": 60,
            "type": "value",
            "axisLine": {"onZero": False}
        },
        "series": [
            {
                "id": "a",
                "type": "line",
                "smooth": True,
                "symbolSize": symbolSize,
                "data": data3
            }
        ]
    }

    # Render the template with the options for each chart
    return render_template("index.html", option1=option1, option2=option2, option3=option3)

if __name__ == "__main__":
    app.run(debug=True)

