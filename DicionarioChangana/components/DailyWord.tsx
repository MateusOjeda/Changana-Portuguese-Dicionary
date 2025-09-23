import { Text, View, StyleSheet, Platform } from "react-native";
import { useDailyWord } from "../hooks/useDailyWord";

export function DailyWord() {
	const { word, meaning } = useDailyWord();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{word}</Text>
			<Text style={styles.meaning}>{meaning}</Text>
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
	},
	title: {
		fontSize: 20,
		fontWeight: "500",
		marginLeft: 10,
		color: "#004284ff",
	},
	meaning: {
		fontSize: 14,
		marginLeft: 10,
	},
});
