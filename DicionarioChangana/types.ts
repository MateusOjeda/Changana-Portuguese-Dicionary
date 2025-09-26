export type DictionaryItem = {
	id: number;
	word: string;
	meaning: string;
	dailyKey?: string;
};

export type SearchedWords = {
	date: Date;
	word: string;
};
