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
		backgroundColor: "#fff",
		borderColor: "#ccc",
		borderWidth: 1,
		borderTopWidth: 0,
		padding: 10,
		height: 50,
	},
	title: {
		fontSize: 17,
		fontWeight: "400",
		marginLeft: 10,
	},
});
