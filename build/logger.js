"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const format = winston_1.default.format.cli({
    colors: {
        info: "blue",
        error: "red",
        warn: "yellow",
    },
});
const logger = winston_1.default.createLogger({
    transports: [new winston_1.default.transports.Console({ format })],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map