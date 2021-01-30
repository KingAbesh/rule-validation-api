"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRule = void 0;
const statuscode_1 = require("@constants/statuscode");
const createResponse_1 = __importDefault(require("@helpers/createResponse"));
const validateService = __importStar(require("./validate.services"));
const response_1 = require("@constants/response");
exports.validateRule = (req, res) => {
    const { validation, message } = validateService.validate(req.body);
    if (validation.error) {
        createResponse_1.default(message, { validation }, response_1.Response.ERROR)(res, statuscode_1.HTTP.BAD_REQUEST);
        return;
    }
    createResponse_1.default(message, { validation })(res, statuscode_1.HTTP.OK);
};
//# sourceMappingURL=validate.controllers.js.map