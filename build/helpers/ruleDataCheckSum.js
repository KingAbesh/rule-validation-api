"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleDataCheckSum = void 0;
exports.ruleDataCheckSum = (payload) => {
    const field = payload["rule"]["field"].split(".");
    const data = Object.keys(payload["data"]);
    if (!data.includes(field[0])) { // { field: "missions"}
        return `field ${field[0]} is missing from data.`;
    }
    const nestedData = Object.keys(payload["data"][field[0]]);
    if (field.length > 1) { // { field: "missions.count"}
        if (!nestedData.includes(field[1])) {
            return `field ${field[1]} is missing from data.`;
        }
    }
    return payload;
};
//# sourceMappingURL=ruleDataCheckSum.js.map