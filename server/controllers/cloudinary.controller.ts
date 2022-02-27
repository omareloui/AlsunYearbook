// import c from "cloudinary";
import type { APIFunction } from "~~/@types";

export class CloudinaryController {
  static getSignature: APIFunction = async () => {
    const name = process.env.CLOUDINARY_NAME;
    const secret = process.env.CLOUDINARY_SECRET;
    const key = process.env.CLOUDINARY_KEY;

    // console.log("server");
    // console.log(name, secret, key);

    // const cloudinary = c.v2;
    // const timestamp = Math.round(new Date().getTime() / 1000);
    // const signature = cloudinary.utils.api_sign_request(
    //   {
    //     timestamp: timestamp,
    //     eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
    //     folder: "signed_upload_demo_form",
    //   }
    //   // secret
    // );
    return {
      // signature,
      // timestamp,
      cloudName: name,
      apiKey: key,
    };
  };
}
