import type { CloudinarySignatureResponse } from "~~/@types";

export function useImageUploader() {
  async function upload(images: FileList) {
    const { data } = await useFetch("/api/cloudinary/signature");
    const {
      apiKey,
      cloudName,
      signature,
      timestamp,
      options: { folder },
    } = data.value as CloudinarySignatureResponse;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];

      const handledFile = await getBase64(file);
      const optimized = await optimizeImage(handledFile);

      const thumbnail = await createThumbnail(handledFile);
      const options = { apiKey, cloudName, signature, timestamp, folder };
      const originalUrl = await uploadToCloudinary({
        file: optimized,
        ...options,
      });
      const thumbnailUrl = await uploadToCloudinary({
        file: thumbnail,
        ...options,
      });
      return { original: originalUrl, thumbnail: thumbnailUrl };
    }
  }

  async function uploadToCloudinary({
    file,
    apiKey,
    timestamp,
    signature,
    cloudName,
    folder,
  }: {
    file: File;
    apiKey: string;
    timestamp: number;
    signature: string;
    cloudName: string;
    folder: string;
  }) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.text();
    const body = JSON.parse(data, null);

    if (res.status >= 300) throw new Error(body.error.message);

    return body.url as string;
  }

  function dataURLToFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function getBase64(file: File) {
    const reader = new FileReader();
    return new Promise<ArrayBuffer>(resolve => {
      reader.readAsDataURL(file);
      reader.onload = ev => resolve(ev.target.result as ArrayBuffer);
    });
  }

  async function createThumbnail(image: ArrayBuffer) {
    return dataURLToFile(
      await resizeImage(image, 400, 400),
      Number(new Date()).toString()
    );
  }

  async function optimizeImage(image: ArrayBuffer) {
    return dataURLToFile(
      await resizeImage(image),
      Number(new Date()).toString()
    );
  }

  async function resizeImage(
    image: ArrayBuffer,
    maxWidth?: number,
    maxHeight?: number
  ) {
    return new Promise<string>(resolve => {
      let img = new Image();
      img.src = image as unknown as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = maxWidth || img.width;
        const MAX_HEIGHT = maxHeight || img.height;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const imageType = "image/jpeg";
        const quality = 0.7;
        resolve(canvas.toDataURL(imageType, quality));
      };
    });
  }

  return { upload };
}
