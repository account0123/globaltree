import { CorsOptions } from "cors";

const {
  PORT = 3000,
  DB_URI = "mongodb://localhost:27017/linktree",
  PUBLIC_WEB_URL = "http://localhost",
} = process.env;

const allowedOrigins: string[] = [PUBLIC_WEB_URL];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin || (allowedOrigins.includes(requestOrigin) || requestOrigin.startsWith("http://localhost:"))) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
    }
  },
}

export { PORT, DB_URI, corsOptions };