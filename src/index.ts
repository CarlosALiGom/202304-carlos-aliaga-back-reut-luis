import "./loadEnvironment.js";
import mongoose from "mongoose";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/index.js";

const debug = createDebug("robots-api:root");

const port = process.env.PORT ?? 4000;

const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug("missing environment variables");
  process.exit(1);
}

try {
  await mongoose.connect(mongoDbConnection);
  debug("Connected to DataBase");
} catch (error: unknown) {
  debug(`Error connecting DataBase: ${chalk.red((error as Error).message)}`);
}

app.listen(port, () => {
  debug(chalk.blue(`Listening on http://localhost:${port}`));
});
