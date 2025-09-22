import pandas as pd
from unidecode import unidecode
import re

df = pd.read_csv('data.txt', header=None, usecols=[0], sep=';sasaddsasd')

df.to_csv('output.csv', index=False, header=False)

df = pd.read_csv('output.csv', header=None)

df["word"] = ""
df["meaning"] = ""

lista_palavra_dupla = ["ad hoc", "boa noite", "boa nova", "boas festas", "boas vindas", "boa tarde", "Cabo Delgado", "Cabo Verde", "caga lume", "combatente de libertação nacional", "Ressano Garcia", "São Tomé e Príncipe", "São Tomé"]
palavras_numeradas = ["I", "II", "III"]
for index, row in df.iterrows():
    data_string = df.iloc[index].values[0]

    #clean numbers
    for number_str in re.findall(r'\d+', data_string):
        if int(number_str) > 10:
            data_string = data_string.replace(number_str, "")
            #replace .. for .
            data_string = data_string.replace("..", ".")
            #remove . alone
            data_string = data_string.replace(" . ", " ")
    #if not end with ., put it
    if data_string[-1] != ".":
        data_string += "."

    word_list = data_string.split()
    word = word_list[0]
    second_word = word_list[1]
    word_list.pop(0)
    meaning = " ".join(word_list)   

    for i in range(len(lista_palavra_dupla)):
        if data_string.startswith(lista_palavra_dupla[i]):
            word = lista_palavra_dupla[i]
            meaning = data_string[len(word)+1:]
            break

    if second_word in palavras_numeradas:
        word_list = data_string.split()
        word = word_list[0] + " " + word_list[1]
        meaning = data_string[len(word)+1:]
        
    df.loc[index, 'word'] = word
    df.loc[index, 'meaning']  = meaning 

df.drop(0, axis=1, inplace=True)
df.index.name = 'index'
df.to_csv('output.csv', index=True, header=True)

# print(df.head(5))

# n = 0
# previous_word = ""

# all_words = []
# repeated_in_all_words = []
# count_s = {}
# for index, row in df.iterrows():
#     if index == 0 or index == len(df):
#         continue

    # word_list = df.iloc[index].values[0].split()
#     previous_word_list = df.iloc[index-1].values[0].split()
#     number_of_words = len(word_list)

#     first_word = unidecode(word_list[0]).lower()
#     previous_first_word = unidecode(previous_word_list[0]).lower()

#     points = 0
#     n_letters = 5
#     for i in range(n_letters):
#         try:
#             points += 10**(n_letters - i - 1)*abs(ord(first_word[i]) - ord(previous_first_word[i]))
#         except:
#             pass
    # if points > 200 and len(previous_word_list) <= 3 and len(word_list) >= 3:
    # if len(first_word) <= 3:
    # if len(word_list) <= 3:
    # if points > 50000:
    #     print(f"index: {index}, points = {points}, first_word: {first_word}, previous_first_word: {previous_first_word}")
    #     n += 1

    # first_word_raw = word_list[0]
    # second_word_raw = word_list[1]
    # if first_word_raw not in all_words or second_word_raw == "II"  or second_word_raw == "III" or second_word_raw == "IV" or second_word_raw == "V":
    #     all_words.append(first_word_raw)
    # else:
    #     repeated_in_all_words.append(first_word_raw)
    #     n += 1

    # second_word = word_list[1]
    # if second_word not in count_s:
    #     if second_word == "de":
    #         print(index)
    #     if second_word[0] != "(":
    #         count_s[second_word] = 1
    # else:
    #     count_s[second_word] += 1
    
    # if second_word == "I":
    #     next_word_list = df.iloc[index+1].values[0].split()
    #     if next_word_list[1] != "II":
    #         print(next_word_list[0])


# for w in count_s:
#     if count_s[w] <= 10:
#         print(f"{w}: {count_s[w]}")



# for i in range(len(repeated_in_all_words)): print(repeated_in_all_words[i])

# print(n)
# print(df.iloc[8])

# print(df.iloc[1].values[0])