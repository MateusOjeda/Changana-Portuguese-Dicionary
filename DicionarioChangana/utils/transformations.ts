import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { DictionaryItem, SearchedWord } from "../types";

export function transformations() {
	const transformSearchedWordsToDictionaryItems = (
		searchedWords: SearchedWord[],
		dictionaryItems: DictionaryItem[]
	) => {
		const searchedData: DictionaryItem[] = searchedWords
			.map((s) => dictionaryItems.find((d) => d.word === s.word))
			.filter((item): item is DictionaryItem => !!item)
			.map((item) => ({
				...item,
				icon: "clock",
			}));
		return searchedData;
	};

	return { transformSearchedWordsToDictionaryItems };
}
