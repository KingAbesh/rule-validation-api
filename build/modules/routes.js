"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const me_routes_1 = __importDefault(require("./me/me.routes"));
const validate_routes_1 = __importDefault(require("./validate/validate.routes"));
function routes() {
    const router = express_1.Router();
    router.use("/validate-rule", validate_routes_1.default);
    router.use("/", me_routes_1.default);
    return router;
}
exports.default = routes;
//# sourceMappingURL=routes.js.map