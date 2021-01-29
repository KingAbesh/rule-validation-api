"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildData = void 0;
exports.buildData = (payload) => {
    const conditionsMap = {
        eq: "===",
        neq: "!==",
        gt: ">",
        gte: ">=",
    };
    const fieldKey = payload["rule"]["field"];
    const fields = fieldKey.split(".");
    const desiredField = fields[1] ? fields[1] : fields[0]; // { field: "missions.count"} => missions.count ? missions.count : missions
    const desiredData = fields[1]
        ? payload["data"][fields[0]]
        : payload["data"]; // missions.count ? data[missions} : data;
    const condition = payload["rule"]["condition"];
    const conditionValue = payload["rule"]["condition_value"];
    if (!conditionsMap[condition]) {
        if (condition === "contains") {
            if (isPresent(desiredField, desiredData)) {
                return {
                    validation: {
                        error: false,
                        field: fieldKey,
                        field_value: desiredData[desiredField],
                        condition: condition,
                        condition_value: conditionValue,
                    },
                    message: `field ${fieldKey} successfully validated.`,
                };
            }
        }
    }
    if (conditionsMap[condition] &&
        runCommand(desiredData[desiredField], conditionsMap[condition], conditionValue)) {
        return {
            validation: {
                error: false,
                field: fieldKey,
                field_value: desiredData[desiredField],
                condition: condition,
                condition_value: conditionValue,
            },
            message: `field ${fieldKey} successfully validated.`,
        };
    }
    return {
        validation: {
            error: true,
            field: fieldKey,
            field_value: desiredData[desiredField],
            condition: condition,
            condition_value: conditionValue,
        },
        message: `field ${fieldKey} failed validation.`,
    };
};
const runCommand = (lhs, command, rhs) => {
    return new Function("x", "y", `return x ${command} y`)(lhs, rhs); // e.g; return 45 >= 47 -> boolean
};
const isPresent = (field, data) => {
    return data[field] !== undefined;
};
//# sourceMappingURL=buildData.js.map