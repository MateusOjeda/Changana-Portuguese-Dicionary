import React, { useState } from "react";
import { View, Pressable, Modal, StyleSheet, Button } from "react-native";
import { abbrMap, abreviationsSplit } from "../utils/abreviations";
import { splitNumberedAndLetteredItems } from "../utils/splitNumberedAndLetteredItems";
import { AppText } from "../components/wrapper/AppText";

type TooltipTextProps = {
	text: string;
};

export default function TooltipText({ text }: TooltipTextProps) {
	const [tooltip, setTooltip] = useState<string | null>(null);
	const [fontIncrement, setFontIncrement] = useState(0);

	const increaseFont = () => setFontIncrement((prev) => prev + 2);
	const decreaseFont = () =>
		setFontIncrement((prev) => Math.max(prev - 2, -3));

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
						<AppText
							style={[
								styles.highlight,
								{
									fontSize:
										baseSizes.highlight + fontIncrement,
								},
							]}
						>
							{part}
						</AppText>
					</Pressable>
				);
			}
			return <AppText key={index}>{part}</AppText>;
		});
	};

	// First we split on "1.". "2.", "a)", "b)" ...
	const textItems = splitNumberedAndLetteredItems(text);

	const baseSizes = {
		highlight: 17,
		textItem: 25,
		text: 20,
		textSubItem: 20,
		subText: 18,
		tooltipText: 16,
	};

	return (
		<View>
			<View style={styles.incrementContainer}>
				<View style={styles.incrementButton}>
					<Button title="A-" onPress={decreaseFont} color="#044a02" />
				</View>
				<View style={styles.spacer} />
				<View style={styles.incrementButton}>
					<Button title="A+" onPress={increaseFont} color="#044a02" />
				</View>
			</View>

			{textItems.map((item) => (
				<View key={item.itemName}>
					{item.itemName !== "" && (
						<AppText
							style={[
								styles.textItem,
								{
									fontSize:
										baseSizes.textItem + fontIncrement,
								},
							]}
						>
							{item.itemName}
						</AppText>
					)}
					<AppText
						style={[
							styles.text,
							{ fontSize: baseSizes.text + fontIncrement },
						]}
					>
						{renderAbreviationsText(item.itemText)}
					</AppText>
					{item.subItems?.map((item) => (
						<View key={item.itemName}>
							{item.itemName !== "" && (
								<AppText
									style={[
										styles.textSubItem,
										{
											fontSize:
												baseSizes.textSubItem +
												fontIncrement,
										},
									]}
								>
									{item.itemName}
								</AppText>
							)}
							<AppText
								style={[
									styles.subText,
									{
										fontSize:
											baseSizes.subText + fontIncrement,
									},
								]}
							>
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
						<AppText
							style={[
								styles.tooltipText,
								{
									fontSize:
										baseSizes.tooltipText + fontIncrement,
								},
							]}
						>
							{tooltip}
						</AppText>
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
		fontWeight: 600,
		marginBottom: 15,
	},
	textSubItem: {
		fontWeight: 600,
		marginBottom: 15,
		marginLeft: 10,
	},
	text: {
		flexWrap: "wrap",
		marginBottom: 10,
	},
	subText: {
		flexWrap: "wrap",
		marginBottom: 10,
		marginLeft: 10,
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
		marginBottom: 8,
	},
	close: {
		color: "red",
		marginTop: 4,
	},
	incrementContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	incrementButton: {
		width: 38,
	},
	spacer: {
		width: 12, // space between buttons
	},
});
