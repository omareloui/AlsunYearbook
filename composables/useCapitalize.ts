export function useCapitalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\-_]/g, " ")
    .replace(/\b./g, v => v.toUpperCase());
}
