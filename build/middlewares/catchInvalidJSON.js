"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchInvalidJSON = void 0;
const createError_1 = __importDefault(require("@helpers/createError"));
exports.catchInvalidJSON = (req, _, next) => {
    let data = "";
    req.on("data", function (chunk) {
        data += chunk;
    });
    req.on("end", function () {
        if (data) {
            try {
                JSON.parse(data);
                next();
            }
            catch (e) {
                console.log(e);
                next(createError_1.default(400, [
                    {
                        status: "error",
                        message: "Invalid JSON payload passed.",
                        data: null,
                    },
                ])); // error in the above string (in this case, yes)!
            }
        }
        next();
    });
};
//# sourceMappingURL=catchInvalidJSON.js.map