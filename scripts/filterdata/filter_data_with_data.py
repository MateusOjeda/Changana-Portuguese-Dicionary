import pandas as pd
from unidecode import unidecode
import re

df = pd.read_csv('data.txt', header=None, usecols=[0], sep=';sasaddsasd')

df.to_csv('output.csv', index=False, header=False)

df = pd.read_csv('output.csv', header=None)

df_new = pd.read_csv('data_new.txt', header=None, usecols=[0], sep=';sasaddsasd')

df_new.to_csv('output_new.csv', index=False, header=False)

df_new = pd.read_csv('output_new.csv', header=None)


def clean_data(df):
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

    return df

df = clean_data(df)
df_new = clean_data(df_new)

print(df_new.head(5))
print(df.head(5))

faltando = df_new[~df_new['word'].isin(df['word'])]

print(len(faltando['word']))
print(faltando.head())

faltando.to_csv('output_missing.csv', index=True, header=True)
