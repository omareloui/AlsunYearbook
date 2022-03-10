import _ from "lodash";
const { groupBy } = _;

export function useGroupByDay<T = unknown>(
  arr: T[],
  getDate: (arrItem: T) => Date
) {
  return groupBy(arr, item => {
    const date = getDate(item);
    const day = date.getDate();
    const month = date.toLocaleDateString("default", { month: "short" });
    const year = date.getFullYear();
    const finalDate = `${day} ${month}. ${year}`;
    return finalDate;
  });
}
