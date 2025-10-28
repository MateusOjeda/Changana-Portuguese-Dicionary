import re
import json
from unidecode import unidecode
import csv

def detectar_encoding(caminho_arquivo):
    """Detecta o encoding de um arquivo."""
    import chardet
    with open(caminho_arquivo, 'rb') as f:
        resultado = chardet.detect(f.read(10000))
    return resultado['encoding']

def ler_dicionario_completo(caminho_arquivo):
    """Lê o arquivo linha a linha, detectando encoding automaticamente."""
    encoding = detectar_encoding(caminho_arquivo)
    print(f"📘 Encoding detectado: {encoding}")

    with open(caminho_arquivo, 'r', encoding=encoding, errors='replace') as f:
        linhas = [linha.strip() for linha in f if linha.strip()]
    return linhas

linhas_pt_br = ler_dicionario_completo('../filter_data/wordlist-preao-20251001.txt')
linhas_pt_br_set = set(linhas_pt_br)


def processa_arquivo_txt(caminho_arquivo):
    """
    Lê um arquivo .txt e retorna uma lista de palavras.
    Remove espaços extras e linhas vazias.
    """
    palavras = {}
    with open(caminho_arquivo, 'r', encoding='utf-8') as f:
        for linha in f:
            linha = linha.strip()
            if linha:
                linha_split = linha.split()

                # Remove caracteres que não são letras
                word = re.sub(r"[^A-Za-zÀ-ÿ\-]", "", linha_split[0])
                palavras[word] = linha_split[1]

    return palavras

palavras_ref = processa_arquivo_txt("5000_movie_words_pt.txt")


with open("data_as_input.json", "r", encoding="utf-8") as f:
    palavras_json = json.load(f)

palavras_set = set(unidecode(item["word"].lower()) for item in palavras_json)

faltando = []

for word in palavras_ref:
    word_normalizada = unidecode(word.lower())
    if word_normalizada not in palavras_set and word_normalizada in linhas_pt_br_set:
        faltando.append({"word": word, "value": palavras_ref[word]})

with open("faltando.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["word", "value"])
    writer.writeheader()
    writer.writerows(faltando)

print(f"✅ Total de palavras não encontradas: {len(faltando)}")
print("Arquivo salvo como 'nao_encontradas.json'")