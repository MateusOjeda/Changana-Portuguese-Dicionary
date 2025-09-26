import { View, StyleSheet, Text } from "react-native";

interface ErrorProps {
	error: Error;
}

export function Error({ error }: ErrorProps) {
	return (
		<View style={styles.centered}>
			<Text style={styles.errorText}>{String(error)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
		paddingHorizontal: 20,
	},
});
