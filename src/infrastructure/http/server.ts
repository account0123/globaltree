import express from "express";
import cors from "cors";
import root from "./root.routes.js";
import auth from "./auth.routes.js";
import users from "./users.routes.js";
import { corsOptions } from "../../config.js";
import { authorization } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", root);
app.use("/auth", auth);
app.use("/users", authorization, users);

export default app;