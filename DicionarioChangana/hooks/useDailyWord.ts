import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import Papa from "papaparse";
import filter from "lodash/filter";

export function useDailyWord() {
	const [word, setWord] = useState("");
	const [meaning, setMeaning] = useState("");

	function getDailyKey(date = new Date()) {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		// return "20251026"; // For testing purposes, always return the same date
		return `${y}${m}${d}`; // Ex: "20250922"
	}

	useEffect(() => {
		async function fetchDailyWord() {
			const asset = Asset.fromModule(
				require("../assets/daily_word_mock.csv")
			);
			await asset.downloadAsync();
			const response = await fetch(asset.uri);
			const text = await response.text();
			const parsed = Papa.parse(text, { header: true });

			if (parsed.data.length > 0) {
				const dailyKey = getDailyKey();
				const filteredData = filter(parsed.data, (word) => {
					return word.dailyKey && word.dailyKey.includes(dailyKey);
				});

				if (filteredData.length > 0) {
					const data = filteredData[0] as {
						word: string;
						meaning: string;
					};
					setWord(data.word);
					setMeaning(data.meaning);
				} else {
					setWord("N/A");
					setMeaning("No daily word found for today.");
				}
			}
		}
		fetchDailyWord();
	}, []);

	return { word, meaning };
}
