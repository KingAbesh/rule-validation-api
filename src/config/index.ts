import dotenv from "dotenv";
import path from "path";

// describes a secrets object
type Secrets = Readonly<{
  env: string;
  version: string;
  port: string;
}>;

const env = process.env.NODE_ENV || "development";
let envfile: string;

switch (env) {
  case "production":
    envfile = ".env.live";
    break;
  case "development":
  default:
    envfile = ".env.local";
    break;
}

const envpath = path.join(__dirname, "../..", envfile);
let cache: Secrets;

export default function config() {
  if (!cache) {
    dotenv.config({ path: envpath });
    cache = Object.freeze({
      env,
      version: process.env.API_VERSION || "v1",
      port: process.env.PORT || "3000",
    });
  }
  return cache;
}
