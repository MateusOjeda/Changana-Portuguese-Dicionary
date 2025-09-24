import { useState, useRef, useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TextInput,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDictionaryData } from "../hooks/useDictionaryData";
import { useLocalDate } from "../hooks/useLocalDate";
import { DictionaryListItem } from "../components/DictionaryListItem";
import { DailyWord } from "../components/DailyWord";
import { FavoriteBox } from "../components/FavoriteBox";
import { runSearch } from "../utils/searchUtils";
import { DictionaryItem } from "../types";
import { router } from "expo-router";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";

export default function Index() {
	const { isLoading, data: fullData, error } = useDictionaryData();
	const [data, setData] = useState<DictionaryItem[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [focused, setFocused] = useState(false);
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		NavigationBar.setButtonStyleAsync("dark");
	}, []);

	useEffect(() => {
		const hide = Keyboard.addListener("keyboardDidHide", () => {
			setFocused(false);
			if (inputRef.current) inputRef.current.blur();
		});
		return () => hide.remove();
	}, []);

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
			params: { ...rankedData[0] },
		});
	};

	const handleOverlayPress = () => {
		setFocused(false);
		if (inputRef.current) inputRef.current.blur();
		Keyboard.dismiss();
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
				<Text
					style={{ fontSize: 18, textAlign: "center" }}
					numberOfLines={10}
				>
					{/* Erro coletando os dados. */}
					{String(error)}
				</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<Image
					source={require("../assets/images/icon-landing.png")}
					style={{
						width: "100%",
						height: 60,
						marginBottom: 5,
					}}
					resizeMode="contain"
				/>
				<TextInput
					ref={inputRef}
					style={[styles.input, focused && styles.focusedInput]}
					placeholder="Buscar palavra em português"
					autoCapitalize="none"
					multiline={false}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					autoCorrect={false}
					value={searchQuery}
					onChangeText={handleSearch}
					onSubmitEditing={(e) => handleSubmit(e.nativeEvent.text)}
				/>
				{searchQuery.length > 0 && (
					<TouchableOpacity
						onPress={() => {
							setSearchQuery("");
							setData([]);
						}}
						style={styles.clearButton}
					>
						<MaterialIcons name="close" size={22} color="#666" />
					</TouchableOpacity>
				)}
				{focused ? (
					<TouchableOpacity
						onPress={handleOverlayPress}
						style={styles.chevronLeftButton}
					>
						<Entypo name="chevron-left" size={30} color="#666" />
					</TouchableOpacity>
				) : (
					<Entypo
						style={styles.magnifyingGlass}
						name="magnifying-glass"
						size={24}
						color="#666"
					/>
				)}
			</View>

			{focused && (
				<>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<DictionaryListItem item={item} />
						)}
						keyExtractor={(item) => item.id.toString()}
						keyboardShouldPersistTaps="always"
						style={styles.flatlist}
						contentContainerStyle={{
							borderBottomEndRadius: 12,
							borderBottomStartRadius: 12,
							overflow: "hidden",
							marginHorizontal: 20,
						}}
					/>
					{/* Overlay */}
					<TouchableWithoutFeedback onPress={handleOverlayPress}>
						<View style={styles.overlay} pointerEvents="auto" />
					</TouchableWithoutFeedback>
				</>
			)}
			<View style={styles.allContent}>
				<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "flex-end",
							marginBottom: 10,
						}}
					>
						<Text style={styles.title}>Palavra do dia</Text>
						<Text>{useLocalDate()}</Text>
					</View>
					{!isLoading && fullData.length > 0 && (
						<DailyWord dictionaryData={fullData} />
					)}
				</View>

				<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
					<Text style={{ ...styles.title, marginBottom: 10 }}>
						Melhore seu vocabulário
					</Text>
				</View>
				<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
					<Text style={{ ...styles.title, marginBottom: 10 }}>
						Favoritas
					</Text>
					{!isLoading && fullData.length > 0 && (
						<FavoriteBox dictionaryData={fullData} />
					)}
				</View>
				<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
					<Text style={{ ...styles.title, marginBottom: 10 }}>
						Mais Pesquisadas
					</Text>
				</View>
			</View>

			<View style={styles.fakeNavBar} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		backgroundColor: "#e6f5ee",
	},
	allContent: {
		backgroundColor: "#f7f6f6ff",
		flex: 1,
		marginTop: 20,
	},
	inputContainer: {
		zIndex: 2, // Make sure this is above the overlay
		position: "relative",
		marginHorizontal: 20,
		marginTop: 15,
	},
	input: {
		paddingRight: 60,
		paddingLeft: 50,
		paddingVertical: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: "#fff",
		height: 50,
		fontSize: 18,
	},
	focusedInput: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	flatlist: {
		zIndex: 2,
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
	},
	clearButton: {
		padding: 4,
		position: "absolute",
		top: 75,
		right: 10,
	},
	chevronLeftButton: {
		position: "absolute",
		top: 76,
		left: 7,
	},
	magnifyingGlass: {
		position: "absolute",
		top: 78,
		left: 10,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		zIndex: 1,
	},
	fakeNavBar: {
		height: 48, // typical Android navbar height
		backgroundColor: "black",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
});
