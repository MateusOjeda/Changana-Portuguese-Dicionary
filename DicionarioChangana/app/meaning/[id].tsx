import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function WordMeaning() {
	const { id, meaning, word } = useLocalSearchParams<{
		id: string;
		meaning: string;
		word: string;
	}>();

	return (
		<View>
			<Text style={{ fontSize: 24 }}>{word}</Text>
			<Text>👉{meaning}</Text>
		</View>
	);
}
