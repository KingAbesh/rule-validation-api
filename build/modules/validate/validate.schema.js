"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPayload = void 0;
exports.validPayload = {
    rule: {
        field: ["string"],
        condition: ["eq", "neq", "gt", "gte", "contains"],
        condition_value: ["string", "number"],
    },
    data: ["object", "string"],
};
//# sourceMappingURL=validate.schema.js.map