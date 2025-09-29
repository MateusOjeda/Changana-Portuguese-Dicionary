import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { abbrMap, abreviationsSplit } from "../utils/abreviations";
import { splitNumberedAndLetteredItems } from "../utils/splitNumberedAndLetteredItems";

type TooltipTextProps = {
	text: string;
};

export default function TooltipText({ text }: TooltipTextProps) {
	const [tooltip, setTooltip] = useState<string | null>(null);

	// Here we render and create tooltips for abreviations
	const renderAbreviationsText = (splitedText: string) => {
		const parts = abreviationsSplit(splitedText);

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

	// First we split on "1.". "2.", "a)", "b)" ...
	const textItems = splitNumberedAndLetteredItems(text);

	return (
		<View>
			{textItems.map((item) => (
				<View key={item.itemName}>
					{item.itemName !== "" && (
						<Text style={styles.textItem}>{item.itemName}</Text>
					)}
					<Text style={styles.text}>
						{renderAbreviationsText(item.itemText)}
					</Text>
					{item.subItems?.map((item) => (
						<View key={item.itemName}>
							{item.itemName !== "" && (
								<Text style={styles.textSubItem}>
									{item.itemName}
								</Text>
							)}
							<Text style={styles.subText}>
								{renderAbreviationsText(item.itemText)}
							</Text>
						</View>
					))}
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
	textItem: {
		fontSize: 25,
		fontWeight: 600,
		marginBottom: 15,
	},
	textSubItem: {
		fontSize: 20,
		fontWeight: 600,
		marginBottom: 15,
		marginLeft: 10,
	},
	text: {
		fontSize: 20,
		flexWrap: "wrap",
		marginBottom: 10,
	},
	subText: {
		fontSize: 18,
		flexWrap: "wrap",
		marginBottom: 10,
		marginLeft: 10,
	},
	highlight: {
		fontSize: 17,
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
