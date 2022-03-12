import _ from "lodash";

export function useArrowNavigation({
  next,
  prev,
}: {
  next: string;
  prev: string;
}) {
  const debouncedNavigation = _.debounce(navigateTo, 500);

  function addListeners() {
    addEventListener("keyup", onKeyUp);
  }

  function removeListeners() {
    removeEventListener("keyup", onKeyUp);
  }

  function onKeyUp(e: KeyboardEvent) {
    if (e.code === "ArrowRight") return goToNext();
    if (e.code === "ArrowLeft") return goToPrev();
  }

  function goToNext() {
    debouncedNavigation(next);
  }

  function goToPrev() {
    debouncedNavigation(prev);
  }

  return {
    addListeners,
    removeListeners,
  };
}
