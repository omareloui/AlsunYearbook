import c from "cloudinary";
import type { APIFunction, CloudinarySignatureResponse } from "~~/@types";

export class CloudinaryController {
  static getSignature: APIFunction<Promise<CloudinarySignatureResponse>> =
    async () => {
      const name = process.env.CLOUDINARY_NAME;
      const secret = process.env.CLOUDINARY_SECRET;
      const key = process.env.CLOUDINARY_KEY;

      const cloudinary = c.v2;

      const timestamp = Math.round(new Date().getTime() / 1000);
      const options = { folder: "yearbook" };

      const signature = cloudinary.utils.api_sign_request(
        { timestamp, ...options },
        secret
      );

      return {
        signature,
        timestamp,
        cloudName: name,
        apiKey: key,
        options,
      };
    };
}
