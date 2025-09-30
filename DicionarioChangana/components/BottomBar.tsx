import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useBottomBarActions } from "../hooks/useBottomBarActions";
import { AppText } from "../components/wrapper/AppText";

export function BottomBar() {
	const { handleEmail, handleDedicatory, handleRateApp } =
		useBottomBarActions();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleEmail} style={styles.button}>
				<Fontisto name="email" size={35} color="#ffffff9d" />
				<AppText style={styles.buttonText}>Sugestões</AppText>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleDedicatory} style={styles.button}>
				<FontAwesome5
					name="praying-hands"
					size={35}
					color="#ffffff9d"
				/>
				<AppText style={styles.buttonText}>Dedicatória</AppText>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleRateApp} style={styles.button}>
				<Feather name="star" size={35} color="#ffffff9d" />
				<AppText style={styles.buttonText}>Avaliar</AppText>
			</TouchableOpacity>
		</View>
	);
}

// --- Estilos ---

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		width: "30%",
		paddingVertical: 10,
		borderRadius: 18,
		alignItems: "center",
		backgroundColor: "#044a02",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
});
