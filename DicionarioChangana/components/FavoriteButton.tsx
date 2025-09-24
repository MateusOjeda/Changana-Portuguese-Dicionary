import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteButtonProps {
	word: string;
}

export default function FavoriteButton({ word }: FavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	// Checar se a palavra já está nos favoritos
	useEffect(() => {
		const checkFavorite = async () => {
			const favoritesJson = await AsyncStorage.getItem("favorites");
			const favorites: string[] = favoritesJson
				? JSON.parse(favoritesJson)
				: [];
			setIsFavorite(favorites.includes(word));
		};

		checkFavorite();
	}, [word]);

	// Função para adicionar/remover favorito
	const toggleFavorite = async () => {
		const favoritesJson = await AsyncStorage.getItem("favorites");
		let favorites: string[] = favoritesJson
			? JSON.parse(favoritesJson)
			: [];

		if (isFavorite) {
			favorites = favorites.filter((w) => w !== word);
		} else {
			favorites.push(word);
		}

		await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
		setIsFavorite(!isFavorite);
	};

	return (
		<TouchableOpacity style={styles.button} onPress={toggleFavorite}>
			{isFavorite ? (
				<FontAwesome name="heart" size={30} color="#4e4e4eff" />
			) : (
				<FontAwesome name="heart-o" size={30} color="#4e4e4eff" />
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
