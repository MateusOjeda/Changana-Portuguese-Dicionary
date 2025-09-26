import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFavorites() {
	const loadFavorites = async () => {
		const favoritesJson = await AsyncStorage.getItem("favorites");
		const favorites: string[] = favoritesJson
			? JSON.parse(favoritesJson)
			: [];
		return favorites;
	};

	// Função para adicionar/remover favorito
	const toggleFavorite = async (isFavorite: boolean, word: string) => {
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
	};

	return { loadFavorites, toggleFavorite };
}
