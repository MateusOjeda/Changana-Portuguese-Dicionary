import { useLocalSearchParams } from "expo-router";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function WordMeaning() {
	const { id, meaning, word } = useLocalSearchParams<{
		id: string;
		meaning: string;
		word: string;
	}>();

	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.goBack()}
			>
				<MaterialIcons name="arrow-back" size={24} color="#fff" />
			</TouchableOpacity>
			<Text style={styles.word}>{word}</Text>
			<View style={styles.meaningCard}>
				<Text style={styles.meaning}>👉 {meaning}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f5f5f5",
		alignItems: "center",
	},
	word: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
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
		backgroundColor: "#333", // button background
		padding: 10, // touchable area
		borderRadius: 30, // circular button
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000", // optional shadow
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 4, // Android shadow
	},
});
