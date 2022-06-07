export default function useGetObjectValue<T>(
  object: Record<string, any>,
  string: string
): T {
  return string.split(".").reduce((acc, curr) => acc && acc[curr], object) as T;
}
