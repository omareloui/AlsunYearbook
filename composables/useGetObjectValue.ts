export default function useGetObjectValue(
  object: Record<string, any>,
  string: string
) {
  return string.split(".").reduce((acc, curr) => acc && acc[curr], object);
}
