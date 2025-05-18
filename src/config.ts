import { CorsOptions } from "cors";

const {
  PORT = 3000,
  DB_URI = "mongodb://localhost:27017/linktree",
  PUBLIC_WEB_URL = "http://localhost",
  NODE_ENV = "development",
} = process.env;

const allowedOrigins: (string | undefined)[] = [PUBLIC_WEB_URL];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (
      (!requestOrigin && NODE_ENV == "development") ||
      (requestOrigin && allowedOrigins.includes(requestOrigin))
    ) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
    }
  },
};

export { PORT, DB_URI, corsOptions };
