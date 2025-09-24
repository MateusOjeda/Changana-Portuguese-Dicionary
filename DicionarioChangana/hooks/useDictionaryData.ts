import { useEffect, useState } from "react";
import { DictionaryItem } from "../types";
import Data from "../assets/data.json";

export function useDictionaryData() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<DictionaryItem[]>([]);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function readCsvAsset() {
			try {
				setIsLoading(true);
				const jsonData = Data as DictionaryItem[];
				setData(jsonData);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setError(
					error instanceof Error ? error : new Error(String(error))
				);
			}
		}
		readCsvAsset();
	}, []);

	return { isLoading, data, error };
}
