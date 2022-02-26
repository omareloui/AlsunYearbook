import { removeDomain } from ".";

export function extractTWTId(twtLink: string) {
  if (!twtLink || !twtLink.match(/(https?:\/\/)?((www|mobile)\.)?twitter\.com/))
    return twtLink;

  return removeDomain(twtLink);
}
