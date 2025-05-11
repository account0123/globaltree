import colors from "colors";

import app from "./infrastructure/http/server.js";
import { PORT } from "./config.js";
import { connect } from "./infrastructure/db/mongoose.config.js";

app.listen(PORT, () => {
  console.log(colors.cyan.bold("Running on port %d"), PORT);
});

connect();

process.on("SIGINT", () => {
  console.log("Gracefully shutting down");
});