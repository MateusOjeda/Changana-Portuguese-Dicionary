import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { DictionaryListItem } from "./DictionaryListItem";
import { DictionaryItem } from "../types";

type SearchResultsListProps = {
	data: DictionaryItem[];
};

export default function SearchResultsList({ data }: SearchResultsListProps) {
	return (
		<>
			<FlatList
				data={data}
				renderItem={({ item }) => <DictionaryListItem item={item} />}
				keyExtractor={(item) => item.id.toString()}
				keyboardShouldPersistTaps="always"
				style={styles.flatlist}
				contentContainerStyle={{
					borderBottomEndRadius: 12,
					borderBottomStartRadius: 12,
					overflow: "hidden",
					marginHorizontal: 20,
				}}
				pointerEvents="auto"
			/>
		</>
	);
}

const styles = StyleSheet.create({
	flatlist: {
		zIndex: 2,
		width: "100%",
		height: "100%",
	},
});
