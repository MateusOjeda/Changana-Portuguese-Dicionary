import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { abbrMap } from "../utils/abreviations";

type TooltipTextProps = {
	text: string;
};

export default function TooltipText({ text }: TooltipTextProps) {
	const [tooltip, setTooltip] = useState<string | null>(null);

	const keys = Object.keys(abbrMap).sort((a, b) => b.length - a.length);
	const regex = new RegExp(
		`(${keys
			.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
			.join("|")})`,
		"g"
	);

	const renderSplitedText = (splitedText: string) => {
		const parts = splitedText.split(regex); // quebra mantendo as abreviações

		return parts.map((part, index) => {
			if (abbrMap[part]) {
				return (
					<Pressable
						key={index}
						onPress={() => setTooltip(abbrMap[part])}
					>
						<Text style={styles.highlight}>{part}</Text>
					</Pressable>
				);
			}
			return <Text key={index}>{part}</Text>;
		});
	};

	const splitItems = (text: string) => {
		const regexItems =
			/(\b[a-z]\)|\b\d+\.)\s*([\s\S]*?)(?=(\b[a-z]\)|\b\d+\.|$))/g;

		const splitedText = [];
		let match;

		while ((match = regexItems.exec(text)) !== null) {
			splitedText.push({
				itemName: match[1],
				itemText: match[2].trim(),
			});
		}
		return splitedText;
	};

	const splitedText = splitItems(text);

	return (
		<View>
			{splitedText.map((item) => (
				<View key={item.itemName}>
					<Text style={styles.textItem}>{item.itemName}</Text>
					<Text style={styles.text}>
						{renderSplitedText(item.itemText)}
					</Text>
				</View>
			))}

			<Modal
				visible={tooltip !== null}
				transparent
				animationType="fade"
				onRequestClose={() => setTooltip(null)}
			>
				<View style={styles.overlay}>
					<View style={styles.tooltip}>
						<Text style={styles.tooltipText}>{tooltip}</Text>
						<Pressable onPress={() => setTooltip(null)}>
							<Text style={styles.close}>Fechar</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		flexWrap: "wrap",
		marginBottom: 10,
	},
	textItem: {
		fontSize: 25,
		fontWeight: 600,
		marginBottom: 15,
	},
	highlight: {
		color: "blue",
		textDecorationLine: "underline",
	},
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	tooltip: {
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		minWidth: 200,
		alignItems: "center",
	},
	tooltipText: {
		fontSize: 16,
		marginBottom: 8,
	},
	close: {
		color: "red",
		marginTop: 4,
	},
});
