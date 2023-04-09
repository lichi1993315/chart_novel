from event import *
import json
import requests
category = "爱情"
min = -3
max = 3
url = "https://game.bugbonus.com/v1/txt2img/unityjson"
headers = {"Content-Type": "application/json"}

events_combined = get_event(category, min, max, 11).tolist()
system = "你是一个小说生成器"
json_obj = {
    "data": events_combined,
    "system": system
}

# 将 JSON 对象转换为字符串并打印
json_str = json.dumps(json_obj, ensure_ascii=False).encode('utf-8')
print(json_str)

response = requests.post(url, data=json_str, headers=headers)
print(response.json())


