"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const _config_1 = __importDefault(require("@config"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const apiURL = `/api/${_config_1.default().version}`;
const { port } = _config_1.default();
app_1.default.listen(port, function onListen() {
    logger_1.default.info(`Server is up and running at ${apiURL} on port ${port}`);
});
//# sourceMappingURL=server.js.map