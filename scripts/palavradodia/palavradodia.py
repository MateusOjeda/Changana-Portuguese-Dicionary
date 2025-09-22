import pandas as pd
from datetime import datetime

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
    

presentes_df = df[df['word'].isin(presentes)]
# Exportar para CSV
# df.drop(0, axis=1, inplace=True)
# df.index.name = 'index'
# df.to_csv('output.csv', index=True, header=True)
def shuffle_and_dates(df):
    df = df.sample(frac=1).reset_index(drop=True)

    n_dias = 10 * 365  # aproximando sem considerar anos bissextos

    # Número de linhas do DF original
    n_linhas = len(df)

    # Repetindo as linhas para cobrir todos os dias
    repeticoes = -(-n_dias // n_linhas)  # ceil division para garantir cobertura
    df_exp = pd.concat([df]*repeticoes, ignore_index=True)

    # Mantendo apenas n_dias
    df_exp = df_exp.iloc[:n_dias].copy()

    # Criando a coluna de datas consecutivas começando de hoje
    hoje = datetime.now().date()
    datas = pd.date_range(start=hoje, periods=n_dias, freq='D')
    df_exp['data'] = datas
    df_exp['dailyKey'] = df_exp['data'].dt.strftime('%Y%m%d')

    return df_exp

presentes_df = shuffle_and_dates(presentes_df)
presentes_df = presentes_df.drop(columns=['data', 'index'])

presentes_df.to_csv("daily_word.csv", index=False, encoding="utf-8")
20220322