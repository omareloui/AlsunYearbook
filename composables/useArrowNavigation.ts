import _ from "lodash";

export function useArrowNavigation({
  next,
  prev,
  pause,
}: {
  next: string;
  prev: string;
  pause?: () => boolean;
}) {
  const debouncedNavigation = _.debounce(navigateTo, 500);

  function addListeners() {
    addEventListener("keyup", onKeyUp);
  }

  function removeListeners() {
    removeEventListener("keyup", onKeyUp);
  }

  function onKeyUp(e: KeyboardEvent) {
    if (pause && pause()) return;
    if (e.code === "ArrowRight") return debouncedNavigation(next);
    if (e.code === "ArrowLeft") return debouncedNavigation(prev);
  }

  return { addListeners, removeListeners };
}
