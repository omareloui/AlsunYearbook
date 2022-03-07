export function useParseDateInSeconds(time: string): number {
  const timeNum = parseFloat(time);

  const isSeconds = !!time.match(/^\d+ ?(sec|s|seconds?)$/);
  if (isSeconds) return timeNum;

  const isMinuets = !!time.match(/^\d+ ?(m|min|minutes?)$/);
  if (isMinuets) return timeNum * 60;

  const isHours = !!time.match(/^\d+ ?(h|hours?)$/);
  if (isHours) return timeNum * 60 * 60;

  const isDays = !!time.match(/^\d+ ?(d|day)$/);
  if (isDays) return timeNum * 24 * 60 * 60;
}
