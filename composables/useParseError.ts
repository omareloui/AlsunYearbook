export function useParseError(e: Record<string, any>) {
  function getInsideH1(message = "No error specified.") {
    const matchResult = message.match(/<h1>(.+?)<\/h1>/);
    return matchResult ? matchResult[1] : message;
  }

  const message =
    typeof e.value.data === "string"
      ? e.value.data
      : e.value.data.message || e.value.data.description;

  return getInsideH1(message).trim();
}
