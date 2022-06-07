import { removeDomain } from ".";

export function extractTWTId(twtLink: string | undefined) {
  if (!twtLink || !twtLink.match(/(https?:\/\/)?((www|mobile)\.)?twitter\.com/))
    return twtLink;

  return removeDomain(twtLink);
}
