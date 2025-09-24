import json
from datetime import datetime
from datetime import datetime, timedelta
import random

try:
    with open('filter_data_output.json', 'r', encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    raise Exception("Error: 'data.json' not found. Please create the file.")

except json.JSONDecodeError:
    raise Exception("Error: Invalid JSON format in 'data.json'.")

try:
    with open("1000palavras.txt", "r", encoding="utf-8") as f:
        conteudo = f.read()
        palavras_txt = conteudo.splitlines()
        palavras_txt = list(set(palavras_txt))
        random.shuffle(palavras_txt)
except Exception as e:
    print(e)


def generate_date_from_today(plus_days: int):
    today = datetime.today()
    return (today + timedelta(days=plus_days)).strftime("%Y%m%d") 

n=0
for i in range(len(palavras_txt)):
    palavra = palavras_txt[i]
    achou = False
    for j in range(len(data)):
        if data[j]['word'] == palavra:
            data[j]['dailyKey'] = generate_date_from_today(n)
            print(f"id: {data[j]['id']}, word: {data[j]['word']}, dailyKey: {data[j]['dailyKey']}")
            achou = True
            n+=1
            break
    if not achou:
        data[j]['dailyKey'] = "00000000"

print(n)
print(data[177])

with open('data_with_dailyKey.json', 'w', encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)