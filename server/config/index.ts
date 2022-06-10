import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbLink: process.env.DB_URI,

  tokens: {
    jwt: { secret: process.env.JWT_SECRET as string, expiration: "10m" },
    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      expiration: "30d",
    },
  },

  // TODO: move this to run time config
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    secret: process.env.CLOUDINARY_SECRET,
    key: process.env.CLOUDINARY_KEY,
  },
};
