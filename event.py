import pandas as pd
import random

# 读取Excel文件
df = pd.read_csv('event.csv', sep='\t', index_col=False)
category = "爱情"
min = -1
max = 1

def get_event(category, min, max, i=1):
    filtered_df = df[(df['Catagory'] == category) & (df['Delta'] >= min) & (df['Delta'] <= max)]
    random_event = filtered_df.sample(n=i)['Event']
    return random_event


