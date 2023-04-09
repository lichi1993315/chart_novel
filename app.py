from flask import Flask, render_template, request, jsonify
import os
import json
USER_INFO_PATH = os.path.join(os.path.dirname(__file__), "user_info.json")

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
        with open(USER_INFO_PATH, "w+") as f:
            json.dump(result, f, ensure_ascii=False)

        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"})


if __name__ == "__main__":
    app.run(debug=True)
