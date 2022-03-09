import { groupBy } from "lodash";

export function useGroupByDay<T = unknown>(
  arr: T[],
  getDate: (arrItem: T) => Date,
  divider: string = "/"
) {
  return groupBy(arr, item => {
    const date = getDate(item);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const finalDate = `${day}${divider}${month}${divider}${year}`;
    return finalDate;
  });
}
