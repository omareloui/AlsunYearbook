export function useCloudinaryIdParser(
  url: string,
  cloudinaryName = "yearbook"
) {
  return url.match(new RegExp(`(${cloudinaryName}/.+)\.(jpe?g|png)$`))[1];
}
