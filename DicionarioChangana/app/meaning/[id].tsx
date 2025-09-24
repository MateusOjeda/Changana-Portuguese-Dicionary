import { useLocalSearchParams } from "expo-router";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FavoriteButton from "../../components/FavoriteButton";

export default function WordMeaning() {
	const { id, meaning, word } = useLocalSearchParams<{
		id: string;
		meaning: string;
		word: string;
	}>();

	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.goBack()}
				>
					<Feather name="arrow-left" size={35} color="#4e4e4eff" />
				</TouchableOpacity>
				<Text style={styles.word}>{word}</Text>
				<FavoriteButton word={word} />
			</View>
			<View style={styles.meaningCard}>
				<Text style={styles.meaning}>{meaning}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	word: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
	},
	meaningCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // para Android
	},
	meaning: {
		fontSize: 18,
		color: "#555",
		lineHeight: 26,
	},
	button: {
		// padding: 10, // touchable area
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
});
