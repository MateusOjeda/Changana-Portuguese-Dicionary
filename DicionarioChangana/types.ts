export type DictionaryItem = {
	id: number;
	word: string;
	meaning: string;
	dailyKey?: string;
	icon?: string;
};

export type SearchedWord = {
	date: Date;
	word: string;
};
