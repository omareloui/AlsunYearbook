export function useParseError(e: Record<string, any>) {
  function getInsideH1(message = "No error specified.") {
    const matchResult = message.match(/<h1>(.+?)<\/h1>/);
    return matchResult ? matchResult[1] : message;
  }

  return getInsideH1(e.value.data?.message || e.value.data).trim();
}
