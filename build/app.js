"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const _config_1 = __importDefault(require("@config"));
const createError_1 = __importDefault(require("@helpers/createError"));
const response_1 = require("@constants/response");
const routes_1 = __importDefault(require("@modules/routes"));
const statuscode_1 = require("@constants/statuscode");
const app = express_1.default();
app.disable("x-powered-by");
// global middlewares
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(compression_1.default());
app.use(morgan_1.default("dev"));
// catch invalid JSON payloads
app.use(function (_err, _req, _res, _) {
    if (_err instanceof SyntaxError) {
        _res.status(statuscode_1.HTTP.BAD_REQUEST).json({
            status: response_1.Response.ERROR,
            message: "Invalid JSON payload passed.",
            data: null,
        });
    }
});
const apiRouter = express_1.default.Router();
// expose routes here
apiRouter.use(routes_1.default());
// handler for route-not-found
apiRouter.use((_req, _res, next) => {
    next(createError_1.default(404, [
        {
            status: response_1.Response.ERROR,
            message: "Route not found.",
            data: null,
        },
    ]));
});
// error handler for api router
apiRouter.use((error, _req, res, _next) => {
    if (!error.statusCode) {
        error = createError_1.default(statuscode_1.HTTP.SERVER_ERROR, [
            {
                status: response_1.Response.ERROR,
                message: "Internal Server Error.",
                data: error.toString(),
                stack: error.stack,
            },
        ]);
    }
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        data: error.errors,
    });
});
const apiURL = `/api/${_config_1.default().version}`;
app.use(apiURL, apiRouter);
exports.default = app;
//# sourceMappingURL=app.js.map