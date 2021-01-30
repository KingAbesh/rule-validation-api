"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const response_1 = require("@constants/response");
const checkRequired_1 = require("@helpers/checkRequired");
const checkType_1 = require("@helpers/checkType");
const ruleDataCheckSum_1 = require("@helpers/ruleDataCheckSum");
const createError_1 = __importDefault(require("@helpers/createError"));
const statuscode_1 = require("@constants/statuscode");
exports.validateRequest = (schema, field = "body") => {
    return (req, _res, next) => {
        const required = checkRequired_1.checkRequired(schema, req[field]); // we return a string (error message) or the request body (object)
        if (typeof required === "string") {
            return next(createError_1.default(statuscode_1.HTTP.BAD_REQUEST, [
                {
                    status: response_1.Response.ERROR,
                    message: required,
                    data: null,
                },
            ]));
        }
        const type = checkType_1.checkType(schema, req[field]); // we return a string (error message) or the request body (object)
        if (typeof type === "string") {
            return next(createError_1.default(statuscode_1.HTTP.BAD_REQUEST, [
                {
                    status: response_1.Response.ERROR,
                    message: type,
                    data: null,
                },
            ]));
        }
        const ruleMatchesData = ruleDataCheckSum_1.ruleDataCheckSum(req[field]); // we return a string (error message) or the request body (object)
        if (typeof ruleMatchesData === "string") {
            return next(createError_1.default(statuscode_1.HTTP.BAD_REQUEST, [
                {
                    status: response_1.Response.ERROR,
                    message: ruleMatchesData,
                    data: null,
                },
            ]));
        }
        next();
    };
};
//# sourceMappingURL=validateRequest.js.map