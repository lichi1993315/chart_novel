import json
from event import get_event

attr_template = f"""
%(attr_name)s: %(info)s"""


def get_system_prompt(info):
    attr_str = ""
    role_str = ""

    style = info["story_info"]["storyStyle"]

    for name, user_info in info["user_info"].items():
        role = user_info["role"]
        bg = user_info["background"]

        role_str += f"{name}: {role}, {bg}\n"

        if "attr" not in user_info:
            continue

        for attr_name, attr_info in user_info["attr"].items():
            context = {"attr_name": attr_name, "info": attr_info["info"]}

            attr_str += attr_template % context

    system_prompt = f"""Write 修仙小说 with The style of the article adopts Chinese ancient novels, Use words and grammar using ancient Chinese literature, Use Simplified Chinese output, Adopt grand, fantasy, shocking writing mode.
This is the outline:你是否想过，在霓虹璀璨的都市之下，潜藏着来自古老神话的怪物？你是否想过，在那高悬于世人头顶的月亮之上，伫立着守望人间的神明？你是否想过，在人潮汹涌的现代城市之中，存在代替神明行走人间的超凡之人？人类统治的社会中，潜伏着无数诡异；在那些无人问津的生命禁区，居住着古老的神明。炽天使米迦勒，冥王哈迪斯，海神波塞冬……而属于大夏的神明，究竟去了何处？在这属于“人”的世界，“神秘”需要被肃清！

You are a scale judge and novelist, and you can write a 10-chapter story based on different numerical values. 并给每个角色定义了一系列的属性，以及每个章节属性的变化情况。Now, I will give you some input items: Story background, Character, Attributes and the meaning of them, numerical range of each attribute’s value, corresponding definition of each range, the initial value, change value and final value of each attribute in each chapter,Please write the story using following instructions:
1. A positive change value represents a positive trend and a better result, a negative change value represents a worse trend and a worse result, and the absolute value of Change value represents the strength of this change in this chapter. Absolute values less than 3 indicate moderate and slow, absolute values between 3-6 indicate strong, and absolute values greater than 6 indicate very intense. Please design corresponding events and causal relationships based on the change value values in each chapter
2. The values of different values need to reflect the different states of attributes based on their range and definition, and there must be clear differentiation
3. The initial value of each attribute in each chapter=the final value of the corresponding attribute in the previous chapter
"""
    user_prompt = f"""
背景：修仙世界
小说类型：{style}
{role_str}
{attr_str}
"""

    return system_prompt, user_prompt


def get_chapter_prompt(info):

    promts = []

    for i in range(10):
        event_prompt = ""
        attr_prompt = ""
        chapter = i + 1

        for name, user_info in info["user_info"].items():
            if "attr" not in user_info:
                continue

            for attr_name, attr_info in user_info["attr"].items():
                value = int(attr_info["data"][i][1])

                if i > 0:
                    last_value = int(attr_info["data"][i - 1][1])
                    delta = value - last_value

                    delta = 3 if delta > 3 else delta
                    delta = -3 if delta < -3 else delta

                    delta = 1 if 0 <= delta < 1 else delta
                    delta = -1 if -1 < delta < 0 else delta

                    delta = delta

                    event = get_event(attr_name, delta, delta)
                    event_prompt += f"""重要事件：{event.to_string(index=False)}\n"""
                    attr_prompt += f"""第{chapter}章{name}的{attr_name}数值: {last_value} -> {value}\n"""
                else:
                    attr_prompt += f"""第{chapter}章{name}的{attr_name}数值: {value}\n"""

        chapter_prompt = f"""第{chapter}章
{event_prompt}
{attr_prompt}

You should write this chapter based on the above inputs and previous storyline, and pay attention to the coherence of the story, character emotions, and character relationships between this chapter and previous chapters.
You should avoid mentioning any numerical values.
You should provide detailed descriptions of events and states for each numerical change itself. Please exceed 800 words in this chapter and describe it in expressive language.
"""

        print(chapter_prompt)
        promts.append(chapter_prompt)
    return promts


def get_all_prompts(info):
    system_prompt, user_prompt = get_system_prompt(user_info)
    chapter_prompt = get_chapter_prompt(user_info)
    return {"system": system_prompt, "data": [user_prompt] + chapter_prompt}


if __name__ == "__main__":
    with open("user_info.json", "r") as f:
        user_info = json.load(f)
        system_prompt, user_prompt = get_system_prompt(user_info)

        print(system_prompt)
        print(user_prompt)

        get_chapter_prompt(user_info)
