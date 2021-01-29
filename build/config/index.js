"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV || "development";
let envfile;
switch (env) {
    case "production":
        envfile = ".env.live";
        break;
    case "development":
    default:
        envfile = ".env.local";
        break;
}
const envpath = path_1.default.join(__dirname, "../..", envfile);
let cache;
function config() {
    if (!cache) {
        dotenv_1.default.config({ path: envpath });
        cache = Object.freeze({
            env,
            version: process.env.API_VERSION || "v1",
            port: process.env.PORT || "3000",
        });
    }
    return cache;
}
exports.default = config;
//# sourceMappingURL=index.js.map