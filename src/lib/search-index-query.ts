export type SearchEntry = {
  href: string;
  title: string;
  /** Page label for section entries, empty for page entries. */
  page: string;
  description: string;
};

/** Every query word must match; page titles rank above sections. */
export function searchDocs(index: SearchEntry[], query: string, limit = 12) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const haystack =
        `${title} ${entry.page} ${entry.description}`.toLowerCase();
      if (!words.every((word) => haystack.includes(word))) return null;
      let score = entry.page ? 0 : 2;
      if (title.startsWith(words[0])) score += 3;
      score += words.filter((word) => title.includes(word)).length;
      return { entry, score };
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.entry);
}
