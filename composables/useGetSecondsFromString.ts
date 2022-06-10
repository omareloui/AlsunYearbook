export function useGetSecondsFromString() {
  return (string: string) => {
    const minutesMatch = string.match(/(^\d+)m$/);

    if (minutesMatch) return parseInt(minutesMatch[1], 10) * 60;

    const daysMatch = string.match(/(^\d+)d$/);
    if (daysMatch) return parseInt(daysMatch[1], 10) * 24 * 60 * 60;

    throw new Error("This string isn't supported to seconds from, yet.");
  };
}
