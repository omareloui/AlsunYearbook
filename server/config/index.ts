import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbLink: process.env.DB_URI,

  tokens: {
    jwt: { secret: process.env.JWT_SECRET as string, expiration: "1m" },
    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      expiration: "30d",
    },
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    secret: process.env.CLOUDINARY_SECRET,
    key: process.env.CLOUDINARY_KEY,
  },
};
