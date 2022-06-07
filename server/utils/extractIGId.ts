import { removeDomain } from ".";

export function extractIGId(igLink: string) {
  if (!igLink || !igLink.match(/(https?:\/\/)?((www|m)\.)?instagram\.com/))
    return igLink;
  return removeDomain(igLink);
}
