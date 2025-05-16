import { CorsOptions } from "cors";

const {
  PORT = 3000,
  DB_URI = "mongodb://localhost:27017/linktree",
} = process.env;

const allowedOrigins: string[] = [];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (requestOrigin && (allowedOrigins.includes(requestOrigin) || requestOrigin.startsWith("http://localhost:"))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}

export { PORT, DB_URI, corsOptions };