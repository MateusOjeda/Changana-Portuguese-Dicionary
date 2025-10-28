import { useEffect, useState } from "react";
import { DictionaryItem } from "../types";
import DailyWords from "@/assets/daily_words.json";

export function useDailyWord(dictionaryData: DictionaryItem[]) {
	const [word, setWord] = useState("");
	const [meaning, setMeaning] = useState("");

	useEffect(() => {
		async function getDailyWord() {
			try {
				const dailyWords: Record<string, string> = DailyWords;
				const startDate = new Date(2025, 0, 1);
				const today = new Date();

				const diffInMs = today.getTime() - startDate.getTime();
				const daysPassed =
					Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

				const totalKeys = Object.keys(dailyWords).length;
				let key = daysPassed % totalKeys || totalKeys;

				// Função para pegar uma palavra aleatória
				const getRandomWord = () => {
					const randomKey = Math.floor(
						Math.random() * totalKeys + 1
					).toString();
					return dailyWords[randomKey];
				};

				let candidateWord =
					dailyWords[key.toString()] ?? getRandomWord();
				let found = dictionaryData.find(
					(item) =>
						item.word.toLowerCase() === candidateWord.toLowerCase()
				);

				const triedWords = new Set<string>();
				triedWords.add(candidateWord);

				// Tenta palavras aleatórias até encontrar um significado
				while (!found && triedWords.size < totalKeys) {
					candidateWord = getRandomWord();
					if (triedWords.has(candidateWord)) continue; // evita repetir
					triedWords.add(candidateWord);
					found = dictionaryData.find(
						(item) =>
							item.word.toLowerCase() ===
							candidateWord.toLowerCase()
					);
				}

				setWord(candidateWord);
				setMeaning(found?.meaning ?? "Significado não encontrado.");
			} catch (error) {
				console.error("Erro ao obter palavra diária:", error);
				setWord("Erro");
				setMeaning("Não foi possível carregar a palavra do dia.");
			}
		}

		getDailyWord();
	}, [dictionaryData]);

	return { word, meaning };
}
