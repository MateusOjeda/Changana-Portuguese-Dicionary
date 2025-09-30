import { View, StyleSheet, Text } from "react-native";
import { AppText } from "../components/wrapper/AppText";

interface ErrorProps {
	error: Error;
}

export function Error({ error }: ErrorProps) {
	return (
		<View style={styles.centered}>
			<AppText style={styles.errorText}>{String(error)}</AppText>
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
