import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
	word: string;
}

export default function FavoriteButton({ word }: FavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	const { toggleFavorite, loadFavorites } = useFavorites();

	// Checar se a palavra já está nos favoritos
	useEffect(() => {
		const checkFavorite = async () => {
			const favorites = await loadFavorites();
			setIsFavorite(favorites.includes(word));
		};

		checkFavorite();
	}, [word]);

	// Função para adicionar/remover favorito
	const toggle = async () => {
		toggleFavorite(isFavorite, word);
		setIsFavorite(!isFavorite);
	};

	return (
		<TouchableOpacity style={styles.button} onPress={toggle}>
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
