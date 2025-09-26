import { View, StyleSheet, ActivityIndicator } from "react-native";

export function Loading() {
	return (
		<View style={styles.centered}>
			<ActivityIndicator size={"large"} color="#5500dc" />
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
