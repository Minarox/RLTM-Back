import dotenv from "dotenv";
import logger from "./src/instance/logger";

// Load env variables
const envCheck = dotenv.config();
if (envCheck.error) {
  logger.error("Unable to find or read .enf file: " + envCheck.error);
}

console.log("Hello World!");
