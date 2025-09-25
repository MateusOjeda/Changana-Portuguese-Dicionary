import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { DictionaryItem } from "../types";

export function runSearch(fullData: DictionaryItem[], query: string) {
	const formattedQuery = query
		.toLowerCase()
		.normalize("NFD") // decompose accented characters
		.replace(/[\u0300-\u036f]/g, ""); // remove diacritical marks

	const filteredData = filter(fullData, (word: DictionaryItem) => {
		const normalizedWord = word.word
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		return normalizedWord.includes(formattedQuery);
	});

	return orderBy(
		filteredData,
		[
			// prioritize words that start with the query
			(w: DictionaryItem) => {
				const normalizedWord = w.word
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "");
				return normalizedWord.startsWith(formattedQuery) ? 0 : 1;
			},
			// then sort alphabetically
			(w: DictionaryItem) => w.word.toLowerCase(),
		],
		["asc", "asc"]
	);
}
