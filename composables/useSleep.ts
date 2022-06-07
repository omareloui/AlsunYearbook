export function useSleep() {
  return (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  };
}
