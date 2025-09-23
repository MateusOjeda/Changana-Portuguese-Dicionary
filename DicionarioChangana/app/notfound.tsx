import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NotFound() {
	const navigation = useNavigation();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{ fontSize: 18, textAlign: "center", marginBottom: 30 }}
			>
				Os detalhes da palavra não puderam ser carregados no momento.
				Tente novamente depois.
			</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.goBack()}
			>
				<MaterialIcons name="arrow-back" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#333", // button background
		padding: 10, // touchable area
		borderRadius: 30, // circular button
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000", // optional shadow
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 4, // Android shadow
	},
});
