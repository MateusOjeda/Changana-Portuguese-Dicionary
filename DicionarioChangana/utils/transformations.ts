import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { DictionaryItem, SearchedWords } from "../types";

export function transformations() {
	const transformSearchedWordsToDictionaryItems = (
		searchedWords: SearchedWords[],
		dictionaryItems: DictionaryItem[]
	) => {
		const searchedData: DictionaryItem[] = searchedWords
			.map((s) => dictionaryItems.find((d) => d.word === s.word))
			.filter((item): item is DictionaryItem => !!item);
		return searchedData;
	};

	return { transformSearchedWordsToDictionaryItems };
}
