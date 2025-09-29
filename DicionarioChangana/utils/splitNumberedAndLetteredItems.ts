type Item = { itemName: string; itemText: string; subItems?: Item[] };

export function splitNumberedAndLetteredItems(text: string): Item[] {
	const numberRegex = /(^| )(\d+\.)\s+/g;
	const numberMatches = Array.from(text.matchAll(numberRegex));
	const items: Item[] = [];

	// text before first number
	if (numberMatches.length === 0 || (numberMatches[0].index ?? 0) > 0) {
		const preText = text
			.slice(0, numberMatches[0]?.index ?? text.length)
			.trim();
		if (preText) {
			items.push({ itemName: "", itemText: preText });
		}
	}

	for (let i = 0; i < numberMatches.length; i++) {
		const m = numberMatches[i];
		const marker = m[2];
		const startOfContent = m.index! + m[0].length;
		const endOfContent =
			i + 1 < numberMatches.length
				? numberMatches[i + 1].index!
				: text.length;

		const block = text.slice(startOfContent, endOfContent).trim();

		// Find subitems
		const subItems = splitLetters(block);

		// Main itemText ends **just before the first subitem marker**
		let mainText = block;
		if (subItems.length > 0) {
			const firstSubMarker = subItems[0].itemName;
			const indexFirstSubMarker = block.indexOf(firstSubMarker);
			if (indexFirstSubMarker !== -1) {
				mainText = block.slice(0, indexFirstSubMarker).trim();
			}
		}

		items.push({
			itemName: marker,
			itemText: mainText,
			subItems,
		});
	}

	return items;
}

const splitLetters = (text: string): Item[] => {
	const letterRegex = /(^| )([a-z]\))\s+/gi;
	const matches = Array.from(text.matchAll(letterRegex));
	if (matches.length === 0) return [];

	const result: Item[] = [];
	for (let i = 0; i < matches.length; i++) {
		const m = matches[i];
		const marker = m[2];
		const startOfContent = m.index! + m[0].length;
		const endOfContent =
			i + 1 < matches.length ? matches[i + 1].index! : text.length;

		const itemText = text.slice(startOfContent, endOfContent).trim();
		result.push({ itemName: marker, itemText });
	}
	return result;
};
