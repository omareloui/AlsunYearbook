import { useQuery, createError } from "h3";
import c from "cloudinary";
import { useCloudinaryIdParser } from "~~/composables/useCloudinaryIdParser";
import { config } from "~~/server/config";

const {
  cloudinary: { name, key, secret },
} = config;

import type {
  APIFunction,
  CloudinarySignatureResponse,
  UserImage,
} from "~~/@types";

const cloudinary = c.v2;

cloudinary.config({
  cloud_name: name,
  api_key: key,
  api_secret: secret,
});

export class CloudinaryController {
  static getSignature: APIFunction<Promise<CloudinarySignatureResponse>> =
    async () => {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const options = { folder: "yearbook" };

      const signature = cloudinary.utils.api_sign_request(
        { timestamp, ...options },
        secret
      );

      return {
        signature,
        timestamp,
        cloudName: config.cloudinary.name,
        apiKey: config.cloudinary.key,
        options,
      };
    };

  static removeImage: APIFunction = async (req, res) => {
    if (req.method !== "DELETE") return;

    const query = useQuery(req) as UserImage;
    await this.removeUserImage(query);

    return { ok: true };
  };

  // Utils
  static async removeUserImage(image: UserImage) {
    const getUrl = t => image[t];

    return await Promise.all(
      ["original", "thumbnail"].map(getUrl).map(this.removeByUrl)
    );
  }

  static async removeByUrl(url: string) {
    const id = useCloudinaryIdParser(url as string);
    try {
      const res = await cloudinary.uploader.destroy(id);
      return res;
    } catch (e) {
      throw createError({ message: e.message, statusCode: 400 });
    }
  }
}
