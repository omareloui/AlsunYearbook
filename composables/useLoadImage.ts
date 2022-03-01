export function useLoadImage(src: string, element: HTMLImageElement) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;

    img.onload = async () => {
      element.src = src;
      res(true);
    };

    img.onerror = rej;
  });
}
