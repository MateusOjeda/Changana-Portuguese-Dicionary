import React, { useState, useCallback } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { DictionaryItem } from "../types";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { SearchedWord } from "../types";
import { useSearchedWord } from "../hooks/useSearchedWord";
import { runSearch } from "../utils/searchUtils";
import { AppText } from "../components/wrapper/AppText";

type LastSearchedProps = {
	dictionaryData: DictionaryItem[];
};

export function LastSearchedBox({ dictionaryData }: LastSearchedProps) {
	const [searchedWords, setSearchedWords] = useState<SearchedWord[]>([]);

	const { loadSearchedWordsByDate } = useSearchedWord();

	const checkSearchedWords = async () => {
		const searchedWords: SearchedWord[] = await loadSearchedWordsByDate(10);
		setSearchedWords(searchedWords);
	};

	useFocusEffect(
		useCallback(() => {
			checkSearchedWords();
		}, [])
	);

	const handlePress = (word: string) => {
		const rankedData = runSearch(dictionaryData, word);

		if (rankedData[0] && typeof rankedData[0] === "object") {
			router.push({
				pathname: "/meaning/[id]",
				params: { ...(rankedData[0] as DictionaryItem) },
			});
		}
	};

	return (
		<View style={styles.container}>
			{searchedWords.length === 0 ? (
				<AppText style={styles.emptyText}>
					Últimas palavras pesquisadas aparecerão aqui.
				</AppText>
			) : (
				<View style={styles.grid}>
					{searchedWords.map((s, index) => {
						const isLastColumn = index % 2 === 1;
						const numRows = Math.ceil(searchedWords.length / 2);
						const isLastRow = Math.floor(index / 2) === numRows - 1;
						return (
							<TouchableOpacity
								key={s.word}
								onPress={() => handlePress(s.word)}
								style={[
									styles.gridItem,
									isLastColumn && { borderRightWidth: 0 },
									isLastRow && { borderBottomWidth: 0 },
								]}
							>
								<AppText style={styles.gridItemText}>
									{s.word}
								</AppText>
							</TouchableOpacity>
						);
					})}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				backgroundColor: "#fff",
				borderRadius: 8,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.2,
				shadowRadius: 4,
			},
			android: {
				backgroundColor: "#fff",
				borderRadius: 8,
				elevation: 4,
				shadowColor: "#000",
			},
		}),
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	gridItem: {
		width: "50%",
		paddingVertical: 12,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		alignItems: "center",
	},
	gridItemText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#044a02",
	},
	emptyText: {
		fontSize: 16,
		color: "#555",
		textAlign: "center",
		fontStyle: "italic",
		marginVertical: 10,
		width: "100%",
	},
});
