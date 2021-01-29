"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("@constants/response");
const statuscode_1 = require("@constants/statuscode");
/**
 * Creates an error payload
 */
function createError(status, data) {
    return {
        status: data[0].status,
        errors: data[0].data,
        message: data[0].message,
        stack: new Error().stack,
        statusCode: status,
    };
}
exports.default = createError;
createError.InternalServerError = (data) => createError(statuscode_1.HTTP.SERVER_ERROR, [
    {
        status: response_1.Response.ERROR,
        message: "Internal Server Error.",
        data,
        stack: process.env.NODE === "development" ? new Error().stack : undefined,
    },
]);
//# sourceMappingURL=createError.js.map