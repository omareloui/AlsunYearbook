export function useArrowNavigation({
  next,
  prev,
}: {
  next: string;
  prev: string;
}) {
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
    navigateTo(next);
  }

  function goToPrev() {
    navigateTo(prev);
  }

  return {
    addListeners,
    removeListeners,
  };
}
