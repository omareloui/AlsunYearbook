export function useCloudinaryIdParser(
  url: string,
  cloudinaryName = "yearbook"
) {
  const matchResult = url?.match(
    new RegExp(`(${cloudinaryName}/.+)\.(jpe?g|png)$`)
  );
  return matchResult && matchResult[1];
}
