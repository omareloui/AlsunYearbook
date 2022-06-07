import c from "cloudinary";
import { useCloudinaryIdParser } from "~~/composables/useCloudinaryIdParser";
import { config } from "server/config";

const {
  cloudinary: { name, key, secret },
} = config;

import type { CloudinarySignatureResponse, UserImage } from "types";

const cloudinary = c.v2;

cloudinary.config({
  cloud_name: name,
  api_key: key,
  api_secret: secret,
});

export class CloudinaryController {
  static getSignature = defineEventHandler<CloudinarySignatureResponse>(
    async () => {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const options = { folder: "yearbook" };

      const signature = cloudinary.utils.api_sign_request(
        { timestamp, ...options },
        secret!
      );

      return {
        signature,
        timestamp,
        cloudName: config.cloudinary.name,
        apiKey: config.cloudinary.key,
        options,
      } as CloudinarySignatureResponse;
    }
  );

  static removeImage = defineEventHandler(async ({ req }) => {
    const query = useQuery(req) as UserImage;
    await this.removeUserImage(query);

    return { ok: true };
  });

  // Utils
  static removeUserImage(image: UserImage) {
    return Promise.all(
      (["original", "thumbnail"] as const)
        .map(x => image[x])
        .map(this.removeByUrl)
    );
  }

  static async removeByUrl(url: string) {
    const id = useCloudinaryIdParser(url as string);
    try {
      const res = await cloudinary.uploader.destroy(id);
      return res;
    } catch (e) {
      throw createError({ message: (e as Error).message, statusCode: 400 });
    }
  }
}
