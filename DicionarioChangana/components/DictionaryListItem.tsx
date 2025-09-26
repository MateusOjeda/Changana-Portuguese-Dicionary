import { Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { DictionaryItem } from "../types";
import Feather from "@expo/vector-icons/Feather";

export function DictionaryListItem({ item }: { item: DictionaryItem }) {
	return (
		<Pressable
			onPress={() => {
				router.push({
					pathname: "/meaning/[id]",
					params: item,
				});
			}}
		>
			<View style={styles.item}>
				{item.icon === "clock" && (
					<Feather name="clock" size={24} color="black" />
				)}

				<Text style={styles.title}>{item.word}</Text>
			</View>
		</Pressable>
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
		flexDirection: "row",
	},
	title: {
		fontSize: 17,
		fontWeight: "400",
		marginLeft: 10,
	},
});
