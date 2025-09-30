import json
import unicodedata

try:
    with open('../../DicionarioChangana/assets/data.json', 'r', encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    raise Exception("Error: 'data.json' not found. Please create the file.")

try:
    with open('data_new.json', 'r', encoding="utf-8") as file:
        data_new = json.load(file)
except FileNotFoundError:
    raise Exception("Error: 'data.json' not found. Please create the file.")

print("data_new len: ", len(data_new))
data_missing = []
for i in range(len(data_new)):
    found = False
    for j in range(len(data)):
        if data[j]["word"] == data_new[i]["word"]:
            found = True
            break
    
    if not found:
        data_missing.append(data_new[i])
        # print(data_new[i]["word"])
print("total missing:", len(data_missing))

with open('data_missing.json', 'w', encoding="utf-8") as file:
    json.dump(data_new, file, ensure_ascii=False)

# Now making new DATA

def normalize_string(s):
    # Normalize unicode (accents)
    s = unicodedata.normalize('NFKD', s)
    # Keep only ASCII letters/numbers
    s = ''.join(c for c in s if c.isalnum() or c == " ")
    # Convert to lowercase
    return s.lower()

data = data_missing + data

data = sorted(data, key=lambda x: normalize_string(x["word"]))

for i in range(len(data)):
    data[i]["id"] = i

    
with open('data_final.json', 'w', encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)
