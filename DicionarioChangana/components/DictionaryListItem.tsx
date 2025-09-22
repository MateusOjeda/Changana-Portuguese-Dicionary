import { Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { DictionaryItem } from "../types";

export function DictionaryListItem({ item }: { item: DictionaryItem }) {
	return (
		<View style={styles.item}>
			<Pressable
				onPress={() => {
					router.push({
						pathname: "/meaning/[id]",
						params: { id: item.index, ...item },
					});
				}}
			>
				<Text style={styles.title}>{item.word}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#d4ffdeff",
		padding: 10,
		marginVertical: 3,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 17,
		fontWeight: "400",
		marginLeft: 10,
	},
});
