export const removeDomain = (link: string) =>
  link
    .replace(/\?.+/, "")
    .replace(/(https?:\/\/)?((www|m(obile)?)\.)?.+\.com\//, "")
    .replace(/\/$/, "");
