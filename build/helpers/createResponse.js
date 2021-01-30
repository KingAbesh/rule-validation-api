"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a reusable response payload
 *
 * @returns Response
 */
function createResponse(message, data = [], status = "success") {
    return (res, code) => {
        return res.status(code).json({ status, message, data });
    };
}
exports.default = createResponse;
//# sourceMappingURL=createResponse.js.map