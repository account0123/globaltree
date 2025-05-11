import express from "express";
import root from "./root.routes.js";
import auth from "./auth.routes.js";

const app = express();
app.use(express.json());

app.use("/", root);
app.use("/auth", auth);

export default app;