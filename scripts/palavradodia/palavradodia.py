import json
from datetime import datetime
from datetime import datetime, timedelta
import random

filename = 'filter_data_output.json'
try:
    with open(filename, 'r', encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    raise Exception(f"Error: {filename} not found. Please create the file.")

except json.JSONDecodeError:
    raise Exception(f"Error: Invalid JSON format in {filename}.")

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

n=1
data_daily_word = {}
for i in range(len(palavras_txt)):
    palavra = palavras_txt[i]
    for j in range(len(data)):
        if data[j]['word'] == palavra:
            data_daily_word[n] = data[j]['word']
            n+=1
            break

with open('daily_words.json', 'w', encoding="utf-8") as file:
    json.dump(data_daily_word, file, ensure_ascii=False)