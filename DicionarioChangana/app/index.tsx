import { useState, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDictionaryData } from "../hooks/useDictionaryData";
import { useLocalDate } from "../hooks/useLocalDate";
import { runSearch } from "../utils/searchUtils";
import { DictionaryItem } from "../types";
import SearchBox from "../components/SearchBox";
import SearchResultsList from "../components/SearchResultsList";
import { DailyWordBox } from "../components/DailyWordBox";
import { FavoriteBox } from "../components/FavoriteBox";
import { LastSearchedBox } from "../components/LastSearchedBox";
import { DrawWordBox } from "../components/DrawWordBox";
import { BottomBar } from "../components/BottomBar";
import { Loading } from "../components/_Loading";
import { Error } from "../components/_Error";
import { useSearchedWord } from "../hooks/useSearchedWord";
import { transformations } from "../utils/transformations";
import { useFocusEffect } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
	const { isLoading, data: fullData, error } = useDictionaryData();
	const [focused, setFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchData, setSearchData] = useState<DictionaryItem[]>([]);
	const [searchedWordsData, setSearchedWordsData] = useState<
		DictionaryItem[]
	>([]);

	const { loadSearchedWordsByDate } = useSearchedWord();

	useFocusEffect(
		useCallback(() => {
			if (!fullData || fullData.length === 0) return;
			const fetchData = async () => {
				const searchedWords = await loadSearchedWordsByDate(10);
				const { transformSearchedWordsToDictionaryItems } =
					transformations();
				const searchedData: DictionaryItem[] =
					transformSearchedWordsToDictionaryItems(
						searchedWords,
						fullData
					);
				setSearchedWordsData(searchedData);
			};
			fetchData();
		}, [fullData])
	);

	useEffect(() => {
		NavigationBar.setButtonStyleAsync("dark");
	}, []);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query === "") {
			setSearchData(searchedWordsData);
			return;
		}
		const rankedData = runSearch(fullData, query);
		setSearchData(rankedData.slice(0, 8));
	};

	const handleSubmit = (query: string) => {
		if (!fullData) return;
		const rankedData = runSearch(fullData, query);
		if (rankedData.length === 0) {
			router.push({ pathname: "/notfound" });
			return;
		}
		router.push({
			pathname: "/meaning/[id]",
			params: { ...rankedData[0] },
		});
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error error={error} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<SearchBox
				searchQuery={searchQuery}
				onSearch={handleSearch}
				onFocusChange={setFocused}
				focused={focused}
				onSubmit={handleSubmit}
			/>
			{focused ? (
				<SearchResultsList data={searchData} />
			) : (
				<>
					<ScrollView
						showsVerticalScrollIndicator={true}
						contentContainerStyle={{ paddingBottom: 80 }}
						style={styles.allContent}
					>
						<View style={styles.sectionContainer}>
							<View style={styles.dailyWordHeader}>
								<Text style={styles.title}>Palavra do dia</Text>
								<Text style={styles.todayDateText}>
									{useLocalDate()}
								</Text>
							</View>
							{!isLoading && fullData.length > 0 && (
								<DailyWordBox dictionaryData={fullData} />
							)}
						</View>

						<View style={styles.sectionContainer}>
							<Text style={styles.title}>
								Últimas pesquisadas
							</Text>
							{!isLoading && fullData.length > 0 && (
								<LastSearchedBox dictionaryData={fullData} />
							)}
						</View>

						<View style={styles.sectionContainer}>
							<Text style={styles.title}>
								Melhore seu vocabulário
							</Text>
							{!isLoading && fullData.length > 0 && (
								<DrawWordBox dictionaryData={fullData} />
							)}
						</View>

						<View style={styles.sectionContainer}>
							<Text style={styles.title}>Favoritas</Text>
							{!isLoading && fullData.length > 0 && (
								<FavoriteBox dictionaryData={fullData} />
							)}
						</View>

						<View style={styles.sectionContainer}>
							{!isLoading && fullData.length > 0 && <BottomBar />}
						</View>
					</ScrollView>
					{/* Bottom menu */}
					<View style={styles.bottomMenu} />
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e6f5ee",
	},
	allContent: {
		backgroundColor: "#f7f6f6ff",
		flex: 1,
		marginTop: 20,
	},
	sectionContainer: {
		marginTop: 20,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 10,
	},
	dailyWordHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	todayDateText: {
		marginBottom: 10,
	},
	bottomMenu: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 80,
		backgroundColor: "rgba(255,255,255,0.85)",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 50,
	},
});
