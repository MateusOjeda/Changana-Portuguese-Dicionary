import pandas as pd

df = pd.read_csv('data.csv')

with open("1000palavras.txt", "r", encoding="utf-8") as f:
    conteudo = f.read()

# conteudo = set(conteudo.split())
# conteudo = "\n".join(conteudo)
# with open("1000palavras.txt", "w", encoding="utf-8") as f:
#     f.write(conteudo)


coluna_df = df['word']

palavras_txt = conteudo.splitlines()

# Verificar quais palavras do TXT estão no DataFrame
presentes = [p for p in palavras_txt if p in coluna_df.values]
presentes = list(set(presentes))  # remover duplicatas
presentes.sort()

faltando = [p for p in palavras_txt if p not in coluna_df.values]

with open(r"palavras_do_dia.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(presentes))

with open(r"palavras_faltando.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(faltando))
    
