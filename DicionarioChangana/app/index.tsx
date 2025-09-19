import { SetStateAction, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import Papa from "papaparse";

// const API_ENDPOINT = "https://randomuser.me/api/?results=30";

export default function Index() {
	console.log("app executed");

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState<Error | null>(null);
	const [fullData, setFullData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	async function readCsvAsset() {
		try {
			// Load the asset
			const asset = Asset.fromModule(
				require("../assets/data_provisory.csv")
			);
			await asset.downloadAsync();
			const response = await fetch(asset.uri);
			const text = await response.text();
			const parsed = Papa.parse(text, { header: true });
			const data = parsed.data;

			if (data[data.length - 1].index === "") {
				data.pop(); // Remove the last element if it's an empty object
			}
			console.log(data[data.length - 1]);
			setData(data);
		} catch (error) {
			setError(error instanceof Error ? error : new Error(String(error)));
			console.error("Error reading CSV asset:", error);
		}
	}

	useEffect(() => {
		setIsLoading(true);
		readCsvAsset();
		setIsLoading(false);
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

	const handleSearch = (query: SetStateAction<string>) => {
		setSearchQuery(query);
	};

	// const DATA = [
	// 	{
	// 		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
	// 		title: "First Item",
	// 	},
	// 	{
	// 		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
	// 		title: "Second Item",
	// 	},
	// 	{
	// 		id: "58694a0f-3da1-471f-bd96-145571e29d72",
	// 		title: "Third Item",
	// 	},
	// ];

	type ItemProps = { title: string };

	const Item = ({ title }: ItemProps) => (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.textinput}
				placeholder="Search"
				clearButtonMode="always"
				autoCapitalize="none"
				autoCorrect={false}
				value={searchQuery}
				onChangeText={(query) => handleSearch(query)}
			/>
			{/* <Text>{data}</Text> */}
			<FlatList
				data={data}
				renderItem={({ item }) => <Item title={item.word} />}
				keyExtractor={(item) => item.index}
			/>
			<Image
				source={require("../assets/images/icon.png")}
				style={{ width: 40, height: 40 }}
			></Image>
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
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});
