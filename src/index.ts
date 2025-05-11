import colors from "colors";

import app from "./infrastructure/http/server.js";
import { PORT } from "./config.js";
import { connect, disconnect } from "./infrastructure/db/mongoose.config.js";

app.listen(PORT, () => {
  console.log(colors.cyan.bold("Running on port %d"), PORT);
});

connect();

process.on("SIGINT", async () => {
  await disconnect();
  console.log("Gracefully shutting down");
  process.exit(0);
});