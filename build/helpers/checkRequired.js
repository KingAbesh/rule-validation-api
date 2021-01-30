"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequired = void 0;
const isPlainObject_1 = __importDefault(require("./isPlainObject"));
exports.checkRequired = (schema, payload) => {
    const list = Object.keys(schema);
    const fieldCheck = recursivelyCheckFields(payload, list, schema);
    if (fieldCheck === "" && isPlainObject_1.default(payload[list[0]])) { // only check that rule has all required fields if rule is an object
        const ruleChildrenFieldCheck = recursivelyCheckFields(payload[list[0]], Object.keys(schema[list[0]]), schema[list[0]]);
        if (ruleChildrenFieldCheck !== "") {
            return ruleChildrenFieldCheck;
        }
    }
    return fieldCheck === "" ? payload : fieldCheck;
};
const recursivelyCheckFields = (payload, list, schema, index = 0) => {
    if (payload[list[index]] === undefined || payload[list[index]] === null) {
        return `${list[index]} is required.`;
    }
    if (index === list.length - 1) {
        return "";
    }
    return recursivelyCheckFields(payload, list, schema, ++index);
};
//# sourceMappingURL=checkRequired.js.map