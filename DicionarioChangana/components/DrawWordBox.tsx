import React, { useState, useRef } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Platform,
} from "react-native";
import { useDrawWord } from "../hooks/useDrawWord";
import { DictionaryItem } from "../types";
import { router } from "expo-router";
import { AppText } from "../components/wrapper/AppText";

type DailyWordProps = {
	dictionaryData: DictionaryItem[];
};

export function DrawWordBox({ dictionaryData }: DailyWordProps) {
	const [dictionaryItem, setDictionaryItem] = useState<DictionaryItem>(
		useDrawWord(dictionaryData)
	);

	const fadeAnim = useRef(new Animated.Value(1)).current;

	const handleDrawNewWord = () => {
		// Fade out
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			// Change the word
			setDictionaryItem(useDrawWord(dictionaryData));

			// Fade in
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		});
	};

	const handleMeaningPress = () => {
		router.push({
			pathname: "/meaning/[id]",
			params: { ...dictionaryItem },
		});
	};

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.word, { opacity: fadeAnim }]}>
				{dictionaryItem.word}
			</Animated.Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleDrawNewWord}
				>
					<AppText style={styles.buttonText}>Sortear palavra</AppText>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={handleMeaningPress}
				>
					<AppText style={styles.buttonText}>Ver significado</AppText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				backgroundColor: "#fff",
				borderRadius: 8,
				padding: 10,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.2,
				shadowRadius: 4,
			},
			android: {
				backgroundColor: "#fff",
				borderRadius: 8,
				padding: 10,
				elevation: 4,
				shadowColor: "#000",
			},
		}),
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	word: {
		fontSize: 30,
		fontWeight: "500",
		color: "#044a02",
		textAlign: "center",
		marginVertical: 12,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	button: {
		backgroundColor: "#044a02",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		flex: 1,
		marginHorizontal: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});
