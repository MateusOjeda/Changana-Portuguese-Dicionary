import React, { useState, useCallback } from "react";
import {
	Text,
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import { DictionaryItem } from "../types";
import { router } from "expo-router";
import filter from "lodash/filter";
import { useFocusEffect } from "@react-navigation/native";
import { useFavorites } from "../hooks/useFavorites";

type DailyWordProps = {
	dictionaryData: DictionaryItem[];
};

export function FavoriteBox({ dictionaryData }: DailyWordProps) {
	const [favorites, setFavorites] = useState<String[]>([]);

	const { loadFavorites } = useFavorites();

	const checkFavorite = async () => {
		const favorites: string[] = await loadFavorites();
		setFavorites(favorites);
	};

	useFocusEffect(
		useCallback(() => {
			checkFavorite();
		}, [])
	);

	const handlePress = (word: string) => {
		const dictionaryItems = filter(dictionaryData, (item) => {
			const i = item as { word?: string };
			return i.word?.includes(word);
		});

		if (dictionaryItems[0] && typeof dictionaryItems[0] === "object") {
			router.push({
				pathname: "/meaning/[id]",
				params: { ...(dictionaryItems[0] as DictionaryItem) },
			});
		}
	};

	return (
		<View style={styles.container}>
			{favorites.length === 0 ? (
				<Text style={styles.emptyText}>
					Você ainda não adicionou palavras aos favoritos. Clique no
					coração para adicioná-la!
				</Text>
			) : (
				<>
					{favorites.map((word) => (
						<TouchableOpacity
							key={word.toString()}
							onPress={() => handlePress(word.toString())}
							style={styles.button}
						>
							<Text style={styles.buttonText}>{word}</Text>
						</TouchableOpacity>
					))}
				</>
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
				padding: 10,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.2,
				shadowRadius: 4,
			},
			android: {
				backgroundColor: "#fff",
				borderRadius: 8,
				padding: 10,
				elevation: 4,
				shadowColor: "#000",
			},
		}),
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 10,
		justifyContent: "flex-start",
	},
	button: {
		backgroundColor: "#e6f5ee", // cor de destaque
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 2,
		marginHorizontal: 5,
		marginBottom: 10,
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.2,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	buttonText: {
		color: "#044a02",
		fontSize: 14,
		fontWeight: "500",
	},
	emptyText: {
		fontSize: 16,
		color: "#555",
		textAlign: "center",
		fontStyle: "italic",
	},
});
