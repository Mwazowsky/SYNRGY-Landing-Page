import os
import pandas as pd
import json

file_path = os.path.abspath('cars.json')

# print("File >", file_path)

df = pd.read_json(file_path)

df.to_csv('cars.csv', index=False)

print("DataFrame exported to cars.csv")

# load data using Python JSON module
with open(file_path,'r') as f:
    data = json.loads(f.read())
    
# Flatten data
df_nested_list = pd.json_normalize(data, record_path =['options'])
df_nested_list
