type Item = { itemName: string; itemText: string; subItems?: Item[] };

export function splitNumberedAndLetteredItems(text: string): Item[] {
	const numberRegex = /(^| )(\d+\.)\s+/g;
	const letterRegex = /(^| )([a-z]\))\s+/gi;

	const numberMatches = Array.from(text.matchAll(numberRegex));

	// Case 1: numbers present
	if (numberMatches.length > 0) {
		const items: Item[] = [];

		for (let i = 0; i < numberMatches.length; i++) {
			const m = numberMatches[i];
			const marker = m[2];
			const start = m.index! + m[0].length;
			const end =
				i + 1 < numberMatches.length
					? numberMatches[i + 1].index!
					: text.length;
			const block = text.slice(start, end).trim();

			const subItems = splitLetters(block, letterRegex);

			// main text before first subitem
			let mainText = block;
			if (subItems.length > 0) {
				const indexFirstSubMarker = block.indexOf(subItems[0].itemName);
				if (indexFirstSubMarker !== -1) {
					mainText = block.slice(0, indexFirstSubMarker).trim();
				}
			}

			items.push({ itemName: marker, itemText: mainText, subItems });
		}

		// preserve text before first number if any
		const preText = text.slice(0, numberMatches[0].index!).trim();
		if (preText) items.unshift({ itemName: "", itemText: preText });

		return items;
	}

	// Case 2: letters only
	const lettersOnly = splitLetters(text, letterRegex);
	if (lettersOnly.length > 0) return lettersOnly;

	// Case 3: no markers
	return [{ itemName: "", itemText: text.trim() }];
}

const splitLetters = (text: string, regex: RegExp): Item[] => {
	const matches = Array.from(text.matchAll(regex));
	if (matches.length === 0) return [];

	const result: Item[] = [];
	for (let i = 0; i < matches.length; i++) {
		const m = matches[i];
		const marker = m[2];
		const start = m.index! + m[0].length;
		const end =
			i + 1 < matches.length ? matches[i + 1].index! : text.length;
		const itemText = text.slice(start, end).trim();
		result.push({ itemName: marker, itemText });
	}
	return result;
};
