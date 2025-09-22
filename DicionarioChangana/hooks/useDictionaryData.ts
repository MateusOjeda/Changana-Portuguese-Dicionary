import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import Papa from "papaparse";
import { DictionaryItem } from "../types";

export function useDictionaryData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DictionaryItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function readCsvAsset() {
      try {
        setIsLoading(true);
        const asset = Asset.fromModule(require("../assets/data_provisory.csv"));
        await asset.downloadAsync();
        const response = await fetch(asset.uri);
        const text = await response.text();
        const parsed = Papa.parse(text, { header: true });
        const data = parsed.data as DictionaryItem[];
        if (data.length > 0 && data[data.length - 1].index === "") {
          data.pop();
        }
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error instanceof Error ? error : new Error(String(error)));
      }
    }
    readCsvAsset();
  }, []);

  return { isLoading, data, error };
}