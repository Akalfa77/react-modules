export function formatNumber(num) {
  if (!num && num !== 0) return "0";

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }

  return num.String();
}

export function removeDuplicates(existingMemes, newMemes) {
  const existingURLs = new Set(existingMemes.map((meme) => meme.url));

  const uniqueNewMemes = newMemes.filter((meme) => !existingURLs.has(meme.url));

  return uniqueNewMemes;
}

export function truncateText(text, maxLength = 80) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
