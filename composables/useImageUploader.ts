import type { CloudinarySignatureResponse } from "~~/@types";

export function useImageUploader() {
  async function upload(images: FileList) {
    const { data } = await useFetch("/api/cloudinary-signature");
    const {
      apiKey,
      cloudName,
      signature,
      timestamp,
      options: { folder },
    } = data.value as CloudinarySignatureResponse;

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();

      let file = images[i];

      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.text();
        const body = JSON.parse(data, null);

        if (res.status > 200) throw new Error(body.error.message);

        return body.url as string;
      } catch (e) {
        return useNotify().error(e.message, { duration: 60 * 1000 });
      }
    }
  }

  return { upload };
}

// interface UploadOptions {
//   files: FileList;
// }

// export function useImageUploader() {
//   return async function upload({ files }: UploadOptions) {
//     const isLoading = true;

//     // this.validate({ files, preset, imageLabel, tags, doNotHandleFiles });

//     const handledFiles = await normalizeFiles(files);

//     console.log(handledFiles);

//     // Create the thumbnails
//     // const thumbnails = await this.createThumbnails(handledFiles);
//     const images = handledFiles.map((image, index) => ({
//       original: image,
//       // thumbnail: thumbnails[index],
//     }));

//     // const $this = this;
//     const uploadResult = await (async function startUploading() {
//       const result = [];
//       for (const image of images) {
//         // Upload to Cloudinary
//         // const originalCloudinaryImage = await $this.uploadToCloudinary({
//         //   file: image.original,
//         //   preset,
//         //   tags,
//         // });
//         // const thumbnailCloudinaryImage = await $this.uploadToCloudinary({
//         //   file: image.thumbnail,
//         //   preset,
//         //   tags: [...tags, "thumbnail"],
//         // });

//         // const dbImage = await $this.saveToDatabase({
//         //   cloudinaryImage: originalCloudinaryImage,
//         //   cloudinaryThumbnail: thumbnailCloudinaryImage,
//         //   imageLabel,
//         // });
//         // result.push(dbImage);
//       }

//       return result[0];
//     })();

//     // this.isLoading = false;
//     // return uploadResult;
//   };

//   function getBase64(file: File) {
//     const reader = new FileReader();
//     return new Promise(resolve => {
//       reader.readAsDataURL(file);
//       reader.onload = ev => resolve(ev.target.result);
//     });
//   }

//   function normalizeFiles(files: FileList) {
//     const promises = Array.from(files).map(getBase64);
//     return Promise.all(promises);
//   }

//     async function uploadToCloudinary({ file, preset, tags }) {
//       const options = {
//         timestamp: Date.now(),
//         upload_preset: preset,
//         tags: tags,
//       }
//       const signature = await this.getCloudinarySignature(options)
//       if (!signature) throw new Error("No Signature provided")

//       const asset = await $cloudinary.upload(file, {
//         ...options,
//         api_key: this.cloudinaryApiKey,
//         signature,
//       })

//       if (asset.error) throw new Error(asset.error.message)
//       return asset
//     }

//   // class ImagesHandler {
//   //   constructor() {
//   //     this.cloudinaryApiKey = 178599924392737
//   //     this.maxFileSize = 10000000

//   //     this.isLoading = false
//   //   }

//   // TODO:
//   //   async upload({ files, preset, imageLabel, tags, doNotHandleFiles }) {
//   //     this.isLoading = true
//   //     this.validate({ files, preset, imageLabel, tags, doNotHandleFiles })
//   //     const handledFiles = doNotHandleFiles ? files : await this.handleFiles(files)
//   //     // Create the thumbnails
//   //     const thumbnails = await this.createThumbnails(handledFiles)
//   //     const images = handledFiles.map((image, index) => ({ original: image, thumbnail: thumbnails[index] }))

//   //     const $this = this
//   //     const uploadResult = await (async function startUploading() {
//   //       const result = []
//   //       for (const image of images) {
//   //         // Upload to Cloudinary
//   //         const originalCloudinaryImage = await $this.uploadToCloudinary({ file: image.original, preset, tags })
//   //         const thumbnailCloudinaryImage = await $this.uploadToCloudinary({
//   //           file: image.thumbnail,
//   //           preset,
//   //           tags: [...tags, "thumbnail"],
//   //         })

//   //         const dbImage = await $this.saveToDatabase({
//   //           cloudinaryImage: originalCloudinaryImage,
//   //           cloudinaryThumbnail: thumbnailCloudinaryImage,
//   //           imageLabel,
//   //         })
//   //         result.push(dbImage)
//   //       }

//   //       return result[0]
//   //     })()

//   //     this.isLoading = false
//   //     return uploadResult
//   //   }

//   //   async remove(imageId) {
//   //     this.isLoading = true
//   //     if (!imageId) throw new Error("No image id provided")
//   //     const removedImage = await app.apolloProvider.defaultClient.mutate({
//   //       mutation: RemoveImageMutation,
//   //       variables: { imageId },
//   //     })

//   //     this.isLoading = false
//   //     return removedImage.data.removeImage
//   //   }

//   //   validate({ files, preset, imageLabel, tags, doNotHandleFiles }, filesOnly = false) {
//   //     if (!files || !files.length) throw new Error("No file(s) provided")
//   //     if (!filesOnly && !preset) throw new Error("No preset provided")
//   //     if (!filesOnly && !imageLabel) throw new Error("No image label provided")
//   //     if (!filesOnly && !tags) throw new Error("No tags provided")
//   //     if (!filesOnly && typeof tags !== "object") throw new Error("The tags must be an array")
//   //     if (!filesOnly && !imageLabel.match(/Product|Template|Category|Design Art|Custom Design Art/gi))
//   //       throw new Error("The image label is not valid")

//   //     for (const file of files) {
//   //       if (file.size > this.maxFileSize)
//   //         throw new Error(`The image can't be larger than ${this.maxFileSize / 1000000}MB`)
//   //       if (!doNotHandleFiles && !file.type.match(/^image\/(png|jpe?g|svg(z)?\+xml|webp|jfif|pjp(eg)?)$/))
//   //         throw new Error("The image has to be png, jpg, jpeg, svg or webp")
//   //     }
//   //   }

//   //   async handleFiles(files) {
//   //     function getBase64(file) {
//   //       const reader = new FileReader()
//   //       return new Promise(resolve => {
//   //         reader.onload = ev => {
//   //           resolve(ev.target.result)
//   //         }
//   //         reader.readAsDataURL(file)
//   //       })
//   //     }
//   //     const promises = []
//   //     files.forEach(file => promises.push(getBase64(file)))
//   //     return await Promise.all(promises)
//   //   }

//   //   async getCloudinarySignature(options) {
//   //     const signatureResult = await app.apolloProvider.defaultClient.query({
//   //       query: CloudinaryGenerateSignatureQuery,
//   //       variables: options,
//   //     })
//   //     return signatureResult.data.generateCloudinarySignature.signature
//   //   }

//   //   async uploadToCloudinary({ file, preset, tags }) {
//   //     const options = {
//   //       timestamp: Date.now(),
//   //       upload_preset: preset,
//   //       tags: tags,
//   //     }
//   //     const signature = await this.getCloudinarySignature(options)
//   //     if (!signature) throw new Error("No Signature provided")

//   //     const asset = await $cloudinary.upload(file, {
//   //       ...options,
//   //       api_key: this.cloudinaryApiKey,
//   //       signature,
//   //     })

//   //     if (asset.error) throw new Error(asset.error.message)
//   //     return asset
//   //   }

//   //   async saveToDatabase({ cloudinaryImage, cloudinaryThumbnail, imageLabel }) {
//   //     const labelId = await this.getLabelId(imageLabel)
//   //     const imageResult = await app.apolloProvider.defaultClient.mutate({
//   //       mutation: AddImageMutation,
//   //       variables: {
//   //         label: labelId,
//   //         link: cloudinaryImage.url,
//   //         providerImageId: cloudinaryImage.public_id,
//   //         thumbnailLink: cloudinaryThumbnail.url,
//   //         providerThumbnailId: cloudinaryThumbnail.public_id,
//   //       },
//   //     })
//   //     return imageResult.data.addImage
//   //   }

//   //   async getLabelId(imageLabel) {
//   //     const imageLabelsResult = await app.apolloProvider.defaultClient.query({
//   //       query: ImagesLabelsQuery,
//   //     })
//   //     const imageLabels = imageLabelsResult.data.imageLabels
//   //     const labelId = imageLabels.find(l => l.label.match(new RegExp(imageLabel, "ig"))).id

//   //     return labelId
//   //   }

//   //   async createThumbnails(images) {
//   //     const thumbnails = []
//   //     for (const image of images) {
//   //       const thumbnail = await this.resizeImage(image)
//   //       thumbnails.push(thumbnail)
//   //     }
//   //     return thumbnails
//   //   }

//   //   resizeImage(base64Str, maxWidth = 600, maxHeight = 600) {
//   //     return new Promise(resolve => {
//   //       let img = new Image()
//   //       img.src = base64Str
//   //       img.onload = () => {
//   //         let canvas = document.createElement("canvas")
//   //         const MAX_WIDTH = maxWidth
//   //         const MAX_HEIGHT = maxHeight
//   //         let width = img.width
//   //         let height = img.height

//   //         if (width > height) {
//   //           if (width > MAX_WIDTH) {
//   //             height *= MAX_WIDTH / width
//   //             width = MAX_WIDTH
//   //           }
//   //         } else {
//   //           if (height > MAX_HEIGHT) {
//   //             width *= MAX_HEIGHT / height
//   //             height = MAX_HEIGHT
//   //           }
//   //         }
//   //         canvas.width = width
//   //         canvas.height = height
//   //         let ctx = canvas.getContext("2d")
//   //         ctx.drawImage(img, 0, 0, width, height)
//   //         resolve(canvas.toDataURL())
//   //       }
//   //     })
//   //   }
//   // }
// }
