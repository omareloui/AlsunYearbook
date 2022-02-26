export function useParseError(e: Record<string, any>) {
  function getInsideH1(message: string) {
    return message.match(/<h1>(.+?)<\/h1>/)[1];
  }

  return getInsideH1(e.value.data.description).trim();
}
