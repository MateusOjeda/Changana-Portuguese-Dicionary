import { Text, View, StyleSheet } from "react-native";
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
		backgroundColor: "#fffb8aff",
		padding: 10,
		marginVertical: 3,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 17,
		fontWeight: "400",
		marginLeft: 10,
	},
	meaning: {
		fontSize: 14,
		marginLeft: 10,
	},
});
