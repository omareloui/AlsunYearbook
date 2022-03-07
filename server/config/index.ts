export const config = {
  dbLink: process.env.DB_URI,

  tokens: {
    jwt: { secret: process.env.JWT_SECRET, expiration: "1m" },
    refresh: { secret: process.env.REFRESH_TOKEN_SECRET, expiration: "30d" },
  },
};
