"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkType = void 0;
const isPlainObject_1 = __importDefault(require("./isPlainObject"));
exports.checkType = (schema, payload) => {
    const list = Object.keys(schema);
    const typeCheck = recursivelyCheckType(payload, list, schema);
    return typeCheck === "" ? payload : typeCheck;
};
const recursivelyCheckType = (payload, list, schema, index = 0) => {
    if (list[index] === "rule" && !isPlainObject_1.default(payload[list[index]])) {
        return `rule should be an object.`;
    }
    if (list[index] === "data" &&
        !isPlainObject_1.default(payload[list[index]]) &&
        !Array.isArray(payload[list[index]]) &&
        typeof payload[list[index]] !== "string") {
        return `data should be a|an object, array or string.`;
    }
    if (index === list.length - 1) {
        return "";
    }
    return recursivelyCheckType(payload, list, schema, ++index);
};
//# sourceMappingURL=checkType.js.map