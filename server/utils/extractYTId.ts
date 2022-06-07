import { removeDomain } from ".";

export function extractYTId(ytLink: string | undefined) {
  if (
    !ytLink ||
    !ytLink.match(/(https?:\/\/)?((www|m)\.)?youtube\.com\/channel\//)
  )
    return ytLink;

  return removeDomain(ytLink).replace(/channel\//, "");
}
