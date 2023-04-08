from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    # Render the template with the options for each chart
    return render_template("index.html")


@app.route("/on_dragging", methods=["POST"])
def on_dragging():
    result = request.json.get("result", None)
    if result:
        # 在这里处理从JavaScript获取的结果
        print("从JavaScript获取的结果：", result)
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"})


if __name__ == "__main__":
    app.run(debug=True)
