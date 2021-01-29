"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictValidate = void 0;
exports.strictValidate = (schema, payload) => {
};
const checkRequiredField = (field) => {
    if (!field) {
        return `${field} is required.`;
    }
};
//# sourceMappingURL=strictValidate.js.map