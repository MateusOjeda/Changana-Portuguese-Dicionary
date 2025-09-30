import React, { useState } from "react";
import { View, Pressable, Modal, StyleSheet } from "react-native";
import { abbrMap, abreviationsSplit } from "../utils/abreviations";
import { splitNumberedAndLetteredItems } from "../utils/splitNumberedAndLetteredItems";
import { AppText } from "../components/wrapper/AppText";

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
						<AppText style={styles.highlight}>{part}</AppText>
					</Pressable>
				);
			}
			return <AppText key={index}>{part}</AppText>;
		});
	};

	// First we split on "1.". "2.", "a)", "b)" ...
	const textItems = splitNumberedAndLetteredItems(text);

	return (
		<View>
			{textItems.map((item) => (
				<View key={item.itemName}>
					{item.itemName !== "" && (
						<AppText style={styles.textItem}>
							{item.itemName}
						</AppText>
					)}
					<AppText style={styles.text}>
						{renderAbreviationsText(item.itemText)}
					</AppText>
					{item.subItems?.map((item) => (
						<View key={item.itemName}>
							{item.itemName !== "" && (
								<AppText style={styles.textSubItem}>
									{item.itemName}
								</AppText>
							)}
							<AppText style={styles.subText}>
								{renderAbreviationsText(item.itemText)}
							</AppText>
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
						<AppText style={styles.tooltipText}>{tooltip}</AppText>
						<Pressable onPress={() => setTooltip(null)}>
							<AppText style={styles.close}>Fechar</AppText>
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
