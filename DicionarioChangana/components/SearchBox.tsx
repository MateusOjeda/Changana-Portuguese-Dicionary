import React, { useRef, useEffect } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	Keyboard,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

type SearchBoxProps = {
	searchQuery: string;
	onSearch: (query: string) => void;
	onFocusChange: (focused: boolean) => void;
	focused: boolean;
	onSubmit: (query: string) => void;
};

export default function SearchBox({
	searchQuery,
	onSearch,
	onFocusChange,
	focused,
	onSubmit,
}: SearchBoxProps) {
	const inputRef = useRef<TextInput>(null);

	const handleClearInput = () => {
		onSearch("");
	};

	const handleBlur = () => {
		onFocusChange(false);
		if (inputRef.current) inputRef.current.blur();
	};

	useEffect(() => {
		const hide = Keyboard.addListener("keyboardDidHide", handleBlur);
		return () => hide.remove();
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Image
				source={require("../assets/images/icon-landing.png")}
				style={styles.logo}
				resizeMode="contain"
			/>
			<Image
				source={require("../assets/images/mz-flag.png")}
				style={styles.flag}
				resizeMode="contain"
			/>
			<TextInput
				ref={inputRef}
				style={[styles.input, focused && styles.focusedInput]}
				placeholder="Buscar palavra em português"
				autoCapitalize="none"
				multiline={false}
				onFocus={() => {
					onSearch(searchQuery);
					onFocusChange(true);
				}}
				autoCorrect={false}
				value={searchQuery}
				onChangeText={onSearch}
				onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
			/>
			{searchQuery.length > 0 && (
				<TouchableOpacity
					onPress={handleClearInput}
					style={styles.clearButton}
				>
					<MaterialIcons name="close" size={22} color="#666" />
				</TouchableOpacity>
			)}
			{focused ? (
				<TouchableOpacity
					onPress={handleBlur}
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
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		zIndex: 2,
		position: "relative",
		marginHorizontal: 20,
		marginTop: 15,
	},
	logo: {
		width: "100%",
		height: 60,
		marginBottom: 5,
	},
	flag: {
		position: "absolute",
		right: 0,
		width: 60,
		height: 60,
		marginBottom: 5,
		marginRight: 15,
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
});
