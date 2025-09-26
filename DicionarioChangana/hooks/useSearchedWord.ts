import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchedWord } from "../types";

export function useSearchedWord() {
	const addWord = async (word: string) => {
		const searchedWordsJson = await AsyncStorage.getItem("searchedWords");
		let searchedWords: SearchedWord[] = searchedWordsJson
			? JSON.parse(searchedWordsJson)
			: [];

		searchedWords = searchedWords.filter((item) => item.word !== word);

		const searchedWord: SearchedWord = {
			date: new Date(),
			word: word,
		};

		searchedWords.push(searchedWord);

		await AsyncStorage.setItem(
			"searchedWords",
			JSON.stringify(searchedWords)
		);
	};

	const loadSearchedWords = async () => {
		const searchedWordsJson = await AsyncStorage.getItem("searchedWords");
		const searchedWords: SearchedWord[] = searchedWordsJson
			? JSON.parse(searchedWordsJson)
			: [];
		return searchedWords;
	};

	const loadSearchedWordsByDate = async (n: number = 0) => {
		const searchedWordsJson = await AsyncStorage.getItem("searchedWords");
		let searchedWords: SearchedWord[] = searchedWordsJson
			? JSON.parse(searchedWordsJson).map((item: any) => ({
					...item,
					date: new Date(item.date), // convert string back to Date
			  }))
			: [];
		searchedWords = searchedWords.sort(
			(a, b) => b.date.getTime() - a.date.getTime()
		);
		if (n !== 0) {
			searchedWords = searchedWords.slice(0, n);
		}
		return searchedWords;
	};

	return { addWord, loadSearchedWords, loadSearchedWordsByDate };
}
