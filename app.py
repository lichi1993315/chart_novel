from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from system_prompt import get_all_prompts
import requests
import os
import json

USER_INFO_PATH = os.path.join(os.path.dirname(__file__), "user_info.json")

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    # Render the template with the options for each chart
    return render_template("index.html")


@app.route("/poetry")
def poetry():
    # Render the template with the options for each chart
    return render_template("poetry.html")


@app.route("/image")
def image():
    # Render the template with the options for each chart
    return render_template("image.html")


@app.route("/on_dragging", methods=["POST"])
def on_dragging():
    result = request.json.get("result", None)
    if result:
        # 在这里处理从JavaScript获取的结果
        print("从JavaScript获取的结果：", result)

        with open(USER_INFO_PATH, "w+") as f:
            json.dump(result, f, ensure_ascii=False)

        prompt = get_all_prompts(result)

        url = "https://game.bugbonus.com/v1/txt2img/unityjson"

        json_str = json.dumps(prompt, ensure_ascii=False).encode('utf-8')
        print(json_str)

        headers = {"Content-Type": "application/json"}
        response = requests.post(url, data=json_str, headers=headers)
        print(response.json())

        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"})


@app.route("/update_json", methods=["POST"])
def update_json():
    result = request.json.get("result", None)
    if result:
        # 在这里处理从JavaScript获取的结果
        print("从JavaScript获取的结果：", result)
        with open(USER_INFO_PATH, "w+") as f:
            json.dump(result, f, ensure_ascii=False)

        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"})


def get_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data)
        response = jsonify(data)
        return response
    else:
        return "下载JSON文件失败"


@app.route("/chart/flare.json")
def get_flare():
    url = "https://echarts.apache.org/examples/data/asset/data/flare.json"
    return get_url(url)


@app.route("/chart/les.json")
def get_les():
    url = "https://echarts.apache.org/examples/data/asset/data/les-miserables.json"
    return get_url(url)


@app.route("/chart/unity.json")
def get_unity():
    url = "https://game.bugbonus.com/assets/unity.json"
    return get_url(url)


if __name__ == "__main__":
    app.run(debug=True)
