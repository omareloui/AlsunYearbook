export function useParseError(e: Record<string, any>) {
  function getInsideH1(message: string) {
    const matchResult = message.match(/<h1>(.+?)<\/h1>/);
    return matchResult ? matchResult[1] : message;
  }

  return getInsideH1(e.value.data.description || e.value.data).trim();
}
