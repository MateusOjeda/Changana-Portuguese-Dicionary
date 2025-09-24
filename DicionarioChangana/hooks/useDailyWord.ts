import { useEffect, useState } from "react";
import filter from "lodash/filter";
import { DictionaryItem } from "../types";

export function useDailyWord(dictionaryData: DictionaryItem[]) {
	const [word, setWord] = useState("");
	const [meaning, setMeaning] = useState("");

	function getDailyKey(date: Date) {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		// return "20251026"; // For testing purposes, always return the same date
		return `${y}${m}${d}`; // Ex: "20250922"
	}

	function filterByDailyKey(
		dictionaryData: DictionaryItem[],
		dailyKey: string
	) {
		return filter(dictionaryData, (item) => {
			const i = item as { dailyKey?: string };
			return i.dailyKey?.includes(dailyKey);
		});
	}

	function parseDate(str: string) {
		const year = parseInt(str.slice(0, 4), 10);
		const month = parseInt(str.slice(4, 6), 10) - 1; // month is 0-based
		const day = parseInt(str.slice(6, 8), 10);

		return new Date(year, month, day);
	}

	function daysBetween(date1: Date, date2: Date) {
		const oneDay = 1000 * 60 * 60 * 24;
		const diffInMs = date2.getTime() - date1.getTime();
		return Math.round(diffInMs / oneDay);
	}

	useEffect(() => {
		async function fetchDailyWord() {
			const allDates = dictionaryData
				.map((item) => item.dailyKey)
				.filter((d): d is string => typeof d === "string")
				.map((d) => Number(d))
				.filter((n) => !isNaN(n) && n > 0);
			const minDateStr = parseDate(Math.min(...allDates).toString());
			const maxDateStr = parseDate(Math.max(...allDates).toString());

			const today = new Date();
			let date: Date;
			if (today > maxDateStr) {
				const daysInterval =
					daysBetween(minDateStr, today) %
					daysBetween(minDateStr, maxDateStr);
				date = new Date(minDateStr); // start from minDateStr
				date.setDate(date.getDate() + daysInterval); // add interval
			} else {
				date = today;
			}

			const dailyKey = getDailyKey(date);
			const filteredData = filterByDailyKey(dictionaryData, dailyKey);

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
		fetchDailyWord();
	}, []);

	return { word, meaning };
}
