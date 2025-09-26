import { DictionaryItem } from "../types";

export function useDrawWord(dictionaryData: DictionaryItem[]) {
	const n = dictionaryData.length;
	const randomIndex = Math.floor(Math.random() * n);
	return dictionaryData[randomIndex];
}
