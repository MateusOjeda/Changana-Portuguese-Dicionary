import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import { DictionaryItem } from "../types";

export function runSearch(fullData: DictionaryItem[], query: string) {
  const formattedQuery = query.toLowerCase();
  const filteredData = filter(fullData, (word: DictionaryItem) => {
    return word.word.toLowerCase().includes(formattedQuery);
  });

  return orderBy(
    filteredData,
    [
      (w: DictionaryItem) => (w.word.startsWith(query) ? 1 : 0),
      (w: DictionaryItem) => w.word,
    ],
    ["desc", "asc"]
  );
}