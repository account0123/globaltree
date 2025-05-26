import express from "express";
import cors from "cors";
import root from "./root.routes.js";
import auth from "./auth.routes.js";
import users from "./users.routes.js";
import { corsOptions } from "../../config.js";
import { notFound } from "./middlewares/not_found.middleware.js";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", root);
app.use("/auth", auth);
app.use("/users", users);

// Last middleware
app.use(notFound);

export default app;