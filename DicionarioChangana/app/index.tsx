import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import Papa from "papaparse";
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { Link, router } from "expo-router";

// const API_ENDPOINT = "https://randomuser.me/api/?results=30";

export default function Index() {
	console.log("app executed");

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<DictionaryItem[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [fullData, setFullData] = useState<DictionaryItem[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	async function readCsvAsset() {
		try {
			// Load the asset
			setIsLoading(true);
			const asset = Asset.fromModule(
				require("../assets/data_provisory.csv")
			);
			await asset.downloadAsync();
			const response = await fetch(asset.uri);
			const text = await response.text();
			const parsed = Papa.parse(text, { header: true });
			const data = parsed.data as DictionaryItem[];

			if (data.length > 0 && data[data.length - 1].index === "") {
				data.pop(); // Remove the last element if it's an empty object
			}
			// setData(data);
			setFullData(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error instanceof Error ? error : new Error(String(error)));
			console.error("Error reading CSV asset:", error);
		}
	}

	useEffect(() => {
		readCsvAsset();
	}, []);

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

	const runSearch = (query: string) => {
		const formattedQuery = query.toLowerCase();
		const filteredData = filter(fullData, (word: DictionaryItem) => {
			return contains(word, formattedQuery);
		});

		return orderBy(
			filteredData,
			[
				(w: DictionaryItem) => (w.word.startsWith(query) ? 1 : 0), // rank 1 if starts with query
				(w: DictionaryItem) => w.word, // then alphabetically
			],
			["desc", "asc"] // 1 first, then alphabetic
		);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);

		if (query === "") {
			setData([]);
			return;
		}

		const rankedData = runSearch(query);

		setData(rankedData.slice(0, 15));
	};

	const handleSubmit = (query: string) => {
		const rankedData = runSearch(query);

		if (rankedData.length === 0) {
			router.push({ pathname: "/notfound" });
			return;
		}

		router.push({
			pathname: "/meaning/[id]",
			params: { id: rankedData[0].index, ...rankedData[0] },
		});
	};

	const contains = ({ word }: DictionaryItem, query: string) => {
		if (word.toLowerCase().includes(query)) {
			return true;
		}
		return false;
	};

	type ItemProps = { item: DictionaryItem };

	type DictionaryItem = {
		index: string;
		word: string;
		title: string;
		meaning: string;
	};

	const Item = ({ item }: ItemProps) => (
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

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.textinput}
				placeholder="Buscar palavra em português..."
				clearButtonMode="always"
				autoCapitalize="none"
				autoCorrect={false}
				value={searchQuery}
				onChangeText={(query) => handleSearch(query)}
				onSubmitEditing={(e) => handleSubmit(e.nativeEvent.text)}
			/>
			<FlatList
				data={data}
				renderItem={({ item }) => <Item item={item} />}
				keyExtractor={(item) => item.index}
				keyboardShouldPersistTaps="always"
			/>
			{/* <Image
				source={require("../assets/images/icon.png")}
				style={{ width: 40, height: 40 }}
			></Image> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		// justifyContent: "center",
		// alignItems: "center",
	},
	textinput: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: "#fff",
	},
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
