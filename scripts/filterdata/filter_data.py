import pandas as pd
from unidecode import unidecode
import re
import json
import unicodedata

# -----------------------------------------------
# 🔧 Ler arquivo de lista de todas as palavras em português
# -----------------------------------------------

def detectar_encoding(caminho_arquivo):
    """Detecta o encoding de um arquivo."""
    import chardet
    with open(caminho_arquivo, 'rb') as f:
        resultado = chardet.detect(f.read(10000))
    return resultado['encoding']

def ler_arquivo(caminho_arquivo):
    """Lê o arquivo linha a linha, detectando encoding automaticamente."""
    encoding = detectar_encoding(caminho_arquivo)
    print(f"📘 Encoding detectado: {encoding}")

    with open(caminho_arquivo, 'r', encoding=encoding, errors='replace') as f:
        linhas = [linha.strip() for linha in f if linha.strip()]
    return linhas

linhas_pt_br = ler_arquivo('wordlist-preao-20251001.txt')
linhas_pt_br_set = set(linhas_pt_br)


# -----------------------------------------------
# 🔧 Funções auxiliares
# -----------------------------------------------

def remove_acentos_palavras_nao_pt(texto, portugues_set):
    """
    Recebe um texto e retorna o texto modificando apenas palavras
    que NÃO estão no português, removendo seus acentos.
    """
    # Separa palavras e pontuação mantendo a ordem
    tokens = re.findall(r'\w+|\W+', texto)
    resultado = []

    for token in tokens:
        if token.isalpha():  # processa apenas palavras, ignora pontuação
            if token.lower() not in portugues_set:
                token = unidecode(token)  # remove acentos da palavra
        resultado.append(token)

    return ''.join(resultado)

def remove_acentos(text: str) -> str:
    """Remove acentos de uma string."""
    return unidecode(text or "")

def limpar_numeros(text: str) -> str:
    """Remove números maiores que 10 e limpa pontuação duplicada."""
    for number_str in re.findall(r'\d+', text):
        if int(number_str) > 10:
            text = text.replace(number_str, "")
    text = text.replace("..", ".")
    text = text.replace(" . ", " ")
    return text.strip()

def garantir_ponto_final(text: str) -> str:
    """Garante que a string termina com ponto final."""
    return text if text.endswith(".") else text + "."

# -----------------------------------------------
# 📂 Leitura e pré-processamento
# -----------------------------------------------

# Lê o arquivo original
df = pd.read_csv('data.txt', header=None, usecols=[0], sep=';sasaddsasd', engine='python')

# Garante saída intermediária limpa
df.to_csv('_intermediate.csv', index=False, header=False)

# Recarrega
df = pd.read_csv('_intermediate.csv', header=None, names=["raw"])

# -----------------------------------------------
# 🧠 Processamento linha a linha
# -----------------------------------------------

lista_palavra_dupla = [
    "ad hoc", "boa noite", "boa nova", "boas festas", "boas vindas",
    "boa tarde", "Cabo Delgado", "Cabo Verde", "caga lume",
    "combatente de libertação nacional", "Ressano Garcia",
    "São Tomé e Príncipe", "São Tomé"
]

palavras_numeradas = ["I", "II", "III"]

# Cria colunas vazias
df["word"] = ""
df["meaning"] = ""

for index, row in df.iterrows():
    data_string = str(row["raw"]).strip()

    # Limpeza básica
    data_string = limpar_numeros(data_string)
    data_string = garantir_ponto_final(data_string)

    # Separação de palavra e significado
    palavras = data_string.split()
    if len(palavras) < 2:
        continue  # pula linhas incompletas

    word = palavras[0]
    second_word = palavras[1]

    # Verifica se é uma das palavras compostas
    for termo in lista_palavra_dupla:
        if data_string.lower().startswith(termo.lower()):
            word = termo
            meaning = data_string[len(termo):].strip()
            break
    else:
        # Caso contrário, trata palavras numeradas
        if second_word in palavras_numeradas:
            word = f"{word} {second_word}"
            meaning = " ".join(palavras[2:])
        else:
            meaning = " ".join(palavras[1:])

    # Remove acentos só do significado
    meaning = remove_acentos_palavras_nao_pt(meaning, linhas_pt_br_set)

    # Salva no DataFrame
    df.at[index, "word"] = word
    df.at[index, "meaning"] = meaning


# -----------------------------------------------
# 💾 Exportação
# -----------------------------------------------

df = df.reset_index(drop=True).reset_index().rename(columns={"index": "id"})
df.drop(columns=["raw"], inplace=True)

df.to_json('output.json', orient='records', force_ascii=False)


# -----------------------------------------------
# Adiciona dados extras que faltavam
# -----------------------------------------------

try:
    with open('data_new.json', 'r', encoding="utf-8") as file:
        data_new = json.load(file)
except FileNotFoundError:
    raise Exception("Error: 'data.json' not found. Please create the file.")

try:
    with open('output.json', 'r', encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    raise Exception("Error: 'data.json' not found. Please create the file.")

data_missing = []
for i in range(len(data_new)):
    found = False
    for j in range(len(data)):
        if data[j]["word"] == data_new[i]["word"]:
            found = True
            break
    
    if not found:
        data_missing.append(data_new[i])

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

with open('output.json', 'w', encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)

print("✅ Processamento concluído com sucesso!")
