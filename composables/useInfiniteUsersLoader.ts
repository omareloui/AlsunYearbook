import _ from "lodash";
import type { User } from "~~/@types";

export function useInfiniteUsersLoader(users: User[], renderArr: User[]) {
  const loadPerTime = 20;

  const lastRenderedIndex = () => renderArr.length;
  let prevScrollPos = 0;

  const debouncedOnScroll = _.debounce(onScroll, 200);

  function renderMore() {
    if (lastRenderedIndex() === users.length - 1) return;

    const lastIndexToLoad = loadPerTime + lastRenderedIndex();
    for (let i = lastRenderedIndex(); i < lastIndexToLoad; i++) {
      if (i > users.length - 1) break;
      renderArr.push(users[i]);
    }
  }

  function onScroll() {
    const scrollHeight = document.body.clientHeight;
    const bottomOffset = scrollHeight - (scrollY + innerHeight);
    const isScrollingDown = scrollY > prevScrollPos;

    if (isScrollingDown && bottomOffset <= 500) renderMore();

    prevScrollPos = scrollY;
  }

  function init() {
    renderMore();
    addEventListener("scroll", debouncedOnScroll);
  }
  function destroy() {
    removeEventListener("scroll", debouncedOnScroll);
  }

  function reset() {
    prevScrollPos = 0;
    renderArr = [];
  }

  return {
    init,
    reset,
    destroy,
  };
}
