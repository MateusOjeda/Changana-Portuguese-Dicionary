import pytesseract
from pdf2image import convert_from_path

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pdf_path = r"C:\Users\mateu\Desktop\dicionario\Dicionárioparte6semOCR.pdf"
txt_path = r"C:\Users\mateu\Desktop\dicionario\data_parte_6.txt"
output_missing = r"C:\Users\mateu\Desktop\dicionario\palavras_faltando.txt"
output_completo = r"C:\Users\mateu\Desktop\dicionario\OCR_parte6.txt"


def extrair_palavras_txt(caminho):
    """Extrai a primeira palavra de cada linha do TXT"""
    palavras = []
    with open(caminho, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                palavras.append(line.strip().split()[0])
    return set(palavras)


def extrair_palavras_pdf(caminho):
    """Converte PDF em imagens e faz OCR"""
    palavras = []
    pages = convert_from_path(caminho, dpi=300, poppler_path=r"C:\\poppler\\Library\\bin")
    for i, page in enumerate(pages, 1):
        print(f"OCR na página {i}/{len(pages)}...")
        text = pytesseract.image_to_string(page)  # OCR (idioma padrão)
        for line in text.splitlines():
            if line.strip():
                first_word = line.strip().split()[0]
                if any(c.isalpha() for c in first_word):  # só palavras válidas
                    palavras.append(first_word)
    return set(palavras)

def extrair_texto_pdf_completo(caminho):
    """Converte PDF em imagens e extrai todo o texto usando OCR"""
    texto_completo = ""
    pages = convert_from_path(caminho, dpi=300, poppler_path=r"C:\\poppler\\Library\\bin")
    for i, page in enumerate(pages, 1):
        print(f"OCR na página {i}/{len(pages)}...")
        texto_pagina = pytesseract.image_to_string(page)  # OCR (idioma padrão)
        texto_completo += texto_pagina + "\n"  # adiciona texto da página com quebra de linha
    return texto_completo


def main():
    palavras_txt = extrair_palavras_txt(txt_path)
    palavras_pdf = extrair_palavras_pdf(pdf_path)

    faltando = sorted(palavras_pdf - palavras_txt)

    print(f"\nTotal no TXT: {len(palavras_txt)}")
    print(f"Total no PDF (OCR): {len(palavras_pdf)}")
    print(f"Palavras faltando no TXT: {len(faltando)}")

    with open(output_missing, "w", encoding="utf-8") as f:
        f.write("\n".join(faltando))

    print(f"\nLista salva em: {output_missing}")


def main_texto_completo():
    texto = extrair_texto_pdf_completo(pdf_path)

    with open(output_completo, "w", encoding="utf-8") as f:
        f.write(texto)

    print(f"\Texto salvo em: {output_completo}")

print("--- Iniciando OCR ---")
main_texto_completo()