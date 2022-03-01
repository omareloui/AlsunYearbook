export function useRegExHelpers() {
  return {
    dontMatch(stringNotToMatch: string, length: "auto" | number) {
      return new RegExp(
        `^((?!${stringNotToMatch}).)${
          typeof length === "number" ? `{${length}}` : "+"
        }$`
      );
    },
  };
}
