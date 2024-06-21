import dotenv from "dotenv";

// Load env variables
const envCheck = dotenv.config();
if (envCheck.error) {
  throw new Error('Unable to find or read .env file: ' + envCheck.error)
}

console.log("Hello World!");
