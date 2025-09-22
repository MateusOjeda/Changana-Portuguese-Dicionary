import { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TextInput,
	View,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDictionaryData } from "../hooks/useDictionaryData";
import { DictionaryListItem } from "../components/DictionaryListItem";
import { DailyWord } from "../components/DailyWord";
import { runSearch } from "../utils/searchUtils";
import { DictionaryItem } from "../types";
import { router } from "expo-router";

export default function Index() {
	const { isLoading, data: fullData, error } = useDictionaryData();
	const [data, setData] = useState<DictionaryItem[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query === "") {
			setData([]);
			return;
		}
		const rankedData = runSearch(fullData, query);
		setData(rankedData.slice(0, 8));
	};

	const handleSubmit = (query: string) => {
		const rankedData = runSearch(fullData, query);
		if (rankedData.length === 0) {
			router.push({ pathname: "/notfound" });
			return;
		}
		router.push({
			pathname: "/meaning/[id]",
			params: { id: rankedData[0].index, ...rankedData[0] },
		});
	};

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size={"large"} color="#5500dc" />
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ fontSize: 18, textAlign: "center" }}>
					Erro coletando os dados. Por favor contate
					mateus.ojd@gmail.com
				</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={{
					paddingHorizontal: 20,
					paddingVertical: 10,
					borderColor: "#ccc",
					borderWidth: 1,
					borderRadius: 8,
					backgroundColor: "#fff",
				}}
				placeholder="Buscar palavra em português..."
				clearButtonMode="always"
				autoCapitalize="none"
				autoCorrect={false}
				value={searchQuery}
				onChangeText={handleSearch}
				onSubmitEditing={(e) => handleSubmit(e.nativeEvent.text)}
			/>
			<FlatList
				data={data}
				renderItem={({ item }) => <DictionaryListItem item={item} />}
				keyExtractor={(item) => item.index}
				keyboardShouldPersistTaps="always"
				style={styles.flatlist}
			/>
			<Text style={styles.title}>Palavra diária</Text>
			<DailyWord></DailyWord>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	flatlist: {
		position: "absolute",
		zIndex: 1,
		marginTop: 90,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 10,
	},
});
