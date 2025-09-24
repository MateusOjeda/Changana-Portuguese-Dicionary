import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { DictionaryItem } from "../types";

export function runSearch(fullData: DictionaryItem[], query: string) {
	const formattedQuery = query.toLowerCase();

	const filteredData = filter(fullData, (word: DictionaryItem) =>
		word.word.toLowerCase().includes(formattedQuery)
	);

	return orderBy(
		filteredData,
		[
			// prioritize words that start with the query
			(w: DictionaryItem) =>
				w.word.toLowerCase().startsWith(formattedQuery) ? 0 : 1,
			// then sort alphabetically
			(w: DictionaryItem) => w.word.toLowerCase(),
		],
		["asc", "asc"]
	);
}
