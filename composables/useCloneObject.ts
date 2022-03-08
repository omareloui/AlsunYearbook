export function useCloneObject(obj: Record<string, any>) {
  return JSON.parse(JSON.stringify(obj));
}
